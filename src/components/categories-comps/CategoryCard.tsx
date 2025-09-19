"use client";

import React from "react";
import { Categories } from "@/app/types/category.model";
import Image from "next/image";

interface CategoryCardProps {
  cat: Categories;
  onCategoryClick: (categoryId: string, categoryName: string) => void;
}

export default function CategoryCard({
  cat,
  onCategoryClick,
}: CategoryCardProps) {
  return (
    <div
      className="relative w-full bg-white border border-gray-200 rounded-sm dark:bg-gray-800 dark:border-gray-700 hover:shadow-[0_0_10px_rgba(0,0,0,0.5)] duration-300 mx-auto cursor-pointer"
      onClick={() => onCategoryClick(cat._id, cat.name)}
    >
      <div className="relative w-full h-[300px]">
        <Image
          src={cat.image}
          alt={cat.slug}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="rounded-t-sm object-cover"
        />
      </div>
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-amber-800 dark:text-white text-center">
          {cat.name}
        </h5>
      </div>
    </div>
  );
}
