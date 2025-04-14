import React, { useState, useEffect } from "react";
import "./RandomRecipes.css";

function RandomRecipes() {
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  useEffect(() => {
    const fetchAreas = async () => {
      const areaRes = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
      const areaData = await areaRes.json();
      setAreas(areaData.meals.map((a) => a.strArea));
    };
    fetchAreas();
  }, []);

  const fetchMeal = async () => {
    setLoading(true);
    setMeal(null);
    setError("");

    try {
      let url = selectedArea
        ? `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedArea}`
        : `https://www.themealdb.com/api/json/v1/1/search.php?s=`;

      const res = await fetch(url);
      const data = await res.json();
      const allMeals = data.meals;

      if (!allMeals || allMeals.length === 0) throw new Error("No meals found.");

      // Fetch details and apply type filtering
      const detailRequests = allMeals.slice(0, 15).map((m) =>
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${m.idMeal}`).then((res) => res.json())
      );

      const detailedMeals = await Promise.all(detailRequests);
      const filteredMeals = detailedMeals
        .map((d) => d.meals[0])
        .filter((meal) => {
          const ingredients = getIngredients(meal).join(" ").toLowerCase();
          if (typeFilter === "All") return true;
          if (typeFilter === "Vegetarian")
            return !ingredients.includes("chicken") &&
                   !ingredients.includes("meat") &&
                   !ingredients.includes("fish") &&
                   !ingredients.includes("egg");
          if (typeFilter === "Non-Vegetarian")
            return ingredients.includes("chicken") || ingredients.includes("meat") || ingredients.includes("fish");
          if (typeFilter === "Egg") return ingredients.includes("egg");
          if (typeFilter === "Vegan")
            return !ingredients.includes("meat") &&
                   !ingredients.includes("milk") &&
                   !ingredients.includes("cheese") &&
                   !ingredients.includes("egg") &&
                   !ingredients.includes("butter") &&
                   !ingredients.includes("cream");
          return true;
        });

      if (filteredMeals.length === 0) throw new Error("No meals matched the filters.");

      const randomMeal = filteredMeals[Math.floor(Math.random() * filteredMeals.length)];
      setMeal(randomMeal);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    }

    setLoading(false);
  };

  const getIngredients = (meal) => {
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ing = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ing && ing.trim()) {
        ingredients.push(`${ing} - ${measure}`);
      }
    }
    return ingredients;
  };

  const saveRecipe = () => {
    const saved = JSON.parse(localStorage.getItem("savedRecipes")) || [];
    if (!saved.some((m) => m.idMeal === meal.idMeal)) {
      saved.push(meal);
      localStorage.setItem("savedRecipes", JSON.stringify(saved));
      alert("Recipe saved! 💾");
    } else {
      alert("Already saved.");
    }
  };

  return (
    <div className="meal-finder">
      <h2>🍽️ Random Meal Finder</h2>

      <div className="filters">
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="dropdown">
          <option value="All">All Types</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Non-Vegetarian">Non-Vegetarian</option>
          <option value="Egg">Contains Egg</option>
          <option value="Vegan">Vegan</option>
        </select>

        <select value={selectedArea} onChange={(e) => setSelectedArea(e.target.value)} className="dropdown">
          <option value="">-- Region --</option>
          {areas.map((area, i) => (
            <option key={i} value={area}>{area}</option>
          ))}
        </select>
      </div>

      <button onClick={fetchMeal}>🎲 Get Random Meal</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {meal && (
        <div className="meal-card">
          <img src={meal.strMealThumb} alt={meal.strMeal} />
          <h3>{meal.strMeal}</h3>
          <p><strong>Category:</strong> {meal.strCategory}</p>
          <p><strong>Area:</strong> {meal.strArea}</p>

          <h4>Ingredients:</h4>
          <ul>
            {getIngredients(meal).map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>

          <h4>Instructions:</h4>
          <p>{meal.strInstructions}</p>

          {meal.strYoutube && (
            <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer">
              📺 Watch on YouTube
            </a>
          )}

          <button onClick={saveRecipe} className="save-btn">💾 Save Recipe</button>
        </div>
      )}
    </div>
  );
}

export default RandomRecipes;
