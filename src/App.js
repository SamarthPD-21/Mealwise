import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RandomRecipes from "./pages/RandomRecipes";
import WeeklyPlanner from "./pages/WeeklyPlanner";

function App() {
  return (
    <Router>
      <div className="p-4">
        <nav className="flex gap-4 mb-4 text-blue-500 font-semibold">
          <a href="/">Random Recipes</a>
          <a href="/planner">Weekly Planner</a>
        </nav>

        <Routes>
          <Route path="/" element={<RandomRecipes />} />
          <Route path="/planner" element={<WeeklyPlanner />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
