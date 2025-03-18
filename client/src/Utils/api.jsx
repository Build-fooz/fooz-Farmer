// utils/api.js
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api";

// Function to create a new product via API call
export const createProductAPI = async (productData) => {
  try {
    const response = await axios.post(`${BASE_URL}/products`, productData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
