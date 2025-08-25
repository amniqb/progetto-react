{/* code for the card that show the various recipes */}

import { Link } from "react-router-dom";
import noPhoto from "../assets/recipenophoto.jpg";

export default function RecipeCard({ recipe }) {
  return (
    <div className="recipe-card">
      <Link to={`/recipe/${recipe.id}`}>
        <img
          src={recipe.image || noPhoto}
          alt={recipe.title || "Recipe image"}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null; 
            e.currentTarget.src = noPhoto;
          }}
        />
      </Link>
      <h3>
        <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
      </h3>
    </div>
  );
}
