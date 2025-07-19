// favoritesService.js

import API from "../utils/api";

// ========== Server-side Favorites API ==========
export const getFavoritesFromServer = () => API.get("/favorites");
export const addToFavoritesOnServer = (movie) => API.post("/favorites", movie);
export const removeFromFavoritesOnServer = (tmdbId) =>
  API.delete(`/favorites/${tmdbId}`);

// ========== Local Storage Favorites ==========
const FAVORITES_KEY = "favorites";

export const getFavorites = () => API.get("/favorite");

export const addToFavorites = (movie) => API.post("/favorite", movie);

export const removeFromFavorites = (id) => API.delete(`/favorite/${id}`);

export const clearFavorites = () => {
  try {
    localStorage.removeItem(FAVORITES_KEY);
  } catch (error) {
    console.error("Error clearing favorites:", error);
  }
};
