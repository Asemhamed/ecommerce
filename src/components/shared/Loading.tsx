import ProductSkeleton from "./ProductSkeleton";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto pt-10">
      <div className="px-6 mb-8">
        {/* Category Title Placeholder */}
        <div className="h-8 bg-gray-200 rounded-md w-48 animate-pulse mb-2" />
        <div className="h-4 bg-gray-100 rounded-md w-64 animate-pulse" />
      </div>
      
      <ProductSkeleton />
    </div>
  );
}