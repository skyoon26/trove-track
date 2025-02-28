import axios from "axios";

const API_URL = "http://localhost:8080/api/logs";

export const createLog = async (log) => {
  const token = sessionStorage.getItem("authToken");
  try {
    const response = await axios.post(
      API_URL, 
      log,
      { headers: {
        Authorization: token,
      }});
    return response.data;
  } catch (error) {
    console.error("Error creating inventory log: ", error);
    throw error;
  }
};