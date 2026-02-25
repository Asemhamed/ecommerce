'use client'
import { AppState } from '@/Store/auth.store'
import useLogout from '@/app/(auth)/Hook/logout'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import imageLogo from '../../../../public/images/favicon.png'


export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const {logout} =useLogout();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const {isAuthenticated,userInfo}=useSelector((AppState:AppState)=>AppState.auth);
    const {numOfCartItems}=useSelector((CartApp:AppState)=>CartApp.cart);
    const {count} = useSelector((appState:AppState)=>appState.wishlist);

return <>
<div className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
                <nav className="container mx-auto w-[95%] lg:w-[90%] py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-8">
                            <Link href="/" className="flex items-center gap-2">
                                <Image src={imageLogo} alt="FreshCart Logo" className="w-9 h-9" />
                                <span className="font-black text-xl text-green-600 tracking-tight">FreshCart</span>
                            </Link>

                            <ul className="hidden lg:flex gap-6 items-center">
                                <li><Link href="/" className="text-sm font-bold text-gray-700 hover:text-green-600 transition">Home</Link></li>
                                <li><Link href="/products" className="text-sm font-bold text-gray-700 hover:text-green-600 transition">Products</Link></li>
                                <li><Link href="/brands" className="text-sm font-bold text-gray-700 hover:text-green-600 transition">Brands</Link></li>
                                <li><Link href="/categories" className="text-sm font-bold text-gray-700 hover:text-green-600 transition">Categories</Link></li>
                            </ul>
                        </div>

                        <div className="hidden lg:flex gap-6 items-center">
                            <div className="flex items-center gap-5 border-r pr-6 border-gray-200">
                                <Link href="/wishlist" className="relative group text-gray-600 hover:text-red-500 transition">
                                    <i className="fa-regular fa-heart text-xl"></i>
                                    {count > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                                            {count}
                                        </span>
                                    )}
                                </Link>

                                <Link href="/cart" className="relative group text-gray-600 hover:text-green-600 transition">
                                    <i className="fa-solid fa-cart-shopping text-xl"></i>
                                    <span className="absolute -top-2 -right-2 bg-green-600 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                                        {numOfCartItems}
                                    </span>
                                </Link>
                            </div>

                            <div className="flex items-center">
                                {isAuthenticated ? (
                                    <div className="relative">
                                        <button 
                                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                                            className="flex items-center gap-2 group focus:outline-none"
                                        >
                                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold text-sm border border-green-200 group-hover:bg-green-600 group-hover:text-white transition-all">
                                                {userInfo?.name.charAt(0).toUpperCase() || 'U'}
                                            </div>
                                            <i className={`fa-solid fa-chevron-down text-[10px] text-gray-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`}></i>
                                        </button>
                                        {isProfileOpen && (
                                            <>
                                                <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)}></div>
                                                <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-20 animate-in fade-in zoom-in duration-150">
                                                    <div className="px-4 py-2 border-b border-gray-50 mb-1">
                                                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Account</p>
                                                        <p className="text-sm font-bold text-gray-800 truncate">{userInfo?.name || 'User'}</p>
                                                    </div>
                                                    <Link href="/allorders" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-green-50 hover:text-green-600 transition font-medium">
                                                        <i className="fa-solid fa-box-open w-4"></i> My Orders
                                                    </Link>
                                                    <Link href="/wishlist" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-green-50 hover:text-green-600 transition font-medium lg:hidden">
                                                        <i className="fa-solid fa-heart w-4"></i> Wishlist
                                                    </Link>
                                                    <button 
                                                        onClick={() => { logout(); setIsProfileOpen(false); }} 
                                                        className="w-full cursor-pointer flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition font-medium"
                                                    >
                                                        <i className="fa-solid fa-arrow-right-from-bracket w-4"></i> Logout
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ) : (
                                    <div className="flex gap-3">
                                        <Link href="/login" className="text-sm font-bold text-gray-700 hover:text-green-600 transition px-4 py-2">Login</Link>
                                        <Link href="/register" className="text-sm font-bold bg-green-600 text-white px-5 py-2 rounded-xl hover:bg-green-700 transition shadow-md shadow-green-100">Register</Link>
                                    </div>
                                )}
                            </div>
                        </div>
                        <button className="lg:hidden text-2xl" onClick={() => setIsOpen(!isOpen)}>
                            <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars-staggered'} text-gray-700`}></i>
                        </button>
                    </div>
                </nav>
            </div>

            <div className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity lg:hidden z-40 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsOpen(false)}></div>
            <aside className={`fixed top-0 left-0 h-full w-[280px] bg-white shadow-2xl z-50 transform transition-transform duration-300 lg:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-6 h-full flex flex-col">
                    <div className="flex items-center gap-2 mb-8">
                        <Image src={imageLogo} alt="FreshCart Logo" className="w-8 h-8" />
                        <span className="font-bold text-xl text-green-600">FreshCart</span>
                    </div>

                    <ul className="flex flex-col gap-2">
                        <li><Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-green-50 hover:text-green-600 transition font-bold text-gray-700"><i className="fa-solid fa-house w-5 text-gray-400"></i> Home</Link></li>
                        <li><Link href="/products" onClick={() => setIsOpen(false)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-green-50 hover:text-green-600 transition font-bold text-gray-700"><i className="fa-solid fa-box w-5 text-gray-400"></i> Products</Link></li>
                        <li><Link href="/wishlist" onClick={() => setIsOpen(false)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-green-50 hover:text-green-600 transition font-bold text-gray-700"><i className="fa-solid fa-heart w-5 text-gray-400"></i> Wishlist</Link></li>
                        <li><Link href="/allorders" onClick={() => setIsOpen(false)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-green-50 hover:text-green-600 transition font-bold text-gray-700"><i className="fa-solid fa-receipt w-5 text-gray-400"></i> My Orders</Link></li>
                        <li><Link href="/brands" onClick={() => setIsOpen(false)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-green-50 hover:text-green-600 transition font-bold text-gray-700"><i className="fa-solid fa-box w-5 text-gray-400"></i> Brands</Link></li>
                        <li><Link href="/categories" onClick={() => setIsOpen(false)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-green-50 hover:text-green-600 transition font-bold text-gray-700"><i className="fa-solid fa-box w-5 text-gray-400"></i> Categoties</Link></li>
                    </ul>

                    <div className="mt-auto pt-6 border-t border-gray-100">
                        {isAuthenticated ? (
                            <button onClick={() => { logout(); setIsOpen(false); }} className="w-full py-3 bg-red-50 text-red-600 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition">
                                <i className="fa-solid fa-arrow-right-from-bracket"></i> Logout
                            </button>
                        ) : (
                            <div className="flex flex-col gap-3">
                                <Link href="/login" onClick={() => setIsOpen(false)} className="w-full text-center py-3 border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition">Login</Link>
                                <Link href="/register" onClick={() => setIsOpen(false)} className="w-full text-center py-3 bg-green-600 text-white rounded-xl font-bold shadow-lg shadow-green-100">Register</Link>
                            </div>
                        )}
                    </div>
                </div>
            </aside>
</>
//   return<>
// <div className="bg-gray-100 shadow-sm sticky top-0 z-50">
//         <nav className="container mx-auto w-[95%] lg:w-[90%] py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-8">
//               <Link href="/" className="flex items-center gap-2">
//                 <Image src={imageLogo} alt="FreshCart Logo" className="w-10 h-10" />
//                 <span className="font-bold text-xl text-green-600">FreshCart</span>
//               </Link>
              
//               <ul className="hidden lg:flex gap-6 items-center">
//                 <li><Link href="/" className="text-sm font-semibold hover:text-green-600 transition">Home</Link></li>
//                 <li><Link href="/products" className="text-sm font-semibold hover:text-green-600 transition">Products</Link></li>
//                 <li><Link href="/brands" className="text-sm font-semibold hover:text-green-600 transition">Brands</Link></li>
//                 <li><Link href="/categories" className="text-sm font-semibold hover:text-green-600 transition">Categories</Link></li>
//               </ul>
//             </div>


//             <div className="hidden lg:flex gap-5 items-center">
//               <ul className="flex gap-3 text-gray-600">
//                 <li><i className="fa-brands fa-facebook hover:text-blue-600 cursor-pointer"></i></li>
//                 <li><i className="fa-brands fa-twitter hover:text-blue-400 cursor-pointer"></i></li>
//                 <li><i className="fa-brands fa-instagram hover:text-pink-600 cursor-pointer"></i></li>
//                 <li><i className="fa-brands fa-linkedin hover:text-blue-700 cursor-pointer"></i></li>
//               </ul>
//               <div className="flex gap-5 items-center border-l pl-5 ml-2 border-gray-300">
//                 <Link href="/cart" className="relative">
//                   <i className="fa-solid fa-cart-shopping text-lg"></i>
//                   <span className="absolute -top-2 -right-2 bg-green-600 text-white text-[10px] rounded-full px-1.5">{numOfCartItems}</span>
//                 </Link>
//                 {isAuthenticated?<Link href="/login" onClick={logout} className="text-sm font-semibold hover:text-green-600 transition"><div className='flex items-center justify-center flex-col'><i className="fa-solid fa-arrow-right-from-bracket"></i>Logout</div></Link>:
//                 <>
//                 <Link href="/login" className="text-sm font-semibold hover:text-green-600 transition"><div className='flex items-center justify-center flex-col'><i className="fa-solid fa-user"></i>Login</div></Link>
//                 <Link href="/register" className="text-sm font-semibold hover:text-green-600 transition"><div className='flex items-center justify-center flex-col'><i className="fa-solid fa-user-plus"></i>Register</div></Link>
//                 </>}

//               </div>
//             </div>


//             <button 
//               className="lg:hidden text-2xl z-50"
//               onClick={() => setIsOpen(!isOpen)}
//             >
//               <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
//             </button>
//           </div>
//         </nav>
//       </div>


//       <div 
//         className={`fixed inset-0 bg-black/50 transition-opacity lg:hidden z-40 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
//         onClick={() => setIsOpen(false)}
//       ></div>

//       <aside className={`fixed top-0 left-0 h-full w-[280px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
//         <div className="p-6">
//           <div className="flex items-center gap-2 mb-8">
//             <Image src={imageLogo} alt="FreshCart Logo" className="w-8 h-8" />
//             <span className="font-bold text-xl text-green-600">FreshCart</span>
//           </div>

//           <ul className="flex flex-col gap-2">
//             <li>
//                 <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-50 hover:text-green-600 transition font-medium">
//                     <i className="fa-solid fa-house w-5"></i> Home
//                 </Link>
//             </li>
//             <li>
//                 <Link href="/products" onClick={() => setIsOpen(false)} className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-50 hover:text-green-600 transition font-medium">
//                     <i className="fa-solid fa-box w-5"></i> Products
//                 </Link>
//             </li>
//             <li>
//                 <Link href="/brands" onClick={() => setIsOpen(false)} className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-50 hover:text-green-600 transition font-medium">
//                     <i className="fa-solid fa-tag w-5"></i> Brands
//                 </Link>
//             </li>
//             <li>
//                 <Link href="/categories" onClick={() => setIsOpen(false)} className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-50 hover:text-green-600 transition font-medium">
//                     <i className="fa-solid fa-layer-group w-5"></i> Categories
//                 </Link>
//             </li>
//             <li>
//                 <Link href="/cart" onClick={() => setIsOpen(false)} className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-50 hover:text-green-600 transition font-medium">
//                     <i className="fa-solid fa-cart-shopping w-5"></i> My Cart ({numOfCartItems})
//                 </Link>
//             </li>
//           </ul>

//           <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col gap-4">
//             {isAuthenticated?<Link  href="/login" onClick={() => { logout;setIsOpen(false)}} className="w-full text-center py-2 bg-green-600 text-white rounded-lg font-semibold shadow-md hover:bg-green-600/88 transition"><i className="fa-solid fa-arrow-right-from-bracket me-1"></i>Logout</Link>:
//                               <>
//                               <Link href="/login" onClick={() => setIsOpen(false)} className="w-full text-center py-2 border border-green-600 text-green-600 rounded-lg font-semibold hover:bg-green-600/88 hover:text-white transition">Login</Link>
//                               <Link href="/register" onClick={() => setIsOpen(false)} className="w-full text-center py-2 bg-green-600 text-white rounded-lg font-semibold shadow-md hover:bg-green-600/88 transition">Register</Link>
//                               </>}
//           </div>
//         </div>
//       </aside>

  
//     </>
    }
