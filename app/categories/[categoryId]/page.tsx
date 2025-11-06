import { notFound } from "next/navigation";
import { categories, getProductsByCategory } from "@/data/products";
import { ProductCard } from "@/components/product-card";

export const generateStaticParams = () =>
  categories.map((category) => ({
    categoryId: category.id
  }));

export const generateMetadata = ({ params }: { params: { categoryId: string } }) => {
  const category = categories.find((item) => item.id === params.categoryId);
  if (!category) return { title: "Collection not found" };
  return {
    title: `${category.name} Collection`,
    description: category.description
  };
};

export default function CategoryPage({ params }: { params: { categoryId: string } }) {
  const category = categories.find((item) => item.id === params.categoryId);
  if (!category) notFound();

  const collectionProducts = getProductsByCategory(category.id);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-muted">Collection</p>
          <h1 className="mt-2 text-3xl font-semibold text-brand">{category.name}</h1>
          <p className="mt-3 max-w-xl text-sm text-brand-muted">{category.description}</p>
        </div>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {collectionProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
