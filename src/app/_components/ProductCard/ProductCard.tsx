'use client'

import { setInfoCart } from "@/app/(platform)/cart/Store/slice.cart";
import { setWishlistInfo } from "@/app/(platform)/wishlist/Store/Slice.wishlist";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { addToCart, getLoggedUserCart } from "@/serverAPIs/CartActions";
import { addToWishlist, GetLoggedUserWishlist } from "@/serverAPIs/WishlistActions";
import { AppState, useAppDispatch } from "@/Store/auth.store";
import { Product } from '@/Types/APIsType';
import { Eye, Heart, ShoppingCart, Star } from 'lucide-react';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";



export default function ProductCard({product}:{product:Product}) {
    const {isAuthenticated}=useSelector((appStates:AppState)=>appStates.auth)
    const dispatch = useAppDispatch();
    const router = useRouter()

    async function handleAddToCart() {
      if(isAuthenticated){
          try{
                  const response = await addToCart(product._id);
                  if(response.status == 'success'){
                    toast.success('Product added to cart successfully!');
                    const cartInfo = await getLoggedUserCart();
                    dispatch(setInfoCart(cartInfo));
                  }
                }catch(error){
                  toast.error('Failed to add product to cart');
                }
      }else{
        router.push('/login');
      }
      
    }

    async function handleAddToWishlist() {
      if(isAuthenticated){
        try{
          const response = await addToWishlist(product._id);
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
    return <>
<Card className="group relative mx-auto w-full max-w-sm overflow-hidden border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">


      <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
        <img
          src={product.imageCover}
          alt={product.title || "Product image"}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        
        <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Link href={`/productDetails/${product._id}`}>
            <button title="View Details" className="flex cursor-pointer h-11 w-11 items-center justify-center rounded-full bg-white text-gray-900 shadow-lg transition-all hover:bg-green-600 hover:text-white active:scale-90">
              <Eye size={20} />
            </button>
          </Link>
          <button onClick={handleAddToWishlist} title="Wishlist" className="flex cursor-pointer h-11 w-11 items-center justify-center rounded-full bg-white text-gray-900 shadow-lg transition-all hover:bg-pink-500 hover:text-white active:scale-90">
            <Heart size={20} />
          </button>
        </div>
      </div>

      <CardHeader className="space-y-2 p-5">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-bold uppercase tracking-widest text-green-600">
            {product.category?.name}
          </p>
          <div className="flex items-center gap-1 rounded-full bg-yellow-50 px-2 py-0.5 text-xs font-bold text-yellow-700">
            <Star className="fill-yellow-500 text-yellow-500" size={12} />
            {product.ratingsAverage}
          </div>
        </div>
        
        <CardTitle className="line-clamp-1 text-lg font-semibold text-gray-800 transition-colors group-hover:text-green-600">
          {product.title}
        </CardTitle>
        
        <CardDescription className="line-clamp-2 min-h-[40px] text-sm leading-relaxed text-gray-500">
          {product.description}
        </CardDescription>

        <div className="flex items-baseline gap-2 pt-1">
            <span className="text-xl font-black text-gray-900">
              {product.price} <span className="text-xs font-medium">EGP</span>
            </span>
        </div>
      </CardHeader>

      <CardFooter className="p-5 pt-0">
        <Button onClick={handleAddToCart} className="w-full bg-green-600 cursor-pointer py-6 text-sm font-bold text-white transition-all hover:bg-green-700 active:scale-[0.98]">
          <ShoppingCart className="mr-2" size={18} />
          ADD TO CART
        </Button>
      </CardFooter>
    </Card>



 
    

    
    </>
    }
