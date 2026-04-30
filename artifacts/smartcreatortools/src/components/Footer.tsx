import { Link } from "wouter";
import { Sparkles, Twitter, Github, Instagram, Youtube } from "lucide-react";
import { tools } from "@/data/tools";

export function Footer() {
  const topTools = tools.filter((t) => t.featured).slice(0, 6);
  return (
    <footer className="mt-24">
      <div className="mx-auto max-w-7xl px-4 pb-10">
        <div className="glass-strong rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <Link href="/" className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-xl gradient-bg grid place-items-center shadow-lg shadow-primary/30">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="font-extrabold text-lg gradient-text">SmartCreatorTools</span>
              </Link>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                20+ free, fast, no-signup tools for creators, students, and developers. Built to be
                bookmarked.
              </p>
              <div className="mt-5 flex items-center gap-2">
                {[
                  { Icon: Twitter, label: "Twitter" },
                  { Icon: Github, label: "GitHub" },
                  { Icon: Instagram, label: "Instagram" },
                  { Icon: Youtube, label: "YouTube" },
                ].map(({ Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="h-9 w-9 grid place-items-center rounded-lg glass hover:bg-primary/10 transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/80">
                Tools
              </h3>
              <ul className="mt-4 space-y-2.5">
                {topTools.map((t) => (
                  <li key={t.slug}>
                    <Link
                      href={`/tools/${t.slug}`}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {t.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/tools"
                    className="text-sm font-semibold text-primary hover:underline"
                  >
                    View all tools →
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/80">
                Legal
              </h3>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <Link
                    href="/privacy"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/80">
                About
              </h3>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <Link
                    href="/about"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Our Mission
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Support
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Roadmap
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-border/50 flex flex-col md:flex-row gap-4 items-center justify-between">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} SmartCreatorTools. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              Made for creators · Built to be fast · No signup, ever
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
