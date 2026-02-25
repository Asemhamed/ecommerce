'use server'

import { WishlistResponse } from "@/Types/WishlistTypes";
import axios, { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers"

export async function addToWishlist(productId: string) {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        throw new Error('User is not authenticated');
    }

    try{
        const options:AxiosRequestConfig ={
            method: 'POST',
            url:`https://ecommerce.routemisr.com/api/v1/wishlist`,
            headers:{
                token
            },
            data:{
                productId
            }
        } 
        const {data} = await axios.request(options);
        return data;
    }catch (error) {
        throw error
    }
}


export async function GetLoggedUserWishlist():Promise<WishlistResponse> {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        throw new Error('User is not authenticated');
    }

    try{
        const options:AxiosRequestConfig ={
            method: 'GET',
            url:`https://ecommerce.routemisr.com/api/v1/wishlist`,
            headers:{
                token
            }
        } 
        const {data} = await axios.request(options);
        return data;
    }catch (error) {
        throw error
    }
}

export async function removeItemFromWishlist(productId: string):Promise<WishlistResponse> {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    
    if (!token) {
        throw new Error('User is not authenticated');
    }

    try{
        const options:AxiosRequestConfig ={
            method: 'DELETE',
            url:`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
            headers:{
                token
            }
        } 
        const {data} = await axios.request(options);
        return data;
    }catch (error) {
        throw error
    }
}