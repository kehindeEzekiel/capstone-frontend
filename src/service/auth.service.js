import API from "../utils/api";

export const login = (data) => API.post("/auth/login", data);
export const registerRoute = (data) => API.post("/auth/register", data);
export const logout = () => API.post("/auth/logout");
