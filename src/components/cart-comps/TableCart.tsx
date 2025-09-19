"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useCart } from "@/app/context/CartContext";
import { removeProduct, updateProduct } from "@/app/actions/cart.action";
import toast from "react-hot-toast";
import Link from "next/link";

export default function TableCart() {
  const { cartDetails, getCartDetails } = useCart();

  React.useEffect(() => {
    if (!cartDetails) {
      getCartDetails();
    }
  }, [cartDetails, getCartDetails]);

  if (!cartDetails || !cartDetails.products) {
    return (
      <div className="w-full md:w-3/4 mx-auto text-center py-8 px-4">
        Loading cart...
      </div>
    );
  }

  async function removeProductFromCart(productId: string) {
    await removeProduct(productId);
    toast.success("Product deleted successfully from cart!");
    await getCartDetails();
  }

  async function updateCartProduct(productId: string, count: number) {
    await updateProduct(productId, count);
    toast.success("Product updated successfully!");
    await getCartDetails();
  }
  return (
    <>
      {cartDetails &&
      cartDetails.products &&
      cartDetails.products.length > 0 ? (
        <div className="w-full md:w-3/4 mx-auto px-4 md:px-0">
          {/* Desktop View */}
          <div className="hidden md:block my-14">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="p-4">Product</TableHead>
                  <TableHead className="p-4">Price</TableHead>
                  <TableHead className="p-4">Quantity</TableHead>
                  <TableHead className="text-right p-4">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cartDetails.products.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <Badge
                            onClick={() =>
                              removeProductFromCart(product.product._id)
                            }
                            className="absolute top-[-10px] left-[-10px] cursor-pointer hover:bg-red-500 transition-all"
                          >
                            x
                          </Badge>
                          <Image
                            src={product.product.imageCover}
                            width={60}
                            height={60}
                            alt="image"
                            className="object-cover"
                            style={{ width: "auto", height: "auto" }}
                          />
                        </div>
                        <p>
                          {product.product.title
                            .split(" ")
                            .slice(0, 2)
                            .join(" ")}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="p-4">{product.price} EGP</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 p-4">
                        <button
                          onClick={() =>
                            updateCartProduct(
                              product.product._id,
                              product.count + 1
                            )
                          }
                          className="border border-amber-800 rounded-sm px-2 py-1 cursor-pointer hover:bg-amber-800 hover:text-white duration-300"
                        >
                          +
                        </button>
                        <p>{product.count}</p>
                        <button
                          onClick={() =>
                            updateCartProduct(
                              product.product._id,
                              product.count - 1
                            )
                          }
                          className="border-1 border-amber-800 rounded-sm px-2 py-1 cursor-pointer hover:bg-amber-800 hover:text-white duration-300"
                        >
                          -
                        </button>
                      </div>
                    </TableCell>
                    <TableCell className="text-right p-4">
                      {product.price * product.count} EGP
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="font-medium">
                  <TableCell className="p-4">Total price:</TableCell>
                  <TableCell colSpan={2} className="text-center p-4">
                    {cartDetails.totalCartPrice} EGP
                  </TableCell>
                  <TableCell className="text-right p-4">
                    <Button className="cursor-pointer bg-amber-800 hover:bg-amber-700">
                      <Link href="/checkout">Checkout</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* Mobile View */}
          <div className="md:hidden space-y-4 my-10">
            {cartDetails.products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow p-4 space-y-3"
              >
                <div className="flex gap-4">
                  <div className="relative">
                    <Badge
                      onClick={() => removeProductFromCart(product.product._id)}
                      className="absolute top-[-10px] left-[-10px] cursor-pointer hover:bg-red-500 transition-all"
                    >
                      x
                    </Badge>
                    <Image
                      src={product.product.imageCover}
                      width={80}
                      height={80}
                      alt="image"
                      className="object-cover rounded-md"
                      style={{ width: "auto", height: "auto" }}
                    />
                  </div>
                  <div className="flex flex-col justify-between flex-1">
                    <p className="font-medium">
                      {product.product.title.split(" ").slice(0, 2).join(" ")}
                    </p>
                    <p className="text-amber-800 font-medium">
                      {product.price} EGP
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateCartProduct(
                          product.product._id,
                          product.count + 1
                        )
                      }
                      className="border border-amber-800 rounded-sm px-2 py-1 cursor-pointer hover:bg-amber-800 hover:text-white duration-300"
                    >
                      +
                    </button>
                    <p className="w-8 text-center font-medium">
                      {product.count}
                    </p>
                    <button
                      onClick={() =>
                        updateCartProduct(
                          product.product._id,
                          product.count - 1
                        )
                      }
                      disabled={product.count <= 1}
                      className="border border-amber-800 rounded-sm px-2 py-1 cursor-pointer hover:bg-amber-800 hover:text-white duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      -
                    </button>
                  </div>
                  <p className="font-medium">
                    Total: {product.price * product.count} EGP
                  </p>
                </div>
              </div>
            ))}

            {/* Mobile Total and Checkout */}
            <div className="bg-white rounded-lg shadow p-4 mt-4">
              <div className="flex justify-between items-center mb-4">
                <p className="font-medium text-lg">Total Price:</p>
                <p className="font-medium text-lg text-amber-800">
                  {cartDetails.totalCartPrice} EGP
                </p>
              </div>
              <Button className="w-full cursor-pointer bg-amber-800 hover:bg-amber-700">
                <Link href="/checkout">Checkout</Link>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full md:w-3/4 mx-auto px-4 md:px-0 py-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-medium text-gray-700">
              Your cart is empty
            </h2>
            <p className="text-gray-500">
              Looks like you haven't added any products yet.
            </p>
            <Button className="bg-amber-800 hover:bg-amber-700">
              <Link href="/products">Start Shopping</Link>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
