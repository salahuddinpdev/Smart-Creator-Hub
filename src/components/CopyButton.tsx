import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  value: string;
  label?: string;
  className?: string;
  disabled?: boolean;
}

export function CopyButton({
  value,
  label = "Copy to Clipboard",
  className,
  disabled,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const handle = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };
  return (
    <button
      type="button"
      onClick={handle}
      disabled={disabled || !value}
      className={cn(
        "inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all",
        copied
          ? "bg-emerald-500 text-white"
          : "glass-strong hover:bg-primary/10 text-foreground",
        "disabled:opacity-40 disabled:cursor-not-allowed",
        className,
      )}
    >
      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      {copied ? "Copied" : label}
    </button>
  );
}
