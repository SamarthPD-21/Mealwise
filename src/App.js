import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RandomRecipes from "./pages/RandomRecipes/RandomRecipes";
import WeeklyPlanner from "./pages/WeeklyPlanner";
import GroceryList from "./pages/GroceryList";
import Navbar from "./components/Navbar/Navbar";
import RecipeDetails from "./pages/RandomRecipes/RecipeDetails"; // Correct path for RecipeDetails
import { MealProvider } from "./context/MealContext";

function App() {
  return (
    <MealProvider>
      <Router>
        <div className="p-4">
          <Navbar />
          <Routes>
            <Route path="/" element={<RandomRecipes />} />
            <Route path="/planner" element={<WeeklyPlanner />} />
            <Route path="/grocery" element={<GroceryList />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} /> 
          </Routes>
        </div>
      </Router>
    </MealProvider>
  );
}

export default App;