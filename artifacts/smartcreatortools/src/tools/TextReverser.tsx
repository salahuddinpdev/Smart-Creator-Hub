import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";

type Mode = "chars" | "words" | "lines" | "sentences";

const MODES: { id: Mode; label: string; fn: (s: string) => string }[] = [
  { id: "chars", label: "Reverse Characters", fn: (s) => s.split("").reverse().join("") },
  { id: "words", label: "Reverse Words", fn: (s) => s.split(/\s+/).reverse().join(" ") },
  { id: "lines", label: "Reverse Lines", fn: (s) => s.split("\n").reverse().join("\n") },
  { id: "sentences", label: "Reverse Sentences", fn: (s) => s.split(/(?<=[.!?])\s+/).reverse().join(" ") },
];

export function TextReverser() {
  const [mode, setMode] = useState<Mode>("chars");
  const [input, setInput] = useState("Hello World! How are you today?");
  const active = MODES.find((m) => m.id === mode)!;
  const output = input ? active.fn(input) : "";

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
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="rev-input">Input text</label>
        <textarea id="rev-input" value={input} onChange={(e) => setInput(e.target.value)} rows={4}
          className="mt-2 w-full rounded-xl bg-muted/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-y" />
      </div>
      {output && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{active.label}</span>
            <CopyButton value={output} label="Copy" />
          </div>
          <pre className="w-full rounded-xl bg-muted/40 px-4 py-3 text-sm font-mono whitespace-pre-wrap">{output}</pre>
        </div>
      )}
    </div>
  );
}
