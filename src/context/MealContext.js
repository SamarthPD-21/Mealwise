import React, { createContext, useContext, useState } from "react";

const MealContext = createContext();

export const MealProvider = ({ children }) => {
  const [highlightedMeal, setHighlightedMeal] = useState(null);
  const [foundMeals, setFoundMeals] = useState([]);
  const [expandedMeal, setExpandedMeal] = useState(null);

  const bookmarkMeal = (dish) => {
    const stored = JSON.parse(localStorage.getItem("favMeals")) || [];
    if (!stored.some((x) => x.idMeal === dish.idMeal)) {
      stored.push(dish);
      localStorage.setItem("favMeals", JSON.stringify(stored));
      alert("Saved!");
    } else {
      alert("Already there.");
    }
  };

  return (
    <MealContext.Provider
      value={{
        highlightedMeal,
        setHighlightedMeal,
        foundMeals,
        setFoundMeals,
        expandedMeal,
        setExpandedMeal,
        bookmarkMeal,
      }}
    >
      {children}
    </MealContext.Provider>
  );
};

export const useMealContext = () => useContext(MealContext);
