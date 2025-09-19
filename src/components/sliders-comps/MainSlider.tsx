"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { EffectFade, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

export default function MainSlider() {
  return (
    <div className="container mx-auto">
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Navigation, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="relative h-[470px]">
            <Image
              src="/slider/slider-1.jpg"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              alt="slider-images"
              className="object-cover"
              priority
              loading="eager"
            />
            <div className="absolute text-lg top-[200px] left-[40px]">
              <h2 className="my-5 text-red-700">SUMMER COLLECTION</h2>
              <p className="my-5">
                products can be found here at the best prices.
              </p>
              <Button className="my-4 cursor-pointer">
                <Link href="/products">Shop Now</Link>
              </Button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative h-[470px]">
            <Image
              src="/slider/slider-2.jpg"
              fill
              sizes="100vw"
              alt="slider-images"
              className="object-cover"
              priority
              loading="eager"
            />
            <div className="absolute text-lg top-[200px] left-[40px]">
              <h2 className="my-5 text-red-500">SUMMER COLLECTION</h2>
              <p className="my-5 text-white">
                products can be found here at the best prices.
              </p>
              <Button className="my-4 cursor-pointer">
                <Link href="/products">Shop Now</Link>
              </Button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative h-[470px]">
            <Image
              src="/slider/slider-3.jpg"
              fill
              sizes="100vw"
              alt="slider-images"
              className="object-cover"
              priority
              loading="eager"
            />
            <div className="absolute text-lg top-[200px] left-[40px]">
              <h2 className="my-5 text-red-600">SUMMER COLLECTION</h2>
              <p className="my-5">
                products can be found here at the best prices.
              </p>
              <Button className="my-4 cursor-pointer">
                <Link href="/products">Shop Now</Link>
              </Button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative h-[470px]">
            <Image
              src="/slider/slider-4.jpg"
              fill
              sizes="100vw"
              alt="slider-images"
              className="object-cover"
              priority
              loading="eager"
            />
            <div className="absolute text-lg top-[200px] left-[40px]">
              <h2 className="my-5 text-red-600">SUMMER COLLECTION</h2>
              <p className="my-5 text-white">
                products can be found here at the best prices.
              </p>
              <Button className="my-4 cursor-pointer">
                <Link href="/products">Shop Now</Link>
              </Button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative h-[470px]">
            <Image
              src="/slider/slider-5.jpg"
              fill
              sizes="100vw"
              alt="slider-images"
              className="object-cover"
              priority
              loading="eager"
            />
            <div className="absolute text-lg top-[200px] left-[40px]">
              <h2 className="my-5 text-red-600">SUMMER COLLECTION</h2>
              <p className="my-5 text-white">
                products can be found here at the best prices.
              </p>
              <Button className="my-4 cursor-pointer">
                <Link href="/products">Shop Now</Link>
              </Button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
