'use client'
import { clearCart } from "@/app/(platform)/cart/Store/slice.cart";
import { CheckoutSchemaTypes, shippingAddressSchema } from "@/Schema/Checkout.Schema";
import { createCashOrder, createOnlineOrder } from "@/serverAPIs/CheckoutActions";
import { AppState, useAppDispatch } from "@/Store/auth.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, CreditCard, Lock, MapPin, Phone, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import MethodCheckout from "../MethodCheckout/MethodCheckout";

export default function CheckoutScreen() {

const {cartId,numOfCartItems,totalCartPrice}=useSelector((AppStates:AppState)=>AppStates.cart);
const [selectedMethod, setSelectedMethod] = useState<'onLine'|'cash'>('cash');
const router = useRouter();
const dispatch = useAppDispatch();

  const {register,handleSubmit,reset,formState:{errors}}=useForm({
    defaultValues:{
      details: "",
        phone: "",
        city: ""
    },
    mode:'onChange',
    reValidateMode:'onChange',
    resolver:zodResolver(shippingAddressSchema),
  })


  const  onSubmit:SubmitHandler<CheckoutSchemaTypes>=async(values)=>{
    try{
    if(!cartId){
      return
    }

    if(selectedMethod=='cash'){
      const response = await createCashOrder({CartID:cartId,shippingAddress:values});
      if(response.status == 'success'){
        toast.success('order created successfully');
        reset(); 
        dispatch(clearCart());
        setTimeout(()=>{
          router.push('/order');
        },3000)

      
      }
    }else{
      const response = await createOnlineOrder({CartID:cartId,shippingAddress:values,url:location.origin})
          if(response.status == 'success'){
        toast.loading('redirecting you to payment gateway');
        reset(); 
            dispatch(clearCart());
        setTimeout(()=>{
          location.href = response.session.url;
        },3000)
          }
    }
  }catch(error){
    throw error
  }

  }


  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <Link href="/cart" className="flex items-center text-sm text-gray-500 hover:text-green-600 transition-colors mb-4">
          <ArrowLeft size={16} className="mr-2" />
          Back to Cart
        </Link>
        <h1 className="text-3xl font-black text-gray-900">Complete Your Order</h1>
        <p className="text-gray-500/70 text-sm">Review your items and complete your purchase</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 bg-green-600 text-white flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl">
                <MapPin size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold">Shipping Address</h2>
                <p className="text-green-100 text-sm">Where should we deliver your order?</p>
              </div>
            </div>

            <form className="p-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="city" className="text-sm font-bold text-gray-700 ml-1">City*</label>
                  <input 
                    type="text" 
                    id="city" 
                    {...register('city')}
                    placeholder="e.g Cairo, Giza" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all placeholder:text-gray-300"
                  />
                  {errors.city&& <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
                    <span className="inline-block size-1 rounded-full bg-red-500"></span>
                    {errors.city.message}
                    </p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1">
                    <Phone size={14} /> Phone*
                  </label>
                  <input 
                    type="text" 
                    id="phone" 
                    {...register('phone')}
                    placeholder="01xxxxxxxxx" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all placeholder:text-gray-300"
                  />
                  {errors.phone&& <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
                    <span className="inline-block size-1 rounded-full bg-red-500"></span>
                    {errors.phone.message}
                    </p>}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="address" className="text-sm font-bold text-gray-700 ml-1">Street Address*</label>
                <textarea 
                  id="address" 
                  {...register('details')}
                  rows={3}
                  placeholder="Street name, building number, floor, apartment" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all placeholder:text-gray-300 resize-none"
                />
                {errors.details&& <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
                    <span className="inline-block size-1 rounded-full bg-red-500"></span>
                    {errors.details.message}
                    </p>}
              </div>
                <button 
                  className="cursor-pointer w-full bg-green-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-green-700 transition-all active:scale-[0.98] shadow-lg shadow-green-200 flex items-center justify-center gap-3 group"
                >
                  <CreditCard size={20} className="group-hover:animate-pulse" />
                  Proceed to Payment
                </button>
            </form>
          </div>
          <MethodCheckout selectedMethod={selectedMethod} setSelectedMethod={setSelectedMethod}/>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-4">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 p-8">
              
              <h2 className="text-2xl font-black text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Subtotal ({numOfCartItems} { (numOfCartItems) <2 ? 'item':'items'})</span>
                  <span className="text-gray-900 font-bold">${totalCartPrice.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2 text-gray-500 font-medium">
                    <Truck size={18} className="text-green-600" />
                    <span>Shipping</span>
                  </div>
                  <span className="text-green-600 font-bold uppercase tracking-wide">Free</span>
                </div>
                
                <hr className="border-dashed border-gray-200 my-6" />

                <div className="flex justify-between items-center mb-8">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <div className="text-right">
                    <p className="text-3xl font-black text-gray-900 leading-none">${totalCartPrice.toLocaleString()}</p>
                    <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-tighter">VAT Included</p>
                  </div>
                </div>


              </div>

              <div className="mt-8 pt-8 border-t border-gray-50 space-y-6">
                <div className="flex gap-4">
                  <div className="p-3 bg-green-50 rounded-xl h-fit">
                    <ShieldCheck className="text-green-600" size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Secure Checkout</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Your data is protected by 256-bit SSL encryption.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="p-3 bg-purple-50 rounded-xl h-fit">
                    <RotateCcw className="text-purple-600" size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Easy Returns</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      30-day money-back guarantee if you're not satisfied.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-2 text-gray-400">
              <Lock size={12} />
              <span className="text-[10px] uppercase tracking-[0.2em] font-black">100% Encrypted Payment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}