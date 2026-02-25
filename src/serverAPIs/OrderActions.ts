'use server'

import { OrderResponse } from "@/Types/OrderTypes";
import axios, { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";



export async function getUserOrders({orderId}: {orderId: string}):Promise<OrderResponse> {
    const cookieStore =await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
        throw new Error("User is not authenticated");
    }
    
    try{
        const options:AxiosRequestConfig ={
        method: 'GET',
        url:`https://ecommerce.routemisr.com/api/v1/orders/user/${orderId}`,
    }
    const {data} = await axios.request(options);
    return data;

   
}catch (error) {
        throw error
    }

}