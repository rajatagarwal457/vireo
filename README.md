# Vireo — landing page

Marketing site for **Vireo**, the AI video editor for creators. Built with Next.js (App Router) and plain CSS — no UI framework.

## Highlights

- **Editor demo, no chat** — the hero features an animated mockup of the Vireo editor (canvas, caption highlighting, clip/caption/audio tracks, live playhead) instead of the old chat panel.
- **SEO optimized**
  - Full `metadata` API usage: canonical URL, Open Graph, Twitter cards, robots directives
  - JSON-LD structured data: `Organization`, `WebSite`, `SoftwareApplication`, `FAQPage`
  - `sitemap.xml`, `robots.txt`, and web manifest generated via route handlers
  - Build-time Open Graph image (`opengraph-image.tsx`)
  - Semantic HTML (single `h1`, labelled sections, `figure`/`blockquote` testimonials), `next/font` with `display: swap`, static prerendering
- Fully responsive, `prefers-reduced-motion` respected.

## Develop

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # production build (static prerender)
```

## Deploy

Pushes to `main` build a static export and publish it to GitHub Pages via `.github/workflows/deploy.yml`.

- `NEXT_PUBLIC_SITE_URL` — production origin (defaults to `https://editvireo.com`) so canonical/OG/sitemap URLs resolve correctly.
- `NEXT_PUBLIC_BASE_PATH` — set to the repo sub-path (e.g. `/vireo`) when serving from a GitHub project page; leave unset when serving from a domain root.
