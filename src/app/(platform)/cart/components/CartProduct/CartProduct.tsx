'use client'
import { removeCartItem, updateCartItem } from '@/serverAPIs/CartActions';
import { useAppDispatch } from '@/Store/auth.store';
import { CartItem } from '@/Types/Cart.types';
import { Minus, Plus, Star, Trash2 } from "lucide-react";
import Image from "next/image";
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { deleteCartItem, setInfoCart } from '../../Store/slice.cart';
export default function CartProduct({product}:{product:CartItem }) {

  const dispatch=useAppDispatch()

  async function handleDelete() {
    const result=await Swal.fire({
      html:`<div class="py-2  text-center">
          <div class="mx-auto size-16  mb-4 rounded-full bg-red-100 flex items-center justify-center">
            <i class="fa-solid fa-trash text-red-500"></i>
          </div>
          <h2 class="text-xl font-bold text-gray-800 mb-2">Are you sure?</h2>
          <p class="text-gray-500 text-sm leading-relaxed">
            Remove <span class="font-semibold text-gray-700">${product.product.title.slice(0, 40)}${product.product.title.length>40&& '...'} </span> From Cart
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
      const respons =await removeCartItem(product.product._id);
        toast.success('Product removed from cart successfully');
        dispatch(deleteCartItem({id:product.product._id}));
      
    }
    }

  async function handleQuantityUpdate(newQuantity: number) {
    if (newQuantity >= 1 && newQuantity <= product.product.quantity) {
      const response = await updateCartItem(product.product.id, newQuantity);
      dispatch(setInfoCart(response));
    }
    }

return <>
<div className="group flex flex-col sm:flex-row items-center justify-between p-6 mb-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">

      <div className="flex items-center gap-6 w-full sm:w-auto">
        <div className="relative overflow-hidden rounded-xl bg-gray-50 border border-gray-100 flex-shrink-0">
          <Image 
            src={product.product.imageCover} 
            alt={product.product.title} 
            className="object-cover group-hover:scale-105 transition-transform duration-500" 
            width={96} 
            height={96}
          />
        </div>
        
        <div className="flex flex-col space-y-1">
          <span className="text-[10px] uppercase tracking-wider font-bold text-blue-600">
            {product.product.category.name}
          </span>
          <h3 className="font-bold text-gray-800 text-lg leading-tight line-clamp-1">
            {product.product.title}
          </h3>
          <div className="flex items-center gap-2">
            <div className="flex items-center text-yellow-500 bg-yellow-50 px-2 py-0.5 rounded text-xs font-medium">
              <Star size={12} className="fill-yellow-500 mr-1" />
              {product.product.ratingsAverage}
            </div>
            <span className="text-gray-300 text-xs">|</span>
            <span className="text-gray-500 text-xs font-medium">${product.price} / unit</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between w-full sm:w-auto mt-6 sm:mt-0 gap-8">
        <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-200">
          <button
            disabled={product.count <= 1}
            onClick={() => handleQuantityUpdate(product.count - 1)}
            className="p-2 text-gray-500 hover:text-blue-600 disabled:opacity-30 transition-colors"
          >
            <Minus size={18} />
          </button>
          <span className='w-12 text-center bg-transparent font-bold text-gray-700 outline-none'>{product.count}</span>
          <button
            disabled={product.count >= product.product.quantity}
            onClick={() => handleQuantityUpdate(product.count + 1)}
            className="p-2 text-gray-500 hover:text-blue-600 disabled:opacity-30 transition-colors"
          >
            <Plus size={18} />
          </button>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-xs text-gray-400 font-medium">Subtotal</p>
            <p className="font-black text-xl text-gray-900">
              ${(product.price * product.count  ).toLocaleString()}
            </p>
          </div>
          
          <button onClick={handleDelete} className="group/delete p-3 cursor-pointer rounded-xl hover:bg-red-50 transition-colors">
            <Trash2 
              size={20} 
              className="text-gray-400 group-hover/delete:text-red-500 transition-colors" 
            />
          </button>
        </div>
      </div>
    </div>
</>

  }
