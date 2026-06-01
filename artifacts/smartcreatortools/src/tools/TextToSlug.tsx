import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";

function toSlug(text: string, sep: "-" | "_" = "-"): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s\-_]/g, "")
    .trim()
    .replace(/[\s_\-]+/g, sep)
    .replace(new RegExp(`^[${sep}]+|[${sep}]+$`, "g"), "");
}

export function TextToSlug() {
  const [input, setInput] = useState("Hello World! This is a URL Slug");
  const [sep, setSep] = useState<"-" | "_">("-");

  const slug = toSlug(input, sep);

  const SEPS: { val: "-" | "_"; label: string }[] = [
    { val: "-", label: "kebab-case" },
    { val: "_", label: "snake_case" },
  ];

  const examples = [
    "My Blog Post Title",
    "Héllo Wörld Ünder",
    "Product Name — Edition 2026!",
    "  Spaces & Special Chars: 100%  ",
  ];

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {SEPS.map(({ val, label }) => (
          <button key={val} type="button" onClick={() => setSep(val)}
            className={`rounded-xl px-3 py-2 text-xs font-semibold transition-all ${sep === val ? "gradient-bg text-white shadow-lg shadow-primary/30" : "glass hover:bg-primary/10 hover:text-primary"}`}>
            {label}
          </button>
        ))}
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="slug-input">Text / Title</label>
        <textarea id="slug-input" value={input} onChange={(e) => setInput(e.target.value)} rows={3}
          className="mt-2 w-full rounded-xl bg-muted/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-y" />
      </div>
      {slug && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Slug</span>
            <CopyButton value={slug} label="Copy" />
          </div>
          <div className="rounded-xl bg-muted/40 px-4 py-3 font-mono text-sm break-all">{slug}</div>
        </div>
      )}
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Try examples</div>
        <div className="flex flex-wrap gap-2">
          {examples.map((ex) => (
            <button key={ex} type="button" onClick={() => setInput(ex)}
              className="glass rounded-lg px-3 py-1.5 text-xs hover:bg-primary/10 hover:text-primary transition-colors">
              {ex}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
