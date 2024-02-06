import React from "react";
import { Navigate } from "react-router-dom";
import { checkAuth } from "./useAuth";

const ProtectedRoute = ({ component: Component }) => {
  const isAuthenticated = checkAuth();

  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
