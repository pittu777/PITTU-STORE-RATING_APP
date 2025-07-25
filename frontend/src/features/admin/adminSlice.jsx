

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addStoreApi, deleteStoreApi, deleteUserApi, fetchAllStoresApi, fetchAllUsersApi, fetchOwnersApi, updateUserRoleApi } from "./adminApi";


export const fetchUsers = createAsyncThunk("admin/fetchUsers", async () => {
  return await fetchAllUsersApi();
});

export const fetchStores = createAsyncThunk("admin/fetchStores", async () => {
  return await fetchAllStoresApi();
});

export const addStore = createAsyncThunk(
  "admin/addStore",
  async (storeData, { rejectWithValue }) => {
    try {
      return await addStoreApi(storeData);
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Failed to add store");
    }
  }
);

export const deleteStore = createAsyncThunk(
  "admin/deleteStore",
  async (id, { rejectWithValue }) => {
    try {
      await deleteStoreApi(id);
      return id; // return id to remove from state
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Failed to delete store");
    }
  }
);

export const updateUserRole = createAsyncThunk("admin/updateUserRole", updateUserRoleApi);
export const deleteUser = createAsyncThunk("admin/deleteUser", deleteUserApi);

export const fetchOwners = createAsyncThunk("admin/fetchOwners", fetchOwnersApi);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    stores: [],
    owners:[],
    loading: false,
    error: null,
    success:null,
  },
  reducers: {
     clearMessages: (state) => {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Stores
      .addCase(fetchStores.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStores.fulfilled, (state, action) => {
        state.loading = false;
        state.stores = action.payload;
      })
      .addCase(fetchStores.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
        .addCase(addStore.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(addStore.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Store added successfully!";
        state.stores.push(action.payload);
      })
      .addCase(addStore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchOwners.pending, (state) => {
  state.loading = true;
})
.addCase(fetchOwners.fulfilled, (state, action) => {
  state.loading = false;
  state.owners = action.payload;
})
.addCase(fetchOwners.rejected, (state, action) => {
  state.loading = false;
  state.error = action.error.message;
})
.addCase(updateUserRole.fulfilled, (state, action) => {
  const index = state.users.findIndex((u) => u.id === action.payload.id);
  if (index !== -1) state.users[index] = action.payload;
})
.addCase(deleteUser.fulfilled, (state, action) => {
   const index = state.users.findIndex((u) => u.id === action.payload.id);
  if (index !== -1) {
    state.users[index] = action.payload; 
  }
})
.addCase(deleteStore.fulfilled, (state, action) => {
  state.stores = state.stores.filter((s) => s.id !== action.payload);
})


  },
});
export const { clearMessages } = adminSlice.actions;
export default adminSlice.reducer;
