import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [mealType, setMealType] = useState("all");
  const [maxTime, setMaxTime] = useState("any");
  const [calories, setCalories] = useState("any");

  function handleSubmit(e) {
    e.preventDefault();

    const filters = {};
    if (mealType !== "all") filters.type = mealType;
    if (maxTime !== "any") filters.maxReadyTime = Number(maxTime);
    if (calories !== "any") filters.maxCalories = Number(calories);

    onSearch(query, filters);
  }

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      {/* Main search input */}
      <input
        type="text"
        placeholder="Search recipes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Filters */}
      <div className="filters-row">
        <select value={mealType} onChange={(e) => setMealType(e.target.value)}>
          <option value="all">All Meal Types</option>
          <option value="main course">Main Course</option>
          <option value="side dish">Side Dish</option>
          <option value="dessert">Dessert</option>
        </select>

        <select value={maxTime} onChange={(e) => setMaxTime(e.target.value)}>
          <option value="any">Any Time</option>
          <option value="15">Less than 15 minutes</option>
          <option value="30">Less than 30 minutes</option>
          <option value="60">Less than an hour</option>
        </select>

        <select value={calories} onChange={(e) => setCalories(e.target.value)}>
          <option value="any">Any Calories</option>
          <option value="200">Less than 200</option>
          <option value="400">Less than 400</option>
          <option value="600">Less than 600</option>
        </select>
      </div>

      {/* Search button */}
      <button type="submit">Search</button>
    </form>
  );
}

