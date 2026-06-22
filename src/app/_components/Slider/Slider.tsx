'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from 'next/image';
import { category } from '@/Types/APIsType';
import { Autoplay } from 'swiper/modules';
import Link from 'next/link';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}
    
export default function Slider({allCategories}:{allCategories:category[]}) {
  const headerRef = useRef<HTMLDivElement>(null);
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 92%',
            toggleActions: 'play none none none',
          }
        }
      );
      gsap.fromTo(sliderContainerRef.current,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sliderContainerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return<>
    <section className="container mx-auto w-[95%] lg:w-[90%] py-10">
      <div ref={headerRef} className="flex items-center justify-between mb-6" style={{ opacity: 0 }}>
        <h2 className="text-2xl font-bold text-gray-800">Shop Popular Categories</h2>
        <div className="h-1 flex-grow mx-4 bg-white rounded-full hidden md:block"></div>
      </div>

      <div ref={sliderContainerRef} style={{ opacity: 0 }}>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={15}
        slidesPerView={2}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        navigation={true}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
          1280: { slidesPerView: 7 },
        }}
        className="category-swiper !pb-10"
      >
        {allCategories?.map((category) => (
          <SwiperSlide key={category._id} className="group cursor-pointer">
            <Link href={`/CategoryDetails/${category._id}`} >
            <div className="relative overflow-hidden rounded-xl bg-white border border-gray-100 transition-all duration-300 group-hover:shadow-md group-hover:border-green-200">
              <div className="relative h-48 w-full">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 768px) 33vw, 15vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-3 bg-white">
                <h3 className="text-center text-sm font-semibold text-gray-700 truncate group-hover:text-green-600 transition-colors">
                  {category.name}
                </h3>
              </div>
            </div>
          </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      </div>

      
    </section>
    </>
}
