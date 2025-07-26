
// src/features/owner/ownerSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from './../../utils/axiosInstance';

// Thunk to fetch stores for the logged-in owner
export const fetchOwnerStores = createAsyncThunk(
  'owner/fetchStores',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get('/owner/my-stores');
      return res.data.stores;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || 'Failed to fetch stores');
    }
  }
);

const ownerSlice = createSlice({
  name: 'owner',
  initialState: {
    stores: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOwnerStores.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOwnerStores.fulfilled, (state, action) => {
        state.loading = false;
        state.stores = action.payload;
      })
      .addCase(fetchOwnerStores.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default ownerSlice.reducer;
