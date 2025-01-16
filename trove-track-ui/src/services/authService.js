import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });

    const { accessToken, tokenType } = response.data;

    if (accessToken && tokenType) {
      const fullToken = `${tokenType}${accessToken}`;
      return { token: fullToken };
    } else {
      throw new Error("Token or tokenType is missing");
    }
  } catch (error) {
    console.error("Login error: ", error);
    throw new Error("Login failed");
  }
};