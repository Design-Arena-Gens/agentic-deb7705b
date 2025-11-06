import Link from "next/link";

export const Hero = () => (
  <section className="hero-gradient border-b border-stone-200 bg-white/80">
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-24 lg:flex-row lg:items-center lg:py-32">
      <div className="max-w-xl space-y-6">
        <p className="inline-flex items-center gap-2 rounded-full border border-brand-accent/30 bg-brand-accent/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-brand-accent">
          New Season
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-brand sm:text-5xl">
          Volume VII — Resonant Textiles for the Curious Minimalist
        </h1>
        <p className="text-lg text-brand-muted">
          Discover sculptural tailoring, luminous natural fibers, and modular layers designed to move
          with you across the cityscape.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/products"
            className="rounded-md bg-brand text-sm font-medium text-white transition hover:bg-brand/90"
          >
            Shop Collection
          </Link>
          <Link
            href="/stories"
            className="rounded-md border border-stone-300 px-6 py-3 text-sm font-medium text-brand transition hover:border-brand hover:text-brand"
          >
            Studio Journal
          </Link>
        </div>
      </div>
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl shadow-glow">
        <div
          className="aspect-[3/4] bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80')"
          }}
        />
        <div className="absolute bottom-5 left-5 rounded-md bg-white/80 px-4 py-3 text-xs uppercase tracking-[0.3em] text-brand-muted backdrop-blur">
          Capsule 23 · Radiant Lines
        </div>
      </div>
    </div>
  </section>
);
