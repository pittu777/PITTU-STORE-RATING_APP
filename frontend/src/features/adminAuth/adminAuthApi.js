import axiosInstance from "../../utils/axiosInstance";



export const adminLoginApi = async ({ email, password }) => {
  const res = await axiosInstance.post("/auth/admin-login", { email, password });
  return res.data;
};
