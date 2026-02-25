import { WishlistProduct, WishlistResponse } from "@/Types/WishlistTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

    export type WishlistState = {
        status: string,
        count: number,
        data: WishlistProduct[]
    }


    const initialState:WishlistState={
    status: "success",
    count: 0,
    data: [] ,
}


const WishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        setWishlistInfo: (state, action:PayloadAction<WishlistResponse>) => {
            state.status = action.payload.status;
            state.count = action.payload.count;
            state.data = action.payload.data;
        },
        removeFromWishlist: (state, action:PayloadAction<{id:string}>) => {
            const productToRemove = state.data.find(product => product._id === action.payload.id);
            if(productToRemove){
                state.count -= 1;
                state.data = state.data.filter(product => product._id !== action.payload.id);
            }
        },
        clearWishlist : (state)=>{
            state.count =0;
            state.data = [];
        }
    }
})


export const wishlistReducer = WishlistSlice.reducer;
export const {setWishlistInfo, removeFromWishlist,clearWishlist} = WishlistSlice.actions;