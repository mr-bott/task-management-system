import axios from "axios";
/**
 * Axios instance for API communication
 * - Base URL points to backend API (versioned)
 * - Used across the frontend application
 */
const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

/**
 * NOTE:
 * For production applications, it is recommended to store JWT
 * in HttpOnly cookies to prevent XSS attacks.
 * localStorage is used here to keep the implementation simple
 * and focused on backend logic for this internship assignment.
 */

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); //localStorage is used here to keep the implementation simple
//  For production applications , i will user http only cookies 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
