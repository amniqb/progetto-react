import axios from "axios";

const API_KEY = "1d1b6dd166c44bf2af74ccc547a3cb17";
const BASE_URL = "https://api.spoonacular.com/recipes";

// search recipes
export async function searchRecipes(query, filters = {}) {
  try {
    const params = {
      apiKey: API_KEY,
      query,
      diet: filters.diet || "vegetarian",
      number: filters.number || 12,
    };

    if (filters.offset) params.offset = filters.offset;
    if (filters.type) params.type = filters.type;
    if (filters.maxReadyTime) params.maxReadyTime = filters.maxReadyTime;
    if (filters.minCalories) params.minCalories = filters.minCalories;
    if (filters.maxCalories) params.maxCalories = filters.maxCalories;

    const { data } = await axios.get(`${BASE_URL}/complexSearch`, { params });

    // ensure totalResults exists so pagination works
    return {
      results: data.results || [],
      totalResults: data.totalResults || 0,
    };
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to fetch recipes");
  }
}

// recipe details
export async function getRecipeDetails(id) {
  try {
    const { data } = await axios.get(`${BASE_URL}/${id}/information`, {
      params: { apiKey: API_KEY },
    });
    return data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to fetch recipe details");
  }
}
