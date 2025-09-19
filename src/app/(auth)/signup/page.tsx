"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function SignupPage() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  interface Inputs {
    name: string;
    email: string;
    password: string;
    rePassword: string;
    phone: string;
  }
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onChange",
  });
  async function onSubmit(value: Inputs) {
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        value
      );
      if (response?.data?.message === "success") {
        // login
        router.push("/login");
      }
      setErrorMessage(null);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data.message);
      }
    }
  }
  return (
    <div className="w-1/2 mx-auto my-10">
      <h2 className="text-3xl tracking-tighter font-semibold my-5">Sign Up:</h2>
      {errorMessage && (
        <p className="text-red-800 text-center text-xl">{errorMessage}</p>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder="Name:"
          className="mt-5 mb-1"
          {...register("name", { required: "name is required!" })}
        />
        {errors.name && <p className="text-red-800">{errors.name.message}</p>}
        <Input
          type="email"
          placeholder="Email:"
          className="mt-5 mb-1"
          {...register("email", { required: "email is required!" })}
        />
        {errors.email && <p className="text-red-800">{errors.email.message}</p>}
        <Input
          type="password"
          placeholder="Password:"
          className="mt-5 mb-1"
          {...register("password", { required: "password is required!" })}
        />
        {errors.password && (
          <p className="text-red-800">{errors.password.message}</p>
        )}
      <Input
        type="password"
        placeholder="Confirm Password:"
        className="mt-5 mb-1"
        {...register("rePassword", {
          required: "password confirmation is required!",
          validate: (value) =>
            value === watch("password") || "Passwords do not match",
        })}
      />
      {errors.rePassword && (
        <p className="text-red-800">{errors.rePassword.message}</p>
      )}
        <Input
          type="tel"
          placeholder="Phone Number:"
          className="mt-5 mb-1"
          {...register("phone", { required: "phone number is required!" })}
        />
        {errors.phone && <p className="text-red-800">{errors.phone.message}</p>}
        <Button type="submit" className="cursor-pointer my-5">
          Register
        </Button>
      </form>
    </div>
  );
}
