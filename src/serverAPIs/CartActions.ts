'use server'

import { CartResponse } from "@/Types/Cart.types";
import axios, { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";


export async function addToCart(productId: string) {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        throw new Error('User is not authenticated');
    }
    try{
        const options:AxiosRequestConfig ={
            method: 'POST',
            url:'https://ecommerce.routemisr.com/api/v2/cart',
            headers:{
                token
            },data:{
                productId
            }
        }
        const {data} = await axios.request(options);
        return data
    }catch (error) {
        throw error
    }
}

export async function getLoggedUserCart():Promise<CartResponse> {
        const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        throw new Error('User is not authenticated');
    }
    try{
        const options:AxiosRequestConfig ={
            method: 'GET',
            url:'https://ecommerce.routemisr.com/api/v2/cart',
            headers:{
                token
            }
        }

        const {data} = await axios.request(options);
        return data
    }catch(error){
        throw error
    }
}

export async function removeCartItem(productId:string):Promise<CartResponse> {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        throw new Error('User is not authenticated');
    }

    try{
        const options:AxiosRequestConfig ={
            method: 'DELETE',
            url:`https://ecommerce.routemisr.com/api/v2/cart/${productId}`,
        headers:{
            token
        }
        }
        const {data} = await axios.request(options);
        return data
    }catch(error){
        throw error
    }
}

export async function updateCartItem(productId:string, count:number):Promise<CartResponse> {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        throw new Error('User is not authenticated');
    }
    try{
        const options:AxiosRequestConfig ={
            method: 'PUT',
            url:`https://ecommerce.routemisr.com/api/v2/cart/${productId}`,
            headers:{
                token
            },data:{
                count
            }
        }
        const {data} = await axios.request(options);
        return data
    }catch(error){
        throw error
    }
}

export async function clearUserCart() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        throw new Error('User is not authenticated');
    }
    try{
        const options:AxiosRequestConfig ={
            method: 'DELETE',
            url:`https://ecommerce.routemisr.com/api/v2/cart`,
            headers:{
                token
            }
        }
        const {data} = await axios.request(options);
        return data
    }catch(error){
        throw error
    }
}
