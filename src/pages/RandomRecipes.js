import React, { useState } from "react";
import "./RandomRecipes.css";
function RandomRecipes() {
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMeal = async () => {
    setLoading(true);
    setMeal(null);
    setError("");

    try {
      const res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      const mealData = data.meals[0];   

      setMeal(mealData);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }

    setLoading(false);
  };

  const getIngredients = (meal) => {
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push(`${ingredient} - ${measure}`);
      }
    }
    return ingredients;
  };

  return (
    <div className="meal-finder">
      <h2>🍽️ Random Meal Finder</h2>
      <button onClick={fetchMeal}>Get Random Meal</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {meal && (
        <div className="meal-card">
          <img src={meal.strMealThumb} alt={meal.strMeal} width="200" />
          <h3>{meal.strMeal}</h3>
          <p><strong>Category:</strong> {meal.strCategory}</p>
          <p><strong>Area:</strong> {meal.strArea}</p>

          <h4>Ingredients:</h4>
          <ul>
            {getIngredients(meal).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h4>Instructions:</h4>
          <p>{meal.strInstructions}</p>

          {meal.strYoutube && (
            <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer">
              📺 Watch on YouTube
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export default RandomRecipes;
