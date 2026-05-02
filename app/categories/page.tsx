import { getAllCategories } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Tool Categories",
  description: "Browse AI tools by category. Find the right type of AI tool for your needs.",
};

export default function CategoriesIndexPage() {
  const categories = getAllCategories();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Categories</h1>
      <p className="text-gray-600 mb-8">Browse AI tools by category.</p>

      {categories.length === 0 ? (
        <p className="text-gray-400">No categories yet. Add JSON files to content/categories.</p>
      ) : (
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
      )}
    </div>
  );
}
