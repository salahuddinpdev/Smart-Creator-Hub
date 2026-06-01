import { useState } from "react";

export function TipCalculator() {
  const [bill, setBill] = useState("50");
  const [tipPct, setTipPct] = useState(18);
  const [people, setPeople] = useState(2);

  const billNum = parseFloat(bill) || 0;
  const tipAmt = billNum * tipPct / 100;
  const total = billNum + tipAmt;
  const perPerson = total / Math.max(1, people);
  const tipPerPerson = tipAmt / Math.max(1, people);

  const PRESETS = [10, 15, 18, 20, 25];

  const fmt = (n: number) => `$${n.toFixed(2)}`;

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="tip-bill">Bill Amount ($)</label>
          <input id="tip-bill" type="number" min="0" step="0.01" value={bill}
            onChange={(e) => setBill(e.target.value)}
            className="mt-2 w-full rounded-xl bg-muted/40 px-4 py-3 text-lg font-mono focus:outline-none focus:ring-2 focus:ring-primary/40" />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="tip-people">Split among</label>
          <div className="mt-2 flex items-center gap-3">
            <button type="button" onClick={() => setPeople((p) => Math.max(1, p - 1))} className="glass rounded-xl w-10 h-10 text-lg font-bold hover:bg-primary/10 hover:text-primary transition-colors flex-shrink-0">−</button>
            <span className="text-2xl font-extrabold w-8 text-center">{people}</span>
            <button type="button" onClick={() => setPeople((p) => Math.min(50, p + 1))} className="glass rounded-xl w-10 h-10 text-lg font-bold hover:bg-primary/10 hover:text-primary transition-colors flex-shrink-0">+</button>
            <span className="text-sm text-muted-foreground">{people === 1 ? "person" : "people"}</span>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tip: {tipPct}%</label>
        </div>
        <input type="range" min={0} max={50} step={1} value={tipPct} onChange={(e) => setTipPct(Number(e.target.value))} className="w-full accent-violet-600" />
        <div className="mt-2 flex gap-2 flex-wrap">
          {PRESETS.map((p) => (
            <button key={p} type="button" onClick={() => setTipPct(p)}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${tipPct === p ? "gradient-bg text-white shadow-md shadow-primary/20" : "glass hover:bg-primary/10 hover:text-primary"}`}>
              {p}%
            </button>
          ))}
        </div>
      </div>

      <div className="glass-strong rounded-2xl p-5 space-y-3">
        {[
          { label: "Bill", val: fmt(billNum) },
          { label: `Tip (${tipPct}%)`, val: fmt(tipAmt) },
          { label: "Total", val: fmt(total), bold: true },
        ].map(({ label, val, bold }) => (
          <div key={label} className="flex items-center justify-between">
            <span className={`text-sm ${bold ? "font-extrabold" : "text-muted-foreground"}`}>{label}</span>
            <span className={`font-mono ${bold ? "text-2xl font-extrabold gradient-text" : "text-sm font-semibold"}`}>{val}</span>
          </div>
        ))}
        {people > 1 && (
          <div className="pt-3 border-t border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Each person pays</span>
              <span className="text-xl font-extrabold font-mono gradient-text">{fmt(perPerson)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Tip per person</span>
              <span className="text-sm font-semibold font-mono">{fmt(tipPerPerson)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
