// Utils/api.js
import axios from "axios";

// Create an axios instance with a base URL for your API.
const api = axios.create({
  baseURL: "http://localhost:3000/api", // Replace with your actual API base URL.
  timeout: 10000, // Optional: sets a timeout limit for requests.
});

// Request middleware: adds authentication token and logs before sending the request.
api.interceptors.request.use(
  (config) => {
    console.log("Sending request to:", config.url);
    
    // Get the authentication token from localStorage
    const accessToken = localStorage.getItem('accessToken');
    
    // If token exists, add it to the Authorization header
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      console.log("Added authentication token to request");
    } else {
      console.warn("No authentication token found in localStorage");
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response middleware: logs responses or errors.
api.interceptors.response.use(
  (response) => {
    console.log("Received response from:", response.config.url);
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Authentication error - user not authorized");
      // Optional: Redirect to login page or show auth error
      // window.location.href = '/auth'; // Uncomment to redirect to login
    }
    
    console.error(
      "Error response from:",
      error.config ? error.config.url : "Unknown URL",
      error.response ? `Status: ${error.response.status}` : ""
    );
    
    return Promise.reject(error);
  }
);

export default api;
