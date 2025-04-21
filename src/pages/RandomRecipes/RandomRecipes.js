import React, { useEffect, useState } from "react";
import axios from "axios";
import { useMealContext } from "../../context/MealContext";
import RecipeCard from "../../components/Recipe/RecipeCard";
import Pagination from "../../components/Pagination";
import "./RandomRecipes.css";

const API_KEY = process.env.REACT_APP_API_KEY;

function RandomRecipes() {
  const { recipes, setRecipes, addMealToPlanner } = useMealContext();

  const [currentPage, setCurrentPage] = useState(() => {
    return parseInt(localStorage.getItem("currentPage")) || 1;
  });
  const [totalResults, setTotalResults] = useState(0);
  const [searchQuery, setSearchQuery] = useState(() => {
    return localStorage.getItem("searchQuery") || "";
  });
  const [loading, setLoading] = useState(true);
  const pageSize = 10;

  const fetchRecipes = async (search = "", page = currentPage, randomSeed = "") => {
    try {
      setLoading(true);
      const offset = (page - 1) * pageSize;
      const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=${pageSize}&offset=${offset}&addRecipeInformation=true${
        search ? `&query=${search}` : ""
      }${randomSeed ? `&randomSeed=${randomSeed}` : ""}`;

      const response = await axios.get(url);
      setRecipes(response.data.results);
      setTotalResults(response.data.totalResults);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchRecipes(searchQuery, 1);
  };

  const handleRandomize = () => {
    setSearchQuery("");
    setCurrentPage(1);
    fetchRecipes("", 1, Date.now());
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddToPlanner = (recipe) => {
    const mealData = {
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
    };
    addMealToPlanner(mealData);
  };

  useEffect(() => {
    localStorage.setItem("searchQuery", searchQuery);
    localStorage.setItem("currentPage", currentPage);
  }, [searchQuery, currentPage]);

  return (
    <div className="meal-finder">
      <h2>Random Recipes</h2>
      <div className="filters">
        <input
          className="search-box"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          placeholder="Search recipes..."
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleRandomize}>Randomize</button>
      </div>

      <div className="meal-grid">
        {loading ? (
          <p>Loading recipes...</p>
        ) : recipes?.length > 0 ? (
          recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onSave={() => handleAddToPlanner(recipe)}
            />
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalItems={totalResults}
        itemsPerPage={pageSize}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default RandomRecipes;
