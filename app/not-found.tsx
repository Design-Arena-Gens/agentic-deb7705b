import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-muted">404</p>
      <h1 className="mt-3 text-4xl font-semibold text-brand">We lost this thread</h1>
      <p className="mt-4 text-sm text-brand-muted">
        The page you are looking for has slipped off the loom. Discover our latest silhouettes instead.
      </p>
      <Link href="/" className="mt-8 inline-block rounded-md bg-brand px-6 py-3 text-sm font-medium text-white transition hover:bg-brand/90">
        Return home
      </Link>
    </div>
  );
}
