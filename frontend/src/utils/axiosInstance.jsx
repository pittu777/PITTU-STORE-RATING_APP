import { logout } from "../features/auth/authSlice";
import axios from "axios";

export const BASE_URL = `http://localhost:5000/api`;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      import("../store").then(({ default: store }) => {
        store.dispatch(logout());
      });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
