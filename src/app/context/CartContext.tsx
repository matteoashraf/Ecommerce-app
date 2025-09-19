"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { getUserCart } from "../actions/cart.action";
import { CartData } from "../types/cart.model";

interface CartContextType {
  cartDetails: CartData | null;
  getCartDetails: () => Promise<void>;
  setCartDetails: (cart: CartData | null) => void;
}

const CartContext = createContext<CartContextType>({
  cartDetails: null,
  getCartDetails: async () => {},
  setCartDetails: () => {},
});

export default function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartDetails, setCartDetails] = useState<CartData | null>(null);

  const getCartDetails = useCallback(async () => {
    const response = await getUserCart();
    if (response?.status === 200 && response?.data) {
      setCartDetails(response.data);
    }
  }, []);

  useEffect(() => {
    getCartDetails();
  }, [getCartDetails]);

  return (
    <CartContext.Provider
      value={{ cartDetails, setCartDetails, getCartDetails }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const myContext = useContext(CartContext);
  return myContext;
}
