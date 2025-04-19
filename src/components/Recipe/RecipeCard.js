import React from "react";
import { useMealContext } from "../../context/MealContext";
import "./RecipeCard.css";

function RecipeCard({ dish }) {
  const { bookmarkMeal, setExpandedMeal } = useMealContext();

  return (
    <div className="meal-card">
      <img src={dish.strMealThumb} alt={dish.strMeal} />
      <h3>{dish.strMeal}</h3>
      <p><strong>Region:</strong> {dish.strArea}</p>
      <p><strong>Category:</strong> {dish.strCategory}</p>
      <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem" }}>
        <button onClick={() => bookmarkMeal(dish)} className="save-btn">💾 Save</button>
        <button onClick={() => setExpandedMeal(dish)}>ℹ️ Info</button>
      </div>
    </div>
  );
}

export default RecipeCard;
