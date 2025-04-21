import React, { useEffect, useState } from "react";
import "./GroceryList.css";
import { useMealContext } from "../context/MealContext";

function GroceryList() {
  const { mealsByDay } = useMealContext();
  const [ingredientsByDay, setIngredientsByDay] = useState({});
  const [expandedDay, setExpandedDay] = useState(null); // Track which day is expanded
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        setLoading(true);
        const dayWiseIngredients = {};

        for (const [day, meals] of Object.entries(mealsByDay)) {
          if (meals.length === 0) continue; // Skip days with no meals

          const ingredientsSet = new Set();

          for (const meal of meals) {
            const res = await fetch(
              `https://api.spoonacular.com/recipes/${meal.id}/information?apiKey=${process.env.REACT_APP_API_KEY}`
            );
            const data = await res.json();

            data.extendedIngredients?.forEach((ingredient) => {
              ingredientsSet.add(ingredient.name);
            });
          }

          dayWiseIngredients[day] = Array.from(ingredientsSet);
        }

        setIngredientsByDay(dayWiseIngredients);
      } catch (err) {
        setError("Failed to fetch recipe details.");
      } finally {
        setLoading(false);
      }
    };

    fetchIngredients();
  }, [mealsByDay]);

  const toggleDay = (day) => {
    setExpandedDay((prev) => (prev === day ? null : day)); // Toggle the expanded day
  };

  return (
    <div className="grocery-container">
      <h2>Grocery List</h2>
      {loading ? (
        <p>Loading ingredients...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : Object.keys(ingredientsByDay).length === 0 ? (
        <p>No items in the list.</p>
      ) : (
        Object.entries(ingredientsByDay).map(([day, ingredients]) => (
          <div
            key={day}
            className={`grocery-day-card ${expandedDay === day ? "expanded" : ""}`}
            onClick={() => toggleDay(day)}
          >
            <h3>{day}</h3>
            <div className="ingredients-list">
              {expandedDay === day && (
                <ul className="grocery-list">
                  {ingredients.map((ingredient, index) => (
                    <li key={index}>
                      <div>
                        <input type="checkbox" id={`item-${day}-${index}`} />
                        <label htmlFor={`item-${day}-${index}`}>{ingredient}</label>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default GroceryList;