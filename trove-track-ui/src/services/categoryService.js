import axios from "axios";

const API_URL = "http://localhost:8080/api/categories";

// Create a new category
export const createCategory = async (categoryName) => {
  const token = sessionStorage.getItem("authToken");
  try {
    const response = await axios.post(
      API_URL, 
      { name: categoryName },
      { headers: {
          Authorization: token,
      }}
    );
    return response.data;
  } catch (error) {
    console.error("Error creating category: ", error);
    throw error;
  }
};

// Fetch all categories
export const getAllCategories = async () => {
  const token = sessionStorage.getItem("authToken");
  try {
    const response = await axios.get(
      API_URL,
      { headers: {
        Authorization: token,
      }}
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching categories: ", error);
    throw error;
  }
};