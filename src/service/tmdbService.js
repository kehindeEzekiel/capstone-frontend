// TMDB search function
import axios from "axios";
import API from "../utils/api";

const tmdbAPI = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export const searchMovies = (data) => API.post("/movies/search", data);
export const allMovies = () => API.get("/movies/trending");
export const topRatedMovies = () => API.get("/movies/top_rated");
export const movieDetails = (id) => API.get(`/movies/movie_details/${id}`);
