import API from "../utils/api";

export const getWatchlist = () => API.get("/watchlist");
export const addToWatchlist = (movie) => API.post("/watchlist", movie);
export const removeFromWatchlist = (id) => API.delete(`/watchlist/${id}`);
