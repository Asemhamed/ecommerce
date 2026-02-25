'use server'

import { cookies } from "next/headers"
import axios, { AxiosRequestConfig } from 'axios';
import { AuthState } from "@/app/(auth)/strore/auth.slice";



export async function setToken(token:string,rememberMe:boolean): Promise<void>{ 
    const cookiesStore = await cookies();
    if(rememberMe){
    cookiesStore.set('token',token,{
        httpOnly:true,
        maxAge:30*24*60*60
    })
}else{
    cookiesStore.set('token',token,{
        httpOnly:true,
        maxAge:1*24*60*60
    })
    }
}
export async function getToken():Promise<string|null> {
    const cookiesStore = await cookies();
    return cookiesStore.get('token')?.value || null;
}
export async function clearToken():Promise<void> {
    const cookiesStore = await cookies();
    cookiesStore.delete('token')
}

export async function verifyToken():Promise<AuthState>{
    const cookieStore =await cookies();
    const token =cookieStore.get('token')?.value || null;
    if(!token){
        return{
            isAuthenticated:false,
            userInfo:null
        }
    }else{
        try{
            const options:AxiosRequestConfig={
                url:'https://ecommerce.routemisr.com/api/v1/auth/verifyToken',
                method:'GET',
                headers:{
                    token
                }
            }

            const {data} = await axios.request(options);
            const {name,id,role} = data.decoded
            if(data.message == 'verified'){
                return {
                    isAuthenticated:true,
                userInfo:{
                    name,id,role
            }
                }
            }else{
                return{
                    isAuthenticated:false,
                    userInfo:null
                }
            }
            
        }catch(err){
            return{
                    isAuthenticated:false,
                    userInfo:null
                }
        }
    }

}