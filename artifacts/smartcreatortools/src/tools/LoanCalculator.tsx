import { useState } from "react";

export function LoanCalculator() {
  const [principal, setPrincipal] = useState("10000");
  const [rate, setRate] = useState("7.5");
  const [years, setYears] = useState("5");

  const P = parseFloat(principal) || 0;
  const r = (parseFloat(rate) || 0) / 100 / 12;
  const n = (parseFloat(years) || 0) * 12;

  const emi = r > 0 ? P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1) : P / n;
  const totalPayment = emi * n;
  const totalInterest = totalPayment - P;
  const valid = P > 0 && n > 0 && emi > 0;

  const fmt = (v: number) => v.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
  const pct = valid ? Math.round((totalInterest / totalPayment) * 100) : 0;

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="loan-p">Loan Amount ($)</label>
          <input id="loan-p" type="number" min="0" value={principal} onChange={(e) => setPrincipal(e.target.value)}
            className="mt-2 w-full rounded-xl bg-muted/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="loan-r">Annual Rate (%)</label>
          <input id="loan-r" type="number" min="0" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)}
            className="mt-2 w-full rounded-xl bg-muted/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="loan-y">Term (years)</label>
          <input id="loan-y" type="number" min="1" max="50" value={years} onChange={(e) => setYears(e.target.value)}
            className="mt-2 w-full rounded-xl bg-muted/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
        </div>
      </div>

      {valid && (
        <div className="space-y-3">
          <div className="glass-strong rounded-2xl p-5 text-center">
            <div className="text-xs text-muted-foreground uppercase tracking-wider">Monthly Payment</div>
            <div className="text-4xl font-extrabold gradient-text mt-2 font-mono">{fmt(emi)}</div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Principal", val: fmt(P), pct: 100 - pct },
              { label: "Total Interest", val: fmt(totalInterest), pct },
              { label: "Total Payment", val: fmt(totalPayment) },
              { label: `Term (${years} yrs)`, val: `${n} payments` },
            ].map(({ label, val, pct: p }) => (
              <div key={label} className="glass rounded-xl px-4 py-3">
                <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{label}</div>
                <div className="text-sm font-bold font-mono mt-0.5">{val}</div>
                {p !== undefined && <div className="text-[10px] text-muted-foreground">{p}% of total</div>}
              </div>
            ))}
          </div>
          <div className="glass rounded-xl p-3">
            <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Principal vs Interest</div>
            <div className="h-3 rounded-full overflow-hidden flex">
              <div className="bg-violet-500 transition-all" style={{ width: `${100 - pct}%` }} title={`Principal ${100 - pct}%`} />
              <div className="bg-pink-500 transition-all" style={{ width: `${pct}%` }} title={`Interest ${pct}%`} />
            </div>
            <div className="mt-1.5 flex gap-4 text-[10px] font-semibold">
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-violet-500" />Principal {100 - pct}%</span>
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-pink-500" />Interest {pct}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
