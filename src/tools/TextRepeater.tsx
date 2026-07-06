import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";

export function TextRepeater() {
  const [text, setText] = useState("Hello!");
  const [count, setCount] = useState(5);
  const [sep, setSep] = useState("\\n");

  const actualSep = sep === "\\n" ? "\n" : sep === "\\t" ? "\t" : sep === " " ? " " : sep;
  const output = count > 0 ? Array.from({ length: count }, () => text).join(actualSep) : "";

  const SEP_OPTS = [
    { val: "\\n", label: "New line" },
    { val: " ", label: "Space" },
    { val: ", ", label: "Comma" },
    { val: " | ", label: "Pipe" },
    { val: "\\t", label: "Tab" },
  ];

  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="rep-text">Text to repeat</label>
        <textarea id="rep-text" value={text} onChange={(e) => setText(e.target.value)} rows={3}
          className="mt-2 w-full rounded-xl bg-muted/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-y" />
      </div>
      <div className="flex flex-wrap gap-4 items-end">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="rep-count">Repeat</label>
          <input id="rep-count" type="number" min={1} max={500} value={count}
            onChange={(e) => setCount(Math.max(1, Math.min(500, Number(e.target.value))))}
            className="mt-2 w-20 block rounded-xl bg-muted/40 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Separator</label>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {SEP_OPTS.map(({ val, label }) => (
              <button key={val} type="button" onClick={() => setSep(val)}
                className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all ${sep === val ? "gradient-bg text-white" : "glass hover:bg-primary/10 hover:text-primary"}`}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
      {output && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{count}× output</span>
            <CopyButton value={output} label="Copy" />
          </div>
          <pre className="w-full rounded-xl bg-muted/40 px-4 py-3 text-sm font-mono whitespace-pre-wrap max-h-64 overflow-y-auto">{output}</pre>
        </div>
      )}
    </div>
  );
}
