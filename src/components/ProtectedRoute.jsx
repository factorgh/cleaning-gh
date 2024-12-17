/* eslint-disable react/prop-types */

import { Navigate, useLocation } from "react-router-dom";
// import { authApi } from "../lib/api/auth";

export function ProtectedRoute({ children }) {
  const location = useLocation();
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  try {
    // authApi.verifyToken(token);
    return <>{children}</>;
  } catch (error) {
    console.error(error);
    localStorage.removeItem("token");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
}
