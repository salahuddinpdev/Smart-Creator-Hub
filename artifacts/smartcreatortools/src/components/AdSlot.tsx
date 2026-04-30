import { cn } from "@/lib/utils";

interface AdSlotProps {
  variant: "header" | "sidebar" | "in-content" | "footer";
  className?: string;
}

const dimensions: Record<AdSlotProps["variant"], { label: string; size: string; height: string }> = {
  header: { label: "Header Ad", size: "728 × 90", height: "h-[90px]" },
  sidebar: { label: "Sidebar Ad", size: "300 × 600", height: "h-[600px]" },
  "in-content": { label: "In-Content Ad", size: "336 × 280", height: "h-[280px]" },
  footer: { label: "Footer Ad", size: "970 × 90", height: "h-[90px]" },
};

export function AdSlot({ variant, className }: AdSlotProps) {
  const { label, size, height } = dimensions[variant];
  return (
    <div
      data-ad-slot={variant}
      className={cn(
        "glass rounded-2xl flex flex-col items-center justify-center text-center",
        height,
        "w-full max-w-full overflow-hidden",
        className,
      )}
    >
      <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground/70">
        Advertisement
      </span>
      <span className="mt-1 text-sm font-semibold text-muted-foreground">{label}</span>
      <span className="mt-0.5 text-xs text-muted-foreground/60">{size}</span>
    </div>
  );
}
