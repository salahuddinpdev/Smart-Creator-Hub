import { Link } from "wouter";
import { ArrowUpRight, Flame } from "lucide-react";
import type { Tool } from "@/data/tools";
import { cn } from "@/lib/utils";

export function ToolCard({ tool, index = 0 }: { tool: Tool; index?: number }) {
  const Icon = tool.icon;
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group glass rounded-2xl p-5 flex flex-col h-full relative overflow-hidden card-lift"
      style={{ animationDelay: `${index * 30}ms` }}
    >
      <div
        className={cn(
          "absolute -top-14 -right-14 h-40 w-40 rounded-full opacity-15 blur-3xl bg-gradient-to-br transition-opacity duration-300 group-hover:opacity-35",
          tool.accent,
        )}
        aria-hidden
      />

      <div className="flex items-start justify-between gap-3 relative">
        <div
          className={cn(
            "h-11 w-11 sm:h-12 sm:w-12 rounded-xl bg-gradient-to-br grid place-items-center text-white shadow-lg shrink-0 transition-transform duration-300 group-hover:scale-110",
            tool.accent,
          )}
        >
          <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          {tool.trending && (
            <span className="inline-flex items-center gap-1 rounded-full bg-orange-500/15 text-orange-700 dark:text-orange-300 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">
              <Flame className="w-3 h-3" />
              Hot
            </span>
          )}
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            {tool.category}
          </span>
        </div>
      </div>

      <h3 className="mt-3.5 font-bold text-sm sm:text-base leading-tight">{tool.name}</h3>
      <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
        {tool.shortDescription}
      </p>

      <div className="mt-4 flex items-center justify-between text-xs text-primary font-semibold">
        <span>Open tool</span>
        <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </Link>
  );
}
