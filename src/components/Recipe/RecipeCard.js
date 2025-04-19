import React from "react";
import "./RecipeCard.css"; // Optional styling

function RecipeCard({ dish, onSave, onInfo }) {
  return (
    <div className="meal-card">
      <img src={dish.strMealThumb} alt={dish.strMeal} />
      <h3>{dish.strMeal}</h3>
      <p><strong>Region:</strong> {dish.strArea}</p>
      <p><strong>Category:</strong> {dish.strCategory}</p>
      <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem" }}>
        <button onClick={() => onSave(dish)} className="save-btn">💾 Save</button>
        <button onClick={() => onInfo(dish)}>ℹ️ Info</button>
      </div>
    </div>
  );
}

export default RecipeCard;
