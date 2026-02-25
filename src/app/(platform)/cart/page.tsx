'use client'
import { AppState } from '@/Store/auth.store'
import { useSelector } from 'react-redux'
import CartSummary from './components/CartSummary/CartSummary'
import ShopingCart from './components/ShopingCart/ShopingCart'
import EmptyCart from './components/EmptyCart/EmptyCart'


export default function Cart() {
      const {numOfCartItems,products,totalCartPrice,cartId}=useSelector((appStates:AppState)=> appStates.cart)
    
  return  numOfCartItems == 0 ? <EmptyCart /> : <div className='grid lg:grid-cols-3 gap-5 container mx-auto w-[95%] lg:w-[90%] my-10'>
        <div className=' col-span-2'>
          <ShopingCart numOfCartItems={numOfCartItems} products={products} />
        </div>
        <div className='col-span-1'>
          <CartSummary numOfCartItems={numOfCartItems} totalCartPrice={totalCartPrice} cartId={cartId} />
        </div>
    </div>
    
  }

