import React from "react";
import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  const userId = localStorage.getItem("userId");

  if (userId) {
    return <Navigate to="/jobs" replace />;
  }

  return children;
}