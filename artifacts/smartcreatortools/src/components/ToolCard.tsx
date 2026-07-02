import { Link } from "wouter";
import { ArrowUpRight, Flame } from "lucide-react";
import type { Tool } from "@/data/tools";
import { cn } from "@/lib/utils";

export function ToolCard({ tool, index = 0 }: { tool: Tool; index?: number }) {
  const Icon = tool.icon;
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group relative flex flex-col h-full overflow-hidden rounded-2xl bg-white/70 dark:bg-white/5 border border-white/80 dark:border-white/10 shadow-sm hover:shadow-lg hover:shadow-primary/10 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/30"
      style={{ animationDelay: `${index * 25}ms` }}
    >
      {/* Accent glow */}
      <div
        className={cn(
          "absolute -top-10 -right-10 h-32 w-32 rounded-full opacity-0 blur-2xl bg-gradient-to-br transition-opacity duration-500 group-hover:opacity-20",
          tool.accent,
        )}
        aria-hidden
      />

      <div className="p-4 sm:p-5 flex flex-col h-full relative">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2">
          <div
            className={cn(
              "h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-gradient-to-br grid place-items-center text-white shadow-md shrink-0 transition-transform duration-300 group-hover:scale-105",
              tool.accent,
            )}
          >
            <Icon className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0">
            {tool.trending && (
              <span className="inline-flex items-center gap-1 rounded-full bg-orange-500/12 text-orange-600 dark:text-orange-400 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap border border-orange-500/20">
                <Flame className="w-2.5 h-2.5" />
                Hot
              </span>
            )}
            <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
              {tool.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <h3 className="mt-3 font-bold text-sm leading-snug tracking-tight">{tool.name}</h3>
        <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed line-clamp-2 flex-1">
          {tool.shortDescription}
        </p>

        {/* Footer */}
        <div className="mt-3.5 flex items-center justify-between">
          <span className="text-[11px] font-semibold text-primary/80 group-hover:text-primary transition-colors">
            Open tool
          </span>
          <div className="h-6 w-6 rounded-lg bg-primary/8 grid place-items-center transition-all duration-200 group-hover:bg-primary group-hover:text-white">
            <ArrowUpRight className="w-3.5 h-3.5 text-primary group-hover:text-white transition-colors" />
          </div>
        </div>
      </div>
    </Link>
  );
}
