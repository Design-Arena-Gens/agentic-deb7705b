const props = [
  {
    title: "Responsible Textiles",
    description: "Traceable fibers sourced from regenerative farms and heritage mills."
  },
  {
    title: "Made-to-last Craft",
    description: "Small-batch production with atelier finishing and lifetime repairs."
  },
  {
    title: "Express Shipping",
    description: "Complimentary 2-day shipping on US orders over $250."
  }
];

export const ValueProps = () => (
  <section className="bg-white">
    <div className="mx-auto grid max-w-6xl gap-8 px-6 py-14 md:grid-cols-3">
      {props.map((item) => (
        <div key={item.title} className="rounded-3xl border border-stone-200 bg-stone-50 p-8">
          <h3 className="text-lg font-semibold text-brand">{item.title}</h3>
          <p className="mt-3 text-sm text-brand-muted">{item.description}</p>
        </div>
      ))}
    </div>
  </section>
);
