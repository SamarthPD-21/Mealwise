import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./RecipeDetails.css";

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_API_KEY}`
        );
        const data = await res.json();
        setRecipe(data);
      } catch (err) {
        setError("Failed to load recipe details.");
      }
    };

    fetchDetails();
  }, [id]);

  if (error) return <p className="error">{error}</p>;
  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="large">
      <img src={recipe.image} alt={recipe.title} style={{ width: "100%", borderRadius: "1rem" }} />
      <h3>{recipe.title}</h3>
      <p>
        <strong>Ready in:</strong> {recipe.readyInMinutes} minutes |{" "}
        <strong>Servings:</strong> {recipe.servings}
      </p>
      <section>
        <h4>Summary</h4>
        <p dangerouslySetInnerHTML={{ __html: recipe.summary }}></p>
      </section>
      <section>
        <h4>Ingredients</h4>
        <ul>
          {recipe.extendedIngredients?.map((ing) => (
            <li key={ing.id}>{ing.original}</li>
          ))}
        </ul>
      </section>
      <a href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer">
        View Full Recipe
      </a>
      <br />
      <button onClick={() => navigate(-1)} style={{ marginTop: "1rem" }}>
        Close
      </button>
    </div>
  );
};

export default RecipeDetails;