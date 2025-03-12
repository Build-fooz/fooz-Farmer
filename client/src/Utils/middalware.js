// Utils/api.js
import axios from "axios";

// Create an axios instance with a base URL for your API.
const api = axios.create({
  baseURL: "http://localhost:3000/api", // Replace with your actual API base URL.
  timeout: 10000, // Optional: sets a timeout limit for requests.
});

// Request middleware: logs and allows modifications before sending the request.
api.interceptors.request.use(
  (config) => {
    console.log("Sending request to:", config.url);
    // You can add headers or other modifications here if needed.
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
    console.error(
      "Error response from:",
      error.config ? error.config.url : "Unknown URL"
    );
    return Promise.reject(error);
  }
);

export default api;
