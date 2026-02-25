"use client";

import { AppState, useAppDispatch } from "@/Store/auth.store";
import { Product } from "@/Types/APIsType";
import { deleteCartItem, setInfoCart } from "@/app/(platform)/cart/Store/slice.cart";
import { setWishlistInfo } from "@/app/(platform)/wishlist/Store/Slice.wishlist";
import { Button } from "@/components/ui/button";
import { addToCart, getLoggedUserCart, removeCartItem } from "@/serverAPIs/CartActions";
import { addToWishlist, GetLoggedUserWishlist } from "@/serverAPIs/WishlistActions";
import {
  ArrowLeft,
  CreditCard,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/image-gallery.css";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function ProductDetails({
  productDetails,
}: {
  productDetails: Product;
}) {

  const {isAuthenticated}=useSelector((appStates:AppState)=>appStates.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [flag, setFlag] = useState(false);
  
  async function handleAddToCart() {
      if(isAuthenticated){
        try{
          const response =await addToCart(productDetails._id);
          if(response.status == 'success'){
            setFlag(true);
            toast.success('Product added to cart successfully!');
            const cartInfo = await getLoggedUserCart();
            dispatch(setInfoCart(cartInfo));
        }
      }catch(error){
        toast.error('Failed to add product to cart');
      }}
      else{
        toast.info('Please login to add products to your cart');
        router.push('/login');
      }
    }
    
    async function handleRemoveFromCart(productId:string) {
      const response = await removeCartItem(productId);
      dispatch(deleteCartItem({id:productId}));
      toast.success('Product removed from cart successfully!');
      setFlag(false);
      
    }

        async function handleAddToWishlist() {
          if(isAuthenticated){
            try{
              const response = await addToWishlist(productDetails._id);
              console.log(response);
              
              if(response.status == 'success'){
                const wishlistInfo = await GetLoggedUserWishlist();
    
              
                dispatch(setWishlistInfo(wishlistInfo));
                toast.success('Product added to wishlist successfully!');
              }
            }catch(error){
              toast.error('Failed to add product to wishlist');
              throw error
            }
          }else{
            router.push('/login');
          }
        }

    return (
    <>
      <div className="min-h-screen bg-white py-6 md:py-12">
        <div className="container mx-auto w-[92%] lg:w-[80%]">
        <Link
            href={"/products"}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-green-600 transition-colors mb-6 group"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to Shop
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-5">
              <div className="relative aspect-square max-w-[400px] mx-auto  rounded-2xl border border-gray-100 bg-gray-50 shadow-sm">
                <ImageGallery items={productDetails.images.map((img) =>{
                    return { original: img, thumbnail: img }
                  })} 
                  showFullscreenButton={false}
                  showPlayButton={false}
                  showNav={false}
                  />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="p-2 text-xs font-semibold rounded bg-green-100 text-green-700 border-none">
                  {productDetails.category?.name}
                </span>
                <h1 className="text-2xl mt-3 md:text-3xl font-bold text-gray-900 leading-tight">
                  {productDetails.title}
                </h1>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1 text-yellow-500 font-bold text-sm">
                    <Star size={14} className="fill-current" />
                    {productDetails.ratingsAverage}
                  </div>
                  <span className="text-gray-300">|</span>
                  <span className="text-sm text-gray-500">
                    Brand:{" "}
                    <b className="text-gray-700">
                      {productDetails.brand?.name}
                    </b>
                  </span>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed line-clamp-3 md:line-clamp-none">
                {productDetails.description}
              </p>

              <div className="py-4 border-y border-gray-100">
                <div className="flex items-center justify-between mb-4">
                </div>

                <div className="flex justify-between items-center bg-green-50/50 p-3 rounded-xl border border-green-100">
                  <span className="text-sm font-semibold text-green-800">
                    Unit Price:
                  </span>
                  <span className="text-xl font-black text-green-700">
                    {productDetails.price} EGP
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex gap-3">
                  <Button
                    onClick={() => (flag ? handleRemoveFromCart(productDetails._id) : handleAddToCart())}
                    className={`${flag ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"} flex-1 cursor-pointer h-12  text-white font-bold rounded-xl transition-all active:scale-[0.98]`}>
                    <ShoppingCart className="mr-2" size={18} />
                    {flag ? "Remove from Cart" : "Add to Cart"}
                  </Button>
                  <Button
                    onClick={handleAddToWishlist}
                    variant="outline"
                    className="h-12 cursor-pointer w-12 rounded-xl border-gray-200 text-gray-500 hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-all"
                  >
                    <Heart size={20} />
                  </Button>
                </div>

                <Link href={'/checkout'} className="w-full flex items-center justify-center h-12 bg-gray-900 cursor-pointer hover:bg-black text-white font-bold rounded-xl transition-all">
                  <CreditCard className="mr-2" size={18} />
                  Buy It Now
                </Link>
              </div>
              <div className="flex flex-wrap gap-6 pt-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-tight">
                  <Truck size={16} className="text-green-600" /> Free Delivery
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-tight">
                  <ShieldCheck size={16} className="text-green-600" /> 1 Year
                  Warranty
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
