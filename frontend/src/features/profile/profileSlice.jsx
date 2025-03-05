import { createSlice } from "@reduxjs/toolkit";

import { getUserDetails } from "./profileApi";

const initialState={
    userDetails:null,
    status:"idle",
    error:null,
}

const profileSlice = createSlice({
    name:"profile",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getUserDetails.pending, (state)=>{
            state.status="loading";
        })
        .addCase(getUserDetails.fulfilled, (state,action)=>{
            state.status = "succeeded";
            state.userDetails = action.payload;
        })
        .addCase(getUserDetails.rejected, (state,action)=>{
            state.status = "failed";
            state.error = action.payload;
        })
    }
});

export default profileSlice.reducer;