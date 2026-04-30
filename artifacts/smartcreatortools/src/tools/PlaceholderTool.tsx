import { Hammer } from "lucide-react";

interface Props {
  toolName: string;
}

export function PlaceholderTool({ toolName }: Props) {
  return (
    <div className="glass-strong rounded-2xl p-12 text-center">
      <div className="mx-auto h-16 w-16 rounded-2xl gradient-bg grid place-items-center text-white shadow-lg shadow-primary/30">
        <Hammer className="w-8 h-8" />
      </div>
      <h3 className="mt-5 text-2xl font-extrabold">{toolName}</h3>
      <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
        Coming soon — this tool is being polished. We're working through 20+ tools and shipping
        them one at a time. Want this prioritized?{" "}
        <a href="/contact" className="text-primary font-semibold hover:underline">
          Let us know
        </a>
        .
      </p>
      <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-muted/50 px-4 py-1.5 text-xs font-semibold text-muted-foreground">
        <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
        In development
      </div>
    </div>
  );
}
