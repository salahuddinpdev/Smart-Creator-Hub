import { Link } from "wouter";
import { ArrowRight, Sparkles, Zap, Lock, Layers, Star, Globe, Shield } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Seo } from "@/components/Seo";
import { SearchBar } from "@/components/SearchBar";
import { ToolCard } from "@/components/ToolCard";
import { tools, featuredTools, TOOL_CATEGORIES } from "@/data/tools";
import { blogPosts } from "@/data/blog";
import { absoluteUrl } from "@/seo/metadata";

const HOW_STEPS = [
  {
    icon: Layers,
    title: "Pick a tool",
    body: "50 tools across writing, images, developer utilities, calculators, and productivity. Search by keyword or browse by category.",
  },
  {
    icon: Zap,
    title: "Use it instantly",
    body: "Every tool runs 100% in your browser — no login, no file upload to any server, no waiting for an account email.",
  },
  {
    icon: Lock,
    title: "Your data stays private",
    body: "Your input never leaves your device. Use Salah Tools Hub safely on confidential drafts, client files, and sensitive data.",
  },
];

const TRUST_BADGES = [
  { icon: Star, label: "100% Free, Forever" },
  { icon: Shield, label: "No Signup Required" },
  { icon: Globe, label: "Works in Any Browser" },
  { icon: Zap, label: "Instant Results" },
];

export function Home() {
  return (
    <Layout>
      <Seo
        title="Salah Tools Hub — 50+ Free Online Tools for Creators, Students & Developers"
        description="Free, fast, no-signup tools: AI Text Humanizer, Image Compressor, QR Code Generator, Word Counter, PDF to PNG, JSON Formatter, Password Generator, Regex Tester and more. Every tool runs 100% in your browser."
        keywords={[
          "free online tools",
          "smart tools website",
          "ai tools hub",
          "utility tools platform",
          "text tools online",
          "image tools online",
          "developer tools online",
          "ai text humanizer",
          "image compressor online",
          "qr code generator free",
          "word counter",
          "pdf to png converter",
          "json formatter online",
          "password generator",
          "regex tester online",
          "base64 encoder decoder",
          "student tools free",
          "no signup tools",
        ]}
        canonicalPath="/"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Salah Tools Hub",
          url: absoluteUrl("/"),
          description:
            "50+ free online tools for creators, students, and developers. No signup, runs in your browser.",
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${absoluteUrl("/tools")}?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
          },
        }}
      />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative pt-8 sm:pt-14 pb-16 sm:pb-24 animate-fade-in" aria-label="Hero">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center max-w-4xl mx-auto">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Sparkles className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden="true" />
              50+ Free Tools · No Signup · Runs in Your Browser
            </div>

            {/* H1 */}
            <h1 className="mt-5 sm:mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]">
              Every tool a creator needs.{" "}
              <span className="gradient-text">In one place.</span>
            </h1>

            {/* Sub-headline */}
            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto px-2">
              Humanize AI text, compress images, generate QR codes, format JSON, test regex,
              build gradients — all 50 tools run free in your browser, zero signup.
            </p>

            {/* Hero search */}
            <div className="mt-8 sm:mt-10 flex justify-center px-2">
              <SearchBar variant="hero" />
            </div>

            {/* Category pills */}
            <div className="mt-5 sm:mt-6 overflow-x-auto scrollbar-hide -mx-4 px-4" aria-label="Browse by category">
              <div className="flex items-center gap-2 w-max mx-auto pb-1" role="list">
                {TOOL_CATEGORIES.map((c) => (
                  <Link
                    key={c}
                    href={`/tools?category=${encodeURIComponent(c)}`}
                    className="rounded-full glass px-3.5 sm:px-4 py-1.5 text-[11px] sm:text-xs font-semibold hover:bg-primary/10 hover:text-primary transition-colors whitespace-nowrap"
                    role="listitem"
                  >
                    {c}
                  </Link>
                ))}
              </div>
            </div>

            {/* Trust badges */}
            <div className="mt-6 flex flex-wrap justify-center gap-3 sm:gap-4">
              {TRUST_BADGES.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Icon className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden="true" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Featured tools ─────────────────────────────────────── */}
          <div className="mt-16 sm:mt-20">
            <div className="flex items-center justify-between gap-4 flex-wrap mb-6 sm:mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
                  Featured tools
                </h2>
                <p className="mt-1.5 text-sm sm:text-base text-muted-foreground">
                  The tools creators and developers reach for most.
                </p>
              </div>
              <Link
                href="/tools"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline whitespace-nowrap"
                aria-label={`View all ${tools.length} free tools`}
              >
                View all {tools.length} tools
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
            <div
              className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4"
              role="list"
              aria-label="Featured tools"
            >
              {featuredTools.slice(0, 8).map((t, i) => (
                <div key={t.slug} role="listitem">
                  <ToolCard tool={t} index={i} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ───────────────────────────────────────────────── */}
      <section className="py-8 sm:py-10" aria-label="Statistics">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="glass rounded-2xl px-6 py-5 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-center">
            {[
              { value: "50+", label: "Free Tools" },
              { value: "0", label: "Signups Needed" },
              { value: "100%", label: "Browser-Based" },
              { value: "∞", label: "Free Forever" },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="text-2xl sm:text-3xl font-extrabold gradient-text">{value}</div>
                <div className="mt-1 text-xs sm:text-sm text-muted-foreground font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 relative" aria-labelledby="how-it-works-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 id="how-it-works-heading" className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
              How it works
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground">
              Built for the way creators actually work — fast, private, and 100% free.
            </p>
          </div>
          <ol className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5" aria-label="Steps to use Salah Tools Hub">
            {HOW_STEPS.map((s, i) => (
              <li key={s.title} className="glass rounded-2xl p-6 sm:p-7 relative list-none">
                <div
                  className="absolute -top-3 -left-3 h-9 w-9 sm:h-10 sm:w-10 rounded-full gradient-bg grid place-items-center text-white font-extrabold shadow-lg shadow-primary/30 text-sm"
                  aria-hidden="true"
                >
                  {i + 1}
                </div>
                <s.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" aria-hidden="true" />
                <h3 className="mt-3 sm:mt-4 font-bold text-base sm:text-lg">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Blog teaser ─────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20" aria-labelledby="blog-teaser-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-end justify-between gap-4 flex-wrap mb-6 sm:mb-8">
            <div>
              <h2 id="blog-teaser-heading" className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
                From the blog
              </h2>
              <p className="mt-1.5 text-sm sm:text-base text-muted-foreground">
                Tutorials, deep dives, and tool roundups for creators.
              </p>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline whitespace-nowrap"
              aria-label="View all blog posts"
            >
              All posts
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
            {blogPosts.slice(0, 3).map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group glass rounded-2xl overflow-hidden card-lift"
                aria-label={`Read: ${p.title}`}
              >
                <div
                  className={`aspect-[16/9] bg-gradient-to-br ${p.cover.gradient}`}
                  role="img"
                  aria-label={`Cover image for ${p.title}`}
                />
                <div className="p-4 sm:p-5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-primary">
                    {p.category} · {p.readingTime} min read
                  </div>
                  <h3 className="mt-2 font-bold text-sm sm:text-base leading-tight group-hover:text-primary transition-colors line-clamp-2">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-muted-foreground line-clamp-2">{p.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20" aria-label="Call to action">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="glass-strong rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-14 text-center relative overflow-hidden">
            <div className="absolute -top-16 sm:-top-20 -right-16 sm:-right-20 h-48 sm:h-64 w-48 sm:w-64 rounded-full gradient-bg opacity-25 sm:opacity-30 blur-3xl pointer-events-none" aria-hidden="true" />
            <div className="absolute -bottom-16 sm:-bottom-20 -left-16 sm:-left-20 h-48 sm:h-64 w-48 sm:w-64 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 opacity-15 sm:opacity-20 blur-3xl pointer-events-none" aria-hidden="true" />
            <h2 className="relative text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight">
              Bookmark it once.{" "}
              <span className="gradient-text">Use it forever.</span>
            </h2>
            <p className="relative mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
              No accounts, no email captures, no upsells. Just {tools.length} tools that work.
            </p>
            <Link
              href="/tools"
              className="relative inline-flex items-center gap-2 mt-6 sm:mt-8 rounded-xl gradient-bg px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-white shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-px transition-all"
              aria-label={`Browse all ${tools.length} free online tools`}
            >
              Browse all {tools.length} tools
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
