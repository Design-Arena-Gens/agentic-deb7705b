"use client";

import { useCallback, useEffect, useMemo, useReducer } from "react";
import type { CartItem, CartState, Product } from "@/lib/types";
import { CartContext } from "./cart-context";

const STORAGE_KEY = "loom-ember-cart";

type Action =
  | { type: "add"; payload: CartItem }
  | {
      type: "remove";
      payload: { productId: string; size: string; color: string };
    }
  | {
      type: "quantity";
      payload: { productId: string; size: string; color: string; quantity: number };
    }
  | { type: "hydrate"; payload: CartState }
  | { type: "clear" };

const reducer = (state: CartState, action: Action): CartState => {
  switch (action.type) {
    case "hydrate":
      return action.payload;
    case "add": {
      const existing = state.items.find(
        (item) =>
          item.product.id === action.payload.product.id &&
          item.size === action.payload.size &&
          item.color === action.payload.color
      );

      if (existing) {
        return {
          items: state.items.map((item) =>
            item === existing
              ? { ...item, quantity: Math.min(item.quantity + action.payload.quantity, 10) }
              : item
          )
        };
      }

      return { items: [...state.items, action.payload] };
    }
    case "remove":
      return {
        items: state.items.filter(
          (item) =>
            !(
              item.product.id === action.payload.productId &&
              item.size === action.payload.size &&
              item.color === action.payload.color
            )
        )
      };
    case "quantity":
      return {
        items: state.items.map((item) =>
          item.product.id === action.payload.productId &&
          item.size === action.payload.size &&
          item.color === action.payload.color
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    case "clear":
      return { items: [] };
    default:
      return state;
  }
};

const initialState: CartState = { items: [] };

type CartProviderProps = {
  children: React.ReactNode;
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as CartState;
        dispatch({ type: "hydrate", payload: parsed });
      } catch (error) {
        console.error("Failed to parse cart", error);
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const addItem = useCallback(
    (product: Product, options: { size: string; color: string }) => {
      dispatch({
        type: "add",
        payload: { product, size: options.size, color: options.color, quantity: 1 }
      });
    },
    []
  );

  const removeItem = useCallback(
    (productId: string, options: { size: string; color: string }) => {
      dispatch({ type: "remove", payload: { productId, ...options } });
    },
    []
  );

  const updateQuantity = useCallback(
    (productId: string, options: { size: string; color: string }, quantity: number) => {
      dispatch({ type: "quantity", payload: { productId, ...options, quantity } });
    },
    []
  );

  const clear = useCallback(() => dispatch({ type: "clear" }), []);

  const value = useMemo(
    () => ({
      ...state,
      addItem,
      removeItem,
      updateQuantity,
      clear
    }),
    [state, addItem, removeItem, updateQuantity, clear]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
