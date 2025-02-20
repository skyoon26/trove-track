import axios from "axios";

const API_URL = "http://localhost:8080/api/items";

export const createItem = async (item) => {
  const token = sessionStorage.getItem("authToken");
  try {
    const response = await axios.post(
      API_URL, 
      item,
      { headers: {
        Authorization: token,
      }});
    return response.data;
  } catch (error) {
    console.error("Error creating item: ", error);
    throw error;
  }
};

export const updateItem = async (itemId, item) => {
  const token = sessionStorage.getItem("authToken");
  try {
    const response = await axios.patch(
      `${API_URL}/${itemId}`, 
      item,
      { headers: {
        Authorization: token,
      }});
    return response.data;
  } catch (error) {
    console.error("Error updating item: ", error);
    throw error;
  }
};