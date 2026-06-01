import { Link } from "wouter";
import { Sparkles, Twitter, Github, Instagram, Youtube } from "lucide-react";
import { tools } from "@/data/tools";

export function Footer() {
  const topTools = tools.filter((t) => t.featured).slice(0, 6);
  return (
    <footer className="mt-16 sm:mt-24" aria-label="Site footer">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 pb-6 sm:pb-10">
        <div className="glass-strong rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">

            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center gap-2" aria-label="SmartCreatorTools home">
                <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl gradient-bg grid place-items-center shadow-lg shadow-primary/30 shrink-0">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" aria-hidden="true" />
                </div>
                <span className="font-extrabold text-base sm:text-lg gradient-text">SmartCreatorTools</span>
              </Link>
              <p className="mt-3 sm:mt-4 text-sm text-muted-foreground leading-relaxed">
                50+ free, fast, no-signup tools for creators, students, and developers. Everything runs in your browser.
              </p>
              <div className="mt-4 flex items-center gap-2">
                {[
                  { Icon: Twitter, label: "Follow us on Twitter" },
                  { Icon: Github, label: "View on GitHub" },
                  { Icon: Instagram, label: "Follow on Instagram" },
                  { Icon: Youtube, label: "Subscribe on YouTube" },
                ].map(({ Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="h-9 w-9 grid place-items-center rounded-lg glass hover:bg-primary/10 transition-colors"
                    rel="noopener noreferrer"
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            {/* Popular tools */}
            <div>
              <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-foreground/80">
                Popular Tools
              </h3>
              <ul className="mt-3 sm:mt-4 space-y-2 sm:space-y-2.5">
                {topTools.map((t) => (
                  <li key={t.slug}>
                    <Link
                      href={`/tools/${t.slug}`}
                      className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {t.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/tools"
                    className="text-xs sm:text-sm font-semibold text-primary hover:underline"
                  >
                    View all {tools.length} tools →
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-foreground/80">
                Legal
              </h3>
              <ul className="mt-3 sm:mt-4 space-y-2 sm:space-y-2.5">
                {[
                  { href: "/privacy", label: "Privacy Policy" },
                  { href: "/terms", label: "Terms of Service" },
                  { href: "/privacy", label: "Cookie Policy" },
                  { href: "/contact", label: "Contact Us" },
                ].map(({ href, label }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-foreground/80">
                Company
              </h3>
              <ul className="mt-3 sm:mt-4 space-y-2 sm:space-y-2.5">
                {[
                  { href: "/about", label: "About Us" },
                  { href: "/blog", label: "Blog" },
                  { href: "/contact", label: "Support" },
                  { href: "/tools", label: "All Tools" },
                ].map(({ href, label }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-border/50 flex flex-col sm:flex-row gap-2 sm:gap-4 items-center justify-between">
            <p className="text-xs text-muted-foreground text-center sm:text-left">
              © {new Date().getFullYear()} SmartCreatorTools. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground text-center sm:text-right">
              Made for creators · Free forever · No signup, ever
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
