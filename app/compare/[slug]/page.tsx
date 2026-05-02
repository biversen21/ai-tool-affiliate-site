import { getComparison, getComparisonSlugs, getTool } from "@/lib/content";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getComparisonSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const comparison = getComparison(slug);
  if (!comparison) return {};
  return {
    title: comparison.title,
    description: comparison.metaDescription,
    alternates: { canonical: comparison.canonicalUrl },
  };
}

export default async function ComparisonPage({ params }: Props) {
  const { slug } = await params;
  const comparison = getComparison(slug);
  if (!comparison) notFound();

  const tools = comparison.tools
    .map((s) => getTool(s))
    .filter(Boolean) as NonNullable<ReturnType<typeof getTool>>[];

  return (
    <article className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{comparison.title}</h1>
      <p className="text-gray-600 mb-8">{comparison.description}</p>

      {tools.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 mb-10">
          {tools.map((tool) => (
            <div
              key={tool.slug}
              className="border border-gray-200 rounded-lg p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-lg">{tool.title}</h2>
                <div className="flex items-center gap-0.5 text-yellow-500 text-sm">
                  {"★".repeat(Math.round(tool.rating))}
                  {"☆".repeat(5 - Math.round(tool.rating))}
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">{tool.tagline}</p>

              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium text-green-700">Pros</span>
                  <ul className="mt-1 space-y-0.5">
                    {tool.pros.map((pro, i) => (
                      <li key={i} className="flex gap-2 text-green-600">
                        <span>✓</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="font-medium text-red-700">Cons</span>
                  <ul className="mt-1 space-y-0.5">
                    {tool.cons.map((con, i) => (
                      <li key={i} className="flex gap-2 text-red-600">
                        <span>✗</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-500">{tool.pricing}</span>
                <a
                  href={`/go/${tool.slug}`}
                  className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 transition-colors"
                  rel="nofollow sponsored"
                >
                  Try {tool.title}
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="border-l-4 border-blue-500 pl-5 bg-blue-50 py-4 pr-4 rounded-r-lg">
        <h2 className="font-semibold text-blue-900 mb-1">Our verdict</h2>
        <p className="text-blue-800 text-sm">{comparison.verdict}</p>
      </div>
    </article>
  );
}
