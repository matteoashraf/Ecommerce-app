"use client";
import { Products } from "@/app/types/product.model";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { StarRating } from "react-flexible-star-rating";
import { Heart, ShoppingCart, ZoomIn } from "lucide-react";
import Link from "next/link";
import { addProductToCart } from "@/app/actions/cart.action";
import {
  addProductToWishlist,
  removeProductFromWishlist,
} from "@/app/actions/wishlist.action";
import toast from "react-hot-toast";
import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "@/app/context/WishlistContext";

export default function ProductCard({ product, isFirst }: { product: Products; isFirst?: boolean }) {
  const { getCartDetails } = useCart();
  const { wishlist, getWishlistDetails } = useWishlist();
  const isInWishlist = wishlist.some((p) => p._id === product._id);

  async function handleAddToCart(productId: string) {
    const response = await addProductToCart(productId);
    toast.success(response?.message);
    await getCartDetails();
  }

  async function handleToggleWishlist() {
    if (isInWishlist) {
      const response = await removeProductFromWishlist(product._id);
      toast.success(response?.message);
    } else {
      const response = await addProductToWishlist(product._id);
      toast.success(response?.message);
    }
    await getWishlistDetails();
  }

  return (
    <div className="h-full">
      <Card className="relative group overflow-hidden h-full flex flex-col">
        <div className="absolute z-10 flex flex-col justify-center h-full gap-1 right-[-100px] group-hover:right-0 transition-all duration-300">
          <button
            onClick={() => handleAddToCart(product._id)}
            className="p-2 bg-slate-200 text-black hover:text-amber-800 transition-all cursor-pointer"
          >
            <ShoppingCart />
          </button>
          <button
            onClick={handleToggleWishlist}
            className={`p-2 bg-slate-200 ${
              isInWishlist ? "text-red-500" : "text-black"
            } hover:text-amber-800 transition-all cursor-pointer`}
          >
            <Heart className={isInWishlist ? "fill-red-500" : ""} />
          </button>
          <button className="p-2 bg-slate-200 text-black hover:text-amber-800 transition-all cursor-pointer">
            <Link href={`/products/${product._id}`}>
              <ZoomIn />
            </Link>
          </button>
        </div>
        <CardHeader className="flex-none">
          <CardTitle className="line-clamp-1">
            {product.title.split(" ").slice(0, 2).join(" ")}
          </CardTitle>
          <CardDescription className="line-clamp-2">
            {product.description.split(" ").slice(0, 4).join(" ")}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 min-h-0">
          <div className="relative w-full h-full min-h-[200px]">
            <Image
              src={product.imageCover}
              alt={product.title}
              fill
              priority={isFirst}
              className="object-contain"
              sizes="(max-width:768px) 100vw , (max-width:1200px) 50vw , 25vw"
            />
          </div>
        </CardContent>
        <CardFooter className="flex-none flex-col items-start">
          <h2 className="text-md font-semibold">{product.price} EGP</h2>
          <StarRating
            initialRating={Math.floor(product.ratingsAverage)}
            dimension={6}
          />
        </CardFooter>
      </Card>
    </div>
  );
}
