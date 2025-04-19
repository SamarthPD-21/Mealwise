import React from "react";
import { useMealContext } from "../../context/MealContext";
import "./RecipeDetails.css";

function extractIngredients(item) {
  const result = [];
  for (let k = 1; k <= 20; k++) {
    const ing = item[`strIngredient${k}`];
    const amt = item[`strMeasure${k}`];
    if (ing && ing.trim()) {
      result.push(`${ing} - ${amt}`);
    }
  }
  return result;
}

function RecipeDetails({ meal }) {
  const { bookmarkMeal, setHighlightedMeal, setExpandedMeal } = useMealContext();

  const handleClose = () => {
    setHighlightedMeal(null);
    setExpandedMeal(null);
  };

  return (
    <div className="meal-card large">
      <img src={meal.strMealThumb} alt={meal.strMeal} />
      <h3>{meal.strMeal}</h3>
      <p><strong>Category:</strong> {meal.strCategory}</p>
      <p><strong>Region:</strong> {meal.strArea}</p>

      <h4>Ingredients:</h4>
      <ul>
        {extractIngredients(meal).map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>

      <h4>Instructions:</h4>
      <p>{meal.strInstructions}</p>

      {meal.strYoutube && (
        <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer">
          📺 YouTube Tutorial
        </a>
      )}

      <button onClick={() => bookmarkMeal(meal)} className="save-btn">💾 Save Recipe</button>
      <button onClick={handleClose} style={{ marginLeft: "1rem" }}>❌ Close</button>
    </div>
  );
}

export default RecipeDetails;
