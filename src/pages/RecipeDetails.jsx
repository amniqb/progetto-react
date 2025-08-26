import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRecipeDetails } from "../api";
import noPhoto from "../assets/recipenophoto.jpg";

export default function RecipePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchRecipe() {
      try {
        setLoading(true);
        const data = await getRecipeDetails(id);
        setRecipe(data);
      } catch (err) {
        setError("Failed to load recipe details.");
      } finally {
        setLoading(false);
      }
    }
    fetchRecipe();
  }, [id]);

  if (loading) return <p>Loading recipe...</p>;
  if (error) return <p>{error}</p>;
  if (!recipe) return <p>No recipe found.</p>;

  return (
    <div className="recipe-page">
      <h1 className="recipe-title">{recipe.title}</h1>

      <div className="recipe-header">
        {/* Image and ingredients */}
        <div className="recipe-image">
          <img
          src={recipe.image || noPhoto}
          alt={recipe.title || "Recipe image"}
          onError={(e) => {
            e.currentTarget.onerror = null; 
            e.currentTarget.src = noPhoto;
            }}
          />
        </div>

        <div className="recipe-ingredients">
          <h2>Ingredients</h2>
          {recipe.extendedIngredients && recipe.extendedIngredients.length > 0 ? (
            <ul>
              {recipe.extendedIngredients.map((ing, index) => (
                <li key={ing.id || index}>{ing.original}</li>
              ))}
            </ul>
          ) : (
            <div className="message-card">
              <p>No ingredients listed for this recipe.</p>
            </div>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="recipe-instructions">
        <h2>Instructions</h2>
        {recipe.instructions ? (
          <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
        ) : (
          <div className="message-card">
            <p>No instructions available for this recipe.</p>
          </div>
        )}
      </div>

      {/* Back button */}
      <button className="back-button" onClick={() => navigate(-1)}>
        Back to Results
      </button>
    </div>
  );
}
