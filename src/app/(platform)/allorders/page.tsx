'use client';
import { AppState } from '@/Store/auth.store';
import { OrderResponse } from '@/Types/OrderTypes';
import { getUserOrders } from '@/serverAPIs/OrderActions';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import OrderCard from './components/OrederCard/OrederCard';

export default function Order() {
  // const { userInfo } = useSelector((state: AppState) => state.auth);
  // const [orders, setOrders] = useState<OrderResponse | null>(null);
  const [userID, setUserID] = useState<string|null>(null);

//   if(!userInfo){
//     return
//   }
//   if(!userID){
//     return
//   }



// useEffect(() => {

//   const fetchOrders = async () => {
//     const fetchedOrders = await getUserOrders({ orderId:userID });
//     setOrders(fetchedOrders);
//     setUserID(userInfo?.id)
//   }
//   fetchOrders();
// }, [userID]);

  const { userInfo } = useSelector((state:AppState) => state.auth);
  const [orders, setOrders] = useState<null|OrderResponse>(null)

  if(!userInfo){
    return
  }

  useEffect(()=>{
    const fetchOrders = async ()=>{
      const response = await getUserOrders({userId:userInfo.id})
      // console.log(response);
      setOrders(response)
    }
    fetchOrders()
  },[])

  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <div className="bg-gray-100 p-6 rounded-full mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No orders found
        </h3>
        <p className="text-gray-500 max-w-xs mb-6">
          It looks like you haven&apos;t placed any orders yet. Start exploring our shop!
        </p>
        <button 
          onClick={() => window.location.href = '/'}
          className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors shadow-sm"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-12">
      <div className="container mx-auto w-[95%] lg:w-[80%] max-w-5xl">
        <div className="mb-10">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">My Orders</h1>
          <p className="text-gray-500 mt-2 font-medium">
            Track, manage, and review your previous purchases.
          </p>
        </div>
          
            <div className="space-y-6">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
          {/* : 
          <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-gray-300">
            <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="text-gray-300" size={40} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">No orders found</h2>
            <p className="text-gray-500 max-w-sm mx-auto mt-2">
              Looks like you haven't placed any orders yet. Start shopping to see your orders here!
            </p>
            <Link 
              href="/products" 
              className="mt-8 inline-block bg-green-600 text-white font-bold px-8 py-3 rounded-2xl hover:bg-green-700 transition-all shadow-lg shadow-green-100"
            >
              Start Shopping
            </Link>
          </div>} */}



      </div>
    </div>
  );
}