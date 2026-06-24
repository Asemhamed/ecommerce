'use client'

import { setInfoCart } from "@/app/(platform)/cart/Store/slice.cart";
import { setWishlistInfo } from "@/app/(platform)/wishlist/Store/Slice.wishlist";
import { addToCart, getLoggedUserCart } from "@/serverAPIs/CartActions";
import { addToWishlist, GetLoggedUserWishlist } from "@/serverAPIs/WishlistActions";
import { AppState, useAppDispatch } from "@/Store/auth.store";
import { Product } from '@/Types/APIsType';
import { Eye, Heart, RefreshCw, ShoppingCart, Star } from 'lucide-react';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function ProductCard({ product }: { product: Product }) {
  const { isAuthenticated } = useSelector((appStates: AppState) => appStates.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [addingToCart, setAddingToCart] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const discountPercent =
    product.priceAfterDiscount && product.priceAfterDiscount < product.price
      ? Math.round(((product.price - product.priceAfterDiscount) / product.price) * 100)
      : null;

  async function handleAddToCart() {
    if (isAuthenticated) {
      try {
        setAddingToCart(true);
        const response = await addToCart(product._id);
        if (response.status === 'success') {
          toast.success('Product added to cart successfully!');
          const cartInfo = await getLoggedUserCart();
          dispatch(setInfoCart(cartInfo));
        }
      } catch {
        toast.error('Failed to add product to cart');
      } finally {
        setAddingToCart(false);
      }
    } else {
      router.push('/login');
    }
  }

  async function handleAddToWishlist() {
    if (isAuthenticated) {
      try {
        const response = await addToWishlist(product._id);
        if (response.status === 'success') {
          setWishlisted(true);
          const wishlistInfo = await GetLoggedUserWishlist();
          dispatch(setWishlistInfo(wishlistInfo));
          toast.success('Product added to wishlist successfully!');
        }
      } catch {
        toast.error('Failed to add product to wishlist');
      }
    } else {
      router.push('/login');
    }
  }

  return (
    <div className="group relative bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">

      {/* Discount Badge */}
      {discountPercent && (
        <span className="absolute top-3 left-3 z-10 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
          -{discountPercent}%
        </span>
      )}

      {/* Side Action Icons */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-3 group-hover:translate-x-0 transition-all duration-300">
        <button
          onClick={handleAddToWishlist}
          title="Add to Wishlist"
          className={`w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-md border border-gray-100 transition-all hover:bg-red-50 hover:border-red-200 active:scale-90 ${wishlisted ? 'text-red-500' : 'text-gray-500'}`}
        >
          <Heart size={15} className={wishlisted ? 'fill-red-500' : ''} />
        </button>
        <button
          title="Compare"
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-md border border-gray-100 text-gray-500 transition-all hover:bg-green-50 hover:border-green-200 active:scale-90"
        >
          <RefreshCw size={15} />
        </button>
        <Link href={`/productDetails/${product._id}`}>
          <button
            title="Quick View"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-md border border-gray-100 text-gray-500 transition-all hover:bg-green-50 hover:border-green-200 active:scale-90"
          >
            <Eye size={15} />
          </button>
        </Link>
      </div>

      {/* Product Image */}
      <Link href={`/productDetails/${product._id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-50 flex items-center justify-center p-4">
          <img
            src={product.imageCover}
            alt={product.title || "Product image"}
            className="max-h-full max-w-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>
      </Link>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-4 gap-1.5">

        {/* Category */}
        <p className="text-[11px] font-semibold text-green-600 uppercase tracking-wider">
          {product.category?.name}
        </p>

        {/* Title */}
        <Link href={`/productDetails/${product._id}`}>
          <h3 className="text-sm font-bold text-gray-800 line-clamp-1 hover:text-green-600 transition-colors">
            {product.title}
          </h3>
        </Link>

        {/* Star Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={12}
                className={
                  star <= Math.round(product.ratingsAverage)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'fill-gray-200 text-gray-200'
                }
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">
            {product.ratingsAverage?.toFixed(1)} ({product.ratingsQuantity ?? 0})
          </span>
        </div>

        {/* Price Row */}
        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-black text-gray-900">
              {product.priceAfterDiscount && product.priceAfterDiscount < product.price
                ? product.priceAfterDiscount
                : product.price}
              <span className="text-xs font-semibold text-gray-500 ml-1">EGP</span>
            </span>
            {discountPercent && (
              <span className="text-xs text-gray-400 line-through">{product.price}</span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={addingToCart}
            title="Add to Cart"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-green-600 text-white shadow-md shadow-green-100 hover:bg-green-700 active:scale-90 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {addingToCart ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <ShoppingCart size={16} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
