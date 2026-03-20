import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

let currentToken = null;

export const setAxiosToken = (token) => {
  currentToken = token;
};

api.interceptors.request.use(
  (config) => {
    if (currentToken && !config.url.includes("/token-details")) {
      config.headers.Authorization = `Bearer ${currentToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
