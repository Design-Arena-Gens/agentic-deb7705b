import Link from "next/link";
import type { Route } from "next";

const entries: { title: string; description: string; href: Route; image: string }[] = [
  {
    title: "Inside the Dye Lab",
    description: "Rich pigments developed with botanical dyers in Kyoto.",
    href: "/stories/inside-the-dye-lab" as Route,
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Architects in Motion",
    description: "We follow three designers crafting kinetic wardrobes for work and play.",
    href: "/stories/architects-in-motion" as Route,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80"
  }
];

export const Editorial = () => (
  <section className="bg-white">
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl space-y-2">
          <h2 className="section-heading">Journal</h2>
          <p className="text-sm text-brand-muted">
            Studio dispatches exploring textile innovation, sustainable ateliers, and styling notes.
          </p>
        </div>
        <Link href="/stories" className="text-sm font-medium text-brand">
          Read all stories →
        </Link>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {entries.map((entry) => (
          <Link
            key={entry.href}
            href={entry.href}
            className="group overflow-hidden rounded-3xl border border-stone-200 bg-stone-50"
          >
            <div
              className="aspect-[4/3] bg-cover bg-center transition duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url(${entry.image})` }}
            />
            <div className="p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-muted">
                Studio Note
              </p>
              <h3 className="mt-2 text-xl font-semibold text-brand">{entry.title}</h3>
              <p className="mt-3 text-sm text-brand-muted">{entry.description}</p>
              <span className="mt-4 inline-block text-sm font-medium text-brand">Read story →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);
