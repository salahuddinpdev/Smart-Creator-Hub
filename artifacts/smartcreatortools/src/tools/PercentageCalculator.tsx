import { useState } from "react";

interface CalcMode {
  id: string;
  label: string;
  fields: { id: string; label: string; placeholder: string }[];
  calc: (vals: Record<string, number>) => string | null;
}

const MODES: CalcMode[] = [
  {
    id: "of",
    label: "% of a number",
    fields: [
      { id: "pct", label: "Percentage (%)", placeholder: "25" },
      { id: "num", label: "of Number", placeholder: "200" },
    ],
    calc: ({ pct, num }) => isNaN(pct) || isNaN(num) ? null : `${(pct / 100 * num).toFixed(4).replace(/\.?0+$/, "")}`,
  },
  {
    id: "what",
    label: "X is what % of Y",
    fields: [
      { id: "x", label: "X (part)", placeholder: "50" },
      { id: "y", label: "Y (whole)", placeholder: "200" },
    ],
    calc: ({ x, y }) => !y ? null : `${(x / y * 100).toFixed(4).replace(/\.?0+$/, "")}%`,
  },
  {
    id: "increase",
    label: "% increase",
    fields: [
      { id: "from", label: "From", placeholder: "100" },
      { id: "to", label: "To", placeholder: "150" },
    ],
    calc: ({ from, to }) => !from ? null : `+${((to - from) / Math.abs(from) * 100).toFixed(2)}%`,
  },
  {
    id: "decrease",
    label: "% decrease",
    fields: [
      { id: "from", label: "From", placeholder: "200" },
      { id: "to", label: "To", placeholder: "150" },
    ],
    calc: ({ from, to }) => !from ? null : `${((from - to) / Math.abs(from) * 100).toFixed(2)}%`,
  },
  {
    id: "add",
    label: "Add % to number",
    fields: [
      { id: "num", label: "Number", placeholder: "100" },
      { id: "pct", label: "Add (%)", placeholder: "20" },
    ],
    calc: ({ num, pct }) => `${(num * (1 + pct / 100)).toFixed(4).replace(/\.?0+$/, "")}`,
  },
  {
    id: "sub",
    label: "Subtract % from number",
    fields: [
      { id: "num", label: "Number", placeholder: "100" },
      { id: "pct", label: "Subtract (%)", placeholder: "20" },
    ],
    calc: ({ num, pct }) => `${(num * (1 - pct / 100)).toFixed(4).replace(/\.?0+$/, "")}`,
  },
];

export function PercentageCalculator() {
  const [mode, setMode] = useState(MODES[0]);
  const [vals, setVals] = useState<Record<string, string>>({});
  const numVals: Record<string, number> = {};
  mode.fields.forEach(({ id }) => { numVals[id] = parseFloat(vals[id] ?? ""); });
  const result = mode.calc(numVals);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {MODES.map((m) => (
          <button key={m.id} type="button" onClick={() => { setMode(m); setVals({}); }}
            className={`rounded-xl px-3 py-2 text-xs font-semibold transition-all ${mode.id === m.id ? "gradient-bg text-white shadow-lg shadow-primary/30" : "glass hover:bg-primary/10 hover:text-primary"}`}>
            {m.label}
          </button>
        ))}
      </div>

      <div className="glass rounded-2xl p-5 space-y-4">
        <div className="flex flex-wrap gap-4 items-end">
          {mode.fields.map(({ id, label, placeholder }) => (
            <div key={id} className="flex-1 min-w-[140px]">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</label>
              <input type="number" placeholder={placeholder} value={vals[id] ?? ""}
                onChange={(e) => setVals((v) => ({ ...v, [id]: e.target.value }))}
                className="mt-2 w-full rounded-xl bg-muted/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
            </div>
          ))}
        </div>
        {result !== null && !isNaN(parseFloat(result)) && (
          <div className="text-center pt-2 border-t border-white/10">
            <div className="text-xs text-muted-foreground uppercase tracking-wider">Result</div>
            <div className="text-4xl font-extrabold gradient-text mt-1">{result}</div>
          </div>
        )}
      </div>
    </div>
  );
}
