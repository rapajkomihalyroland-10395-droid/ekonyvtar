import { createContext, useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import api, { setAxiosToken } from "../axios_url/baseURL.js";

const Auth = createContext();

const AuthContext = () => {
  const [user, setUser] = useState(null);
  const [access_token, setAccessToken] = useState(null);
  const [login, setLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    setAxiosToken(access_token);
  }, [access_token]);

  const initAuth = async () => {
    setAuthLoading(true);
    try {
      const response = await api.get("/token-details", {
        withCredentials: true,
      });

      const nextAccessToken = response?.data?.accessToken ?? null;
      const nextUser = response?.data?.user ?? null;

      setAccessToken(nextAccessToken);
      setUser(nextUser);
      setIsAdmin(Boolean(nextUser?.admin));
      setLogin(Boolean(nextUser));
    } catch (err) {
      setAccessToken(null);
      setUser(null);
      setIsAdmin(false);
      setLogin(false);
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    initAuth();
  }, []);

  useEffect(() => {
    setLogin(Boolean(user));
  }, [user]);

  return (
    <Auth.Provider
      value={{
        setUser,
        user,
        setAccessToken,
        access_token,
        setLogin,
        login,
        setIsAdmin,
        isAdmin,
        authLoading,
      }}
    >
      <Outlet />
    </Auth.Provider>
  );
};

export default AuthContext;

export const useAuth = () => useContext(Auth);
