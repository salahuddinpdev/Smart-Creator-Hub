import { useMemo, useState } from "react";
import { Search } from "lucide-react";
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
        title="All Tools — SmartCreatorTools"
        description="Browse 20+ free online tools for writing, images, development, students, and productivity. Filter by category or search by keyword."
        keywords={["online tools", "tools directory", "free tools"]}
        canonicalPath="/tools"
      />
      <section className="pt-10 pb-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              All <span className="gradient-text">{tools.length} tools</span>
            </h1>
            <p className="mt-4 text-muted-foreground">
              Filter by category or search by name. Every tool is free and runs in your browser.
            </p>
          </div>

          <div className="mt-10 glass-strong rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <Search className="w-5 h-5 text-muted-foreground" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, keyword, or use case…"
                className="flex-1 bg-transparent border-0 outline-none text-base placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            {(["All", ...TOOL_CATEGORIES] as Filter[]).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setFilter(c)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition-all",
                  filter === c
                    ? "gradient-bg text-white shadow-lg shadow-primary/30"
                    : "glass hover:bg-primary/10 hover:text-primary",
                )}
              >
                {c}
                <span className={cn("ml-1.5 text-xs", filter === c ? "opacity-80" : "opacity-50")}>
                  {c === "All" ? tools.length : tools.filter((t) => t.category === c).length}
                </span>
              </button>
            ))}
          </div>

          {filtered.length > 0 ? (
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((t, i) => (
                <ToolCard key={t.slug} tool={t} index={i} />
              ))}
            </div>
          ) : (
            <div className="mt-12 glass rounded-2xl p-12 text-center">
              <p className="text-muted-foreground">
                No tools match. Try a different keyword or clear filters.
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
