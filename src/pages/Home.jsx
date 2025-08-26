import { useState } from "react";
import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";
import { useRecipes } from "../hooks/useRecipes";

export default function Home() {
  const { recipes, loading, error, page, lastQuery, totalResults, handleSearch } = useRecipes();
  const [hasSearched, setHasSearched] = useState(false);

  const onSearch = (query, filters = {}, newPage = 1) => {
    setHasSearched(true);
    handleSearch(query, filters, newPage);
  };

  return (
    <div>
      {/* search wrapper */}
      <div className={`search-wrapper ${recipes.length > 0 ? "scrolled" : ""}`}>
        <h1 className="site-title">The Veggie Table</h1>
        <SearchBar onSearch={onSearch} />

        {/* description before results show */}
        {!hasSearched && (
          <p className="search-description">
            Try looking up recipes by searching cuisines (e.g. Italian, Japanese, Indian) or ingredients (e.g. rice, cheese, legumes)!
          </p>
        )}
      </div>

      {/* loading, error and nno results messages */}
      {(loading || error || (hasSearched && !loading && recipes.length === 0)) && (
        <div className="message-card">
          {loading && <p>Loading recipes...</p>}
          {error && <p className="error">{error}</p>}
          {!loading && !error && recipes.length === 0 && (
            <p>No recipes found. Try another search!</p>
          )}
        </div>
      )}

      {/* recipe grid */}
      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

      {/* pagination controls */}
      {recipes.length > 0 && (
        <div className="pagination">
          {page > 1 && (
            <button onClick={() => handleSearch(lastQuery.query, lastQuery.filters, page - 1)}>
              Previous
            </button>
          )}

          {/* only show next if there are more recipes */}
          {page * 12 < totalResults && (
            <button onClick={() => handleSearch(lastQuery.query, lastQuery.filters, page + 1)}>
              Next
            </button>
          )}
        </div>
      )}
    </div>
  );
}
