import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";

type SortMode = "az" | "za" | "length-asc" | "length-desc" | "numeric" | "shuffle" | "dedupe";

const MODES: { id: SortMode; label: string; fn: (lines: string[]) => string[] }[] = [
  { id: "az", label: "A → Z", fn: (l) => [...l].sort((a, b) => a.localeCompare(b)) },
  { id: "za", label: "Z → A", fn: (l) => [...l].sort((a, b) => b.localeCompare(a)) },
  { id: "length-asc", label: "Shortest first", fn: (l) => [...l].sort((a, b) => a.length - b.length) },
  { id: "length-desc", label: "Longest first", fn: (l) => [...l].sort((a, b) => b.length - a.length) },
  { id: "numeric", label: "Numeric", fn: (l) => [...l].sort((a, b) => parseFloat(a) - parseFloat(b)) },
  { id: "shuffle", label: "Shuffle", fn: (l) => { const a = [...l]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; } },
  { id: "dedupe", label: "Remove Duplicates", fn: (l) => [...new Set(l)] },
];

export function TextSorter() {
  const [input, setInput] = useState("Banana\nApple\nMango\nApple\nCherry\nBanana\nKiwi\nOrange");
  const [mode, setMode] = useState<SortMode>("az");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [trimLines, setTrimLines] = useState(true);
  const [ignoreEmpty, setIgnoreEmpty] = useState(true);

  const lines = input.split("\n")
    .map((l) => trimLines ? l.trim() : l)
    .filter((l) => !ignoreEmpty || l.length > 0);

  const active = MODES.find((m) => m.id === mode)!;
  const sortFn = caseSensitive ? active.fn : (l: string[]) => {
    const withCase = active.fn(l.map((s) => s.toLowerCase()));
    if (mode === "shuffle") return active.fn(l);
    const sorted = active.fn([...l].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())));
    return mode.startsWith("z") ? sorted.reverse() : sorted;
  };

  const result = active.fn(lines);
  const output = result.join("\n");

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {MODES.map(({ id, label }) => (
          <button key={id} type="button" onClick={() => setMode(id)}
            className={`rounded-xl px-3 py-2 text-xs font-semibold transition-all ${mode === id ? "gradient-bg text-white shadow-lg shadow-primary/30" : "glass hover:bg-primary/10 hover:text-primary"}`}>
            {label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-4">
        {[
          { label: "Case sensitive", val: caseSensitive, set: setCaseSensitive },
          { label: "Trim whitespace", val: trimLines, set: setTrimLines },
          { label: "Ignore empty lines", val: ignoreEmpty, set: setIgnoreEmpty },
        ].map(({ label, val, set }) => (
          <label key={label} className="flex items-center gap-2 cursor-pointer select-none text-sm font-semibold">
            <input type="checkbox" checked={val} onChange={(e) => set(e.target.checked)} className="accent-violet-600" />
            {label}
          </label>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="sort-input">Input ({lines.length} lines)</label>
          <textarea id="sort-input" value={input} onChange={(e) => setInput(e.target.value)} rows={10}
            className="mt-2 w-full rounded-xl bg-muted/40 px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/40 resize-y" />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Result ({result.length} lines)</label>
            <CopyButton value={output} label="Copy" />
          </div>
          <pre className="mt-2 w-full rounded-xl bg-muted/40 px-4 py-3 text-sm font-mono whitespace-pre-wrap max-h-64 overflow-y-auto">{output}</pre>
        </div>
      </div>
    </div>
  );
}
