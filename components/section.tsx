import type { ReactNode } from "react";

export const Section = ({
  title,
  description,
  action,
  children
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
}) => (
  <section className="mx-auto max-w-6xl px-6 py-16">
    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <div className="max-w-xl space-y-2">
        <h2 className="section-heading">{title}</h2>
        {description ? <p className="text-sm text-brand-muted">{description}</p> : null}
      </div>
      {action}
    </div>
    <div className="mt-10">{children}</div>
  </section>
);
