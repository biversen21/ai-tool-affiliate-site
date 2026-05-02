import { getTool, getToolSlugs } from "@/lib/content";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getToolSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) return {};
  return {
    title: tool.title,
    description: tool.metaDescription,
    alternates: { canonical: tool.canonicalUrl },
  };
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();

  return (
    <article className="max-w-2xl mx-auto">
      <div className="mb-2">
        <a
          href={`/categories/${tool.category}`}
          className="text-xs text-blue-600 hover:underline uppercase tracking-wide"
        >
          {tool.category}
        </a>
      </div>

      <h1 className="text-3xl font-bold mb-2">{tool.title}</h1>
      <p className="text-lg text-gray-600 mb-6">{tool.tagline}</p>

      <div className="flex items-center gap-4 mb-8">
        <div className="flex items-center gap-1 text-yellow-500">
          {"★".repeat(Math.round(tool.rating))}
          {"☆".repeat(5 - Math.round(tool.rating))}
          <span className="text-gray-600 ml-1 text-sm">{tool.rating}/5</span>
        </div>
        <span className="text-sm text-gray-500">Pricing: {tool.pricing}</span>
        <a
          href={`/go/${tool.slug}`}
          className="ml-auto bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          rel="nofollow sponsored"
        >
          Visit {tool.title} →
        </a>
      </div>

      <div className="prose prose-gray max-w-none mb-8">
        <p>{tool.description}</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 mb-8">
        <div className="border border-green-200 rounded-lg p-4 bg-green-50">
          <h2 className="font-semibold text-green-800 mb-3">Pros</h2>
          <ul className="space-y-1">
            {tool.pros.map((pro, i) => (
              <li key={i} className="flex gap-2 text-sm text-green-700">
                <span>✓</span>
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="border border-red-200 rounded-lg p-4 bg-red-50">
          <h2 className="font-semibold text-red-800 mb-3">Cons</h2>
          <ul className="space-y-1">
            {tool.cons.map((con, i) => (
              <li key={i} className="flex gap-2 text-sm text-red-700">
                <span>✗</span>
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg p-6 text-center bg-gray-50">
        <p className="text-gray-700 mb-4">
          Ready to try {tool.title}?
        </p>
        <a
          href={`/go/${tool.slug}`}
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          rel="nofollow sponsored"
        >
          Get started with {tool.title}
        </a>
        <p className="mt-3 text-xs text-gray-400">
          Affiliate link — we may earn a commission.
        </p>
      </div>
    </article>
  );
}
