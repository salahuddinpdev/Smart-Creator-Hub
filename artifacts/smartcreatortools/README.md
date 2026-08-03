# Salah Tools Hub

A free, fast, no-signup hub of 53+ online tools for creators, students, and developers. Every tool runs entirely in the browser — no server, no account, no file uploads.

## Tech Stack

- **React 19** + **Vite 7**
- **Tailwind CSS v4** — glassmorphism design system
- **Framer Motion** — subtle animations
- **wouter** — lightweight client-side routing
- **Recharts** — GPA chart visualization
- **Lucide React** — icons
- **Plus Jakarta Sans + Inter** — typography

## Project Structure

```
salahtoolshub/
├── public/             # Static assets (favicon, manifest)
├── src/
│   ├── components/     # Reusable UI components (Header, Footer, ToolCard, etc.)
│   ├── components/ui/  # shadcn/ui primitives
│   ├── data/
│   │   ├── tools.ts    # Tool registry — name, slug, category, SEO description
│   │   └── blog.ts     # Blog post content
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utilities (cn, utils)
│   ├── pages/          # Route-level page components
│   ├── tools/          # ← Tool implementations go here
│   │   ├── index.tsx   # Slug → component map (register new tools here)
│   │   ├── AiTextHumanizer.tsx
│   │   ├── ImageCompressor.tsx
│   │   ├── WordToPdf.tsx
│   │   ├── ImageToPdf.tsx
│   │   └── ...         # 53+ tools total
│   ├── App.tsx         # Router setup
│   ├── index.css       # Tailwind + glassmorphism design tokens
│   └── main.tsx        # React entry point
├── index.html          # HTML shell + Google Fonts + SEO meta
├── vite.config.ts      # Vite configuration
├── tsconfig.json       # TypeScript configuration
├── vercel.json         # Vercel SPA routing
├── netlify.toml        # Netlify SPA routing + build config
└── package.json        # All dependencies with exact versions
```

## Getting Started

### Prerequisites

- **Node.js** 18 or later
- **npm** 9 or later (or pnpm / yarn)

### Install & Run

```bash
# Install dependencies
npm install

# Start development server (http://localhost:5173)
npm run dev

# Type-check
npm run typecheck

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deploying

### Vercel

1. Import the repository in the [Vercel dashboard](https://vercel.com/new)
2. Framework preset: **Vite**
3. Build command: `npm run build`
4. Output directory: `dist`
5. Click **Deploy** — `vercel.json` handles SPA routing automatically

### Netlify

1. Import the repository in the [Netlify dashboard](https://app.netlify.com/)
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Click **Deploy** — `netlify.toml` handles redirects automatically

### GitHub Pages

1. Set `base` in `vite.config.ts` to your repo name: `base: '/your-repo-name/'`
2. Run `npm run build`
3. Push the `dist/` folder to the `gh-pages` branch

## Adding a New Tool

Adding a tool requires exactly **3 steps**:

### Step 1 — Create the component

Create `src/tools/MyNewTool.tsx`:

```tsx
export function MyNewTool() {
  return (
    <div className="space-y-4">
      {/* Your tool UI here */}
    </div>
  );
}
```

### Step 2 — Register the component

In `src/tools/index.tsx`, add:

```ts
import { MyNewTool } from "./MyNewTool";

export const toolComponents: Record<string, ComponentType> = {
  // ... existing tools ...
  "my-new-tool": MyNewTool,
};
```

### Step 3 — Add the metadata

In `src/data/tools.ts`, add an entry to the `tools` array:

```ts
{
  slug: "my-new-tool",
  name: "My New Tool",
  category: "Text",            // "Text" | "Image" | "Developer" | "Student" | "Productivity"
  icon: Sparkles,              // Any Lucide icon
  shortDescription: "One-line description shown on the tool card.",
  longDescription: "300-word SEO description shown on the tool detail page.",
  keywords: ["keyword one", "keyword two"],
  featured: false,
  trending: false,
  functional: true,
  accent: "from-violet-500 to-fuchsia-500",
}
```

That's it. The tool is now live at `/tools/my-new-tool` with full routing, SEO meta tags, breadcrumbs, sidebar, and related tools.

## Tool Categories

| Category | Description |
|---|---|
| Text | Writing, editing, formatting, AI tools |
| Image | Compression, conversion, QR codes |
| Developer | JSON, Base64, regex, hashing, PDF |
| Student | GPA, BMI, age, unit conversion |
| Productivity | Timers, calculators, finance |

## Key Design Decisions

- **100% browser-side** — no backend, no API keys, no data leaves the device
- **No signup** — all tools are free and anonymous
- **SEO-first** — every tool page has a `<Seo />` component with `og:`, Twitter Card, and JSON-LD
- **Glassmorphism** — design system defined in `src/index.css` with `.glass`, `.glass-strong`, `.gradient-text`, `.gradient-bg`, `.card-lift` utilities
- **Font pairing** — Plus Jakarta Sans (display) + Inter (body) + JetBrains Mono (code tools)

## License

MIT — free to use, fork, and deploy.
