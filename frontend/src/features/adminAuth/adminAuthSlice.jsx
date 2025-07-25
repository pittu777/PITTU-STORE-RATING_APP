
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { adminLoginApi } from "./adminAuthApi";


export const adminLogin = createAsyncThunk(
  "adminAuth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await adminLoginApi(credentials);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      localStorage.setItem("expiresAt", data.expiresAt);

      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Admin login failed");
    }
  }
);



const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  expiresAt: localStorage.getItem("expiresAt") || null,
  status: "idle",
  error: null,
};

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.expiresAt = action.payload.expiresAt;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});


export default adminAuthSlice.reducer;
