"use server";

import axios from "axios";
import { Brands } from "../types/brand.model";

interface BrandResponse {
  data: Brands[];
  status: number;
  message?: string;
}

async function getBrands(): Promise<BrandResponse> {
  try {
    const response = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/brands"
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

export { getBrands };
