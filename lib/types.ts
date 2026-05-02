export interface Tool {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  metaDescription: string;
  canonicalUrl: string;
  affiliateUrl: string;
  category: string;
  pricing: string;
  pros: string[];
  cons: string[];
  rating: number;
  publishedAt: string;
}

export interface Category {
  slug: string;
  title: string;
  description: string;
  metaDescription: string;
  canonicalUrl: string;
  tools: string[];
}

export interface Comparison {
  slug: string;
  title: string;
  description: string;
  metaDescription: string;
  canonicalUrl: string;
  tools: string[];
  verdict: string;
  publishedAt: string;
}
