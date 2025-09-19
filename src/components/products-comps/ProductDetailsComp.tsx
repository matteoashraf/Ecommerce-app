"use client";
import { ProductDetails } from "@/app/types/productDetails.model";
import { StarRating } from "react-flexible-star-rating";
import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import Image from "next/image";
import { useCart } from "@/app/context/CartContext";
import { addProductToCart } from "@/app/actions/cart.action";
import toast from "react-hot-toast";

export default function ProductDetailsComp({
  productDetails,
}: {
  productDetails: ProductDetails;
}) {
  const { getCartDetails } = useCart();
  async function handleAddToCart(productId: string) {
    const response = await addProductToCart(productId);
    toast.success(response?.message);
    await getCartDetails();
  }
  return (
    <div className="md:flex justify-between items-center gap-8">
      <div className="w-full md:w-2/5">
        <Swiper
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {productDetails.images.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-[500px] w-full">
                <Image
                  src={src}
                  fill
                  priority
                  loading="eager"
                  sizes="(max-width:768px) 100vw (max-width:1200px) 50vw , 25vw"
                  alt="slider-images"
                  className="md:object-contain max-md:p-7 "
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="w-full md:w-2/3 max-md:p-7">
        <h2 className="text-4xl tracking-tighter font-semibold">
          {productDetails.title}
        </h2>
        <p className="text-slate-500 text-md tracking-tighter my-2 px-2">
          {productDetails.description}
        </p>
        <div className="flex justify-between items-center">
          <div className="catPrice">
            <p className="text-md tracking-tighter mt-4">
              {productDetails.category.name}
            </p>
            <p className="text-md tracking-tighter">
              {productDetails.price} EGP
            </p>
          </div>
          <div className="flex gap-2">
            <StarRating
              initialRating={Math.floor(productDetails.ratingsAverage)}
              dimension={7}
            />
            <span>{productDetails.ratingsAverage}</span>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => handleAddToCart(productDetails._id)}
            className="bg-green-500 hover:bg-green-600 duration-500 text-white w-[80%] py-2 rounded-sm my-4 cursor-pointer"
          >
            + Add
          </button>
        </div>
      </div>
    </div>
  );
}
