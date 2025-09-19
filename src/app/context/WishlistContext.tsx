"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useSession } from "next-auth/react";
import { getUserWishlist } from "../actions/wishlist.action";
import { Products } from "../types/product.model";

interface WishlistContextType {
  wishlist: Products[];
  getWishlistDetails: () => Promise<void>;
  setWishlist: (wishlist: Products[]) => void;
}

const WishlistContext = createContext<WishlistContextType>({
  wishlist: [],
  getWishlistDetails: async () => {},
  setWishlist: () => {},
});

export default function WishlistContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [wishlist, setWishlist] = useState<Products[]>([]);

  const getWishlistDetails = useCallback(async () => {
    const response = await getUserWishlist();
    if (response?.status === 200 && response?.data) {
      setWishlist(response.data);
    }
  }, []);

  useEffect(() => {
    getWishlistDetails();
  }, [getWishlistDetails]);

  const session = useSession();

  useEffect(() => {
    if (session.status === "authenticated") {
      getWishlistDetails();
    }
  }, [session.status, getWishlistDetails]);

  return (
    <WishlistContext.Provider
      value={{ wishlist, setWishlist, getWishlistDetails }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const myContext = useContext(WishlistContext);
  return myContext;
}
