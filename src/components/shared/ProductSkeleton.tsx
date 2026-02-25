export default function ProductSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="flex flex-col space-y-4 animate-pulse">
          {/* Image Placeholder */}
          <div className="aspect-square w-full bg-gray-200 rounded-2xl" />
          
          <div className="space-y-2">
            {/* Title Placeholder */}
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            {/* Price Placeholder */}
            <div className="h-4 bg-gray-200 rounded w-1/4" />
          </div>
          
          {/* Button Placeholder */}
          <div className="h-10 bg-gray-100 rounded-lg w-full" />
        </div>
      ))}
    </div>
  );
}