import React from "react";
import "./WeeklyPlanner.css";
import { useMealContext } from "../context/MealContext";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function WeeklyPlanner() {
  const { mealsByDay, weeklyMeals, assignMealToDay, removeMealFromDay } = useMealContext();

  return (
    <div className="planner-container">
      <h2>Weekly Planner</h2>
      <div className="planner-grid">
        {daysOfWeek.map((day) => (
          <div key={day} className="day-column">
            <h3>{day}</h3>
            <ul>
              {mealsByDay[day].map((meal, index) => (
                <li key={index}>
                  <img src={meal.image} alt={meal.title} />
                  <p>{meal.title}</p>
                  <button onClick={() => removeMealFromDay(meal, day)}>Remove</button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="unassigned-meals">
        <h3>Unassigned Meals</h3>
        <div className="meal-grid">
          {weeklyMeals.map((meal, index) => (
            <div key={index} className="meal-card">
              <img src={meal.image} alt={meal.title} />
              <h4>{meal.title}</h4>
              <select
                onChange={(e) => assignMealToDay(meal, e.target.value)}
                defaultValue=""
              >
                <option value="" disabled>
                  Assign to day
                </option>
                {daysOfWeek.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WeeklyPlanner;