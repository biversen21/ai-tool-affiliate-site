# ai-tool-affiliate-site

A static-friendly Next.js site for AI tool reviews, category pages, and head-to-head comparisons with affiliate monetisation.

## Stack

| | |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styles | Tailwind CSS |
| Content | Local JSON files |
| Hosting | Vercel (recommended) |

No database, no CMS, no auth.

---

## Local dev

```bash
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_SITE_URL
npm run dev                  # http://localhost:3000
```

---

## Project structure

```
app/
  layout.tsx                 # Shell: header, footer
  page.tsx                   # Homepage
  tools/
    page.tsx                 # /tools index
    [slug]/page.tsx          # /tools/[slug]
  categories/
    page.tsx                 # /categories index
    [slug]/page.tsx          # /categories/[slug]
  compare/
    page.tsx                 # /compare index
    [slug]/page.tsx          # /compare/[slug]
  go/[slug]/route.ts         # Affiliate redirect → affiliateUrl
  sitemap.ts                 # Auto-generated /sitemap.xml
  robots.ts                  # Auto-generated /robots.txt

lib/
  content.ts                 # JSON loaders (getTool, getCategory, getComparison, getAll*)
  types.ts                   # Tool | Category | Comparison interfaces

content/
  tools/        *.json
  categories/   *.json
  comparisons/  *.json
```

---

## Adding content

### Tool — `content/tools/<slug>.json`

```json
{
  "slug": "my-tool",
  "title": "My Tool",
  "tagline": "One-line pitch shown on cards.",
  "description": "Full review paragraph rendered on the tool page.",
  "metaDescription": "SEO meta description, 150–160 characters.",
  "canonicalUrl": "https://your-domain.com/tools/my-tool",
  "affiliateUrl": "https://affiliate-link.example.com/?ref=you",
  "category": "chatbots",
  "pricing": "Free / $20/mo",
  "pros": ["Fast", "Generous free tier"],
  "cons": ["No mobile app"],
  "rating": 4.5,
  "publishedAt": "2025-01-01"
}
```

### Category — `content/categories/<slug>.json`

```json
{
  "slug": "chatbots",
  "title": "AI Chatbots",
  "description": "Short description shown on the category page.",
  "metaDescription": "SEO meta description.",
  "canonicalUrl": "https://your-domain.com/categories/chatbots",
  "tools": ["chatgpt", "claude"]
}
```

The `tools` array references tool slugs. Missing slugs are silently skipped.

### Comparison — `content/comparisons/<slug>.json`

```json
{
  "slug": "chatgpt-vs-claude",
  "title": "ChatGPT vs Claude",
  "description": "Short intro paragraph.",
  "metaDescription": "SEO meta description.",
  "canonicalUrl": "https://your-domain.com/compare/chatgpt-vs-claude",
  "tools": ["chatgpt", "claude"],
  "verdict": "Summary of which tool wins and why.",
  "publishedAt": "2025-01-01"
}
```

---

## SEO

- `generateMetadata` on every page sets `<title>`, `<meta name="description">`, and `<link rel="canonical">` from the JSON payload.
- `/sitemap.xml` is generated at request time from all content files.
- `/robots.txt` allows everything except `/go/` (affiliate redirects).
- Set `NEXT_PUBLIC_SITE_URL` to your production domain — it drives canonical URLs and the sitemap.

---

## Affiliate redirects

`/go/[slug]` reads `affiliateUrl` from the matching tool JSON and issues a server-side redirect. The route is blocked in `robots.txt` so crawlers don't follow it.

---

## Deployment

### Vercel

Push to GitHub, import the repo at [vercel.com](https://vercel.com), set `NEXT_PUBLIC_SITE_URL` in environment variables. No other config needed.

### Node.js (self-hosted)

```bash
npm run build
npm start
```

### Fully static (Cloudflare Pages, S3, etc.)

The `/go` route handler and the `sitemap.ts` / `robots.ts` routes require a Node.js runtime and are incompatible with `output: "export"`. To go fully static:

1. Remove `app/go/[slug]/route.ts` (replace with a client-side redirect page if needed).
2. Replace `app/sitemap.ts` and `app/robots.ts` with static files in `public/`.
3. Add `output: "export"` to `next.config.ts`.
4. Run `npm run build` — output lands in `/out`.

---

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes (prod) | Full origin, e.g. `https://your-domain.com`. Drives canonical URLs and sitemap. |
