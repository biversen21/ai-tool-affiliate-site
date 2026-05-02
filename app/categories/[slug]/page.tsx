import { getCategory, getCategorySlugs, getTool } from "@/lib/content";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getCategorySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return {
    title: category.title,
    description: category.metaDescription,
    alternates: { canonical: category.canonicalUrl },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const tools = category.tools
    .map((s) => getTool(s))
    .filter(Boolean) as NonNullable<ReturnType<typeof getTool>>[];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">{category.title}</h1>
      <p className="text-gray-600 mb-8">{category.description}</p>

      {tools.length === 0 ? (
        <p className="text-gray-400">No tools in this category yet.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <a
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="block border border-gray-200 rounded-lg p-5 hover:border-blue-400 hover:shadow-sm transition-all"
            >
              <span className="font-semibold">{tool.title}</span>
              <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                {tool.tagline}
              </p>
              <div className="mt-3 flex items-center gap-1 text-sm text-yellow-500">
                {"★".repeat(Math.round(tool.rating))}
                {"☆".repeat(5 - Math.round(tool.rating))}
                <span className="text-gray-500 ml-1">{tool.rating}/5</span>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
