
import axiosInstance from "../../utils/axiosInstance";

export const fetchStoresApi = async()=>{
    const res = await axiosInstance.get("/stores");
    return res.data;
};


export const submitRatingApi = async ({ storeId, rating }) => {
  const res = await axiosInstance.post("/ratings", { storeId, rating });
  return res.data;
};