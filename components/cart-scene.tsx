"use client";

import Link from "next/link";
import { useCart } from "@/components/cart-context";
import { formatCurrency } from "@/lib/utils";

export const CartScene = () => {
  const { items, updateQuantity, removeItem, clear } = useCart();
  const subtotal = items.reduce((total, item) => total + item.product.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-stone-300 bg-white p-12 text-center">
        <p className="text-sm text-brand-muted">Your bag is currently empty.</p>
        <Link href="/products" className="mt-6 inline-block text-sm font-medium text-brand">
          Discover pieces →
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-6">
        {items.map((item) => (
          <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex gap-6 rounded-3xl border border-stone-200 bg-white p-6">
            <div
              className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-2xl bg-cover bg-center"
              style={{ backgroundImage: `url(${item.product.images[0]})` }}
            />
            <div className="flex-1 space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-brand">{item.product.name}</h3>
                  <p className="text-xs uppercase tracking-[0.3em] text-brand-muted">{item.color} · {item.size}</p>
                </div>
                <button
                  onClick={() => removeItem(item.product.id, { size: item.size, color: item.color })}
                  className="text-xs font-medium text-brand-muted transition hover:text-brand"
                >
                  Remove
                </button>
              </div>
              <p className="text-sm text-brand-muted">{item.product.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-sm">
                  <span>Qty</span>
                  <select
                    value={item.quantity}
                    onChange={(event) =>
                      updateQuantity(
                        item.product.id,
                        { size: item.size, color: item.color },
                        Number(event.target.value)
                      )
                    }
                    className="rounded-md border border-stone-200 px-3 py-1"
                  >
                    {Array.from({ length: 10 }, (_, index) => index + 1).map((qty) => (
                      <option key={qty} value={qty}>
                        {qty}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="text-base font-semibold">{formatCurrency(item.product.price * item.quantity)}</p>
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={clear}
          className="text-xs font-medium text-brand-muted transition hover:text-brand"
        >
          Clear bag
        </button>
      </div>
      <aside className="space-y-5 rounded-3xl border border-stone-200 bg-white p-8">
        <h2 className="text-lg font-semibold text-brand">Order Summary</h2>
        <div className="flex justify-between text-sm text-brand-muted">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm text-brand-muted">
          <span>Shipping</span>
          <span>Complimentary</span>
        </div>
        <div className="flex justify-between text-sm text-brand-muted">
          <span>Taxes</span>
          <span>Calculated at checkout</span>
        </div>
        <hr className="border-stone-200" />
        <div className="flex justify-between text-base font-semibold">
          <span>Total</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <button className="w-full rounded-md bg-brand py-3 text-sm font-medium text-white transition hover:bg-brand/90">
          Proceed to checkout
        </button>
        <p className="text-xs text-brand-muted">
          Secure payments with end-to-end encryption. Duties and taxes calculated at checkout.
        </p>
      </aside>
    </div>
  );
};
