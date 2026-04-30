import { useEffect, useState } from "react";
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-300",
        scrolled ? "py-2" : "py-4",
      )}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="glass-strong rounded-2xl px-4 sm:px-6 py-3 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="h-9 w-9 rounded-xl gradient-bg grid place-items-center shadow-lg shadow-primary/30">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold text-lg sm:text-xl gradient-text tracking-tight">
              SmartCreatorTools
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 ml-2">
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
                    "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                    active
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex-1 hidden md:block">
            <div className="ml-auto flex justify-end">
              <SearchBar variant="compact" />
            </div>
          </div>

          <Link
            href="/tools"
            className="hidden lg:inline-flex items-center gap-2 ml-2 rounded-xl gradient-bg px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow"
          >
            Browse Tools
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden ml-auto h-10 w-10 grid place-items-center rounded-xl glass"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {open && (
          <div className="lg:hidden mt-2 glass-strong rounded-2xl p-4 space-y-3">
            <div className="md:hidden">
              <SearchBar variant="compact" onNavigate={() => setOpen(false)} />
            </div>
            <nav className="flex flex-col">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-muted/50"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/tools"
                className="mt-2 inline-flex items-center justify-center rounded-xl gradient-bg px-4 py-2.5 text-sm font-semibold text-white"
              >
                Browse Tools
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
