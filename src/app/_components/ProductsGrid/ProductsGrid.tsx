"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/app/_components/ProductCard/ProductCard";
import { getAllProducts, getProductByCategory } from "@/serverAPIs/products.api";
import { getAllCategories } from "@/serverAPIs/Categories";
import GsapStagger from "@/components/shared/GsapStagger";
import { SlidersHorizontal, Check, LayoutGrid as Grid, ShoppingBag, Loader2 } from "lucide-react";

type Product = Awaited<ReturnType<typeof getAllProducts>>[number];
type Category = Awaited<ReturnType<typeof getAllCategories>>[number];

export default function ProductsGrid() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [activeCategoryId, setActiveCategoryId] = useState<string | undefined>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllCategories().then(setCategories);
    }, []);

    useEffect(() => {
        setLoading(true);
        setProducts([]);

        const fetcher = activeCategoryId
            ? getProductByCategory(activeCategoryId)
            : getAllProducts();

        fetcher.then((data) => {
            setProducts(data);
            setLoading(false);
        });
    }, [activeCategoryId]);

    const activeCategory = categories.find((cat) => cat._id === activeCategoryId);

    const handleSelect = (categoryId?: string) => {
        setActiveCategoryId(categoryId);
    };

    return (
        <div className="container mx-auto w-[95%] lg:w-[90%] my-10">
            <div className="mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                            {activeCategory ? activeCategory.name : "Popular Products"}
                        </h1>
                        <p className="mt-1.5 text-sm text-gray-500">
                            {activeCategory
                                ? `Discover our exclusive collection of ${activeCategory.name.toLowerCase()}`
                                : "Explore our wide range of premium products selected just for you."}
                        </p>
                    </div>
                    {!loading && (
                        <div className="text-xs md:text-sm text-gray-500 font-medium bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 shrink-0">
                            Showing <span className="font-bold text-gray-900">{products.length}</span> products
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* SIDEBAR — Desktop */}
                <aside className="hidden md:block w-64 shrink-0 sticky top-24 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                    <div className="flex items-center gap-2 pb-4 mb-4 border-b border-gray-100">
                        <span className="p-1.5 rounded-lg bg-green-50 text-green-600">
                            <SlidersHorizontal className="h-4 w-4" />
                        </span>
                        <h3 className="font-bold text-gray-900 text-xs tracking-wide uppercase">Categories</h3>
                    </div>
                    <div className="space-y-1">
                        <button
                            onClick={() => handleSelect(undefined)}
                            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${!activeCategoryId
                                    ? "bg-green-600 text-white shadow-md shadow-green-100"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-green-600"
                                }`}
                        >
                            <div className="flex items-center gap-2.5">
                                <Grid className="h-4 w-4 shrink-0" />
                                <span>All Products</span>
                            </div>
                            {!activeCategoryId && <Check className="h-4 w-4 shrink-0 text-white" />}
                        </button>

                        {categories.map((category) => {
                            const isActive = activeCategoryId === category._id;
                            return (
                                <button
                                    key={category._id}
                                    onClick={() => handleSelect(category._id)}
                                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${isActive
                                            ? "bg-green-600 text-white shadow-md shadow-green-100"
                                            : "text-gray-600 hover:bg-gray-50 hover:text-green-600"
                                        }`}
                                >
                                    <span className="truncate">{category.name}</span>
                                    {isActive && <Check className="h-4 w-4 shrink-0 text-white" />}
                                </button>
                            );
                        })}
                    </div>
                </aside>

                <div className="flex-1 w-full">
                    {/* PILLS — Mobile */}
                    <div className="md:hidden w-full overflow-x-auto pb-3 mb-4 scrollbar-none flex gap-2">
                        <button
                            onClick={() => handleSelect(undefined)}
                            className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold border transition-all ${!activeCategoryId
                                    ? "bg-green-600 text-white border-green-600 shadow-sm"
                                    : "bg-white text-gray-600 border-gray-200 hover:border-green-600 hover:text-green-600"
                                }`}
                        >
                            All Products
                        </button>
                        {categories.map((category) => {
                            const isActive = activeCategoryId === category._id;
                            return (
                                <button
                                    key={category._id}
                                    onClick={() => handleSelect(category._id)}
                                    className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold border transition-all ${isActive
                                            ? "bg-green-600 text-white border-green-600 shadow-sm"
                                            : "bg-white text-gray-600 border-gray-200 hover:border-green-600 hover:text-green-600"
                                        }`}
                                >
                                    {category.name}
                                </button>
                            );
                        })}
                    </div>

                    {/* LOADING */}
                    {loading ? (
                        <div className="flex items-center justify-center py-24">
                            <Loader2 className="h-8 w-8 animate-spin text-green-600" />
                        </div>
                    ) : products.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 px-4 bg-gray-50/50 border border-dashed border-gray-200 rounded-2xl">
                            <ShoppingBag className="h-12 w-12 text-gray-400 mb-3" />
                            <h3 className="text-lg font-bold text-gray-900 mb-1">No products found</h3>
                            <p className="text-sm text-gray-500 text-center max-w-sm">
                                We couldn't find any products in this category. Try selecting another one!
                            </p>
                            <button
                                onClick={() => handleSelect(undefined)}
                                className="mt-4 px-4 py-2 text-xs font-bold text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                            >
                                View All Products
                            </button>
                        </div>
                    ) : (
                        <GsapStagger
                            key={activeCategoryId ?? "all"}
                            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                            staggerAmount={0.04}
                        >
                            {products.map((product) => (
                                <ProductCard product={product} key={product._id} />
                            ))}
                        </GsapStagger>
                    )}
                </div>
            </div>
        </div>
    );
}