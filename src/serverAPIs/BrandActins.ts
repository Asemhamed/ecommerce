'use server';



import { Product } from "@/Types/APIsType";
import { Brand } from "@/Types/WishlistTypes";

    export async function getAllBrands():Promise<Brand[]>{
        const res = await fetch('https://ecommerce.routemisr.com/api/v1/brands',{
            next:{revalidate:60*60*24}
        });
        const {data} = await res.json();
        return data
    }


export async function getBrandDetails(id:string):Promise<Product[]>{
    try{
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products?brand=${id}`,{
        next: {revalidate: 60*60*24}
    })
    const {data} = await res.json();
    return data;
    }catch(error){
        throw error
    }
}

