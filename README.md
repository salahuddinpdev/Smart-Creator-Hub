# SmartCreatorTools

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
smartcreatortools/
├── public/             # Static assets (favicon, manifest, sitemap)
├── src/
│   ├── components/     # Reusable UI components (Header, Footer, ToolCard, etc.)
│   ├── components/ui/  # shadcn/ui primitives
│   ├── data/
│   │   ├── tools.ts    # Tool registry — name, slug, category, SEO description
│   │   └── blog.ts     # Blog post content
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utilities (cn, utils)
│   ├── pages/          # Route-level page components
│   ├── tools/          # ← All tool implementations live here
│   │   ├── index.tsx   # Slug → component map (register new tools here)
│   │   └── *.tsx       # 53+ individual tool components
│   ├── App.tsx         # Router setup
│   ├── index.css       # Tailwind + glassmorphism design tokens
│   └── main.tsx        # React entry point
├── index.html          # HTML shell
├── vite.config.ts      # Vite configuration
├── tsconfig.json       # TypeScript configuration
├── vercel.json         # Vercel SPA routing
├── netlify.toml        # Netlify build + SPA routing
└── package.json        # All dependencies with real version numbers
```

## Getting Started

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

## Deploy to Vercel

1. Push to GitHub
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. Framework: **Vite** — Build: `npm run build` — Output: `dist`
4. Click **Deploy** — `vercel.json` handles SPA routing automatically

## Deploy to Netlify

1. Push to GitHub
2. Import the repo at [app.netlify.com](https://app.netlify.com/)
3. `netlify.toml` sets the build command and redirect rules automatically
4. Click **Deploy**

## Adding a New Tool

**3 steps only — all inside `src/`:**

### 1. Create `src/tools/MyTool.tsx`

```tsx
export function MyTool() {
  return <div className="space-y-4">{/* tool UI */}</div>;
}
```

### 2. Register in `src/tools/index.tsx`

```ts
import { MyTool } from "./MyTool";

export const toolComponents: Record<string, ComponentType> = {
  // existing tools...
  "my-tool": MyTool,
};
```

### 3. Add metadata in `src/data/tools.ts`

```ts
{
  slug: "my-tool",
  name: "My Tool",
  category: "Text",
  icon: Sparkles,
  shortDescription: "One-line description.",
  longDescription: "300-word SEO description...",
  keywords: ["keyword"],
  featured: false,
  functional: true,
  accent: "from-violet-500 to-fuchsia-500",
}
```

The tool is instantly live at `/tools/my-tool` with full SEO, routing, and sidebar.

## License

MIT
