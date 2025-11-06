export const dynamicParams = false;

const stories = {
  "inside-the-dye-lab": {
    title: "Inside the Dye Lab",
    description: "Rich pigments developed with botanical dyers in Kyoto."
  },
  "architects-in-motion": {
    title: "Architects in Motion",
    description: "We follow three designers crafting kinetic wardrobes for work and play."
  }
};

export const generateStaticParams = () =>
  Object.keys(stories).map((slug) => ({
    slug
  }));

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const story = stories[params.slug as keyof typeof stories];
  if (!story) return { title: "Story" };
  return {
    title: story.title,
    description: story.description
  };
};

export default function StoryPage({ params }: { params: { slug: string } }) {
  const story = stories[params.slug as keyof typeof stories];
  if (!story) return null;

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 space-y-6">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-muted">Journal</p>
      <h1 className="text-3xl font-semibold text-brand">{story.title}</h1>
      <p className="text-sm text-brand-muted">{story.description}</p>
    </div>
  );
}
