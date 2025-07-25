import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./../features/auth/authSlice";
import profilReducer from "./../features/profile/profileSlice";
import productsReducer from "./../features/products/productsSlice";
import cartReducer from "./../features/cart/cartSlice";


const store = configureStore({
    reducer:{
        auth:authReducer,
        profile:profilReducer,
        products:productsReducer,
        cart:cartReducer,
    }
})

export default store;