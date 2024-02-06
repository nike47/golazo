import axios from "axios";
import Cookies from "js-cookie";
import config from './config'

const AUTH_API_URL =
config.apiEndpoint + "/api/Authentication/Login";
const VALIDATE_API_URL =
config.apiEndpoint + "/api/Authentication/ValidateToken";

export const login = async (username, password) => {
  try {
    const response = await axios.post(AUTH_API_URL, 
      {
        username: username,
        password: password
      },
      {
        headers: {
          "serverId": config.serverId
        }
      });
    const token = response.data.token;
    const userId = response.data.id;
    const firstName = response.data.firstName;
    const lastName = response.data.lastName;
    sessionStorage.setItem("token", "Bearer " + token, { expires: 1 / 24 });
    Cookies.set("userId", userId, { expires: 1 / 24 });
    Cookies.set("firstName", firstName, { expires: 1 / 24 });
    Cookies.set("lastName", lastName, { expires: 1 / 24 });
    return token;
  } catch (error) {
    console.error("Login failed:", error);
    sessionStorage.clear();
    throw error;
  }
};

export const validateToken = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axios.post(VALIDATE_API_URL, {},
      { 
        headers: {
          "Authorization": token
        }
      });
    return response.data.isValid;
  } catch (error) {
    console.error("Token validation failed:", error);
    sessionStorage.clear();
    return false;
  }
};
