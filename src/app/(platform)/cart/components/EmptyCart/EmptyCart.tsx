import React from 'react'
import  Link  from 'next/link';
import { ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';

export default function EmptyCart() {
  return <>
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center mt-12">
      <div className="relative mb-8">
        <div className="absolute -top-4 -right-4 animate-pulse">
          <Sparkles className="text-yellow-400 size-8" />
        </div>
        <div className="bg-gray-50 p-10 rounded-full border-2 border-dashed border-gray-200">
          <ShoppingBag size={80} className="text-gray-300 stroke-[1.5]" />
        </div>
      </div>
      <div className="max-w-md space-y-3">
        <h2 className="text-3xl font-black text-gray-900 tracking-tight">
          Your cart is empty
        </h2>
        <p className="text-gray-500 font-medium">
          It looks like you haven&apos;t added anything to your cart yet. 
          Explore our latest arrivals and find something special today!
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-10 w-full max-w-sm justify-center">
        <Link 
          href="/products"
          className="group flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 active:scale-95"
        >
          Start Shopping
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
        
        <Link 
          href="/wishlist"
          className="flex items-center justify-center px-8 py-4 rounded-2xl font-bold text-gray-600 border border-gray-200 hover:bg-gray-50 transition-all active:scale-95"
        >
          View Wishlist
        </Link>
      </div>

      {/* Decorative background element */}
      <div className="mt-16 grid grid-cols-3 gap-8 opacity-20 grayscale pointer-events-none select-none">
        <div className="h-2 w-24 bg-gray-300 rounded-full" />
        <div className="h-2 w-24 bg-gray-300 rounded-full" />
        <div className="h-2 w-24 bg-gray-300 rounded-full" />
      </div>
    </div>
    </>
}
