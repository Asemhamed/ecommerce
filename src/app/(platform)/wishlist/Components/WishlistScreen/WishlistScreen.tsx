"use client";

import React, { useState } from "react";
import { Heart, ArrowLeft, ShoppingBag } from "lucide-react";
import WishlistCard from "../WishlistCard/WishlistCard";
import { useSelector } from "react-redux";
import { AppState } from "@/Store/auth.store";
import Link from "next/link";



export default function WishlistScreen() {
  const { count, data } = useSelector(
    (appStates: AppState) => appStates.wishlist,
  );



  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 flex flex-col justify-between gap-4 border-b border-gray-200 pb-8 md:flex-row md:items-end">
          <div>
            <Link href={'/'}  className="group mb-2 flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors">
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Shopping</span>
            </Link>
            <h1 className="flex items-center gap-3 text-4xl font-extrabold tracking-tight text-gray-900">
              My Wishlist{" "}
              <Heart className="h-8 w-8 fill-red-500 text-red-500" />
            </h1>
            <p className="mt-2 text-gray-600">
              {data.length === 0
                ? "Your list is currently empty."
                : `You have ${data.length} items saved for later.`}
            </p>
          </div>
                
        </header>

        {data.length > 0 ? (
          <div className="grid grid-cols-1  gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data.map((item) => (
              <div
                key={item.id}
                className="transition-all duration-300 hover:-translate-y-1 mx-auto w-full max-w-sm"
              >
                <WishlistCard key={item.id} data={item}  />
              </div>
            ))}
          </div>
        ) : (

          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-indigo-50 text-green-600">
              <ShoppingBag className="h-12 w-12" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Your wishlist is empty
            </h2>
            <p className="mt-3 max-w-xs text-gray-500">
              Browse our latest collection and save your favorites here for
              later.
            </p>
            <button className="mt-8 rounded-full bg-green-600 px-10 py-4 text-sm font-bold text-white shadow-xl shadow-green-100 transition-all hover:bg-green-700 hover:shadow-green-200 active:scale-95">
              Start Exploring
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
