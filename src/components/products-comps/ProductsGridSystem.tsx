import { Products } from "@/app/types/product.model";
import React from "react";
import ProductCard from "./ProductCard";

export default function ProductsGridSystem({
  products,
}: {
  products: Products[];
}) {
  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-16 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 py-10">
        {products.map((product, index) => (
          <ProductCard key={product._id} product={product} isFirst={index === 0} />
        ))}
      </div>
    </div>
  );
}
