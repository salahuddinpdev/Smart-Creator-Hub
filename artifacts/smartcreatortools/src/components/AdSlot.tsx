import { cn } from "@/lib/utils";

interface AdSlotProps {
  variant: "header" | "sidebar" | "in-content" | "footer";
  className?: string;
}

export function AdSlot({ variant, className }: AdSlotProps) {
  if (variant === "header") {
    return (
      <div
        data-ad-slot="header"
        className={cn(
          "glass rounded-2xl flex flex-col items-center justify-center text-center overflow-hidden",
          "h-[50px] sm:h-[90px]",
          "w-full max-w-full",
          className,
        )}
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground/70">
          Advertisement
        </span>
        <span className="mt-0.5 text-xs font-semibold text-muted-foreground hidden sm:block">
          Header Ad · 728 × 90
        </span>
        <span className="mt-0.5 text-xs font-semibold text-muted-foreground sm:hidden">
          Banner Ad · 320 × 50
        </span>
      </div>
    );
  }

  if (variant === "footer") {
    return (
      <div
        data-ad-slot="footer"
        className={cn(
          "glass rounded-2xl flex-col items-center justify-center text-center overflow-hidden",
          "hidden sm:flex h-[90px]",
          "w-full max-w-full",
          className,
        )}
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground/70">
          Advertisement
        </span>
        <span className="mt-1 text-sm font-semibold text-muted-foreground">
          Footer Ad · 970 × 90
        </span>
      </div>
    );
  }

  if (variant === "sidebar") {
    return (
      <div
        data-ad-slot="sidebar"
        className={cn(
          "glass rounded-2xl flex flex-col items-center justify-center text-center overflow-hidden",
          "h-[280px] lg:h-[400px]",
          "w-full max-w-full",
          className,
        )}
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground/70">
          Advertisement
        </span>
        <span className="mt-1 text-sm font-semibold text-muted-foreground">Sidebar Ad</span>
        <span className="mt-0.5 text-xs text-muted-foreground/60">300 × 600</span>
      </div>
    );
  }

  return (
    <div
      data-ad-slot="in-content"
      className={cn(
        "glass rounded-2xl flex flex-col items-center justify-center text-center overflow-hidden",
        "h-[200px] sm:h-[280px]",
        "w-full max-w-full",
        className,
      )}
    >
      <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground/70">
        Advertisement
      </span>
      <span className="mt-1 text-sm font-semibold text-muted-foreground">In-Content Ad</span>
      <span className="mt-0.5 text-xs text-muted-foreground/60">336 × 280</span>
    </div>
  );
}
