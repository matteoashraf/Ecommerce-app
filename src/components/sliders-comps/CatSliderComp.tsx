"use client";
import { Categories } from "@/app/types/category.model";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

export default function CatSliderComp({
  category,
}: {
  category: Categories[];
}) {
  return (
    <div className="container mx-auto mt-10">
      <Swiper
        breakpoints={{
          0: {
            slidesPerView: 2,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 70,
          },
        }}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation, Pagination]}
        className="mySwiper container"
      >
        {category.map((cat) => (
          <>
            <SwiperSlide key={cat._id} className="pb-10">
              <div className="relative h-[250px] w-full">
                <Image
                  src={cat.image}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  alt="slider-images"
                  className="object-cover"
                  priority
                  loading="eager"
                />
              </div>
              <p className="text-center text-lg">{cat.name}</p>
            </SwiperSlide>
          </>
        ))}
      </Swiper>
    </div>
  );
}
