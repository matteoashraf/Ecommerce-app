"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  interface Inputs {
    email: string;
    password: string;
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  async function onSubmit(value: Inputs) {
    try {
      const response = await signIn("credentials", {
        email: value.email,
        password: value.password,
        redirect: false,
      });
      if (response?.ok) {
        router.push("/");
      } else {
        setErrorMessage("Invalid email or password");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  }
  return (
    <div className="w-1/2 mx-auto my-10">
      <h2 className="text-3xl tracking-tighter font-semibold my-5">Sign In:</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="email"
        placeholder="Email:"
        className="mt-5 mb-1"
        {...register("email", {
          required: "email is required!",
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Invalid email address",
          },
        })}
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
      {errorMessage && <p className="text-red-800 mt-2">{errorMessage}</p>}
      <Button type="submit" className="cursor-pointer my-5">
        Login
      </Button>
      </form>
    </div>
  );
}
