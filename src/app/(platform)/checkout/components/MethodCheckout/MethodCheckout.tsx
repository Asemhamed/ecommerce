"use client";
import React, { useState } from 'react';
import { Banknote, CreditCard, CheckCircle2 } from 'lucide-react';

interface CheckoutMethodProps{
  selectedMethod:'cash'|'onLine',
  setSelectedMethod:(method:('cash'|'onLine'))=>void
}


export default function MethodCheckout({setSelectedMethod,selectedMethod}:CheckoutMethodProps) {
  
  return (
    <div className='bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mt-6'>
      <div className='p-6 bg-green-600 text-white'>
        <div className='flex items-center gap-3 mb-1'>
          <h2 className='text-xl font-bold'>Payment Method</h2>
        </div>
        <p className='text-green-100 text-sm'>Choose how you'd like to pay</p>
      </div>

      <div className='p-6 space-y-4'>
        <label 
          htmlFor="cash" 
          className={`relative flex items-center justify-between p-5 rounded-2xl border-2 transition-all cursor-pointer group
            ${selectedMethod === 'cash' 
              ? 'border-green-500 bg-green-50/50 ring-4 ring-green-500/10' 
              : 'border-gray-100 bg-white hover:border-gray-200'}`}
        >
          <div className='flex items-center gap-4'>
            <div className={`p-3 rounded-xl transition-colors ${selectedMethod === 'cash' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
              <Banknote size={24} />
            </div>
            <div>
              <h3 className={`font-bold ${selectedMethod === 'cash' ? 'text-green-900' : 'text-gray-900'}`}>
                Cash on Delivery
              </h3>
              <p className='text-sm text-gray-500'>Pay when your order arrives at your doorstep</p>
            </div>
          </div>
          <div className="flex items-center justify-center">
             <input 
                type="radio" 
                id='cash' 
                name='method' 
                checked={selectedMethod === 'cash'}
                onChange={() => setSelectedMethod('cash')}
                className='w-5 h-5 text-green-600 border-gray-300 focus:ring-green-500 accent-green-600' 
              />
          </div>
        </label>

        <label 
          htmlFor="onLine" 
          className={`relative flex items-center justify-between p-5 rounded-2xl border-2 transition-all cursor-pointer group
            ${selectedMethod === 'onLine' 
              ? 'border-green-500 bg-green-50/50 ring-4 ring-green-500/10' 
              : 'border-gray-100 bg-white hover:border-gray-200'}`}
        >
          <div className='flex items-center gap-4'>
            <div className={`p-3 rounded-xl transition-colors ${selectedMethod === 'onLine' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
              <CreditCard size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className={`font-bold ${selectedMethod === 'onLine' ? 'text-green-900' : 'text-gray-900'}`}>
                    Pay Online
                </h3>
                {selectedMethod === 'onLine' && <span className="bg-green-100 text-green-700 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">Fastest</span>}
              </div>
              <p className='text-sm text-gray-500'>Secure Payment with Credit/Debit Card via Stripe</p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <input 
              type="radio" 
              id='onLine' 
              name='method' 
              checked={selectedMethod === 'onLine'}
              onChange={() => setSelectedMethod('onLine')}
              className='w-5 h-5 text-green-600 border-gray-300 focus:ring-green-500 accent-green-600' 
            />
          </div>
        </label>
      </div>

      <div className="bg-gray-50 p-4 border-t border-gray-100">
        <div className="flex items-center justify-center gap-2 text-xs text-gray-400 font-medium">
            <CheckCircle2 size={14} className="text-green-500" />
            <span>Encrypted and Secure Payment Processing</span>
        </div>
      </div>
    </div>
  );
}