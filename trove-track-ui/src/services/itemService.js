import axios from "axios";

const API_URL = "http://localhost:8080/api/items";

export const createItem = async (item) => {
  const token = sessionStorage.getItem("authToken");
  try {
    const response = await axios.post(API_URL, item,
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
    const response = await axios.patch(`${API_URL}/${itemId}`, item,
      { headers: {
        Authorization: token,
      }});
    return response.data;
  } catch (error) {
    console.error("Error updating item: ", error);
    throw error;
  }
};

export const getItem = async (itemId) => {
  const token = sessionStorage.getItem("authToken");
  try {
    const response = await axios.get(`${API_URL}/${itemId}`, 
      { headers: {
        Authorization: token,
      }});
    return response.data;
  } catch (error) {
    console.error("Error fetching item: ", error);
    throw error;
  }
};

export const getAllItems = async () => {
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
    console.error("Error fetching items: ", error);
    throw error;
  }
};

export const deleteItem = async (itemId) => {
  const token = sessionStorage.getItem("authToken");
  try {
    const response = await axios.delete(`${API_URL}/${itemId}`, 
      { headers: {
        Authorization: token,
      }});
    return response.data;
  } catch (error) {
    console.error("Error deleting item: ", error);
    throw error;
  }
};