"use server";

import { getUserToken } from "@/lib/token.utils";
import axios from "axios";

async function getUserWishlist() {
  try {
    const token = await getUserToken();
    const response = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      {
        headers: {
          token: token as string,
        },
      }
    );

    return {
      data: response.data.data,
      status: response.status,
      message: response.data.message,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        data: null,
        status: error.response?.status || 500,
        message: error?.response?.data?.message || "Error fetching wishlist",
      };
    }
    return {
      data: null,
      status: 500,
      message: "Unexpected error",
    };
  }
}

async function addProductToWishlist(productId: string) {
  try {
    const token = await getUserToken();
    const response = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      { productId },
      {
        headers: {
          token: token as string,
        },
      }
    );

    return {
      data: response.data.data,
      status: response.status,
      message: response.data.message,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        data: null,
        status: error.response?.status || 500,
        message: error?.response?.data?.message || "Error adding to wishlist",
      };
    }
    return {
      data: null,
      status: 500,
      message: "Unexpected error",
    };
  }
}

async function removeProductFromWishlist(productId: string) {
  try {
    const token = await getUserToken();
    const response = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      {
        headers: {
          token: token as string,
        },
      }
    );

    return {
      data: response.data.data,
      status: response.status,
      message: response.data.message,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        data: null,
        status: error.response?.status || 500,
        message:
          error?.response?.data?.message || "Error removing from wishlist",
      };
    }
    return {
      data: null,
      status: 500,
      message: "Unexpected error",
    };
  }
}

export { getUserWishlist, addProductToWishlist, removeProductFromWishlist };
