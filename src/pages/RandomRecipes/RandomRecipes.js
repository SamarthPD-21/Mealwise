import React, { useState } from "react";
import { useMealContext } from "../../context/MealContext";
import RecipeCard from "../../components/Recipe/RecipeCard";
import RecipeDetails from "../../components/Recipe/RecipeDetails";
import "./RandomRecipes.css";

function RandomRecipes() {
  const {
    highlightedMeal,
    setHighlightedMeal,
    foundMeals,
    setFoundMeals,
    expandedMeal,
    setExpandedMeal,
    bookmarkMeal,
  } = useMealContext();

  const [isFetching, setIsFetching] = useState(false);
  const [message, setMessage] = useState("");
  const [query, setQuery] = useState("");

  const surpriseMe = async () => {
    setIsFetching(true);
    setMessage("");
    setHighlightedMeal(null);
    setFoundMeals([]);
    setExpandedMeal(null);

    try {
      const res = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");
      const data = await res.json();
      const pool = data.meals;

      if (!pool) throw new Error("Couldn’t load meals.");

      const detailed = await Promise.all(
        pool.slice(0, 15).map((item) =>
          fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${item.idMeal}`).then((r) => r.json())
        )
      );

      const mealArray = detailed.map((d) => d.meals[0]);
      const chosen = mealArray[Math.floor(Math.random() * mealArray.length)];

      setHighlightedMeal(chosen);
    } catch (err) {
      setMessage(err.message);
    }

    setIsFetching(false);
  };

  const runSearch = async () => {
    if (!query.trim()) return;

    setIsFetching(true);
    setMessage("");
    setHighlightedMeal(null);
    setExpandedMeal(null);
    setFoundMeals([]);

    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      const data = await res.json();

      if (!data.meals) throw new Error("Nothing matched.");

      setFoundMeals(data.meals);
    } catch (err) {
      setMessage(err.message);
    }

    setIsFetching(false);
  };

  return (
    <div className="meal-finder">
      <h2>🍽️ MealWise - Random Recipes</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="🔍 Find a dish"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-box"
        />
        <button onClick={runSearch}>Search</button>
        <button onClick={surpriseMe}>🎲 Random Meal</button>
      </div>

      {isFetching && <p>Loading...</p>}
      {message && <p className="error">{message}</p>}

      {(highlightedMeal || expandedMeal) && (
        <RecipeDetails
          meal={highlightedMeal || expandedMeal}
          onSave={bookmarkMeal}
          onClose={() => {
            setHighlightedMeal(null);
            setExpandedMeal(null);
          }}
        />
      )}

      {foundMeals.length > 0 && (
        <div className="meal-grid">
          {foundMeals.map((dish) => (
            <RecipeCard
              key={dish.idMeal}
              dish={dish}
              onSave={bookmarkMeal}
              onInfo={() => setExpandedMeal(dish)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default RandomRecipes;
