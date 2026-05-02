import { getAllTools } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All AI Tool Reviews",
  description:
    "Browse our complete list of AI tool reviews. Find the best AI tools for your workflow.",
};

export default function ToolsIndexPage() {
  const tools = getAllTools().sort((a, b) =>
    a.publishedAt < b.publishedAt ? 1 : -1
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">AI Tool Reviews</h1>
      <p className="text-gray-600 mb-8">
        Honest, in-depth reviews of the best AI tools.
      </p>

      {tools.length === 0 ? (
        <p className="text-gray-400">No tools yet. Add JSON files to content/tools.</p>
      ) : (
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
              <p className="text-sm text-gray-600 line-clamp-2">{tool.tagline}</p>
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
