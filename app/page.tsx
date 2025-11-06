import { Hero } from "@/components/hero";
import { Section } from "@/components/section";
import { ProductCard } from "@/components/product-card";
import { CategoryCard } from "@/components/category-card";
import { ValueProps } from "@/components/value-props";
import { Editorial } from "@/components/editorial";
import { categories, products } from "@/data/products";

export default function HomePage() {
  const featured = products.filter((product) => product.isFeatured).slice(0, 4);

  return (
    <div className="space-y-12">
      <Hero />
      <Section
        title="Featured silhouettes"
        description="Meticulously crafted garments designed to layer seamlessly across seasons."
        action={
          <a
            href="/products"
            className="text-sm font-medium text-brand transition hover:text-brand-accent"
          >
            View all →
          </a>
        }
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Section>
      <Section
        title="Collections"
        description="Explore tailored capsules curated around movement, light, and material."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </Section>
      <ValueProps />
      <Editorial />
    </div>
  );
}
