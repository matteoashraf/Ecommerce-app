"use client";

import { Brands } from "@/app/types/brand.model";
import Image from "next/image";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function BrandCard({ brand }: { brand: Brands }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative w-full bg-white border border-gray-200 rounded-sm dark:bg-gray-800 dark:border-gray-700 hover:shadow-[0_0_10px_rgba(0,0,0,0.5)] duration-300 mx-auto cursor-pointer">
          <div className="relative w-full h-[200px] bg-white p-4">
            <Image
              src={brand.image}
              alt={brand.slug}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="rounded-t-sm object-contain p-2"
              quality={75}
              priority
            />
          </div>
          <div className="p-5">
            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white text-center">
              {brand.name}
            </h5>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            {brand.name}
          </DialogTitle>
          <DialogDescription>
            View details about {brand.name} products
          </DialogDescription>
        </DialogHeader>
        <div className="relative w-full h-[300px] bg-white my-4">
          <Image
            src={brand.image}
            alt={brand.slug}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain"
            quality={75}
          />
        </div>
        <DialogClose asChild>
          <Button type="button" className="cursor-pointer w-25 ms-auto">
            Close
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
