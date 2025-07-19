// utils/api.js
import axios from "axios";

console.log("Interceptor loaded ✅");

const API = axios.create({
  baseURL: "http://localhost:5000",
  // withCredentials: true,
});

export default API;
