import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { validateToken } from "./auth";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const isValid = await validateToken();
      setIsAuthenticated(isValid);
      if (!isValid) navigate("/login");
    };

    checkAuth();
  }, [navigate]);

  return isAuthenticated;
};
