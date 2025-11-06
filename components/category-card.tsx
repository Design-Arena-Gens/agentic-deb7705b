import Link from "next/link";
import type { Category } from "@/lib/types";

export const CategoryCard = ({ category }: { category: Category }) => (
  <Link
    href={`/categories/${category.id}`}
    className="group overflow-hidden rounded-3xl border border-stone-200 bg-white transition hover:-translate-y-1 hover:shadow-xl"
  >
    <div
      className="aspect-[4/3] bg-cover bg-center transition duration-500 group-hover:scale-105"
      style={{ backgroundImage: `url(${category.image})` }}
    />
    <div className="p-6">
      <p className="text-sm font-medium uppercase tracking-wide text-brand-muted">Collection</p>
      <h3 className="mt-1 text-xl font-semibold text-brand">{category.name}</h3>
      <p className="mt-3 text-sm text-brand-muted">{category.description}</p>
    </div>
  </Link>
);
