"use client";
import React from "react";
import { useWishlist } from "../context/WishlistContext";
import ProductsGridSystem from "@/components/products-comps/ProductsGridSystem";

export default function WishlistPage() {
  const { wishlist } = useWishlist();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
      {wishlist.length > 0 ? (
        <ProductsGridSystem products={wishlist} />
      ) : (
        <p className="text-center text-gray-500">Your wishlist is empty.</p>
      )}
    </div>
  );
}
