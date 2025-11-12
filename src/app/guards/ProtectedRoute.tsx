import React from "react";
import { Navigate, Outlet } from "react-router";

export const isAuthenticated = () => {
  return !!localStorage.getItem("ADMIN_token");
};

const ProtectedRoute: React.FC = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
