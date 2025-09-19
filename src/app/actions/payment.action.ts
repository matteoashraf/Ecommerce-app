"use server";

import { getUserToken } from "@/lib/token.utils";
import axios from "axios";

interface ShippingAddressTypes {
  details: string;
  phone: string;
  city: string;
}
async function getOnlinePayment(
  cartId: string,
  shippingAddress: ShippingAddressTypes
) {
  try {
    const token = await getUserToken();
    const response = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
      { shippingAddress },
      {
        headers: {
          token: token as string,
        },
      }
    );

    return {
      data: response.data,
      status: response.status,
      message: response.data.message,
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

async function getCashPayment(
  cartId: string,
  shippingAddress: ShippingAddressTypes
) {
  try {
    const token = await getUserToken();
    const response = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
      { shippingAddress },
      {
        headers: {
          token: token as string,
        },
      }
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

export { getCashPayment, getOnlinePayment };
