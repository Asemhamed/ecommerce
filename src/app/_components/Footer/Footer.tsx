import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import MasterCard from '../../../../public/images/mastercard.webp';
import Paypal from '../../../../public/images/paypal.png';
import Amazon from '../../../../public/images/amazon-pay.png';
import AmericanImage from '../../../../public/images/American-Express-Color.png';
import Image from "next/image";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Phone, Mail, MapPin, ShoppingCart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">

      {/* Main Footer Content */}
      <div className="container mx-auto w-[95%] lg:w-[90%] py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <div className="inline-flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 mb-4">
              <ShoppingCart className="text-green-400 w-5 h-5" />
              <span className="text-white font-extrabold text-lg tracking-tight">FreshCart</span>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              FreshCart is your <span className="text-green-400">one-stop destination</span> for quality products.
              We bring you the best brands with a seamless shopping experience.
            </p>

            <div className="space-y-2.5 text-sm">
              <div className="flex items-center gap-2.5 text-gray-400">
                <Phone className="w-4 h-4 text-green-400 shrink-0" />
                <span>+1 (800) 123-4567</span>
              </div>
              <div className="flex items-center gap-2.5 text-gray-400">
                <Mail className="w-4 h-4 text-green-400 shrink-0" />
                <span>support@freshcart.com</span>
              </div>
              <div className="flex items-center gap-2.5 text-gray-400">
                <MapPin className="w-4 h-4 text-green-400 shrink-0" />
                <span>123 Commerce St, NY 10001</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-6">
              {[
                { icon: <Facebook className="w-4 h-4" />, label: "Facebook" },
                { icon: <Twitter className="w-4 h-4" />, label: "Twitter" },
                { icon: <Instagram className="w-4 h-4" />, label: "Instagram" },
                { icon: <Youtube className="w-4 h-4" />, label: "YouTube" },
              ].map(({ icon, label }) => (
                <button
                  key={label}
                  title={label}
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 border border-gray-700 text-gray-400 hover:bg-green-600 hover:text-white hover:border-green-600 transition-all duration-200 active:scale-90"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-white font-bold text-sm mb-5">Shop</h4>
            <ul className="space-y-3 text-sm">
              {["All Products", "Categories", "Electronics", "Fashion"].map((item) => (
                <li key={item}>
                  <Link
                    href="/products"
                    className="text-gray-400 hover:text-green-400 transition-colors duration-150"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-white font-bold text-sm mb-5">Support</h4>
            <ul className="space-y-3 text-sm">
              {["Contact Us", "Help Center", "Returns", "Track Order"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-green-400 transition-colors duration-150"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Subscribe */}
          <div>
            <h4 className="text-white font-bold text-sm mb-5">Subscribe</h4>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              Get the latest updates on new products and <span className="text-green-400">upcoming sales</span>.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-gray-800 border-gray-700 text-gray-200 placeholder:text-gray-500 focus-visible:ring-green-500 text-sm h-10 rounded-lg"
              />
              <Button className="bg-green-600 hover:bg-green-700 text-white font-bold text-sm h-10 px-4 rounded-lg shrink-0 transition-colors">
                Join
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto w-[95%] lg:w-[90%] py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} <span className="text-green-400 font-semibold">FreshCart</span>. All rights reserved.
          </p>

          {/* Payment Icons */}
          <div className="flex items-center gap-2">
            <Image src={Amazon} alt="Amazon Pay" className="h-7 w-auto opacity-60 hover:opacity-100 transition grayscale hover:grayscale-0" />
            <Image src={MasterCard} alt="MasterCard" className="h-7 w-auto opacity-60 hover:opacity-100 transition grayscale hover:grayscale-0" />
            <Image src={Paypal} alt="Paypal" className="h-7 w-auto opacity-60 hover:opacity-100 transition grayscale hover:grayscale-0" />
            <Image src={AmericanImage} alt="American Express" className="h-7 w-auto opacity-60 hover:opacity-100 transition grayscale hover:grayscale-0" />
          </div>
        </div>
      </div>
    </footer>
  );
}
