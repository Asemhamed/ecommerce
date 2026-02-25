import { ArrowLeft, CreditCard, Lock, RotateCcw, ShieldCheck, Truck } from 'lucide-react'
import Link from 'next/link';
import React from 'react'

export default function CartSummary({totalCartPrice,cartId,numOfCartItems}:{totalCartPrice:number,cartId:string|null,numOfCartItems:number}) {


return<div className="space-y-4 sticky top-8">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 p-8">
        <h2 className="text-2xl font-black text-gray-900 mb-6">Order Summary</h2>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-500 font-medium">Subtotal ({numOfCartItems} items)</span>
            <span className="text-gray-900 font-bold">${totalCartPrice.toLocaleString()}</span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-2 text-gray-500">
              <Truck size={16} />
              <span>Shipping</span>
            </div>
            <span className="text-green-600 font-bold">
               FREE 
            </span>
          </div>
          <hr className="border-dashed border-gray-200 my-6" />

          <div className="flex justify-between items-end mb-8">
            <span className="text-lg font-bold text-gray-900">Total</span>
            <span className="text-3xl font-black text-gray-900">
                ${totalCartPrice.toLocaleString()}
            </span>
          </div>

          <Link 
            href={'/checkout'}
            className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-green-700 transition-all active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-blue-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <CreditCard size={20} />
            Checkout Now
          </Link>

          <Link 
            href="/products" 
            className="w-full flex items-center justify-center gap-2 py-3 shadow rounded-2xl text-gray-500 font-semibold hover:text-gray-800 transition-colors group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Continue Shopping
          </Link>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-50 space-y-4">
          <div className="flex gap-4">
            <div className="p-2 bg-green-50 rounded-lg h-fit">
              <ShieldCheck className="text-green-600" size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">Secure Checkout</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Your data is protected by 256-bit SSL encryption for a safe transaction.
              </p>
            </div>
          </div>



          <div className="flex gap-4">
            <div className="p-2 bg-purple-50 rounded-lg h-fit">
              <RotateCcw className="text-purple-600" size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">Easy Returns</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Not happy? Return within 30 days for a full refund.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-center gap-2 text-gray-400">
        <Lock size={12} />
        <span className="text-[10px] uppercase tracking-widest font-bold">100% Encrypted Payment</span>
      </div>
      </div>

}
