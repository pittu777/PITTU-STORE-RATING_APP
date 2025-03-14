
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";



export const getUserDetails = createAsyncThunk(
    "auth/getUserDetails", 
    async (_, {rejectWithValue})=>{
    try {
        const token = localStorage.getItem("token");
        if(!token){
            return rejectWithValue("token not found")
        }
        const response = await axiosInstance.get(`/user/profile`, {
            headers: { Authorization: `Bearer ${token}` }, 
        });

        return response.data;
    }catch(error){
        return rejectWithValue(error.response?.data?.error||"failed to get user details")
    }
});