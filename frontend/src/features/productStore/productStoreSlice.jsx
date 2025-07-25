

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchStoresApi, submitRatingApi } from "./storeAPI";


export const getStores = createAsyncThunk("store/getStores", async () => {
  return await fetchStoresApi(); // no need to pass token manually
});

export const submitRating = createAsyncThunk(
  "store/submitRating",
  async ({ storeId, rating }, { rejectWithValue }) => {
    try {
      const res = await submitRatingApi({ storeId, rating });
      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Failed to submit rating");
    }
  }
);

const storeSlice = createSlice({
  name: "store",
  initialState: {
    stores: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStores.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStores.fulfilled, (state, action) => {
        state.loading = false;
        state.stores = action.payload;
      })
      .addCase(getStores.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(submitRating.fulfilled, (state, action)=>{
          const { storeId, rating } = action.meta.arg; // input to thunk

  // Find the rated store and update its ratings
  const index = state.stores.findIndex((store) => store.id === storeId);
  if (index !== -1) {
    const oldStore = state.stores[index];
    const newRatingList = oldStore.userRating ? [oldStore.userRating, rating] : [rating];

    // Replace userRating and update average manually (for UI)
    state.stores[index] = {
      ...oldStore,
      userRating: rating,
      overallRating: Number(
        (
          (oldStore.overallRating * oldStore.totalRatings + rating) /
          (oldStore.totalRatings + 1)
        ).toFixed(1)
      ),
      totalRatings: oldStore.totalRatings + 1,
    };
  }
      })
  },
});

export default storeSlice.reducer;
