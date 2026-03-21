import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

let currentToken = null;

export const setAxiosToken = (token) => {
  currentToken = token;
};

api.interceptors.request.use((config) => {
  if (currentToken && !config.url.includes("/token-details")) {
    config.headers.Authorization = `Bearer ${currentToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.data?.requiresLogin) window.location.href = "/login";
    //A window.location.href a React "eldobja" az összes állapotának értékét!!!!
    //Ezért nem jó a useNavigate mivel az meghagyná az állapotok értékét!
    return Promise.reject(error); //Továbbítja a hibát ahol axios meghívás került sor
  },
);

export default api;
