import React, { createContext, useContext, useState, useEffect } from "react";

const MealContext = createContext();

export const MealProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]); // Add recipes and setRecipes
  const [weeklyMeals, setWeeklyMeals] = useState(() => {
    const savedMeals = localStorage.getItem("weeklyMeals");
    return savedMeals ? JSON.parse(savedMeals) : [];
  });

  const [groceryItems, setGroceryItems] = useState(() => {
    const savedItems = localStorage.getItem("groceryItems");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  const [mealsByDay, setMealsByDay] = useState(() => {
    const savedMealsByDay = localStorage.getItem("mealsByDay");
    return savedMealsByDay
      ? JSON.parse(savedMealsByDay)
      : {
          Monday: [],
          Tuesday: [],
          Wednesday: [],
          Thursday: [],
          Friday: [],
          Saturday: [],
          Sunday: [],
        };
  });

  useEffect(() => {
    localStorage.setItem("weeklyMeals", JSON.stringify(weeklyMeals));
  }, [weeklyMeals]);

  useEffect(() => {
    localStorage.setItem("groceryItems", JSON.stringify(groceryItems));
  }, [groceryItems]);

  useEffect(() => {
    localStorage.setItem("mealsByDay", JSON.stringify(mealsByDay));
  }, [mealsByDay]);

  const addMealToPlanner = (meal) => {
    setWeeklyMeals((prev) => [...prev, meal]);
  };

  const removeMealFromPlanner = (index) => {
    const mealToRemove = weeklyMeals[index];
    setWeeklyMeals((prev) => {
      const updatedMeals = prev.filter((_, i) => i !== index);
      localStorage.setItem("weeklyMeals", JSON.stringify(updatedMeals)); // Update local storage
      return updatedMeals;
    });

    if (mealToRemove?.ingredients) {
      setGroceryItems((prevItems) =>
        prevItems.filter((item) => !mealToRemove.ingredients.includes(item))
      );
    }
  };

  const assignMealToDay = (meal, day) => {
    setMealsByDay((prev) => ({
      ...prev,
      [day]: [...prev[day], meal],
    }));
    setWeeklyMeals((prev) => prev.filter((m) => m.id !== meal.id));
  };

  const removeMealFromDay = (meal, day) => {
    setMealsByDay((prev) => ({
      ...prev,
      [day]: prev[day].filter((m) => m.id !== meal.id),
    }));
  };

  return (
    <MealContext.Provider
      value={{
        recipes,
        setRecipes, // Provide setRecipes
        weeklyMeals,
        setWeeklyMeals,
        groceryItems,
        setGroceryItems,
        mealsByDay,
        setMealsByDay,
        addMealToPlanner,
        removeMealFromPlanner,
        assignMealToDay,
        removeMealFromDay,
      }}
    >
      {children}
    </MealContext.Provider>
  );
};

export const useMealContext = () => useContext(MealContext);