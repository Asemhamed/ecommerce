' use client'
import { AuthReducer, AuthState } from '@/app/(auth)/strore/auth.slice';
import { cartReducer, CartState } from '@/app/(platform)/cart/Store/slice.cart';
import { wishlistReducer, WishlistState } from '@/app/(platform)/wishlist/Store/Slice.wishlist';
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

export type PreloadType = {
    auth:AuthState,
    cart:CartState,
    wishlist:WishlistState
}


export function CreateStore(preloadedState:PreloadType){
const store = configureStore({
    reducer:{
        auth :AuthReducer,
        cart:cartReducer,
        wishlist:wishlistReducer
    },
    preloadedState
});
return store
}



export type AppStore = ReturnType<typeof CreateStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

