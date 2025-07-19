// utils/api.js
import axios from "axios";

console.log("Interceptor loaded ✅");

const API = axios.create({
  baseURL: "http://localhost:5000",
});

// Set up the interceptor directly
API.interceptors.request.use(
  (config) => {
    // Get fresh token on every request
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("_tb_token");
      if (token && !config?.headers?.["authorization"]) {
        config.headers["authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
