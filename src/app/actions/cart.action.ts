"use server";

import { getUserToken } from "@/lib/token.utils";
import axios from "axios";

async function getUserCart() {
  try {
    const token = await getUserToken();
    const response = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/cart",
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
        message: error?.response?.data?.message || "Error fetching cart",
      };
    }
    return {
      data: null,
      status: 500,
      message: "Unexpected error",
    };
  }
}

async function addProductToCart(productId: string) {
  try {
    const token = await getUserToken();
    const response = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/cart",
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
        message: error?.response?.data?.message || "Error adding to cart",
      };
    }
    return {
      data: null,
      status: 500,
      message: "Unexpected error",
    };
  }
}

async function removeProduct(productId: string) {
  try {
    const token = await getUserToken();
    const response = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
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
        message: error?.response?.data?.message || "Error removing to cart",
      };
    }
    return {
      data: null,
      status: 500,
      message: "Unexpected error",
    };
  }
}

async function updateProduct(productId: string, count: number) {
  try {
    const token = await getUserToken();
    const response = await axios.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      { count },
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
        message: error?.response?.data?.message || "Error updating to cart",
      };
    }
    return {
      data: null,
      status: 500,
      message: "Unexpected error",
    };
  }
}

export { getUserCart, addProductToCart, removeProduct, updateProduct };
