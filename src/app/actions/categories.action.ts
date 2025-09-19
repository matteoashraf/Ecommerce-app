"use server";

import axios from "axios";
import { Categories } from "../types/category.model";

interface CategoryResponse {
  data: Categories[];
  status: number;
  message?: string;
}

async function getCategories(): Promise<CategoryResponse> {
  try {
    const response = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
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

export { getCategories };
