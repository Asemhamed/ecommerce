'use server'

import { getToken } from "@/Cookies/auth.actions";
import { OrderResponse } from "@/Types/OrderTypes";
import axios, { AxiosRequestConfig } from "axios";




export async function getUserOrders({userId}:{userId:string | undefined}):Promise<OrderResponse>{

    const token =await getToken();

    if(token){
        try {
            const options : AxiosRequestConfig = {
                url: `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
                method: 'Get'
            }
            const {data} = await axios.request(options)
            return data;
        } catch (error) {
            throw error
        }
    }else{
        throw new Error("Authintication required")
    }
}