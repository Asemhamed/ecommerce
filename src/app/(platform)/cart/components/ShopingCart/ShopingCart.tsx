'use client'

import { CartItem } from "@/Types/Cart.types";
import CartProduct from "../CartProduct/CartProduct";
import { Trash2 } from "lucide-react";
import { clearUserCart } from "@/serverAPIs/CartActions";
import { useAppDispatch } from "@/Store/auth.store";
import { clearCart } from "../../Store/slice.cart";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export default function ShopingCart({numOfCartItems,products}:{numOfCartItems:number,products:CartItem[]}) {
        const dispatch = useAppDispatch() 

    async function handleDelete(){
        const result=await Swal.fire({
              html:`<div class="py-2  text-center">
                  <div class="mx-auto size-16  mb-4 rounded-full bg-red-100 flex items-center justify-center">
                    <i class="fa-solid fa-trash text-red-500"></i>
                  </div>
                  <h2 class="text-xl font-bold text-gray-800 mb-2">Are you sure?</h2>
                  <p class="text-gray-500 text-sm leading-relaxed">
                    Are you sure to clear cart ?
                  </p>
              </div>`,
              showCancelButton: true,
              confirmButtonText: 'Delete',
              cancelButtonText: 'Cancel',
              buttonsStyling: false,
              customClass: {
                confirmButton: 'bg-red-500 font-semibold text-white px-4 py-2 me-2 cursor-pointer rounded-xl hover:bg-red-600 transition-colors',
                cancelButton: 'bg-gray-200 text-gray-700 px-4 py-2 font-semibold rounded-xl cursor-pointer hover:bg-gray-300 transition-colors'
              }  
        
            })
            if(result.isConfirmed){
              const respons =await clearUserCart();
                toast.success('Product removed from cart successfully');
                dispatch(clearCart());
              
            }
    }

    return<div className=" shadow-xl p-3">
        <div className="flex items-center justify-between">
            <div>     
                <h2 className="font-semibold text-xl">Shoping Cart</h2>
                <p className="text-sm text-gray-600 mb-5 mt-2">{numOfCartItems} {numOfCartItems>1?'items':'item'} in your cart</p>
            </div>
            <button onClick={handleDelete} className="group/delete p-3 flex gap-1  cursor-pointer rounded-xl hover:bg-red-50 transition-colors">
                
                <Trash2 
                size={20} 
                className="text-gray-400 group-hover/delete:text-red-500 transition-colors" 
            />
            Clear Cart
          </button>
        </div>
        <hr className="py-5" />
        {products.map((product)=><CartProduct key={product._id} product={product} />)}
    </div>
}
