import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { inter } from "./theme";
import { CartProvider } from "@/components/cart-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: {
    default: "Loom & Ember",
    template: "%s | Loom & Ember"
  },
  description:
    "Discover thoughtfully curated contemporary apparel with Loom & Ember's digital boutique."
};

export default function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="min-h-screen bg-stone-50 text-brand">
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
