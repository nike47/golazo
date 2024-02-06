import axios from "axios";
import Cookies from "js-cookie";
import API_ENDPOINT from './global'

const AUTH_API_URL =
API_ENDPOINT + "/api/Authentication/Login";
const VALIDATE_API_URL =
API_ENDPOINT + "/api/Authentication/ValidateToken";

export const login = async (username, password) => {
  try {
    const response = await axios.post(AUTH_API_URL, 
      {
        username: username,
        password: password
      },
      {
        headers: {
          "serverId": "6c0d57e1-1e3b-46be-aa7f-4b95d97c853f"
        }
      });
    const token = response.data.token;
    Cookies.set("token", token, { expires: 1 / 24 });
    return token;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const validateToken = async () => {
  try {
    const token = "Bearer " + Cookies.get("token");
    const response = await axios.post(VALIDATE_API_URL, {},
      { 
        headers: {
          "Authorization": token
        }
      });
    return response.data.isValid;
  } catch (error) {
    console.error("Token validation failed:", error);
    return false;
  }
};
