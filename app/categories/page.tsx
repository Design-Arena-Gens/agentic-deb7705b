import { categories } from "@/data/products";
import { CategoryCard } from "@/components/category-card";

export const metadata = {
  title: "Collections"
};

export default function CategoriesPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="section-heading">Collections</h1>
      <p className="mt-2 max-w-xl text-sm text-brand-muted">
        Dive into tactile capsules designed around modern architecture, luminous botanicals, and slow craft.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
