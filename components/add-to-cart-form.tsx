"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { useCart } from "./cart-context";
import { formatCurrency } from "@/lib/utils";

export const AddToCartForm = ({ product }: { product: Product }) => {
  const { addItem } = useCart();
  const [color, setColor] = useState(product.colors[0] ?? "");
  const [size, setSize] = useState(product.sizes[0] ?? "");
  const [isAdded, setIsAdded] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!size || !color) return;
    addItem(product, { color, size });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <p className="text-sm font-medium text-brand">Color</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {product.colors.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setColor(option)}
              className={`rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wide transition ${
                option === color ? "border-brand bg-brand text-white" : "border-stone-200"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-brand">Size</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {product.sizes.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setSize(option)}
              className={`rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wide transition ${
                option === size ? "border-brand bg-brand text-white" : "border-stone-200"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <button
        type="submit"
        className="w-full rounded-md bg-brand py-3 text-sm font-medium text-white transition hover:bg-brand/90"
      >
        {isAdded ? "Added ✓" : `Add to bag · ${formatCurrency(product.price)}`}
      </button>
    </form>
  );
};
