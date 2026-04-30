import { Link } from "wouter";
import { ArrowUpRight, Flame } from "lucide-react";
import type { Tool } from "@/data/tools";
import { cn } from "@/lib/utils";

export function ToolCard({ tool, index = 0 }: { tool: Tool; index?: number }) {
  const Icon = tool.icon;
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group glass rounded-2xl p-5 flex flex-col h-full transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10 relative overflow-hidden"
      style={{ animationDelay: `${index * 30}ms` }}
    >
      <div
        className={cn(
          "absolute -top-12 -right-12 h-40 w-40 rounded-full opacity-20 blur-3xl bg-gradient-to-br transition-opacity group-hover:opacity-40",
          tool.accent,
        )}
        aria-hidden
      />
      <div className="flex items-start justify-between gap-3 relative">
        <div
          className={cn(
            "h-12 w-12 rounded-xl bg-gradient-to-br grid place-items-center text-white shadow-lg",
            tool.accent,
          )}
        >
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex flex-col items-end gap-1.5">
          {tool.trending && (
            <span className="inline-flex items-center gap-1 rounded-full bg-orange-500/15 text-orange-700 dark:text-orange-300 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
              <Flame className="w-3 h-3" />
              Hot
            </span>
          )}
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            {tool.category}
          </span>
        </div>
      </div>
      <h3 className="mt-4 font-bold text-base leading-tight">{tool.name}</h3>
      <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed line-clamp-2">
        {tool.shortDescription}
      </p>
      <div className="mt-4 flex items-center justify-between text-xs text-primary font-semibold">
        <span>Open tool</span>
        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </Link>
  );
}
