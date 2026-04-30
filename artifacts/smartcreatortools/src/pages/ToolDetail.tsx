import { useEffect } from "react";
import { Link, useParams } from "wouter";
import { ArrowLeft, ChevronRight, Sparkles } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Seo } from "@/components/Seo";
import { AdSlot } from "@/components/AdSlot";
import { ToolCard } from "@/components/ToolCard";
import { getToolBySlug, tools } from "@/data/tools";
import { toolComponents } from "@/tools";
import { PlaceholderTool } from "@/tools/PlaceholderTool";
import { NotFound } from "./NotFound";

export function ToolDetail() {
  const params = useParams<{ slug: string }>();
  const tool = params?.slug ? getToolBySlug(params.slug) : undefined;

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [params?.slug]);

  if (!tool) return <NotFound />;

  const ToolComponent = toolComponents[tool.slug];
  const Icon = tool.icon;

  const related = tools
    .filter((t) => t.slug !== tool.slug && t.category === tool.category)
    .slice(0, 4);

  return (
    <Layout>
      <Seo
        title={`${tool.name} — Free Online Tool | SmartCreatorTools`}
        description={tool.shortDescription}
        keywords={tool.keywords}
        canonicalPath={`/tools/${tool.slug}`}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: tool.name,
          applicationCategory: "UtilityApplication",
          operatingSystem: "Web",
          description: tool.shortDescription,
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />
      <section className="pt-8 pb-20">
        <div className="mx-auto max-w-7xl px-4">
          <nav aria-label="Breadcrumb" className="flex items-center text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 mx-1.5" />
            <Link href="/tools" className="hover:text-foreground transition-colors">
              Tools
            </Link>
            <ChevronRight className="w-3.5 h-3.5 mx-1.5" />
            <span className="text-foreground font-medium">{tool.name}</span>
          </nav>

          <div className="mt-8 grid lg:grid-cols-[1fr_300px] gap-8 items-start">
            <div className="space-y-8">
              <header className="flex items-start gap-5">
                <div
                  className={`h-16 w-16 rounded-2xl bg-gradient-to-br grid place-items-center text-white shadow-xl shrink-0 ${tool.accent}`}
                >
                  <Icon className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                      {tool.category}
                    </span>
                    {tool.trending && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-orange-500/15 text-orange-700 dark:text-orange-300 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                        <Sparkles className="w-3 h-3" />
                        Trending
                      </span>
                    )}
                  </div>
                  <h1 className="mt-1 text-3xl sm:text-4xl font-extrabold tracking-tight">
                    {tool.name}
                  </h1>
                  <p className="mt-2 text-lg text-muted-foreground">{tool.shortDescription}</p>
                </div>
              </header>

              <article className="glass-strong rounded-3xl p-6 sm:p-8">
                {ToolComponent ? <ToolComponent /> : <PlaceholderTool toolName={tool.name} />}
              </article>

              <AdSlot variant="in-content" />

              <section
                aria-labelledby="about-this-tool"
                className="glass rounded-3xl p-6 sm:p-10"
              >
                <h2
                  id="about-this-tool"
                  className="text-2xl sm:text-3xl font-extrabold tracking-tight"
                >
                  About <span className="gradient-text">{tool.name}</span>
                </h2>
                <p className="mt-5 text-base leading-[1.85] text-foreground/80">
                  {tool.longDescription}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {tool.keywords.map((k) => (
                    <span
                      key={k}
                      className="rounded-full bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground"
                    >
                      #{k}
                    </span>
                  ))}
                </div>
              </section>

              {related.length > 0 && (
                <section>
                  <h2 className="text-xl font-extrabold tracking-tight">Related tools</h2>
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {related.map((t) => (
                      <ToolCard key={t.slug} tool={t} />
                    ))}
                  </div>
                </section>
              )}
            </div>

            <aside className="space-y-5 lg:sticky lg:top-24">
              <AdSlot variant="sidebar" />
              <div className="glass rounded-2xl p-5">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  Why creators love it
                </h3>
                <ul className="mt-3 space-y-2.5 text-sm">
                  {[
                    "Runs entirely in your browser",
                    "No signup, no email required",
                    "Works on private & confidential files",
                    "Free forever",
                  ].map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full gradient-bg shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="/tools"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to all tools
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </Layout>
  );
}
