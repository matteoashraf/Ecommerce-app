import { Brands } from "@/app/types/brand.model";
import React from "react";
import BrandCard from "./BrandCard";

export default function BrandsGridSystem({ brands }: { brands: Brands[] }) {
  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-16 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 py-10">
        {brands.map((brand) => (
          <BrandCard key={brand._id} brand={brand} />
        ))}
      </div>
    </div>
  );
}
