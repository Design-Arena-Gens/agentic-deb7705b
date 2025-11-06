import Link from "next/link";

const footerLinks = [
  {
    title: "Customer Care",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Shipping & Returns", href: "/policies/shipping" },
      { label: "FAQ", href: "/faq" }
    ]
  },
  {
    title: "About",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Ethics", href: "/ethics" },
      { label: "Studios", href: "/studios" }
    ]
  }
];

export const Footer = () => (
  <footer className="border-t border-stone-200 bg-white">
    <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:grid-cols-2 md:grid-cols-4">
      <div className="md:col-span-2">
        <p className="text-lg font-semibold tracking-tight text-brand">Loom & Ember</p>
        <p className="mt-3 max-w-sm text-sm text-brand-muted">
          Contemporary silhouettes, mindful production, and textiles sourced from legacy mills.
        </p>
      </div>
      {footerLinks.map((section) => (
        <div key={section.title}>
          <p className="text-sm font-medium uppercase tracking-wide text-brand-muted">
            {section.title}
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            {section.links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition hover:text-brand">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <div className="border-t border-stone-200 py-4 text-center text-xs text-brand-muted">
      © {new Date().getFullYear()} Loom & Ember. Crafted in New York.
    </div>
  </footer>
);
