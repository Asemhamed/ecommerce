
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import MasterCard from '../../../../public/images/mastercard.webp'
import Paypal from '../../../../public/images/paypal.png'
import Amazon from '../../../../public/images/amazon-pay.png'
import AmericanImage from '../../../../public/images/American-Express-Color.png'
import GetGoogle from '../../../../public/images/get-google-play.png'
import GetApple from '../../../../public/images/get-apple-store.png'
import logo from '../../../../public/images/freshcart-logo.svg'
import Image from "next/image";
import Link from "next/link";


export default function Footer() {
  return <>

<footer className="bg-gray-100 mt-16 border-t border-gray-200">
      <div className="container mx-auto w-[95%] lg:w-[90%] py-12">
        
        {/* Top Section: Branding and Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">

          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold text-green-600 mb-4"> FreshCart</h3>
            <p className="text-sm text-gray-600 mb-6">
              Your one-stop destination for the latest technology, fashion, and lifestyle products. 
              Quality guaranteed with fast shipping and excellent customer service.
            </p>
            <div className="text-sm text-gray-600 space-y-2">
              <p>📍 123 Shop Street, October City, DC 12345</p>
              <p>📞 (+20) 01093333333</p>
              <p>✉️ support@shopmart.com</p>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-800 mb-4">SHOP</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li><Link href="#" className="hover:text-green-600 transition">Electronics</Link></li>
              <li><Link href="#" className="hover:text-green-600 transition">Fashion</Link></li>
              <li><Link href="#" className="hover:text-green-600 transition">Home & Garden</Link></li>
              <li><Link href="#" className="hover:text-green-600 transition">Sports</Link></li>
              <li><Link href="#" className="hover:text-green-600 transition">Deals</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-800 mb-4">CUSTOMER SERVICE</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li><Link href="#" className="hover:text-green-600 transition">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-green-600 transition">Help Center</Link></li>
              <li><Link href="#" className="hover:text-green-600 transition">Track Your Order</Link></li>
              <li><Link href="#" className="hover:text-green-600 transition">Returns & Exchanges</Link></li>
              <li><Link href="#" className="hover:text-green-600 transition">Size Guide</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-800 mb-4">ABOUT</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li><Link href="#" className="hover:text-green-600 transition">About shopmart</Link></li>
              <li><Link href="#" className="hover:text-green-600 transition">Careers</Link></li>
              <li><Link href="#" className="hover:text-green-600 transition">Press</Link></li>
              <li><Link href="#" className="hover:text-green-600 transition">Investor Relations</Link></li>
              <li><Link href="#" className="hover:text-green-600 transition">Sustainability</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-800 mb-4">POLICIES</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li><Link href="#" className="hover:text-green-600 transition">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-green-600 transition">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-green-600 transition">Cookie Policy</Link></li>
              <li><Link href="#" className="hover:text-green-600 transition">Shipping Policy</Link></li>
              <li><Link href="#" className="hover:text-green-600 transition">Refund Policy</Link></li>
            </ul>
          </div>
        </div>

        <hr className="my-8 border-gray-300" />

        <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="flex flex-wrap justify-center items-center gap-4">
            <span className="font-medium text-gray-700 mr-2">Payment Partners</span>
            <div className="flex items-center gap-3">
              <Image src={Amazon} alt="Amazon Pay" className="w-12 h-auto grayscale hover:grayscale-0 transition cursor-pointer" />
              <Image src={AmericanImage} alt="American Express" className="w-12 h-auto grayscale hover:grayscale-0 transition cursor-pointer" />
              <Image src={MasterCard} alt="MasterCard" className="w-12 h-auto grayscale hover:grayscale-0 transition cursor-pointer" />
              <Image src={Paypal} alt="Paypal" className="w-12 h-auto grayscale hover:grayscale-0 transition cursor-pointer" />
            </div>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4">
            <span className="font-medium text-gray-700 mr-2">Get deliveries with FreshCart</span>
            <div className="flex items-center gap-3">
              <Image src={GetApple} alt="App Store" className="w-32 h-auto cursor-pointer hover:opacity-80 transition" />
              <Image src={GetGoogle} alt="Google Play" className="w-32 h-auto cursor-pointer hover:opacity-80 transition" />
            </div>
          </div>
        </div>

        <hr className="my-8 border-gray-300" />

        <div className="text-sm text-gray-500 text-center">
          © {new Date().getFullYear()} FreshCart E-Commerce. All rights reserved.
        </div>
      </div>
    </footer>

    </>
}
