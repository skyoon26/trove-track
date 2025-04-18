import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = "http://localhost:8080/api/auth";

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });

    const { accessToken, tokenType } = response.data;

    if (accessToken && tokenType) {
      const fullToken = `${tokenType} ${accessToken}`;

      const decodedToken = jwtDecode(accessToken);

      const decodedFirstName = decodedToken.firstName;
      const userId = decodedToken.id;

      sessionStorage.setItem("authToken", fullToken);
      sessionStorage.setItem("firstName", decodedFirstName);
      sessionStorage.setItem("userId", userId);

      return { token: fullToken, decodedFirstName, userId };
    } else {
      throw new Error("Token or tokenType is missing");
    }
  } catch (error) {
    console.error("Login error: ", error);
    throw new Error("Login failed");
  }
};

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const getAccount = async () => {
  const token = sessionStorage.getItem("authToken");
  try {
    const response = await axios.get(
      `${API_URL}/account`,
      { headers: {
        Authorization: token,
      }}
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching account: ", error);
    throw error;
  }
};

export const updateAccount = async (account) => {
  const token = sessionStorage.getItem("authToken");
  try {
    const response = await axios.patch(
      `${API_URL}/account/update`, 
      account,
      { headers: {
        Authorization: token,
      }});
    return response.data;
  } catch (error) {
    console.error("Error updating account: ", error);
    throw error;
  }
};