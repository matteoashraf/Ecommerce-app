"use server";

import axios from "axios";
import { Products } from "../types/product.model";
import { ProductDetails } from "../types/productDetails.model";

interface ProductListResponse {
  data: Products[];
  status: number;
  message?: string;
}

interface ProductDetailsResponse {
  data: ProductDetails;
  status: number;
  message?: string;
}

async function getProducts(): Promise<ProductListResponse> {
  try {
    const response = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    return {
      data: response?.data.data || [],
      status: response.status,
      message: response?.data.message,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        data: [],
        status: error.response?.status || 500,
        message: error?.response?.data.message || "An Error Occurred",
      };
    }
    return {
      data: [],
      status: 500,
      message: "An unexpected error occurred",
    };
  }
}

async function getProductsDetails(id: string): Promise<ProductDetailsResponse> {
  try {
    const response = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
    return {
      data: response?.data.data,
      status: response.status,
      message: response?.data.message,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data.message || "An Error Occurred");
    }
    throw new Error("An unexpected error occurred");
  }
}

export { getProducts, getProductsDetails };
