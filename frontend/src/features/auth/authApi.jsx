import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const BASE_URL = `http://localhost:5000/api`; 


export const signupUser = createAsyncThunk("auth/signupUser", async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/signup`, userData);
        return { user: response.data.user, token: response.data.token }; 
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || "Signup failed");
    }
});

export const loginUser = createAsyncThunk("auth/loginUser", async (credentials, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/login`, credentials);
        return { user: response.data.user, token: response.data.token }; 
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || "Login failed");
    }
});

export const logoutUser = createAsyncThunk("auth/logoutUser", async (_, { rejectWithValue }) => {
    try {
        await axios.post(`${BASE_URL}/auth/logout`);
        return true;
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || "Logout failed");
    }
});
