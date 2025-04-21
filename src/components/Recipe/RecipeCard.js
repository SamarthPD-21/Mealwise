import React from "react";
import { useNavigate } from "react-router-dom";
import "./RecipeCard.css";

const RecipeCard = ({ recipe, onSave }) => {
  const navigate = useNavigate();

  const handleInfoClick = () => {
    navigate(`/recipe/${recipe.id}`);
  };

  return (
    <div className="meal-card">
      <img
        src={recipe?.image || "/placeholder.jpg"}
        alt={recipe?.title || "Recipe"}
      />
      <h3>{recipe?.title}</h3>
      <p>
        {recipe?.readyInMinutes} mins | {recipe?.servings} servings
      </p>
      <div className="card-buttons">
        <button className="info-btn" onClick={handleInfoClick}>
          Info
        </button>
        <button className="save-btn" onClick={onSave}>
          Save to Planner
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;