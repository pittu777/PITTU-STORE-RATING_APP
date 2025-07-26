import { adminLogout } from "../features/adminAuth/adminAuthSlice";
import { logout } from "../features/auth/authSlice";
import axios from "axios";

// export const BASE_URL = `http://localhost:5000/api`;
export const BASE_URL = `https://pittu-store-rating-app.onrender.com/api`;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const adminToken = localStorage.getItem("adminToken");
    if (adminToken) {
      config.headers.Authorization = `Bearer ${adminToken}`;
    }else if(token){
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
        store.dispatch(adminLogout());
      });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
