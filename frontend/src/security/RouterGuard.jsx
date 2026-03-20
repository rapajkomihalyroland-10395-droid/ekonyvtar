import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext.jsx";

const RouterGuard = ({ children }) => {
  const { user, authLoading } = useAuth();

  if (authLoading) return null;
  if (!user) return <Navigate to="/login" replace />;

  console.log(user)

  return children;
};

export default RouterGuard;
