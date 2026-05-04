# CLAUDE.md

## Project

AI tool affiliate site — static-friendly Next.js app that renders content exported from a local content studio. No CMS, no database, no auth.

## Stack

- **Next.js 15** (App Router, TypeScript)
- **Tailwind CSS** — utility classes only, no component library
- **Local JSON files** — single source of truth for all content
- **Vercel** — primary deployment target

## Content

All content lives in `content/` as plain JSON. The three types are defined in `lib/types.ts` and loaded via `lib/content.ts`.

| Directory | Route | Loader |
|---|---|---|
| `content/tools/*.json` | `/tools/[slug]` | `getTool`, `getAllTools` |
| `content/categories/*.json` | `/categories/[slug]` | `getCategory`, `getAllCategories` |
| `content/comparisons/*.json` | `/compare/[slug]` | `getComparison`, `getAllComparisons` |

Never add a CMS, database, or external content API without explicit instruction.

## Routes

| Route | File |
|---|---|
| `/` | `app/page.tsx` |
| `/tools` | `app/tools/page.tsx` |
| `/tools/[slug]` | `app/tools/[slug]/page.tsx` |
| `/categories` | `app/categories/page.tsx` |
| `/categories/[slug]` | `app/categories/[slug]/page.tsx` |
| `/compare` | `app/compare/page.tsx` |
| `/compare/[slug]` | `app/compare/[slug]/page.tsx` |
| `/go/[slug]` | `app/go/[slug]/route.ts` — server redirect to `affiliateUrl` |
| `/sitemap.xml` | `app/sitemap.ts` |
| `/robots.txt` | `app/robots.ts` |

## SEO rules

- Every dynamic page uses `generateMetadata` to set `title`, `description`, and `canonical` from its JSON payload.
- `canonicalUrl` in each JSON file must match the live production URL.
- `NEXT_PUBLIC_SITE_URL` drives the sitemap and canonical base — always set it in production.
- `/go/` is blocked in `robots.txt` so affiliate redirects are not crawled.

## Coding conventions

- No comments unless the reason is non-obvious.
- No extra abstractions — keep loaders in `lib/content.ts`, types in `lib/types.ts`.
- `generateStaticParams` on every `[slug]` page so pages pre-render at build time.
- Do not add `output: "export"` to `next.config.ts` — the `/go` route handler and `sitemap.ts`/`robots.ts` require a Node runtime.
- Tailwind only. No CSS modules, no styled-components, no inline styles.
- No analytics, auth, social features, or CMS until explicitly requested.

## Git workflow

- **Never commit to `main` directly.**
- Develop on `claude/ai-tool-affiliate-site-acPzN`.
- Open a PR into `main` for every change set.
- Commit messages: short imperative subject, blank line, brief body if needed.
- Always push after committing: `git push -u origin <branch>`.

## Environment variables

| Variable | Required | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes (prod) | Full origin, e.g. `https://your-domain.com` |
