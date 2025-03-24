
import { createSlice } from "@reduxjs/toolkit";


const initialState={
    
        items:[
        ],
        totalPrice:0,
   
}

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart:(state,action)=>{
            const newItem = action.payload;
            const existingItem = state.items.find((item)=>item.id===newItem.id)
            if(existingItem){
                existingItem.quantity++;
            }else{
                state.items.push({...newItem, quantity:1});
            }
            
        },
        increaseQuantity:(state,action)=>{
            const item = state.items.find((item)=>item.id===action.payload.id);
            if(item){
                item.quantity++;
                state.totalPrice+=item.price;
            }
        },
        decreaseQuantity:(state,action)=>{
            const item = state.items.find((item)=>item.id===action.payload.id);
            if(item&&item.quantity>1){
                item.quantity--;
                state.totalPrice-=item.price;
            }else{
                state.items=state.items.filter((item)=>item.id!==action.payload.id);
                state.totalPrice-=item.price;
            }
        },
    }

});


export const {addToCart, increaseQuantity, decreaseQuantity} = cartSlice.actions;
export default cartSlice.reducer;


