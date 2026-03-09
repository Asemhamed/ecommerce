"use client";
import { OrdersType } from '@/Types/OrderTypes';
import { Calendar, CheckCircle2, ChevronDown, ExternalLink, MapPin, Package, Phone, Truck } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function OrderCard({ order }:{order:OrdersType}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusStyles = () => {
    if(order.isDelivered){
        return 'bg-green-100 text-green-700 border-green-200';
    } else if(order.isPaid){
        return 'bg-blue-100 text-blue-700 border-blue-200';
    } else {
        return 'bg-purple-100 text-purple-700 border-purple-200';
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden transition-all hover:shadow-md mb-6">
      <div className="p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gray-50 rounded-2xl text-gray-400">
              <Image src={order.cartItems[0].product.imageCover} width={32} height={32} alt={order.cartItems[0].product.title} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-gray-900">Order #{order.id}</h3>
                <span className={`text-[10px] uppercase tracking-widest font-black px-2.5 py-1 rounded-full border ${getStatusStyles()}`}>
                  {order.isDelivered ? "Delivered" : order.isPaid ? "Paid" : "Pending"}
                </span>
              </div>
              <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar size={14} /> {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 size={14} className="text-green-500" /> {order.cartItems.length} {order.cartItems.length > 1 ? 'items' : 'item'}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Total Amount</p>
              <p className="text-2xl font-black text-green-600">${order.totalOrderPrice}</p>
            </div>
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className={`p-2 rounded-xl transition-all ${isExpanded ? 'bg-green-600 text-white rotate-180' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
            >
              <ChevronDown size={20} />
            </button>
          </div>
        </div>
      </div>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out border-t border-gray-50 ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="p-6 md:p-8 bg-gray-50/50">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="space-y-2">
              <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">Shipping Address</h4>
              <div className="flex gap-2 text-sm text-gray-600">
                <MapPin size={16} className="text-gray-400 shrink-0" />
                <p> {order.shippingAddress.details}<br />{order.shippingAddress.city}</p>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">Payment Method</h4>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-8 h-5 bg-gray-200 rounded-sm flex items-center justify-center text-[10px] font-bold">{order.paymentMethodType}</div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">Phone</h4>
              <div className="flex items-center gap-2 text-sm text-green-600 font-bold">
                <Phone size={16} />
                <span>{order.user.phone}</span>
              </div>

          </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Ordered Items</h4>
            {order.cartItems.map((item) => (
              <div key={item._id} className="flex items-center justify-between bg-white p-4 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-50 rounded-xl relative overflow-hidden border border-gray-100">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                       <Image src={item.product.imageCover} width={64} height={64} alt={item.product.title} />
                    </div>
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900 text-sm">{item.product.title}</h5>
                    <p className="text-xs text-gray-500 mt-1">Quantity: {item.count} </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-gray-900">${item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}