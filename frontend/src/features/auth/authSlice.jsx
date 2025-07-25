import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

const userFromStorage = localStorage.getItem("user");

const initialState = {
  user: userFromStorage ? JSON.parse(userFromStorage):null,
  token: localStorage.getItem("token") || null,
  expiresAt: localStorage.getItem("expiresAt") || null,
  status: "idle",
  error: null,
};

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/auth/signup`, userData);
      return {
        user: response.data.user,
        token: response.data.token,
        expiresAt: response.data.expiresAt,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Signup failed");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/auth/login`, credentials);
      return {
        user: response.data.user,
        token: response.data.token,
        expiresAt: response.data.expiresAt,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Login failed");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.post(`/auth/logout`);
      return true;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Logout failed");
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/auth/forgot-password`, {
        email,
      });
      return response.data.message;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to send reset link"
      );
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, newPassword }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/auth/reset-password/${token}`,
        { newPassword }
      );
      return response.data.message;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to reset password"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.expiresAt = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("expiresAt");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.expiresAt = action.payload.expiresAt;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("expiresAt", action.payload.expiresAt);
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.expiresAt = action.payload.expiresAt;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("expiresAt", action.payload.expiresAt);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.expiresAt = null;
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("expiresAt");
      })
      .addCase(forgotPassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
























