import { getProductsDetails } from "@/app/actions/products.action";
import ProductDetailsComp from "@/components/products-comps/ProductDetailsComp";
import React from "react";

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const response = await getProductsDetails(id);

    return (
      <div className="container mx-auto">
        <ProductDetailsComp productDetails={response.data} />
      </div>
    );
  } catch (error) {
    return (
      <div className="container mx-auto text-center py-8">
        <p className="text-red-500">
          Error loading product details. Please try again later.
        </p>
      </div>
    );
  }
}
