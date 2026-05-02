# AI Tool Affiliate Site

A static-friendly Next.js site for AI tool reviews and affiliate content.

## Tech stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Local JSON files** — no CMS or database

---

## Local development

```bash
# 1. Install dependencies
npm install

# 2. Copy env vars
cp .env.example .env.local
# Edit .env.local and set NEXT_PUBLIC_SITE_URL

# 3. Start dev server
npm run dev
# → http://localhost:3000
```

---

## Content

All content lives in `content/` as plain JSON files. No build step required — just add or edit files and refresh.

### Adding a tool

Create `content/tools/<slug>.json`:

```json
{
  "slug": "my-tool",
  "title": "My Tool",
  "tagline": "One-line pitch.",
  "description": "Longer review paragraph.",
  "metaDescription": "SEO meta description (150–160 chars).",
  "canonicalUrl": "https://your-domain.com/tools/my-tool",
  "affiliateUrl": "https://affiliate-link.com/?ref=you",
  "category": "chatbots",
  "pricing": "Free / $20/mo",
  "pros": ["Fast", "Affordable"],
  "cons": ["No mobile app"],
  "rating": 4.5,
  "publishedAt": "2025-01-01"
}
```

Route: `/tools/[slug]`
Affiliate redirect: `/go/[slug]` → `affiliateUrl`

### Adding a category

Create `content/categories/<slug>.json`:

```json
{
  "slug": "chatbots",
  "title": "AI Chatbots",
  "description": "Short category description.",
  "metaDescription": "SEO meta description.",
  "canonicalUrl": "https://your-domain.com/categories/chatbots",
  "tools": ["chatgpt", "claude"]
}
```

Route: `/categories/[slug]`

### Adding a comparison

Create `content/comparisons/<slug>.json`:

```json
{
  "slug": "chatgpt-vs-claude",
  "title": "ChatGPT vs Claude",
  "description": "Short intro.",
  "metaDescription": "SEO meta description.",
  "canonicalUrl": "https://your-domain.com/compare/chatgpt-vs-claude",
  "tools": ["chatgpt", "claude"],
  "verdict": "Summary of which tool wins and why.",
  "publishedAt": "2025-01-01"
}
```

Route: `/compare/[slug]`

---

## Routes

| Route | Description |
|---|---|
| `/` | Homepage — latest tools, categories, comparisons |
| `/tools` | All tool reviews |
| `/tools/[slug]` | Individual tool review |
| `/categories` | All categories |
| `/categories/[slug]` | Category page listing tools |
| `/compare` | All comparisons |
| `/compare/[slug]` | Head-to-head comparison |
| `/go/[slug]` | Affiliate redirect (disallowed in robots.txt) |
| `/sitemap.xml` | Auto-generated sitemap |
| `/robots.txt` | Disallows `/go/` from crawlers |

---

## SEO

Each page generates `<title>`, `<meta description>`, and `<link rel="canonical">` from its JSON payload via Next.js `generateMetadata`. The sitemap at `/sitemap.xml` is generated automatically from all content files.

Set `NEXT_PUBLIC_SITE_URL` to your production domain so canonical URLs and the sitemap are correct.

---

## Deployment

### Vercel (recommended)

```bash
# Push to GitHub, then import the repo at vercel.com
# Set NEXT_PUBLIC_SITE_URL in the Vercel environment variables UI
```

### Self-hosted (Node.js)

```bash
npm run build
npm start
```

### Static export (no `/go` redirect or sitemap route)

If you need a fully static export (Cloudflare Pages, S3, etc.), remove the `/go` route handler, replace `sitemap.ts`/`robots.ts` with static files in `public/`, then:

```bash
# next.config.ts: set output: "export"
npm run build
# Output is in /out
```
