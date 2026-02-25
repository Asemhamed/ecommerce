'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image1 from '../../../../public/images/slider-image-1.jpeg'
import Image2 from '../../../../public/images/slider-image-2.jpeg'
import Image3 from '../../../../public/images/slider-image-3.jpeg'
import Image from 'next/image';
import { Autoplay, Pagination } from 'swiper/modules';

export default function MianSlider() {
return<>
<section className="container mx-auto w-[95%] lg:w-[90%] py-8">
      <div className="grid grid-cols-12 gap-0 overflow-hidden rounded-2xl shadow-sm border border-gray-100">
        
        <div className="col-span-12 lg:col-span-8">
          <Swiper
            modules={[Autoplay, Pagination]}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            className="main-slider-swiper h-full"
          >
            <SwiperSlide>
              <Image 
                src={Image1} 
                alt="Fresh Vegetables Promo" 
                className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover"
                priority
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image 
                src={Image2} 
                alt="Bakery Items" 
                className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image 
                src={Image3} 
                alt="Organic Fruits" 
                className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover"
              />
            </SwiperSlide>
          </Swiper>
        </div>

        <div className="hidden lg:flex lg:col-span-4 flex-col">
          <div className="relative h-1/2 w-full">
            <Image 
              src={Image2} 
              alt="Side Banner 1" 
              fill
              className="object-cover border-l border-b border-gray-100"
            />
          </div>
          <div className="relative h-1/2 w-full">
            <Image 
              src={Image3} 
              alt="Side Banner 2" 
              fill
              className="object-cover border-l border-gray-100"
            />
          </div>
        </div>
      </div>

    </section>
    </>
}
