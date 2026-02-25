import { CartItem, CartResponse } from "@/Types/Cart.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartState {
    numOfCartItems:number,
    cartId:string | null,
    products:CartItem[],
    totalCartPrice:number,
    priceAfterDiscount?:number,
    IsLoading:boolean,
    error:string | null,
}

const initialState:CartState = {
    numOfCartItems:0,
    cartId:null,
    products:[],
    totalCartPrice:0,
    priceAfterDiscount:0,
    IsLoading:false,
    error:null,
}
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:{
        setInfoCart:function(state,action:PayloadAction<CartResponse>){
            state.numOfCartItems = action.payload.numOfCartItems;
            state.cartId = action.payload.cartId;
            state.products = action.payload.data.products;
            state.totalCartPrice = action.payload.data.totalCartPrice;
        },
        deleteCartItem:function(state,action:PayloadAction<{id:string}>){
            const productId = action.payload.id;
            const productDelete = state.products.find(product => product.product._id === productId);
            if(productDelete){
                state.products=state.products.filter(product => product.product._id !== productId);
                state.numOfCartItems = state.products.length;
                state.totalCartPrice -= (productDelete.price * productDelete.count);
            }
        },
        clearCart:function(state){
            state.numOfCartItems = 0;
            state.totalCartPrice = 0;
            state.products = [];
            state.cartId = null;
        },
}})


export const cartReducer = cartSlice.reducer;
export const {setInfoCart,deleteCartItem,clearCart} = cartSlice.actions;