{/*hooks for fetching recipes from the API, tracking loading and errors, handling filters and pagination */}

import { useState, useCallback } from "react";
import { searchRecipes } from "../api";

export function useRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [lastQuery, setLastQuery] = useState({ query: "", filters: {} });
  const [totalResults, setTotalResults] = useState(0);

  const handleSearch = useCallback(async (query, filters = {}, newPage = 1) => {
    setLoading(true);
    setError("");
    setPage(newPage);
    setLastQuery({ query, filters });

    try {
      const data = await searchRecipes(query, {
        diet: "vegetarian",
        number: 12, 
        offset: (newPage - 1) * 12,
        ...filters,
      });
      setRecipes(data.results);
      setTotalResults(data.totalResults);
    } catch (err) {
      console.error(err);
      setError("Failed to load recipes. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  return { recipes, loading, error, page, lastQuery, handleSearch };
}
