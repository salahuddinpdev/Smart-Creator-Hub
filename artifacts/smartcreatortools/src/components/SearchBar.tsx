import { useEffect, useMemo, useRef, useState } from "react";
import { Search, ArrowRight } from "lucide-react";
import { Link, useLocation } from "wouter";
import { tools } from "@/data/tools";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  variant?: "compact" | "hero";
  onNavigate?: () => void;
}

export function SearchBar({ variant = "compact", onNavigate }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [, setLocation] = useLocation();

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return tools
      .filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.shortDescription.toLowerCase().includes(q) ||
          t.keywords.some((k) => k.includes(q)) ||
          t.category.toLowerCase().includes(q),
      )
      .slice(0, 6);
  }, [query]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("mousedown", handler);
    return () => window.removeEventListener("mousedown", handler);
  }, []);

  const select = (slug: string) => {
    setOpen(false);
    setQuery("");
    setLocation(`/tools/${slug}`);
    onNavigate?.();
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (!open || matches.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => (i + 1) % matches.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => (i - 1 + matches.length) % matches.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      select(matches[activeIdx].slug);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const isHero = variant === "hero";

  return (
    <div ref={containerRef} className={cn("relative w-full", isHero ? "max-w-2xl" : "max-w-md")}>
      <div
        className={cn(
          "glass-strong relative flex items-center rounded-full transition-all",
          isHero ? "px-6 py-4" : "px-4 py-2.5",
          "focus-within:ring-2 focus-within:ring-primary/40",
        )}
      >
        <Search
          className={cn("text-muted-foreground", isHero ? "w-5 h-5" : "w-4 h-4")}
          aria-hidden
        />
        <input
          type="search"
          value={query}
          placeholder={isHero ? "Search 20+ tools, e.g. QR code, JSON, image…" : "Search tools…"}
          className={cn(
            "ml-3 flex-1 bg-transparent border-0 outline-none placeholder:text-muted-foreground",
            isHero ? "text-base" : "text-sm",
          )}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setActiveIdx(0);
          }}
          onFocus={() => query && setOpen(true)}
          onKeyDown={onKey}
          aria-label="Search tools"
        />
        {isHero && (
          <kbd className="hidden sm:inline-flex items-center gap-1 rounded-md bg-muted/60 px-2 py-1 text-[10px] font-medium text-muted-foreground">
            <span>↵</span>
            Enter
          </kbd>
        )}
      </div>

      {open && matches.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-2 glass-strong rounded-2xl p-2 shadow-2xl z-50">
          {matches.map((t, idx) => {
            const Icon = t.icon;
            return (
              <button
                key={t.slug}
                type="button"
                onMouseEnter={() => setActiveIdx(idx)}
                onClick={() => select(t.slug)}
                className={cn(
                  "w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                  idx === activeIdx ? "bg-primary/10" : "hover:bg-muted/40",
                )}
              >
                <div
                  className={cn(
                    "h-9 w-9 rounded-lg bg-gradient-to-br grid place-items-center text-white shrink-0",
                    t.accent,
                  )}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold truncate">{t.name}</div>
                  <div className="text-xs text-muted-foreground truncate">
                    {t.shortDescription}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
              </button>
            );
          })}
        </div>
      )}
      {open && query && matches.length === 0 && (
        <div className="absolute left-0 right-0 top-full mt-2 glass-strong rounded-2xl p-6 text-center text-sm text-muted-foreground z-50">
          No tools match <span className="font-semibold text-foreground">{query}</span>.{" "}
          <Link href="/tools" className="text-primary font-semibold hover:underline">
            Browse all
          </Link>
        </div>
      )}
    </div>
  );
}
