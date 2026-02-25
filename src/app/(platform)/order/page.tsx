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
  const { userInfo } = useSelector((state: AppState) => state.auth);
  
  const [orders, setOrders] = useState<OrderResponse | null>(null);
  if(!userInfo){
    return
  }



useEffect(() => {

  const fetchOrders = async () => {
    const fetchedOrders = await getUserOrders({ orderId:userInfo?.id });
    setOrders(fetchedOrders);
  }
  fetchOrders();
}, []);

if(!orders) {
  return 
}

  if (!userInfo) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-2xl font-bold text-gray-800">Please login to view orders</h2>
        <Link href="/login" className="mt-4 bg-green-600 text-white px-6 py-2 rounded-xl">Login Now</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-12">
      <div className="container mx-auto w-[95%] lg:w-[80%] max-w-5xl">
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">My Orders</h1>
          <p className="text-gray-500 mt-2 font-medium">
            Track, manage, and review your previous purchases.
          </p>
        </div>
          {orders && orders.length > 0 ? 
            <div className="space-y-6">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
          : 
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
          </div> }



      </div>
    </div>
  );
}