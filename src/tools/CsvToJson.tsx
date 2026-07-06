import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { CheckCircle, XCircle } from "lucide-react";

const SAMPLE = `name,age,city
Alice,30,New York
Bob,25,London
Carol,28,Tokyo`;

function csvToJson(csv: string, delimiter = ","): { ok: true; data: object[] } | { ok: false; error: string } {
  const lines = csv.trim().split("\n").filter(Boolean);
  if (lines.length < 2) return { ok: false, error: "Need at least a header row and one data row." };
  const headers = lines[0].split(delimiter).map((h) => h.trim().replace(/^"|"$/g, ""));
  try {
    const data = lines.slice(1).map((line) => {
      const vals = line.split(delimiter).map((v) => v.trim().replace(/^"|"$/g, ""));
      const obj: Record<string, string | number> = {};
      headers.forEach((h, i) => {
        const v = vals[i] ?? "";
        obj[h] = isNaN(Number(v)) || v === "" ? v : Number(v);
      });
      return obj;
    });
    return { ok: true, data };
  } catch (e: unknown) {
    return { ok: false, error: e instanceof Error ? e.message : "Parse error" };
  }
}

export function CsvToJson() {
  const [input, setInput] = useState(SAMPLE);
  const [delimiter, setDelimiter] = useState(",");
  const result = input.trim() ? csvToJson(input, delimiter) : null;
  const output = result?.ok ? JSON.stringify(result.data, null, 2) : "";

  return (
    <div className="space-y-4">
      <div className="flex gap-3 items-end">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="csv-delim">Delimiter</label>
          <select id="csv-delim" value={delimiter} onChange={(e) => setDelimiter(e.target.value)}
            className="mt-2 rounded-xl bg-muted/40 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 block">
            <option value=",">Comma (,)</option>
            <option value=";">Semicolon (;)</option>
            <option value="\t">Tab</option>
            <option value="|">Pipe (|)</option>
          </select>
        </div>
        {result && (
          <span className={`flex items-center gap-1 text-xs font-semibold ${result.ok ? "text-emerald-600" : "text-rose-500"}`}>
            {result.ok ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
            {result.ok ? `${(result as { ok: true; data: object[] }).data.length} rows` : "Error"}
          </span>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="csv-input">CSV Input</label>
          <textarea id="csv-input" value={input} onChange={(e) => setInput(e.target.value)} rows={10}
            className="mt-2 w-full rounded-xl bg-muted/40 px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/40 resize-y" />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">JSON Output</label>
            {output && <CopyButton value={output} label="Copy" />}
          </div>
          {result && !result.ok ? (
            <div className="rounded-xl bg-rose-500/10 text-rose-700 px-4 py-3 text-sm mt-2">{result.error}</div>
          ) : (
            <pre className="mt-2 w-full rounded-xl bg-muted/40 px-4 py-3 text-sm font-mono overflow-y-auto max-h-64 whitespace-pre-wrap">{output || "Output will appear here…"}</pre>
          )}
        </div>
      </div>
    </div>
  );
}
