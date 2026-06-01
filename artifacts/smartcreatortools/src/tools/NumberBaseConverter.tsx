import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";

function toDecimal(val: string, base: number): number | null {
  const n = parseInt(val.replace(/\s/g, ""), base);
  return isNaN(n) ? null : n;
}

export function NumberBaseConverter() {
  const [dec, setDec] = useState("255");
  const [error, setError] = useState("");

  const n = parseInt(dec, 10);
  const valid = !isNaN(n) && n >= 0 && n <= Number.MAX_SAFE_INTEGER;

  const formats = valid ? [
    { label: "Decimal (Base 10)", val: n.toString(10), base: 10 },
    { label: "Binary (Base 2)", val: n.toString(2), base: 2 },
    { label: "Octal (Base 8)", val: n.toString(8), base: 8 },
    { label: "Hexadecimal (Base 16)", val: n.toString(16).toUpperCase(), base: 16 },
    { label: "Base 32", val: n.toString(32).toUpperCase(), base: 32 },
    { label: "Base 36", val: n.toString(36).toUpperCase(), base: 36 },
  ] : [];

  const fromOther = (val: string, base: number) => {
    setError("");
    const n = toDecimal(val, base);
    if (n === null) { setError(`Invalid base-${base} input`); return; }
    setDec(String(n));
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="nbc-dec">Decimal input (base 10)</label>
        <input id="nbc-dec" type="number" min="0" value={dec} onChange={(e) => { setDec(e.target.value); setError(""); }}
          className="mt-2 w-full rounded-xl bg-muted/40 px-4 py-3 text-lg font-mono focus:outline-none focus:ring-2 focus:ring-primary/40" />
        {error && <div className="mt-1 text-xs text-rose-500">{error}</div>}
      </div>

      {formats.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {formats.map(({ label, val, base }) => (
            <div key={base} className="glass rounded-xl px-4 py-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{label}</span>
                <CopyButton value={val} label="Copy" />
              </div>
              <div className="flex items-center gap-2">
                <input
                  value={base === 10 ? dec : val}
                  onChange={(e) => base !== 10 && fromOther(e.target.value, base)}
                  readOnly={base === 10}
                  className="flex-1 bg-transparent text-sm font-mono focus:outline-none focus:ring-1 focus:ring-primary/40 rounded px-1"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="glass rounded-xl p-4">
        <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Convert from any base</div>
        <div className="grid grid-cols-2 gap-3">
          {[2, 8, 16, 36].map((base) => (
            <div key={base} className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-muted-foreground w-10">Base {base}</span>
              <input type="text" placeholder={`Enter base-${base}…`}
                onChange={(e) => e.target.value && fromOther(e.target.value, base)}
                className="flex-1 rounded-lg bg-muted/40 px-3 py-1.5 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-primary/40" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
