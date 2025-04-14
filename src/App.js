import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RandomRecipes from "./pages/RandomRecipes";
import WeeklyPlanner from "./pages/WeeklyPlanner";
import Navbar from "./components/Navbar"; // import new navbar

function App() {
  return (
    <Router>
      <div className="p-4">
        <Navbar />
        <Routes>
          <Route path="/" element={<RandomRecipes />} />
          <Route path="/planner" element={<WeeklyPlanner />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
