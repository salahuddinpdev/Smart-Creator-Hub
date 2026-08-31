import { useEffect } from "react";
import { Link, useParams } from "wouter";
import { ArrowLeft, ChevronRight, Sparkles } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Seo } from "@/components/Seo";
import { ToolCard } from "@/components/ToolCard";
import { getToolBySlug, tools } from "@/data/tools";
import { toolSeoData } from "@/data/toolSeo";
import { toolComponents } from "@/tools";
import { PlaceholderTool } from "@/tools/PlaceholderTool";
import { NotFound } from "./NotFound";

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  Text: ["text tools online", "writing tools free", "ai text tools"],
  Image: ["image tools online", "image compressor free", "photo tools browser"],
  Developer: ["developer tools online", "coding utilities free", "web developer tools"],
  Student: ["student tools free", "academic calculator", "gpa calculator online"],
  Productivity: ["productivity tools free", "online utilities", "work tools browser"],
};

export function ToolDetail() {
  const params = useParams<{ slug: string }>();
  const tool = params?.slug ? getToolBySlug(params.slug) : undefined;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [params?.slug]);

  if (!tool) return <NotFound />;

  const ToolComponent = toolComponents[tool.slug];
  const Icon = tool.icon;

  const related = tools
    .filter((t) => t.slug !== tool.slug && t.category === tool.category)
    .slice(0, 4);

  const categoryKws = CATEGORY_KEYWORDS[tool.category] ?? [];
  const seo = toolSeoData[tool.slug];
  const allKeywords = Array.from(new Set([
    ...(seo?.keywords ?? tool.keywords),
    `${tool.name.toLowerCase()} free`,
    `${tool.name.toLowerCase()} online`,
    `${tool.name.toLowerCase()} no signup`,
    ...categoryKws,
  ]));

  return (
    <Layout>
      <Seo
        title={seo?.seoTitle ?? `${tool.name} — Free Online Tool | Salah Tools Hub`}
        description={
          seo?.seoDescription ??
          `${tool.shortDescription} Free, no signup, runs entirely in your browser. No upload to a server.`
        }
        keywords={allKeywords}
        canonicalPath={`/tools/${tool.slug}`}
        breadcrumbs={[
          { name: "Tools", href: "/tools" },
          { name: tool.name, href: `/tools/${tool.slug}` },
        ]}
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebApplication",
              name: tool.name,
              url: `https://salahtoolshub.com/tools/${tool.slug}`,
              applicationCategory: "UtilityApplication",
              operatingSystem: "Web",
              browserRequirements: "Requires JavaScript",
              description: seo?.seoDescription ?? tool.shortDescription,
              featureList: (seo?.keywords ?? tool.keywords).join(", "),
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
              },
              publisher: {
                "@type": "Organization",
                name: "Salah Tools Hub",
                url: "https://salahtoolshub.com",
              },
            },
            ...(seo?.faq?.length
              ? [
                  {
                    "@type": "FAQPage",
                    mainEntity: seo.faq.map(({ q, a }) => ({
                      "@type": "Question",
                      name: q,
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: a,
                      },
                    })),
                  },
                ]
              : []),
          ],
        }}
      />

      <section className="pt-4 sm:pt-6 pb-10 sm:pb-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">

          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center text-xs sm:text-sm text-muted-foreground overflow-hidden"
          >
            <Link href="/" className="hover:text-foreground transition-colors shrink-0">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 mx-1 sm:mx-1.5 shrink-0" aria-hidden="true" />
            <Link href="/tools" className="hover:text-foreground transition-colors shrink-0">
              Tools
            </Link>
            <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 mx-1 sm:mx-1.5 shrink-0" aria-hidden="true" />
            <span className="text-foreground font-medium truncate" aria-current="page">{tool.name}</span>
          </nav>

          <div className="mt-4 sm:mt-5 grid lg:grid-cols-[1fr_272px] xl:grid-cols-[1fr_296px] gap-5 sm:gap-6 items-start">
            {/* Main column */}
            <div className="space-y-4 sm:space-y-5 min-w-0">
              {/* Tool header */}
              <header className="flex items-start gap-3 sm:gap-4">
                <div
                  className={`h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-gradient-to-br grid place-items-center text-white shadow-xl shrink-0 ${tool.accent}`}
                  aria-hidden="true"
                >
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                      {tool.category}
                    </span>
                    {tool.trending && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-orange-500/15 text-orange-700 dark:text-orange-300 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                        <Sparkles className="w-3 h-3" aria-hidden="true" />
                        Trending
                      </span>
                    )}
                  </div>
                  <h1 className="mt-1 text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight leading-tight">
                    {tool.name}
                  </h1>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    {tool.shortDescription}
                  </p>
                </div>
              </header>

              {/* Tool component */}
              <article
                className="glass-strong rounded-2xl sm:rounded-3xl p-4 sm:p-5 overflow-hidden"
                aria-label={`${tool.name} tool interface`}
              >
                {ToolComponent ? <ToolComponent /> : <PlaceholderTool toolName={tool.name} />}
              </article>

              {/* About section */}
              <section
                aria-labelledby="about-this-tool"
                className="glass rounded-2xl sm:rounded-3xl p-4 sm:p-6"
              >
                <h2
                  id="about-this-tool"
                  className="text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight"
                >
                  About <span className="gradient-text">{tool.name}</span>
                </h2>
                <p className="mt-3 text-sm leading-[1.8] text-foreground/80">
                  {tool.longDescription}
                </p>
                <div className="mt-4 flex flex-wrap gap-2" role="list" aria-label="Keywords">
                  {tool.keywords.map((k) => (
                    <span
                      key={k}
                      role="listitem"
                      className="rounded-full bg-muted/60 px-2.5 py-1 text-[10px] sm:text-xs font-medium text-muted-foreground"
                    >
                      #{k}
                    </span>
                  ))}
                </div>
              </section>

              {/* Related tools */}
              {related.length > 0 && (
                <section aria-labelledby="related-tools-heading">
                  <h2 id="related-tools-heading" className="text-base sm:text-lg font-extrabold tracking-tight">Related tools</h2>
                  <div className="mt-3 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-3">
                    {related.map((t) => (
                      <ToolCard key={t.slug} tool={t} />
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-4 lg:sticky lg:top-20 min-w-0" aria-label="Sidebar">
              <div className="glass rounded-2xl p-4 sm:p-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Why creators love it
                </h3>
                <ul className="mt-3 space-y-2 text-sm">
                  {[
                    "Runs entirely in your browser",
                    "No signup, no email required",
                    "Works on private & confidential files",
                    "Free forever",
                  ].map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full gradient-bg shrink-0" aria-hidden="true" />
                      <span className="text-xs sm:text-sm">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="/tools"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                Back to all tools
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </Layout>
  );
}
