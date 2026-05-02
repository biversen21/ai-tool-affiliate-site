import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "AI Tool Reviews & Comparisons",
    template: "%s | AI Tool Reviews",
  },
  description:
    "Honest reviews, comparisons, and guides for the best AI tools on the market.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <header className="border-b border-gray-200">
          <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
            <a href="/" className="text-lg font-bold tracking-tight">
              AI Tools
            </a>
            <nav className="flex gap-6 text-sm text-gray-600">
              <a href="/tools" className="hover:text-gray-900">
                Tools
              </a>
              <a href="/categories" className="hover:text-gray-900">
                Categories
              </a>
              <a href="/compare" className="hover:text-gray-900">
                Compare
              </a>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-5xl px-4 py-10">{children}</main>
        <footer className="border-t border-gray-200 mt-16">
          <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-gray-500">
            <p>
              Some links on this site are affiliate links. We may earn a
              commission at no extra cost to you.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
