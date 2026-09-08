import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "fs";
import path from "path";
import { blogPosts } from "./src/data/blog";
import { tools } from "./src/data/tools";
import { toolSeoData } from "./src/data/toolSeo";
import {
  absoluteUrl,
  normalizeSeoTitle,
  OG_IMAGE,
  SITE_NAME,
  SITE_URL,
  trimSeoDescription,
  TWITTER_HANDLE,
} from "./src/seo/metadata";

const port = Number(process.env.PORT) || 5173;
const basePath = process.env.BASE_PATH || "/";
const projectRoot = path.resolve(import.meta.dirname);
const outDir = path.resolve(projectRoot, "dist");

interface ShellPage {
  path: string;
  title: string;
  description: string;
  heading: string;
  content: string;
  jsonLd?: Record<string, unknown>;
  ogType?: "website" | "article";
}

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const jsonForScript = (value: Record<string, unknown>): string =>
  JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");

const internalLinks = `
  <nav aria-label="Salah Tools Hub links">
    <a href="/">Home</a>
    <a href="/tools">All tools</a>
    <a href="/blog">Blog</a>
    <a href="/about">About</a>
    <a href="/contact">Contact</a>
  </nav>`;

const toolLinks = (items: typeof tools): string =>
  `<ul>${items
    .map((tool) => `<li><a href="/tools/${tool.slug}">${escapeHtml(tool.name)}</a></li>`)
    .join("")}</ul>`;

const faqContent = (faq: Array<{ q: string; a: string }> = []): string =>
  faq.length
    ? `<section><h2>Frequently asked questions</h2>${faq
        .map(
          ({ q, a }) =>
            `<h3>${escapeHtml(q)}</h3><p>${escapeHtml(a)}</p>`,
        )
        .join("")}</section>`
    : "";

const makeToolPage = (tool: (typeof tools)[number]): ShellPage => {
  const seo = toolSeoData[tool.slug];
  const title = normalizeSeoTitle(
    seo?.seoTitle ?? `${tool.name} — Free Online Tool | ${SITE_NAME}`,
  );
  const description = trimSeoDescription(
    seo?.seoDescription ??
      `${tool.shortDescription} Free, no signup, runs entirely in your browser. No upload to a server.`,
  );
  const related = tools
    .filter((candidate) => candidate.slug !== tool.slug && candidate.category === tool.category)
    .slice(0, 4);
  const faq = seo?.faq ?? [];

  return {
    path: `/tools/${tool.slug}`,
    title,
    description,
    heading: tool.name,
    content: `
      <p>${escapeHtml(tool.shortDescription)}</p>
      <p>${escapeHtml(tool.longDescription)}</p>
      <h2>How ${escapeHtml(tool.name)} works</h2>
      <p>${escapeHtml(tool.name)} is a free browser-based utility from Salah Tools Hub. It is designed to give you an immediate result without an account, subscription, or upload to a remote server.</p>
      <p>Enter your information into the tool after the page loads, review the result, and use the available copy or download controls. Your input stays on your device while the tool is running.</p>
      ${faqContent(faq)}
      <section>
        <h2>More ${escapeHtml(tool.category.toLowerCase())} tools</h2>
        ${toolLinks(related)}
        <p><a href="/tools">Browse all free online tools</a> from Salah Tools Hub.</p>
      </section>`,
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebApplication",
          name: tool.name,
          url: absoluteUrl(`/tools/${tool.slug}`),
          applicationCategory: "UtilityApplication",
          operatingSystem: "Web",
          browserRequirements: "Requires JavaScript",
          description,
          featureList: (seo?.keywords ?? tool.keywords).join(", "),
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
          publisher: {
            "@type": "Organization",
            name: SITE_NAME,
            url: absoluteUrl("/"),
          },
        },
        ...(faq.length
          ? [
              {
                "@type": "FAQPage",
                mainEntity: faq.map(({ q, a }) => ({
                  "@type": "Question",
                  name: q,
                  acceptedAnswer: { "@type": "Answer", text: a },
                })),
              },
            ]
          : []),
      ],
    },
  };
};

const makeBlogPostPage = (post: (typeof blogPosts)[number]): ShellPage => ({
  path: `/blog/${post.slug}`,
  title: normalizeSeoTitle(`${post.title} — ${SITE_NAME} Blog`),
  description: trimSeoDescription(post.excerpt),
  heading: post.title,
  ogType: "article",
  content: `
    <p>${escapeHtml(post.excerpt)}</p>
    <p>By ${escapeHtml(post.author)} · ${escapeHtml(post.date)} · ${post.readingTime} min read</p>
    ${post.content.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
    <p><a href="/tools">Explore the free browser tools mentioned on Salah Tools Hub</a> or <a href="/blog">read more guides</a>.</p>`,
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: absoluteUrl("/"),
      logo: { "@type": "ImageObject", url: absoluteUrl("/favicon.svg") },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(`/blog/${post.slug}`) },
    image: OG_IMAGE,
    articleSection: post.category,
    inLanguage: "en-US",
  },
});

const shellPages: ShellPage[] = [
  {
    path: "/",
    title: "Salah Tools Hub — 50+ Free Online Tools for Creators, Students & Developers",
    description:
      "Free, fast, no-signup tools: AI Text Humanizer, Image Compressor, QR Code Generator, Word Counter, PDF to PNG, JSON Formatter, Password Generator, Regex Tester and more. Every tool runs 100% in your browser.",
    heading: "Every tool a creator needs. In one place.",
    content: `
      <p>Humanize AI text, compress images, generate QR codes, format JSON, test regex, and build gradients with free browser tools.</p>
      <h2>Featured tools</h2>
      ${toolLinks(tools.slice(0, 12))}
      <h2>Why use Salah Tools Hub?</h2>
      <p>Every tool is free, requires no signup, and is designed to work instantly in your browser. Your text, images, and files stay on your device.</p>
      <p><a href="/tools">Browse all ${tools.length} tools</a> or <a href="/blog">read practical guides</a> for creators, students, and developers.</p>`,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url: absoluteUrl("/"),
      description: "50+ free online tools for creators, students, and developers.",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${absoluteUrl("/tools")}?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  },
  {
    path: "/tools",
    title: "All 50 Free Online Tools — Salah Tools Hub",
    description:
      "Browse 50+ free online tools for writing, images, development, students, and productivity. No signup required — runs in your browser.",
    heading: `All ${tools.length} tools`,
    content: `
      <p>Browse free online utilities for writing, images, development, students, and productivity. Each tool works in your browser with no signup required.</p>
      <h2>Free tools for every workflow</h2>
      ${toolLinks(tools)}
      <p>Need help choosing? Start with the <a href="/">Salah Tools Hub homepage</a> or read the latest <a href="/blog">tool guides and tutorials</a>.</p>`,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Free Online Tools — Salah Tools Hub",
      description: "50+ free online tools for creators, students, and developers",
      url: absoluteUrl("/tools"),
      numberOfItems: tools.length,
      itemListElement: tools.map((tool, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: tool.name,
        description: tool.shortDescription,
        url: absoluteUrl(`/tools/${tool.slug}`),
      })),
    },
  },
  {
    path: "/blog",
    title: "Blog — Tutorials & Guides for Creators | Salah Tools Hub",
    description:
      "Practical writing on AI tools, image compression, QR codes, developer utilities, and productivity. Tutorials and deep dives for creators, developers, and students.",
    heading: "Notes from the workshop",
    content: `
      <p>Practical writing on AI, design, marketing, and the small tools that make a real difference in creator workflows.</p>
      <h2>Latest guides</h2>
      <ul>${blogPosts
        .map(
          (post) =>
            `<li><a href="/blog/${post.slug}">${escapeHtml(post.title)}</a> — ${escapeHtml(post.excerpt)}</li>`,
        )
        .join("")}</ul>
      <p>Looking for a quick utility? <a href="/tools">Browse all Salah Tools Hub tools</a>.</p>`,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: `${SITE_NAME} Blog`,
      url: absoluteUrl("/blog"),
      description: "Tutorials, deep dives, and tool roundups for creators, developers, and students.",
      publisher: { "@type": "Organization", name: SITE_NAME, url: absoluteUrl("/") },
      blogPost: blogPosts.map((post) => ({
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        url: absoluteUrl(`/blog/${post.slug}`),
        datePublished: post.date,
        author: { "@type": "Person", name: post.author },
      })),
    },
  },
  {
    path: "/about",
    title: "About Salah Tools Hub — Free Online Tools for Creators",
    description:
      "Salah Tools Hub is a free hub of 50+ utilities for creators, students, and developers — built to be fast, private, and bookmarkable. No signup ever.",
    heading: "About Salah Tools Hub",
    content: `
      <p>A free, fast hub for the small tools creators reach for every day.</p>
      <p>Salah Tools Hub was built to make common one-off tasks simple: compress an image, convert a PDF page, generate a QR code, or format JSON without popups, signup walls, or unnecessary uploads.</p>
      <h2>Our principles</h2>
      <ul><li>Free forever, with no email capture or upsells.</li><li>Privacy by design — work happens in your browser.</li><li>Speed first — tools should load quickly.</li><li>Simple enough to use without a tutorial.</li></ul>
      <p><a href="/tools">Explore the free tools</a> or <a href="/contact">contact the Salah Tools Hub team</a>.</p>`,
  },
  {
    path: "/contact",
    title: "Contact Salah Tools Hub — Get in Touch",
    description:
      "Get in touch with the Salah Tools Hub team. Feature requests, bug reports, partnerships, and more. We read every message.",
    heading: "Get in touch",
    content: `
      <p>We read every message. Bug reports, feature requests, partnership ideas, and questions are welcome.</p>
      <h2>Contact Salah Tools Hub</h2>
      <p>Email us at <a href="mailto:hello@salahtools.com">hello@salahtools.com</a> for support, feedback, or anything related to the free tools.</p>
      <p>You can also <a href="/tools">browse the tool directory</a> or read the <a href="/blog">latest guides</a>.</p>`,
  },
  {
    path: "/privacy",
    title: "Privacy Policy — Salah Tools Hub",
    description:
      "How Salah Tools Hub handles your data: nothing leaves your browser. Our privacy policy in plain English — no personal data collection, no server uploads.",
    heading: "Privacy Policy",
    content: `
      <p>The short version: nothing you type or upload ever leaves your browser.</p>
      <p>Salah Tools Hub does not collect your text, images, files, code, or other content processed through the tools. Every tool runs client-side, so your inputs are not uploaded to our servers.</p>
      <h2>What we collect</h2>
      <p>We may use anonymized analytics to understand which tools are popular and where pages are slow. We do not collect identifying information, IP addresses, or device fingerprints.</p>
      <h2>Third-party services</h2>
      <p>The site loads Google Fonts from Google's CDN. See the <a href="/contact">contact page</a> if you have questions about this policy.</p>`,
  },
  {
    path: "/terms",
    title: "Terms of Service — Salah Tools Hub",
    description:
      "Terms of service for using Salah Tools Hub — free online tools for creators, students, and developers. Plain English, no legalese.",
    heading: "Terms of Service",
    content: `
      <p>The rules for using Salah Tools Hub. We've tried to make them readable.</p>
      <p>By using Salah Tools Hub, you agree to use the service for lawful purposes and not to harm others or infringe intellectual property.</p>
      <h2>No warranty</h2>
      <p>The tools are provided as-is. We work to keep them accurate and reliable, but do not warrant that they are error-free, suitable for every purpose, or available at all times.</p>
      <h2>Intellectual property</h2>
      <p>The site design, code, and content belong to Salah Tools Hub. The output you create using the tools is yours.</p>`,
  },
  ...tools.map(makeToolPage),
  ...blogPosts.map(makeBlogPostPage),
];

function createRouteShellPlugin(): import("vite").Plugin {
  return {
    name: "salah-tools-route-seo-shells",
    apply: "build",
    closeBundle() {
      const template = fs.readFileSync(path.join(outDir, "index.html"), "utf8");

      for (const page of shellPages) {
        const title = normalizeSeoTitle(page.title);
        const description = trimSeoDescription(page.description);
        const canonical = absoluteUrl(page.path);
        const meta = (attribute: "name" | "property", name: string, content: string) => {
          const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
          return new RegExp(
            `(<meta\\s+${attribute}="${escapedName}"\\s+content=")[^"]*(".*?>)`,
          );
        };
        let html = template
          .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
          .replace(meta("name", "description"), `$1${escapeHtml(description)}$2`)
          .replace(meta("property", "og:url"), `$1${escapeHtml(canonical)}$2`)
          .replace(meta("property", "og:title"), `$1${escapeHtml(title)}$2`)
          .replace(meta("property", "og:description"), `$1${escapeHtml(description)}$2`)
          .replace(meta("property", "og:type"), `$1${page.ogType ?? "website"}$2`)
          .replace(meta("property", "og:image"), `$1${escapeHtml(OG_IMAGE)}$2`)
          .replace(meta("name", "twitter:title"), `$1${escapeHtml(title)}$2`)
          .replace(meta("name", "twitter:description"), `$1${escapeHtml(description)}$2`)
          .replace(meta("name", "twitter:image"), `$1${escapeHtml(OG_IMAGE)}$2`)
          .replace(
            /<link rel="canonical" href="[^"]*" \/>/,
            `<link rel="canonical" href="${escapeHtml(canonical)}" />`,
          )
          .replace(
            /<div id="root"><\/div>/,
            `<div id="root"><main><h1>${escapeHtml(page.heading)}</h1>${page.content}${internalLinks}</main></div>`,
          );

        const jsonLd = page.jsonLd
          ? `<script type="application/ld+json" data-route-seo="true">${jsonForScript(page.jsonLd)}</script>`
          : "";
        html = html.replace("</head>", `${jsonLd}</head>`);

        const outputPath =
          page.path === "/" ? path.join(outDir, "index.html") : path.join(outDir, page.path.slice(1), "index.html");
        fs.mkdirSync(path.dirname(outputPath), { recursive: true });
        fs.writeFileSync(outputPath, html);
      }

      console.log(`Generated ${shellPages.length} SEO route shells in ${outDir}`);
    },
  };
}

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    createRouteShellPlugin(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir,
    emptyOutDir: true,
  },
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
