import { createContext, useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import api, { setAxiosToken } from "../axios_url/baseURL.js";

const Auth = createContext();

const AuthContext = () => {
  const [user, setUser] = useState(null);
  const [access_token, setAccessToken] = useState(null);
  const [login, setLogin] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    setAxiosToken(access_token);
  }, [access_token]);

  const handleAuthData = ({ accessToken, user }) => {
    setAccessToken(accessToken ?? null);
    setUser(user ?? null);
    setLogin(Boolean(user));
  };

  const logout = async () => {
    try {
      await api.post("/logout");
    } catch (err) {
      console.error("Hiba a kijelentkezéskor", err);
    } finally {
      handleAuthData({ accessToken: null, user: null });
      window.location.href = "/login";
    }
  };

  const initAuth = async () => {
    setAuthLoading(true);
    try {
      const { data } = await api.get("/token-details", {
        withCredentials: true,
      });

      if (!data?.user || !data?.accessToken) {
        handleAuthData({ accessToken: null, user: null });
      } else {
        handleAuthData({
          accessToken: data.accessToken,
          user: data.user,
        });
      }
    } catch (err) {
      handleAuthData({ accessToken: null, user: null });
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    initAuth();
  }, []);

  return (
    <Auth.Provider
      value={{
        setUser,
        user,
        setAccessToken,
        access_token,
        setLogin,
        login,
        authLoading,
        logout,
      }}
    >
      <Outlet />
    </Auth.Provider>
  );
};

export default AuthContext;

export const useAuth = () => useContext(Auth);
