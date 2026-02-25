'use server';

import { category } from "@/Types/APIsType";
import { Product } from "@/Types/APIsType";


    export async function getAllCategories():Promise<category[]>{
        const res = await fetch('https://ecommerce.routemisr.com/api/v1/categories',{
            next:{revalidate:60*60*24}
        });
        const {data} = await res.json();
        return data
    }



export async function getCategoryDetails(id:string):Promise<Product[]>{
    try{
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products?category=${id}`,{
        next: {revalidate: 60*60*24}
    })
    const {data} = await res.json();
    return data;
    }catch(error){
        throw error
    }
}