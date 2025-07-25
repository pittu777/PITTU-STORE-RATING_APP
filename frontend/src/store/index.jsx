import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./../features/auth/authSlice";
import profilReducer from "./../features/profile/profileSlice";
import productStoreReducer from "./../features/productStore/productStoreSlice";
import adminReducer from "./../features/admin/adminSlice";
import adminAuthReducer from "./../features/adminAuth/adminAuthSlice";
const store = configureStore({
    reducer:{
        auth:authReducer,
        profile:profilReducer,
        store:productStoreReducer,
        admin:adminReducer,
        adminAuth:adminAuthReducer,
    }
})

export default store;