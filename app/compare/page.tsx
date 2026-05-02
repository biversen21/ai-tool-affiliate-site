import { getAllComparisons } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Tool Comparisons",
  description:
    "Head-to-head comparisons of the best AI tools. Find out which tool wins for your use case.",
};

export default function CompareIndexPage() {
  const comparisons = getAllComparisons().sort((a, b) =>
    a.publishedAt < b.publishedAt ? 1 : -1
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">AI Tool Comparisons</h1>
      <p className="text-gray-600 mb-8">
        Head-to-head breakdowns to help you choose.
      </p>

      {comparisons.length === 0 ? (
        <p className="text-gray-400">
          No comparisons yet. Add JSON files to content/comparisons.
        </p>
      ) : (
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
      )}
    </div>
  );
}
