import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { categories, products } from "@/data/products";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/product-card";

const FilterableProducts = ({ searchParams }: { searchParams: URLSearchParams }) => {
  const query = searchParams.get("q")?.toLowerCase() ?? "";
  const categoryId = searchParams.get("category") ?? undefined;

  let filtered: Product[] = products;

  if (categoryId) {
    const categoryExists = categories.some((category) => category.id === categoryId);
    if (!categoryExists) {
      notFound();
    }
    filtered = filtered.filter((product) => product.categoryId === categoryId);
  }

  if (query) {
    filtered = filtered.filter((product) =>
      `${product.name} ${product.description} ${product.features.join(" ")}`
        .toLowerCase()
        .includes(query)
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filtered.length > 0 ? (
        filtered.map((product) => <ProductCard key={product.id} product={product} />)
      ) : (
        <div className="col-span-full rounded-3xl border border-dashed border-stone-300 bg-white p-10 text-center text-sm text-brand-muted">
          No pieces match your search. Try adjusting filters.
        </div>
      )}
    </div>
  );
};

export default function ProductsPage({
  searchParams
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const queryString = new URLSearchParams(
    Object.entries(searchParams ?? {}).reduce((entries, [key, value]) => {
      if (typeof value === "string") entries[key] = value;
      return entries;
    }, {} as Record<string, string>)
  );

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="section-heading">All Products</h1>
          <p className="mt-2 text-sm text-brand-muted">
            Refined silhouettes and modular essentials across the Loom & Ember universe.
          </p>
        </div>
        <form className="flex flex-col gap-3 text-sm md:flex-row md:items-center">
          <label className="w-full md:w-64">
            <span className="sr-only">Search</span>
            <input
              name="q"
              defaultValue={queryString.get("q") ?? ""}
              placeholder="Search pieces"
              className="w-full rounded-md border border-stone-200 bg-white px-4 py-2 outline-none focus:border-brand focus:ring-1 focus:ring-brand"
            />
          </label>
          <label className="w-full md:w-48">
            <span className="sr-only">Filter by collection</span>
            <select
              name="category"
              defaultValue={queryString.get("category") ?? ""}
              className="w-full rounded-md border border-stone-200 bg-white px-4 py-2 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand"
            >
              <option value="">All collections</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
          <button
            type="submit"
            className="rounded-md bg-brand px-6 py-2 font-medium text-white transition hover:bg-brand/90"
          >
            Apply
          </button>
        </form>
      </div>
      <div className="mt-10">
        <Suspense fallback={<div className="text-sm text-brand-muted">Loading silhouettes…</div>}>
          <FilterableProducts searchParams={queryString} />
        </Suspense>
      </div>
    </div>
  );
}
