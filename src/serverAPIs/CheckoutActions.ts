'use server'

import { CheckoutSchemaTypes } from "@/Schema/Checkout.Schema";
import axios, { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers"

export async function createCashOrder({CartID,shippingAddress}:{CartID:string,shippingAddress:CheckoutSchemaTypes}){
    const cookieStore =await cookies();
    const token = cookieStore.get('token')?.value || null;

    if (!token) {
        throw new Error('User is not authenticated');
    }

    try{

        const options:AxiosRequestConfig={
            url:`https://ecommerce.routemisr.com/api/v1/orders/${CartID}`,
            method:'POST',
            headers:{
                token
            },
            data:{
                shippingAddress
            }
        }

        const {data} = await axios.request(options);
        return data
    }catch(error){
        throw new Error('User is not authenticated');
    }
}

export async function createOnlineOrder({CartID,shippingAddress,url}:{CartID:string,shippingAddress:CheckoutSchemaTypes,url:string}){
    const cookieStore =await cookies();
    const token = cookieStore.get('token')?.value || null;

    if (!token) {
        throw new Error('User is not authenticated');
    }

    try{

        const options:AxiosRequestConfig={
            url:`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CartID}?url=${url}`,
            method:'POST',
            headers:{
                token
            },
            data:{
                shippingAddress
            }
        }

        const {data} = await axios.request(options);
        return data
    }catch(error){
        throw new Error('User is not authenticated');
    }
}