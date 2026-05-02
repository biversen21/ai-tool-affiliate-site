import { getAllTools, getAllCategories, getAllComparisons } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Tool Reviews & Comparisons",
  description:
    "Honest reviews, comparisons, and guides for the best AI tools on the market.",
};

export default function HomePage() {
  const tools = getAllTools()
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    .slice(0, 6);
  const categories = getAllCategories().slice(0, 6);
  const comparisons = getAllComparisons()
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    .slice(0, 4);

  return (
    <div className="space-y-14">
      <section className="text-center py-10">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Find the best AI tools
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          Independent reviews, head-to-head comparisons, and curated picks to
          help you choose the right AI tool.
        </p>
      </section>

      {tools.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Latest tool reviews</h2>
            <a href="/tools" className="text-sm text-blue-600 hover:underline">
              View all
            </a>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <a
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="block border border-gray-200 rounded-lg p-5 hover:border-blue-400 hover:shadow-sm transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">{tool.title}</span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                    {tool.category}
                  </span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">
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
        </section>
      )}

      {categories.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Browse by category</h2>
            <a
              href="/categories"
              className="text-sm text-blue-600 hover:underline"
            >
              View all
            </a>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <a
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="block border border-gray-200 rounded-lg p-5 hover:border-blue-400 hover:shadow-sm transition-all"
              >
                <span className="font-semibold">{cat.title}</span>
                <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                  {cat.description}
                </p>
                <p className="mt-2 text-xs text-gray-400">
                  {cat.tools.length} tool{cat.tools.length !== 1 ? "s" : ""}
                </p>
              </a>
            ))}
          </div>
        </section>
      )}

      {comparisons.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Head-to-head comparisons</h2>
            <a
              href="/compare"
              className="text-sm text-blue-600 hover:underline"
            >
              View all
            </a>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {comparisons.map((comp) => (
              <a
                key={comp.slug}
                href={`/compare/${comp.slug}`}
                className="block border border-gray-200 rounded-lg p-5 hover:border-blue-400 hover:shadow-sm transition-all"
              >
                <span className="font-semibold">{comp.title}</span>
                <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                  {comp.description}
                </p>
              </a>
            ))}
          </div>
        </section>
      )}

      {tools.length === 0 && categories.length === 0 && comparisons.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg">No content yet.</p>
          <p className="text-sm mt-2">
            Add JSON files to content/tools, content/categories, or
            content/comparisons to get started.
          </p>
        </div>
      )}
    </div>
  );
}
