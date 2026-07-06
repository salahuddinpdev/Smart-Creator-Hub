import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";

const SAMPLE = `[
  {"name": "Alice", "age": 30, "city": "New York"},
  {"name": "Bob", "age": 25, "city": "London"},
  {"name": "Carol", "age": 28, "city": "Tokyo"}
]`;

function jsonToCsv(json: string, delimiter = ","): { ok: true; csv: string } | { ok: false; error: string } {
  try {
    const data = JSON.parse(json);
    if (!Array.isArray(data)) return { ok: false, error: "Input must be a JSON array of objects." };
    if (data.length === 0) return { ok: false, error: "Array is empty." };
    const headers = Array.from(new Set(data.flatMap((row) => Object.keys(row))));
    const escape = (val: unknown) => {
      const s = String(val ?? "");
      if (s.includes(delimiter) || s.includes('"') || s.includes("\n")) return `"${s.replace(/"/g, '""')}"`;
      return s;
    };
    const rows = [headers.join(delimiter), ...data.map((row) => headers.map((h) => escape(row[h])).join(delimiter))];
    return { ok: true, csv: rows.join("\n") };
  } catch (e: unknown) {
    return { ok: false, error: e instanceof Error ? e.message : "Invalid JSON" };
  }
}

export function JsonToCsv() {
  const [input, setInput] = useState(SAMPLE);
  const [delimiter, setDelimiter] = useState(",");

  const result = input.trim() ? jsonToCsv(input, delimiter) : null;
  const output = result?.ok ? result.csv : "";

  return (
    <div className="space-y-4">
      <div className="flex gap-3 items-center">
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="jtc-delim">Delimiter</label>
        <select id="jtc-delim" value={delimiter} onChange={(e) => setDelimiter(e.target.value)}
          className="rounded-xl bg-muted/40 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40">
          <option value=",">Comma (,)</option>
          <option value=";">Semicolon (;)</option>
          <option value="\t">Tab</option>
          <option value="|">Pipe (|)</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="jtc-input">JSON Array Input</label>
          <textarea id="jtc-input" value={input} onChange={(e) => setInput(e.target.value)} rows={10}
            className="mt-2 w-full rounded-xl bg-muted/40 px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/40 resize-y" />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">CSV Output</label>
            {output && <CopyButton value={output} label="Copy" />}
          </div>
          {result && !result.ok ? (
            <div className="rounded-xl bg-rose-500/10 text-rose-700 px-4 py-3 text-sm mt-2">{result.error}</div>
          ) : (
            <pre className="mt-2 w-full rounded-xl bg-muted/40 px-4 py-3 text-sm font-mono overflow-y-auto max-h-64 whitespace-pre-wrap">{output || "Output will appear here…"}</pre>
          )}
          {output && (
            <button type="button" onClick={() => {
              const blob = new Blob([output], { type: "text/csv" });
              const a = document.createElement("a");
              a.href = URL.createObjectURL(blob);
              a.download = "data.csv";
              a.click();
            }} className="mt-2 glass rounded-xl px-4 py-2 text-xs font-semibold hover:bg-primary/10 hover:text-primary transition-colors">
              Download CSV
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
