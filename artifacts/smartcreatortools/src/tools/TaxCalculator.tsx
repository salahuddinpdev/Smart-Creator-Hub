import { useState } from "react";

export function TaxCalculator() {
  const [amount, setAmount] = useState("100");
  const [taxRate, setTaxRate] = useState("8.5");
  const [mode, setMode] = useState<"add" | "inclusive">("add");

  const a = parseFloat(amount) || 0;
  const r = parseFloat(taxRate) || 0;

  const taxAmt = mode === "add" ? a * r / 100 : a - a / (1 + r / 100);
  const preTax = mode === "add" ? a : a - taxAmt;
  const total = mode === "add" ? a + taxAmt : a;

  const fmt = (n: number) => `$${n.toFixed(2)}`;

  const COMMON_RATES = [5, 7, 8.5, 10, 13, 15, 20];

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button type="button" onClick={() => setMode("add")}
          className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${mode === "add" ? "gradient-bg text-white shadow-lg shadow-primary/30" : "glass hover:bg-primary/10 hover:text-primary"}`}>
          Add Tax to Amount
        </button>
        <button type="button" onClick={() => setMode("inclusive")}
          className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${mode === "inclusive" ? "gradient-bg text-white shadow-lg shadow-primary/30" : "glass hover:bg-primary/10 hover:text-primary"}`}>
          Tax Inclusive
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="tax-amount">
            {mode === "add" ? "Pre-tax Amount ($)" : "Tax-inclusive Amount ($)"}
          </label>
          <input id="tax-amount" type="number" min="0" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)}
            className="mt-2 w-full rounded-xl bg-muted/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="tax-rate">Tax Rate (%)</label>
          <input id="tax-rate" type="number" min="0" step="0.1" value={taxRate} onChange={(e) => setTaxRate(e.target.value)}
            className="mt-2 w-full rounded-xl bg-muted/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
          <div className="mt-2 flex flex-wrap gap-1.5">
            {COMMON_RATES.map((r) => (
              <button key={r} type="button" onClick={() => setTaxRate(String(r))}
                className={`rounded-lg px-2 py-1 text-[10px] font-bold transition-all ${parseFloat(taxRate) === r ? "gradient-bg text-white" : "glass hover:bg-primary/10 hover:text-primary"}`}>
                {r}%
              </button>
            ))}
          </div>
        </div>
      </div>

      {a > 0 && (
        <div className="glass-strong rounded-2xl p-5 space-y-3">
          {[
            { label: "Pre-tax", val: fmt(preTax) },
            { label: `Tax (${r}%)`, val: fmt(taxAmt) },
            { label: "Total (with tax)", val: fmt(total), bold: true },
          ].map(({ label, val, bold }) => (
            <div key={label} className="flex items-center justify-between">
              <span className={`text-sm ${bold ? "font-extrabold" : "text-muted-foreground"}`}>{label}</span>
              <span className={`font-mono ${bold ? "text-2xl font-extrabold gradient-text" : "text-sm font-semibold"}`}>{val}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
