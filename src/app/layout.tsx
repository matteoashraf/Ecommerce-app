import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/nav-comps/Navbar";
import { AuthProvider } from "./context/AuthProvider";
import WishlistContextProvider from "./context/WishlistContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShopHub - Seamless Online Shopping for Everyone",
  description:
    "Explore a vast selection of products from fashion to electronics at competitive prices. Enjoy fast delivery, secure payments, and personalized recommendations on ShopHub.",
  icons: {
    icon: "https://cdn-icons-png.flaticon.com/512/1170/1170576.png",
    shortcut: "https://cdn-icons-png.flaticon.com/512/1170/1170576.png",
    apple: "https://cdn-icons-png.flaticon.com/512/1170/1170576.png",
    other: [
      {
        rel: "icon",
        url: "https://cdn-icons-png.flaticon.com/512/1170/1170576.png",
        sizes: "32x32",
      },
      {
        rel: "icon",
        url: "https://cdn-icons-png.flaticon.com/512/1170/1170576.png",
        sizes: "48x48",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <WishlistContextProvider>
            <Navbar />
            {children}
          </WishlistContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
