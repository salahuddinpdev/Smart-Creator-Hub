import { Link } from "wouter";
import { ArrowRight, Sparkles, Zap, Lock, Layers } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Seo } from "@/components/Seo";
import { SearchBar } from "@/components/SearchBar";
import { ToolCard } from "@/components/ToolCard";
import { tools, featuredTools, TOOL_CATEGORIES } from "@/data/tools";
import { blogPosts } from "@/data/blog";

const HOW_STEPS = [
  {
    icon: Layers,
    title: "Pick a tool",
    body: "20+ tools across writing, images, dev, and student utilities. Search by keyword or browse by category.",
  },
  {
    icon: Zap,
    title: "Use it instantly",
    body: "Every tool runs in your browser. No signup, no upload to a server, no waiting for an account email.",
  },
  {
    icon: Lock,
    title: "Keep your work private",
    body: "Your input never leaves your device. Use SmartCreatorTools on confidential drafts and client files safely.",
  },
];

export function Home() {
  return (
    <Layout>
      <Seo
        title="SmartCreatorTools — 20+ Free Online Tools for Creators, Students & Developers"
        description="Free, fast, no-signup tools: AI Text Humanizer, Image Compressor, QR Code Generator, Word Counter, PDF to PNG, Code to Image, GPA Predictor and more."
        keywords={[
          "free online tools",
          "ai text humanizer",
          "image compressor",
          "qr code generator",
          "word counter",
          "pdf to png",
          "code to image",
          "gpa calculator",
        ]}
        canonicalPath="/"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "SmartCreatorTools",
          url: "https://smartcreatortools.com",
          description:
            "20+ free online tools for creators, students, and developers. No signup, runs in your browser.",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://smartcreatortools.com/tools?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        }}
      />

      <section className="relative pt-12 pb-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              20+ Free Tools · No Signup Required
            </div>
            <h1 className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]">
              Every tool a creator needs.{" "}
              <span className="gradient-text">In one place.</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Humanize AI text, compress images, generate QR codes, count words, convert PDFs,
              screenshot code — all running in your browser, all free, forever.
            </p>
            <div className="mt-10 flex justify-center">
              <SearchBar variant="hero" />
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {TOOL_CATEGORIES.map((c) => (
                <Link
                  key={c}
                  href={`/tools?category=${encodeURIComponent(c)}`}
                  className="rounded-full glass px-4 py-1.5 text-xs font-semibold hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  {c}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-20 flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Featured tools
              </h2>
              <p className="mt-2 text-muted-foreground">
                The seven tools creators reach for most.
              </p>
            </div>
            <Link
              href="/tools"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              View all {tools.length} tools
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredTools.slice(0, 8).map((t, i) => (
              <ToolCard key={t.slug} tool={t} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">How it works</h2>
            <p className="mt-3 text-muted-foreground">
              Built for the way creators actually work in 2026 — fast, private, and free.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
            {HOW_STEPS.map((s, i) => (
              <div key={s.title} className="glass rounded-2xl p-7 relative">
                <div className="absolute -top-3 -left-3 h-10 w-10 rounded-full gradient-bg grid place-items-center text-white font-extrabold shadow-lg shadow-primary/30">
                  {i + 1}
                </div>
                <s.icon className="w-7 h-7 text-primary" />
                <h3 className="mt-4 font-bold text-lg">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                From the blog
              </h2>
              <p className="mt-2 text-muted-foreground">
                Tutorials, deep dives, and tool roundups for creators.
              </p>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              All posts
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
            {blogPosts.slice(0, 3).map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group glass rounded-2xl overflow-hidden hover:-translate-y-1 transition-all"
              >
                <div className={`aspect-[16/9] bg-gradient-to-br ${p.cover.gradient}`} />
                <div className="p-5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-primary">
                    {p.category} · {p.readingTime} min
                  </div>
                  <h3 className="mt-2 font-bold text-base leading-tight group-hover:text-primary transition-colors">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="glass-strong rounded-3xl p-10 sm:p-14 text-center relative overflow-hidden">
            <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full gradient-bg opacity-30 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 opacity-20 blur-3xl" />
            <h2 className="relative text-3xl sm:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto">
              Bookmark it once. <span className="gradient-text">Use it forever.</span>
            </h2>
            <p className="relative mt-4 text-muted-foreground max-w-xl mx-auto">
              No accounts, no email captures, no upsells. Just tools that work.
            </p>
            <Link
              href="/tools"
              className="relative inline-flex items-center gap-2 mt-8 rounded-xl gradient-bg px-7 py-3.5 text-base font-semibold text-white shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-shadow"
            >
              Browse all {tools.length} tools
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
