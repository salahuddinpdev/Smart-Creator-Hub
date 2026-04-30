# SmartCreatorTools

A free, fast, no-signup hub of 20+ online tools for creators, students, and developers. Built as a single-page React app — every tool runs entirely in the browser, no server roundtrip.

## Stack

- React 19 + Vite 7
- wouter (routing)
- Tailwind CSS v4 + custom glassmorphism utilities
- framer-motion (subtle animations)
- recharts (GPA chart)
- lucide-react (icons)
- Inter (Google Fonts) for typography

## Artifacts

- `artifacts/smartcreatortools` (web, mounted at `/`) — the main site

## Routes

- `/` — Home (hero, featured tools, how it works, blog teaser, CTA)
- `/tools` — Tools directory with category filter + live search
- `/tools/:slug` — Tool detail page (renders one of the 7 functional tool components or a "coming soon" placeholder), 300-word SEO description, sidebar + in-content ad slots, related tools
- `/blog` — Blog index with 6 mock posts
- `/blog/:slug` — Blog post detail with prose typography
- `/about`, `/privacy`, `/terms`, `/contact` — static pages
- 404 fallback

## Functional tools (real working logic)

Located in `src/tools/`:
1. **AiTextHumanizer** — synonym + contraction rewriter
2. **ImageCompressor** — Canvas-based JPEG/WebP re-encoder with quality slider
3. **QrCodeGenerator** — uses `qrcode` package, custom colors + size, PNG download
4. **WordCounter** — live stats (words, chars, sentences, paragraphs, reading/speaking time, longest/most-common word)
5. **PdfToPng** — `pdfjs-dist` legacy build with worker, per-page PNG + ZIP via `jszip`
6. **CodeToImage** — styled card with regex syntax highlighting, exported via `html-to-image`
7. **GpaPredictor** — credit-weighted GPA math + recharts BarChart visualization

The other 13 tools are listed in the registry and routed; their detail page renders a polished `PlaceholderTool` shell.

## Data

- `src/data/tools.ts` — 20-tool registry with 300-word SEO `longDescription` for each
- `src/data/blog.ts` — 6 mock blog posts with categories, dates, gradient covers, multi-paragraph content

## Components

Reusable in `src/components/`:
- `Layout` — wraps Header + main + footer-ad + Footer
- `Header` — sticky glass nav with gradient logo, search bar, mobile menu
- `Footer` — 4-column glass footer with social links
- `SearchBar` — keyboard-navigable type-ahead over the tool registry
- `ToolCard` — gradient-tinted card used on home + directory
- `AdSlot` — `header | sidebar | in-content | footer` variants (4 distinct AdSense placeholder sizes)
- `Seo` — sets document.title + meta + canonical + JSON-LD
- `CopyButton` — clipboard helper used in tool outputs

## Design system

- Inter font family loaded via `index.html` Google Fonts link
- Glassmorphism utilities in `src/index.css`: `.glass`, `.glass-strong`, `.gradient-text`, `.gradient-bg`, `.gradient-bg-soft`, `.ring-gradient`
- Color theme: violet primary (`262 83% 58%`) + pink accent (`326 78% 60%`) + sky chart-3 (`199 89% 56%`)
- Subtle dotted-grid + radial gradient background layered behind every page

## SEO

The `<Seo />` component sets:
- `<title>`, `<meta name="description">`, `<meta name="keywords">`
- Open Graph (`og:title/description/type/url/site_name`)
- Twitter card (`summary_large_image`)
- `<link rel="canonical">`
- JSON-LD (`WebSite` on home, `WebApplication` on tool pages, `Article` on blog posts)

## Pitfalls

- `pdfjs-dist` worker is loaded via `import("pdfjs-dist/build/pdf.worker.mjs?url")` so Vite handles bundling. If the import path changes in a future pdfjs version, update `src/tools/PdfToPng.tsx`.
- The wouter router base prefix uses `import.meta.env.BASE_URL.replace(/\/$/, "")` so the app works under both `/` and any future path-mounted prefix.
