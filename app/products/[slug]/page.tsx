import Image from "next/image";
import { notFound } from "next/navigation";
import { AddToCartForm } from "@/components/add-to-cart-form";
import { products, getProductBySlug, getProductsByCategory } from "@/data/products";
import { formatCurrency } from "@/lib/utils";
import { ProductCard } from "@/components/product-card";

export const generateStaticParams = () =>
  products.map((product) => ({
    slug: product.slug
  }));

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: "Product not found" };
  return {
    title: `${product.name}`,
    description: product.description
  };
};

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) {
    notFound();
  }

  const related = getProductsByCategory(product.categoryId)
    .filter((item) => item.id !== product.id)
    .slice(0, 3);

  return (
    <div className="bg-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {product.images.map((src) => (
              <div key={src} className="overflow-hidden rounded-3xl border border-stone-200">
                <Image src={src} alt={product.name} width={640} height={800} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-muted">
              {product.categoryId.replace("-", " ")}
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-brand">{product.name}</h1>
            <p className="mt-3 text-brand-muted">{product.description}</p>
            <p className="mt-5 text-lg font-semibold text-brand">{formatCurrency(product.price)}</p>
          </div>
          <AddToCartForm product={product} />
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-muted">Details</h2>
            <ul className="mt-3 space-y-2 text-sm text-brand-muted">
              {product.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-muted">Materials</h2>
            <ul className="mt-3 space-y-2 text-sm text-brand-muted">
              {product.materials.map((material) => (
                <li key={material}>{material}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {related.length > 0 ? (
        <div className="border-t border-stone-200 bg-stone-50">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <h2 className="section-heading">More from this collection</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
