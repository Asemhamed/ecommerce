import Link from 'next/link';
import Image from 'next/image';
import image from '../../public/images/error.svg'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md text-center">
        <div className="relative w-full h-64 mb-8">
          <Image
            src={image} 
            alt="404 Error - Page Not Found"
            fill
            className="object-contain"
            priority
          />
        </div>

        <h1 className="text-6xl font-extrabold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Oops! You've wandered off the map.
        </h2>
        <p className="text-gray-600 mb-8">
          The page you are looking for doesn't exist or has been moved to a new secret location.
        </p>

        <Link
          href="/"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg"
        >
          Take Me Home
        </Link>
      </div>

      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-5 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] font-black">
          404
        </div>
      </div>
    </div>
  );
}