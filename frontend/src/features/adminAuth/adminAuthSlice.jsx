
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { adminLoginApi } from "./adminAuthApi";


export const adminLogin = createAsyncThunk(
  "adminAuth/login",
  async ({email,password}, { rejectWithValue }) => {
    try {
      const res = await adminLoginApi({ email, password });
      console.log(res);
       const { user, token, expiresAt } = res;
      localStorage.setItem("admin", JSON.stringify(user));
      localStorage.setItem("adminToken", token);
      localStorage.setItem("expiresAt", expiresAt);
      return { admin: user,
        token,
        expiresAt,};

      
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Admin login failed");
    }
  }
);



const initialState = {
  admin: JSON.parse(localStorage.getItem("admin")) || null,
  token: localStorage.getItem("adminToken") || null,
  expiresAt: localStorage.getItem("expiresAt") || null,
  status: "idle",
  error: null,
};

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    adminLogout:(state)=>{
      state.admin = null;
      state.token=null;
        state.expiresAt = null;
      localStorage.removeItem("admin");
      localStorage.removeItem("adminToken");
      localStorage.removeItem("expiresAt");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        // state.user = action.payload.user;
        state.admin = action.payload.admin;
        state.token = action.payload.token;
        state.expiresAt = action.payload.expiresAt;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const {adminLogout} = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
