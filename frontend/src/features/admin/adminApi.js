import axiosInstance from "../../utils/axiosInstance";


export const fetchAllUsersApi = async () => {
  const res = await axiosInstance.get("/admin/users");
  return res.data;
};

export const fetchAllStoresApi = async () => {
  const res = await axiosInstance.get("/admin/stores");
  return res.data;
};


export const addStoreApi = async (storeData) => {
  const res = await axiosInstance.post("/admin/stores", storeData);
  return res.data;
};


export const fetchOwnersApi = async () => {
  const res = await axiosInstance.get("/admin/owners");
  return res.data;
};


export const updateUserRoleApi = async ({ id, role }) => {
  const res = await axiosInstance.patch(`/admin/users/${id}/role`, { role });
  return res.data;
};

export const deleteUserApi = async (id) => {
  const res = await axiosInstance.delete(`/admin/users/${id}`);
  return res.data;
};

export const deleteStoreApi = async (id) => {
  const res = await axiosInstance.delete(`/admin/stores/${id}`);
  return res.data;
};