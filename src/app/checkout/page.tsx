"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useCart } from "../context/CartContext";
import { getCashPayment, getOnlinePayment } from "../actions/payment.action";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function CheckoutPage() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { cartDetails, setCartDetails } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "online" | null>(
    null
  );
  const cartId = cartDetails?._id;

  const router = useRouter();
  interface Inputs {
    details: string;
    phone: string;
    city: string;
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  async function onSubmit(value: Inputs) {
    if (paymentMethod == "cash") {
      try {
        const response = await getCashPayment(cartId as string, {
          details: value.details,
          phone: value.phone,
          city: value.city,
        });
        if (response?.status === 201) {
          setCartDetails(null);
          router.push("/allorders");
        }
      } catch (error) {
        console.error("Cash payment error:", error);
        setErrorMessage(
          "An error occurred while processing your cash payment."
        );
      }
    } else if (paymentMethod == "online") {
      try {
        const response = await getOnlinePayment(cartId as string, {
          details: value.details,
          phone: value.phone,
          city: value.city,
        });
        if (response?.status === 200 && response.data?.session?.url) {
          window.location.href = response.data.session.url;
        } else {
          setErrorMessage(
            "Could not initiate online payment. Please try again."
          );
        }
      } catch (error) {
        console.error("Payment error:", error);
        setErrorMessage("An error occurred while processing your payment.");
      }
    }
  }
  return (
    <div className="w-1/2 mx-auto my-10">
      <h2 className="text-3xl tracking-tighter font-semibold my-5">Payment:</h2>
      {errorMessage && (
        <p className="text-red-800 text-center text-xl">{errorMessage}</p>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder="Details:"
          className="mt-5 mb-1"
          {...register("details", { required: "details is required!" })}
        />
        {errors.details && (
          <p className="text-red-800">{errors.details.message}</p>
        )}
        <Input
          type="tel"
          placeholder="Phone Number:"
          className="mt-5 mb-1"
          {...register("phone", { required: "phone number is required!" })}
        />
        <Input
          type="text"
          placeholder="City:"
          className="mt-5 mb-1"
          {...register("city", { required: "city is required!" })}
        />
        {errors.city && <p className="text-red-800">{errors.city.message}</p>}

        <RadioGroup
          onValueChange={(val) => setPaymentMethod(val as "online" | "cash")}
          className="mt-5"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="cash" id="cash" />
            <Label htmlFor="cash">Cash Payment</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="online" id="online" />
            <Label htmlFor="online">Online Payment</Label>
          </div>
        </RadioGroup>
        <Button type="submit" className="cursor-pointer my-5">
          Pay Now
        </Button>
      </form>
    </div>
  );
}
