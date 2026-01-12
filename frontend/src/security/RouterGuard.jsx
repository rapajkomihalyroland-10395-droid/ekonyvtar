import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getAuthHeader, setAccessToken, SetUser, SetIsAdmin } from "../store/authStore.js";
import api from "../axios_url/baseURL.js";

const RouterGuard = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkAccess = async () => {
      const token = getAuthHeader();

      try {
        const response = await api.get("/token-details", {
          headers: token ? getAuthHeader() : {},
          withCredentials: true,
        });

        if (response.data?.accessToken) {
          setAccessToken(response.data.accessToken);
          if (response.data?.user) {
            SetUser(response.data.user);
            if (response.data.user.admin) {
              SetIsAdmin(true);
            }
          }
          setAuthorized(true);
        } else {
          setAuthorized(false);
        }
      } catch (err) {
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    };

    checkAccess();
  }, []);

  if (loading) return null;
  if (!authorized) return <Navigate to="/login" replace />;

  return children;
};

export default RouterGuard;
