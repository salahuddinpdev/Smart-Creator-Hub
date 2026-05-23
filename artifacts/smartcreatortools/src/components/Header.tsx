import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Sparkles } from "lucide-react";
import { SearchBar } from "./SearchBar";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/tools", label: "Tools" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-300",
        scrolled ? "py-2" : "py-3 sm:py-4",
      )}
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-4">
        <div className="glass-strong rounded-2xl px-3 sm:px-5 py-2.5 sm:py-3 flex items-center gap-2 sm:gap-4">
          <Link href="/" className="flex items-center gap-2 shrink-0 min-touch">
            <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl gradient-bg grid place-items-center shadow-lg shadow-primary/30 shrink-0">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <span className="font-extrabold text-base sm:text-lg gradient-text tracking-tight leading-none hidden xs:block sm:block">
              SmartCreatorTools
            </span>
            <span className="font-extrabold text-base gradient-text tracking-tight leading-none xs:hidden">
              SCT
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5 ml-1">
            {NAV.map((item) => {
              const active =
                item.href === "/"
                  ? location === "/"
                  : location.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap",
                    active
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex-1 hidden md:flex justify-end min-w-0">
            <SearchBar variant="compact" />
          </div>

          <Link
            href="/tools"
            className="hidden lg:inline-flex items-center gap-2 ml-1 rounded-xl gradient-bg px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/25 hover:shadow-primary/45 hover:-translate-y-px transition-all whitespace-nowrap"
          >
            Browse Tools
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden ml-auto h-9 w-9 sm:h-10 sm:w-10 grid place-items-center rounded-xl glass transition-colors hover:bg-primary/10"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span
              className={cn(
                "transition-transform duration-200",
                open ? "rotate-90" : "rotate-0",
              )}
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </span>
          </button>
        </div>

        <div
          ref={menuRef}
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
            open ? "max-h-96 mt-2 opacity-100" : "max-h-0 mt-0 opacity-0",
          )}
        >
          <div className="glass-strong rounded-2xl p-4 space-y-3">
            <div className="md:hidden">
              <SearchBar variant="compact" onNavigate={() => setOpen(false)} />
            </div>
            <nav className="flex flex-col gap-0.5">
              {NAV.map((item) => {
                const active =
                  item.href === "/"
                    ? location === "/"
                    : location.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "px-3 py-3 rounded-xl text-sm font-medium transition-colors",
                      active
                        ? "text-primary bg-primary/10"
                        : "hover:bg-muted/50",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href="/tools"
                className="mt-1 flex items-center justify-center rounded-xl gradient-bg px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25"
              >
                Browse All Tools
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
