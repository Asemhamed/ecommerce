import React from 'react';
import { Trash2, ShoppingCart, Star } from 'lucide-react'; // Using Lucide for clean icons
import { WishlistProduct } from '@/Types/WishlistTypes';
import { title } from 'process';
import { removeItemFromWishlist } from '@/serverAPIs/WishlistActions';
import { toast } from 'react-toastify';
import { useAppDispatch } from '@/Store/auth.store';
import { removeFromWishlist } from '../../Store/Slice.wishlist';
import { addToCart, getLoggedUserCart } from '@/serverAPIs/CartActions';
import { setInfoCart } from '@/app/(platform)/cart/Store/slice.cart';



export default function WishlistCard({data}:{data:WishlistProduct}) {
    const dispatch= useAppDispatch();

    async function handleRemoveFromWishlist() {
        try{
        const response = await removeItemFromWishlist(data.id);
        if(response.status === 'success'){
            dispatch(removeFromWishlist({id:data.id}));
        }
        }catch(error){
            throw error
        }
        
    }

    async function handleAddToCart() {
        
        try{
            const response = await addToCart(data.id);
            if(response.status === 'success'){
                toast.success('Item added to cart successfully!');
                const cartInfo = await getLoggedUserCart();
                dispatch(setInfoCart(cartInfo));
                handleRemoveFromWishlist();
            }
        }catch(error){
            throw error
        }
    }

    return (
    <div className="group relative w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-md transition-all hover:shadow-xl">

      <div className="relative h-64 w-full overflow-hidden bg-gray-100">
        <img
          src={data.imageCover}
          alt={data.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-sm font-semibold backdrop-blur-sm">
          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
          <span>{data.ratingsAverage}</span>
        </div>

        <button 
            onClick={handleRemoveFromWishlist}
          className="absolute cursor-pointer right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-500 shadow-sm transition-colors hover:bg-red-50 hover:text-red-600"
          aria-label="Remove from wishlist"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>


      <div className="p-5">
        <span className="text-xs font-bold uppercase tracking-wider text-green-600">
          {data.category.name}
        </span>
        <h3 className="mt-1 text-lg font-bold text-gray-900 line-clamp-1">
          {data.title}
        </h3>
        
        <div className="mt-4 flex items-center justify-between">
          <span className="text-2xl font-black text-gray-900">
            ${data.price.toFixed(2)}
          </span>
          
          <button
            onClick={handleAddToCart}
            className="flex cursor-pointer items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-green-700 active:scale-95">
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

