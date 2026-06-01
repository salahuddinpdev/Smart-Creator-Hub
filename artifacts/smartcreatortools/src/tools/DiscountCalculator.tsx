import { useState } from "react";

export function DiscountCalculator() {
  const [original, setOriginal] = useState("100");
  const [discount, setDiscount] = useState("20");
  const [mode, setMode] = useState<"pct" | "amount">("pct");

  const O = parseFloat(original) || 0;
  const D = parseFloat(discount) || 0;

  const discountAmt = mode === "pct" ? O * D / 100 : D;
  const finalPrice = O - discountAmt;
  const savingsPct = O > 0 ? (discountAmt / O) * 100 : 0;

  const fmt = (n: number) => `$${Math.abs(n).toFixed(2)}`;

  const PRESETS = [5, 10, 15, 20, 25, 30, 50];

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button type="button" onClick={() => setMode("pct")}
          className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${mode === "pct" ? "gradient-bg text-white shadow-lg shadow-primary/30" : "glass hover:bg-primary/10 hover:text-primary"}`}>
          Discount %
        </button>
        <button type="button" onClick={() => setMode("amount")}
          className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${mode === "amount" ? "gradient-bg text-white shadow-lg shadow-primary/30" : "glass hover:bg-primary/10 hover:text-primary"}`}>
          Discount $
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="disc-orig">Original Price ($)</label>
          <input id="disc-orig" type="number" min="0" step="0.01" value={original} onChange={(e) => setOriginal(e.target.value)}
            className="mt-2 w-full rounded-xl bg-muted/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="disc-d">
            {mode === "pct" ? "Discount (%)" : "Discount Amount ($)"}
          </label>
          <input id="disc-d" type="number" min="0" step={mode === "pct" ? "1" : "0.01"} value={discount} onChange={(e) => setDiscount(e.target.value)}
            className="mt-2 w-full rounded-xl bg-muted/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
          {mode === "pct" && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {PRESETS.map((p) => (
                <button key={p} type="button" onClick={() => setDiscount(String(p))}
                  className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all ${parseFloat(discount) === p ? "gradient-bg text-white" : "glass hover:bg-primary/10 hover:text-primary"}`}>
                  {p}%
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {O > 0 && (
        <div className="glass-strong rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Original Price</span>
            <span className="text-sm font-semibold font-mono">{fmt(O)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">You save ({savingsPct.toFixed(1)}%)</span>
            <span className="text-sm font-semibold font-mono text-emerald-500">−{fmt(discountAmt)}</span>
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-white/10">
            <span className="font-extrabold">Final Price</span>
            <span className="text-3xl font-extrabold font-mono gradient-text">{fmt(Math.max(0, finalPrice))}</span>
          </div>
        </div>
      )}
    </div>
  );
}
