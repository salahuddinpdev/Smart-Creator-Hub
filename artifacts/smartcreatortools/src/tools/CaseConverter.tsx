import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";

const toTitle = (s: string) =>
  s.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
const toSentence = (s: string) =>
  s.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
const toCamel = (s: string) =>
  s.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase());
const toPascal = (s: string) => { const c = toCamel(s); return c.charAt(0).toUpperCase() + c.slice(1); };
const toSnake = (s: string) => s.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_]/g, "").toLowerCase();
const toKebab = (s: string) => s.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-]/g, "").toLowerCase();
const toConstant = (s: string) => toSnake(s).toUpperCase();

const CASES = [
  { label: "UPPERCASE", fn: (s: string) => s.toUpperCase() },
  { label: "lowercase", fn: (s: string) => s.toLowerCase() },
  { label: "Title Case", fn: toTitle },
  { label: "Sentence case", fn: toSentence },
  { label: "camelCase", fn: toCamel },
  { label: "PascalCase", fn: toPascal },
  { label: "snake_case", fn: toSnake },
  { label: "kebab-case", fn: toKebab },
  { label: "CONSTANT_CASE", fn: toConstant },
];

export function CaseConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [active, setActive] = useState("");

  const apply = (label: string, fn: (s: string) => string) => {
    setOutput(fn(input));
    setActive(label);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="cc-input">Input text</label>
        <textarea
          id="cc-input"
          value={input}
          onChange={(e) => { setInput(e.target.value); setOutput(""); setActive(""); }}
          placeholder="Type or paste your text here…"
          rows={5}
          className="mt-2 w-full rounded-xl bg-muted/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-y font-mono"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {CASES.map(({ label, fn }) => (
          <button
            key={label}
            type="button"
            onClick={() => apply(label, fn)}
            disabled={!input}
            className={`rounded-xl px-3 py-2 text-xs font-semibold transition-all disabled:opacity-40 ${active === label ? "gradient-bg text-white shadow-lg shadow-primary/30" : "glass hover:bg-primary/10 hover:text-primary"}`}
          >
            {label}
          </button>
        ))}
      </div>
      {output && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Output — {active}</label>
            <CopyButton value={output} label="Copy" />
          </div>
          <pre className="w-full rounded-xl bg-muted/40 px-4 py-3 text-sm whitespace-pre-wrap break-words font-mono">{output}</pre>
        </div>
      )}
    </div>
  );
}
