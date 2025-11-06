import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

export const ProductCard = ({ product }: { product: Product }) => (
  <Link
    href={`/products/${product.slug}`}
    className="group flex flex-col overflow-hidden rounded-3xl border border-stone-200 bg-white transition hover:-translate-y-1 hover:shadow-xl"
  >
    <div className="relative aspect-[3/4] overflow-hidden">
      <div
        className="h-full w-full bg-cover bg-center transition duration-500 group-hover:scale-105"
        style={{ backgroundImage: `url(${product.images[0]})` }}
      />
      {product.isNewArrival ? (
        <span className="absolute left-4 top-4 rounded-full bg-brand-accent/90 px-3 py-1 text-xs font-medium text-white">
          New
        </span>
      ) : null}
    </div>
    <div className="flex flex-1 flex-col gap-2 px-5 py-6">
      <div>
        <p className="text-sm font-medium uppercase tracking-wide text-brand-muted">
          {product.categoryId.replace("-", " ")}
        </p>
        <h3 className="text-lg font-semibold text-brand">{product.name}</h3>
      </div>
      <p className="flex-1 text-sm text-brand-muted line-clamp-2">{product.description}</p>
      <p className="text-base font-semibold text-brand">{formatCurrency(product.price)}</p>
    </div>
  </Link>
);
