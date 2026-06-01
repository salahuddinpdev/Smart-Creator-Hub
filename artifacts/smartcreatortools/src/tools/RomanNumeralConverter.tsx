import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";

const VALS: [number, string][] = [[1000,"M"],[900,"CM"],[500,"D"],[400,"CD"],[100,"C"],[90,"XC"],[50,"L"],[40,"XL"],[10,"X"],[9,"IX"],[5,"V"],[4,"IV"],[1,"I"]];

function toRoman(n: number): string {
  if (n < 1 || n > 3999 || !Number.isInteger(n)) return "Out of range (1–3999)";
  let r = "";
  for (const [v, s] of VALS) { while (n >= v) { r += s; n -= v; } }
  return r;
}

function fromRoman(r: string): number | null {
  const s = r.toUpperCase().trim();
  const MAP: Record<string, number> = { I:1, V:5, X:10, L:50, C:100, D:500, M:1000 };
  let n = 0, prev = 0;
  for (let i = s.length - 1; i >= 0; i--) {
    const v = MAP[s[i]];
    if (!v) return null;
    if (v < prev) n -= v; else n += v;
    prev = v;
  }
  return n > 0 ? n : null;
}

export function RomanNumeralConverter() {
  const [mode, setMode] = useState<"to" | "from">("to");
  const [input, setInput] = useState("2026");

  const result = mode === "to"
    ? toRoman(parseInt(input))
    : (() => { const n = fromRoman(input); return n ? String(n) : "Invalid Roman numeral"; })();

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button type="button" onClick={() => { setMode("to"); setInput("2026"); }}
          className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${mode === "to" ? "gradient-bg text-white shadow-lg shadow-primary/30" : "glass hover:bg-primary/10 hover:text-primary"}`}>
          Number → Roman
        </button>
        <button type="button" onClick={() => { setMode("from"); setInput("MMXXVI"); }}
          className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${mode === "from" ? "gradient-bg text-white shadow-lg shadow-primary/30" : "glass hover:bg-primary/10 hover:text-primary"}`}>
          Roman → Number
        </button>
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="roman-input">
          {mode === "to" ? "Integer (1 – 3999)" : "Roman numeral"}
        </label>
        <input id="roman-input" value={input} onChange={(e) => setInput(e.target.value)}
          placeholder={mode === "to" ? "2026" : "MMXXVI"}
          className="mt-2 w-full rounded-xl bg-muted/40 px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/40" />
      </div>
      {result && (
        <div className="glass-strong rounded-2xl p-5 text-center">
          <div className="text-xs text-muted-foreground uppercase tracking-wider">Result</div>
          <div className="text-4xl font-extrabold gradient-text mt-2 font-mono">{result}</div>
          <div className="mt-3 flex justify-center">
            <CopyButton value={result} label="Copy" />
          </div>
        </div>
      )}
      <div className="glass rounded-xl p-4">
        <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Key values</div>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
          {VALS.map(([n, s]) => (
            <div key={s} className="text-center">
              <div className="font-bold text-sm font-mono gradient-text">{s}</div>
              <div className="text-[10px] text-muted-foreground">{n}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
