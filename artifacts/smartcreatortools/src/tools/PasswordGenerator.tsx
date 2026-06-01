import { useState, useCallback } from "react";
import { CopyButton } from "@/components/CopyButton";
import { RefreshCw, ShieldCheck } from "lucide-react";

const UPPER = "ABCDEFGHJKLMNPQRSTUVWXYZ";
const LOWER = "abcdefghjkmnpqrstuvwxyz";
const DIGITS = "23456789";
const SYMBOLS = "!@#$%^&*()-_=+[]{}|;:,.<>?";

function generate(length: number, opts: { upper: boolean; lower: boolean; digits: boolean; symbols: boolean }): string {
  let chars = "";
  if (opts.upper) chars += UPPER;
  if (opts.lower) chars += LOWER;
  if (opts.digits) chars += DIGITS;
  if (opts.symbols) chars += SYMBOLS;
  if (!chars) return "";
  const arr = new Uint32Array(length);
  crypto.getRandomValues(arr);
  return Array.from(arr, (n) => chars[n % chars.length]).join("");
}

function strength(pw: string): { label: string; color: string; pct: number } {
  let score = 0;
  if (pw.length >= 12) score++;
  if (pw.length >= 16) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 1) return { label: "Weak", color: "bg-rose-500", pct: 20 };
  if (score === 2) return { label: "Fair", color: "bg-orange-500", pct: 45 };
  if (score === 3) return { label: "Good", color: "bg-amber-500", pct: 65 };
  if (score === 4) return { label: "Strong", color: "bg-emerald-500", pct: 85 };
  return { label: "Very Strong", color: "bg-emerald-600", pct: 100 };
}

export function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [opts, setOpts] = useState({ upper: true, lower: true, digits: true, symbols: true });
  const [pw, setPw] = useState(() => generate(16, { upper: true, lower: true, digits: true, symbols: true }));
  const [count, setCount] = useState(1);
  const [bulk, setBulk] = useState<string[]>([]);

  const gen = useCallback(() => {
    if (count === 1) {
      setPw(generate(length, opts));
      setBulk([]);
    } else {
      const list = Array.from({ length: count }, () => generate(length, opts));
      setBulk(list);
      setPw("");
    }
  }, [length, opts, count]);

  const str = pw ? strength(pw) : null;

  const toggle = (k: keyof typeof opts) => setOpts((o) => ({ ...o, [k]: !o[k] }));

  return (
    <div className="space-y-5">
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Length: {length}</label>
        </div>
        <input type="range" min={6} max={64} value={length} onChange={(e) => setLength(Number(e.target.value))} className="w-full accent-violet-600" />
      </div>

      <div className="flex flex-wrap gap-2">
        {(["upper", "lower", "digits", "symbols"] as const).map((k) => (
          <button key={k} type="button" onClick={() => toggle(k)}
            className={`rounded-xl px-3 py-2 text-xs font-semibold transition-all ${opts[k] ? "gradient-bg text-white shadow-md shadow-primary/20" : "glass hover:bg-primary/10 hover:text-primary opacity-50"}`}>
            {k === "upper" ? "A–Z" : k === "lower" ? "a–z" : k === "digits" ? "0–9" : "!@#$"}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2">
          <label className="text-xs text-muted-foreground">Bulk:</label>
          <select value={count} onChange={(e) => setCount(Number(e.target.value))} className="rounded-lg bg-muted/40 px-2 py-1 text-xs">
            {[1, 5, 10, 20].map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
      </div>

      <button type="button" onClick={gen} className="w-full rounded-xl gradient-bg py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 hover:-translate-y-px transition-all flex items-center justify-center gap-2">
        <RefreshCw className="w-4 h-4" /> Generate Password{count > 1 ? "s" : ""}
      </button>

      {pw && (
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2 rounded-xl glass-strong px-4 py-3">
            <code className="text-sm font-mono break-all flex-1">{pw}</code>
            <CopyButton value={pw} label="Copy" />
          </div>
          {str && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1 font-semibold"><ShieldCheck className="w-3.5 h-3.5 text-primary" /> Strength</span>
                <span className="font-semibold">{str.label}</span>
              </div>
              <div className="h-2 rounded-full bg-muted/40 overflow-hidden">
                <div className={`h-full rounded-full transition-all ${str.color}`} style={{ width: `${str.pct}%` }} />
              </div>
            </div>
          )}
        </div>
      )}

      {bulk.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{bulk.length} Passwords</span>
            <CopyButton value={bulk.join("\n")} label="Copy All" />
          </div>
          <div className="rounded-xl bg-muted/40 px-4 py-3 space-y-1.5 max-h-64 overflow-y-auto">
            {bulk.map((p, i) => <code key={i} className="block text-sm font-mono">{p}</code>)}
          </div>
        </div>
      )}
    </div>
  );
}
