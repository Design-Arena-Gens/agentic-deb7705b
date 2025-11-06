"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "./cart-context";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

const navLinks = [
  { href: "/categories", label: "Shop" },
  { href: "/products", label: "All Products" },
  { href: "/stories", label: "Stories" },
  { href: "/about", label: "About" }
];

export const Navbar = () => {
  const { items } = useCart();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-stone-200 bg-white/70 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Loom & Ember
        </Link>
        <nav className="hidden gap-8 text-sm md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-brand-muted transition hover:text-brand">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSearchOpen((open) => !open)}
            className="hidden text-sm text-brand-muted transition hover:text-brand md:block"
          >
            {isSearchOpen ? "Close" : "Search"}
          </button>
          <Link
            href="/cart"
            className="relative rounded-full border border-stone-200 p-2 text-brand transition hover:border-brand"
          >
            <ShoppingBagIcon className="h-5 w-5" />
            {itemCount > 0 ? (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand-accent text-[11px] font-medium text-white">
                {itemCount}
              </span>
            ) : null}
          </Link>
        </div>
      </div>
      {isSearchOpen ? (
        <div className="border-t border-stone-200 bg-white/80">
          <div className="mx-auto max-w-4xl px-6 py-4">
            <form action="/products" className="flex items-center gap-3">
              <label className="flex-1">
                <span className="sr-only">Search products</span>
                <input
                  name="q"
                  placeholder="Search collections, fabrics, silhouettes"
                  className="w-full rounded-md border border-stone-200 bg-white px-4 py-3 text-sm shadow-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                />
              </label>
              <button
                type="submit"
                className="rounded-md bg-brand text-sm font-medium text-white transition hover:bg-brand/90"
              >
                Explore
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </header>
  );
};
