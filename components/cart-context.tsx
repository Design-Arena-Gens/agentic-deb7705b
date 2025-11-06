"use client";

import { createContext, useContext } from "react";
import type { CartItem, Product } from "@/lib/types";

export type CartState = {
  items: CartItem[];
};

export type CartActions = {
  addItem: (product: Product, options: { size: string; color: string }) => void;
  removeItem: (productId: string, options: { size: string; color: string }) => void;
  updateQuantity: (
    productId: string,
    options: { size: string; color: string },
    quantity: number
  ) => void;
  clear: () => void;
};

export type CartContextValue = CartState & CartActions;

export const CartContext = createContext<CartContextValue | null>(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
