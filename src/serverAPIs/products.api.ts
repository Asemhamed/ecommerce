'use server';

import { Product } from "@/Types/APIsType";

  export async function getAllProducts():Promise<Product[]>{
    const res = await fetch('https://ecommerce.routemisr.com/api/v1/products',{
      next:{revalidate:60*60*24} // Call from server every 24 hours
    });
    const {data} = await res.json();
    return data
  }
  

    
    export async function getProductDetails(id:string):Promise<Product>{
        try{
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`,{
            next: {revalidate: 60*60*24}
        })
        const {data} = await res.json();
        return data;
        }catch(error){
            throw error
        }
        
}