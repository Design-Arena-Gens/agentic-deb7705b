import { Suspense } from "react";
import { CartScene } from "@/components/cart-scene";

export const metadata = {
  title: "Your Cart"
};

export default function CartPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="section-heading">Your bag</h1>
      <p className="mt-2 text-sm text-brand-muted">
        Review your selections and finalize your order.
      </p>
      <div className="mt-10">
        <Suspense fallback={<div className="text-sm text-brand-muted">Loading your pieces…</div>}>
          <CartScene />
        </Suspense>
      </div>
    </div>
  );
}
