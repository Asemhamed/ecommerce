import { Headphones, RotateCcw, ShieldCheck, Truck } from 'lucide-react';
import GsapStagger from '@/components/shared/GsapStagger';

const features = [
  {
    icon: <Truck className="w-6 h-6" />,
    iconBg: "bg-blue-50 text-blue-500",
    title: "Free Shipping",
    desc: "On orders over 500 EGP",
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    iconBg: "bg-green-50 text-green-500",
    title: "Secure Payment",
    desc: "100% secure transactions",
  },
  {
    icon: <RotateCcw className="w-6 h-6" />,
    iconBg: "bg-orange-50 text-orange-500",
    title: "Easy Returns",
    desc: "14-day return policy",
  },
  {
    icon: <Headphones className="w-6 h-6" />,
    iconBg: "bg-purple-50 text-purple-500",
    title: "24/7 Support",
    desc: "Dedicated support team",
  },
];

export default function HomeBanner() {
  return (
    <div className="w-full bg-white border-y border-gray-100 py-5 px-4">
      <GsapStagger
        className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        staggerAmount={0.1}
      >
        {features.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div
              className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full ${item.iconBg}`}
            >
              {item.icon}
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-sm">{item.title}</h3>
              <p className="text-gray-500 text-xs mt-0.5">{item.desc}</p>
            </div>
          </div>
        ))}
      </GsapStagger>
    </div>
  );
}
