"use client";
import React, { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { ShoppingCart, Heart, Menu, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { Badge } from "../ui/badge";
import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "@/app/context/WishlistContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const session = useSession();
  const { cartDetails, getCartDetails } = useCart();
  const { wishlist } = useWishlist();

  // Fetch cart details when component mounts or session changes
  React.useEffect(() => {
    if (session.status === "authenticated") {
      getCartDetails();
    }
  }, [session.status, getCartDetails]);

  return (
    <div className="relative">
      <NavigationMenu className="text-md max-w-5xl w-full flex justify-between mx-auto py-4 px-4">
        <NavigationMenuList>
          <NavigationMenuItem className="text-2xl font-bold tracking-tighter hover:text-amber-800 transition-all">
            <Link href="/">
              Shop<span className="text-amber-700">H</span>ub
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>

        {/* Desktop Menu */}
        <NavigationMenuList className="hidden md:flex font-semibold gap-4">
          <NavigationMenuItem>
            <Link href="/" className="hover:text-amber-800 transition-all">
              Home
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              href="/products"
              className="hover:text-amber-800 transition-all"
            >
              Products
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/cart" className="hover:text-amber-800 transition-all">
              Cart
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              href="/categories"
              className="hover:text-amber-800 transition-all"
            >
              Categories
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              href="/brands"
              className="hover:text-amber-800 transition-all"
            >
              Brands
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              href="/wishlist"
              className="hover:text-amber-800 transition-all"
            >
              Wishlist
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>

        <NavigationMenuList className="gap-5">
          <NavigationMenuItem className="hidden md:block">
            <Link
              href="/cart"
              className="relative cursor-pointer hover:text-amber-800 transition-all"
            >
              {cartDetails &&
                cartDetails.products &&
                cartDetails.products.length > 0 && (
                  <Badge
                    variant="default"
                    className="absolute top-[-12px] right-[-20px] bg-amber-800 py-0"
                  >
                    {cartDetails.products.length}
                  </Badge>
                )}
              <ShoppingCart size={25} />
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="hidden md:block">
            <Link
              href="/wishlist"
              className="relative cursor-pointer hover:text-amber-800 transition-all"
            >
              {wishlist.length > 0 && (
                <Badge
                  variant="default"
                  className="absolute top-[-12px] right-[-20px] bg-amber-800 py-0"
                >
                  {wishlist.length}
                </Badge>
              )}
              <Heart size={25} />
            </Link>
          </NavigationMenuItem>
          {/* Desktop auth links */}
          <NavigationMenuItem className="hidden md:block">
            {session.status === "loading" ? (
              <span className="font-semibold">Loading...</span>
            ) : session.status === "authenticated" ? (
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="font-semibold hover:text-red-500 transition-all"
              >
                Sign Out
              </button>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  href="/login"
                  className="font-semibold hover:text-amber-800 transition-all"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="font-semibold hover:text-amber-800 transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </NavigationMenuItem>
          {/* Mobile menu button */}
          <NavigationMenuItem className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-white">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-6 right-4 p-2 hover:bg-gray-100 rounded-full cursor-pointer"
          >
            <X size={24} />
          </button>
          <div className="flex flex-col items-center pt-20 space-y-6">
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="font-medium hover:text-amber-800"
            >
              Home
            </Link>
            <Link
              href="/products"
              onClick={() => setIsMenuOpen(false)}
              className="font-medium hover:text-amber-800"
            >
              Products
            </Link>
            <Link
              href="/cart"
              onClick={() => setIsMenuOpen(false)}
              className="font-medium hover:text-amber-800"
            >
              Cart
            </Link>
            <Link
              href="/categories"
              onClick={() => setIsMenuOpen(false)}
              className="font-medium hover:text-amber-800"
            >
              Categories
            </Link>
            <Link
              href="/brands"
              onClick={() => setIsMenuOpen(false)}
              className="font-medium hover:text-amber-800"
            >
              Brands
            </Link>
            <Link
              href="/wishlist"
              onClick={() => setIsMenuOpen(false)}
              className="font-medium hover:text-amber-800"
            >
              Wishlist
            </Link>
            <div className="flex gap-8 mt-4">
              <Link
                href="/cart"
                onClick={() => setIsMenuOpen(false)}
                className="relative cursor-pointer hover:text-amber-800 transition-all"
              >
                {cartDetails &&
                  cartDetails.products &&
                  cartDetails.products.length > 0 && (
                    <Badge
                      variant="default"
                      className="absolute top-[-15px] right-[-20px] bg-amber-800"
                    >
                      {cartDetails.products.length}
                    </Badge>
                  )}
                <ShoppingCart size={25} />
              </Link>
              <Link
                href="/wishlist"
                onClick={() => setIsMenuOpen(false)}
                className="relative cursor-pointer hover:text-amber-800 transition-all"
              >
                {wishlist.length > 0 && (
                  <Badge
                    variant="default"
                    className="absolute top-[-15px] right-[-20px] bg-amber-800"
                  >
                    {wishlist.length}
                  </Badge>
                )}
                <Heart size={25} />
              </Link>
            </div>
            {/* Auth links in mobile menu */}
            <div className="pt-6 border-t w-48 text-center">
              {session.status === "authenticated" ? (
                <Link
                  href="/"
                  onClick={() => {
                    signOut({ callbackUrl: "/login" });
                    setIsMenuOpen(false);
                  }}
                  className="font-medium text-red-600 hover:text-red-700 cursor-pointer"
                >
                  Sign Out
                </Link>
              ) : session.status === "loading" ? (
                <span className="font-medium">Loading...</span>
              ) : (
                <div className="space-y-4">
                  <Link
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block font-medium hover:text-amber-800"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="block font-medium hover:text-amber-800"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
