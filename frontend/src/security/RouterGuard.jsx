import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../store/AuthContext.jsx";

const RouterGuard = () => {
  const { user, authLoading } = useAuth();

  if (authLoading) return null;

  if (!user && window.location.pathname !== "/login") {
    window.location.href = "/login";
    return null; // Nem engedjük tovább a renderelést az átirányítás alatt
  }

  return <Outlet />;
};

export default RouterGuard;
