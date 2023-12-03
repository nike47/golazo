import axios from "axios";
import Cookies from "js-cookie";

const AUTH_API_URL =
  "https://golazo-prod-api-eus.azurewebsites.net/api/Authenticate";
const VALIDATE_API_URL =
  "https://golazo-prod-api-eus.azurewebsites.net/api/Master/ValidateToken";

export const login = async (username, password) => {
  try {
    const response = await axios.post(AUTH_API_URL, { username, password });
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
    const token = Cookies.get("token");
    const response = await axios.post(VALIDATE_API_URL, { token });
    return response.data.isValid;
  } catch (error) {
    console.error("Token validation failed:", error);
    return false;
  }
};
