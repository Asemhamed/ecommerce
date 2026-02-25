import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface CategoryCardProps {
  name: string;
  _id: string;
  slug: string;
  image: string;
}

export function CategoryCard({category}: {category:CategoryCardProps}) {
  
  return (
    <Link 
      href={`/CategoryDetails/${category._id}`} 
      className="group relative block aspect-[4/5] overflow-hidden rounded-3xl bg-gray-200"
    >
      <img
        src={category.image}
        alt={category.name}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />


      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />


      <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
        <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
          <h3 className="mt-2 text-2xl font-bold leading-tight sm:text-3xl">
            {category.name}
          </h3>
          <div className="mt-4 flex items-center gap-2 text-sm font-bold opacity-0 transition-all duration-500 group-hover:opacity-100">
            <span>Shop Collection</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
};

