import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./../features/auth/authSlice";
import profilReducer from "./../features/profile/profileSlice";

const store = configureStore({
    reducer:{
        auth:authReducer,
        profile:profilReducer,
    }
})

export default store;