import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Seo } from "@/components/Seo";
import { ToolCard } from "@/components/ToolCard";
import { tools, TOOL_CATEGORIES, type ToolCategory } from "@/data/tools";
import { cn } from "@/lib/utils";

type Filter = "All" | ToolCategory;

export function ToolsDirectory() {
  const [filter, setFilter] = useState<Filter>(() => {
    if (typeof window === "undefined") return "All";
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("category") as Filter | null;
    return cat && (cat === "All" || TOOL_CATEGORIES.includes(cat as ToolCategory)) ? cat : "All";
  });
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tools.filter((t) => {
      if (filter !== "All" && t.category !== filter) return false;
      if (!q) return true;
      return (
        t.name.toLowerCase().includes(q) ||
        t.shortDescription.toLowerCase().includes(q) ||
        t.keywords.some((k) => k.includes(q))
      );
    });
  }, [filter, query]);

  return (
    <Layout>
      <Seo
        title="All Free Online Tools — SmartCreatorTools"
        description="Browse 20+ free online tools for writing, images, development, students, and productivity. AI text humanizer, image compressor, QR code generator, PDF converter and more. No signup required."
        keywords={[
          "free online tools",
          "online tools directory",
          "ai tools free",
          "image tools online",
          "developer tools browser",
          "student tools online",
          "productivity tools free",
          "no signup tools",
          "browser based tools",
        ]}
        canonicalPath="/tools"
        breadcrumbs={[{ name: "Tools", href: "/tools" }]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Free Online Tools",
          description: "20+ free online tools for creators, students, and developers",
          url: "https://smartcreatortools.com/tools",
          numberOfItems: tools.length,
          itemListElement: tools.slice(0, 10).map((t, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: t.name,
            description: t.shortDescription,
            url: `https://smartcreatortools.com/tools/${t.slug}`,
          })),
        }}
      />

      <section className="pt-8 sm:pt-10 pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              All <span className="gradient-text">{tools.length} tools</span>
            </h1>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground">
              Filter by category or search by name. Every tool is free and runs in your browser.
            </p>
          </div>

          {/* Search */}
          <div className="mt-8 sm:mt-10 glass-strong rounded-xl sm:rounded-2xl px-4 py-3 sm:p-4" role="search" aria-label="Search tools">
            <div className="flex items-center gap-3">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground shrink-0" aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, keyword, or use case…"
                className="flex-1 bg-transparent border-0 outline-none text-sm sm:text-base placeholder:text-muted-foreground min-w-0"
                autoComplete="off"
                aria-label="Search tools"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="shrink-0 h-7 w-7 grid place-items-center rounded-full hover:bg-muted/60 transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5 text-muted-foreground" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>

          {/* Category filter — horizontally scrollable on mobile */}
          <div className="mt-4 sm:mt-5 -mx-4 sm:mx-0">
            <div className="overflow-x-auto scrollbar-hide px-4 sm:px-0">
              <div className="flex items-center gap-2 w-max sm:w-auto sm:flex-wrap pb-1" role="group" aria-label="Filter by category">
                {(["All", ...TOOL_CATEGORIES] as Filter[]).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setFilter(c)}
                    aria-pressed={filter === c}
                    aria-label={`Filter: ${c} (${c === "All" ? tools.length : tools.filter((t) => t.category === c).length} tools)`}
                    className={cn(
                      "rounded-full px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap",
                      filter === c
                        ? "gradient-bg text-white shadow-lg shadow-primary/30"
                        : "glass hover:bg-primary/10 hover:text-primary",
                    )}
                  >
                    {c}
                    <span
                      className={cn(
                        "ml-1.5 text-[10px] sm:text-xs",
                        filter === c ? "opacity-80" : "opacity-50",
                      )}
                      aria-hidden="true"
                    >
                      {c === "All" ? tools.length : tools.filter((t) => t.category === c).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          {filtered.length > 0 ? (
            <>
              <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-muted-foreground" aria-live="polite" aria-atomic="true">
                {filtered.length} tool{filtered.length !== 1 ? "s" : ""}
                {filter !== "All" ? ` in ${filter}` : ""}
                {query ? ` matching "${query}"` : ""}
              </p>
              <div
                className="mt-3 sm:mt-4 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4"
                role="list"
                aria-label="Tools"
              >
                {filtered.map((t, i) => (
                  <div key={t.slug} role="listitem">
                    <ToolCard tool={t} index={i} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="mt-10 sm:mt-12 glass rounded-2xl p-10 sm:p-12 text-center" role="status">
              <p className="text-sm sm:text-base text-muted-foreground">
                No tools match. Try a different keyword or{" "}
                <button
                  type="button"
                  onClick={() => { setFilter("All"); setQuery(""); }}
                  className="text-primary font-semibold hover:underline"
                >
                  clear all filters
                </button>
                .
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
