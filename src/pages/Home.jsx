import { useState } from "react";
import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";
import { useRecipes } from "../hooks/useRecipes";

export default function Home() {
  const { recipes, loading, error, page, lastQuery, handleSearch } = useRecipes();
  const [hasSearched, setHasSearched] = useState(false);

  const onSearch = (query, filters = {}, newPage = 1) => {
    setHasSearched(true);
    handleSearch(query, filters, newPage);
  };

  return (
    <div>
      {/*Search wrapper*/}
      <div className={`search-wrapper ${recipes.length > 0 ? "scrolled" : ""}`}>
        <h1 className="site-title">The Veggie Table</h1>
        <SearchBar onSearch={onSearch} />

        {/*Description before results show*/}
        {!hasSearched && (
          <p className="search-description">
            Try looking up recipes by searching cuisines (e.g. Italian, Japanese, Indian) or ingredients (e.g. rice, cheese, legumes)!
          </p>
        )}
      </div>

      {/* Loading, Error & No Results Messages */}
      {(loading || error || (hasSearched && !loading && recipes.length === 0)) && (
        <div className="message-card">
          {loading && <p>Loading recipes...</p>}
          {error && <p className="error">{error}</p>}
          {!loading && !error && recipes.length === 0 && (
            <p>No recipes found. Try another search!</p>
          )}
        </div>
      )}

      {/* Recipe grid */}
      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

      {/* Pagination Controls */}
      {recipes.length > 0 && (
        <div className="pagination">
          {page > 1 && (
            <button onClick={() => handleSearch(lastQuery.query, lastQuery.filters, page - 1)}>
              Previous
            </button>
          )}
          {recipes.length === 8 && (
            <button onClick={() => handleSearch(lastQuery.query, lastQuery.filters, page + 1)}>
              Next
            </button>
          )}
        </div>
      )}
    </div>
  );
}
