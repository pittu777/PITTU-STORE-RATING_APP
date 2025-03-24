import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
    products:[],
    status:"idle",
    error:null,

}


export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async (_,{ rejectWithValue }) => {
        try {
            const response = await axios.get(`https://fakestoreapi.com/products`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || "failed to fetch");
        }
    }
);



const productsSlice = createSlice({
    name:"products",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
            builder
                .addCase(fetchProducts.pending, (state) => {
                    state.status = "loading";
                })
                .addCase(fetchProducts.fulfilled, (state, action) => {
                    state.status = "succeeded";
                    state.products = action.payload;
        
                })
                .addCase(fetchProducts.rejected, (state, action) => {
                    state.status = "failed";
                    state.error = action.payload;
                })
                
        },

})


export default productsSlice.reducer;