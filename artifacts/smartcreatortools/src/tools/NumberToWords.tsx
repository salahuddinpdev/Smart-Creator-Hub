import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";

const ONES = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
const TENS = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

function convert(n: number): string {
  if (n === 0) return "zero";
  if (n < 0) return "negative " + convert(-n);
  if (n < 20) return ONES[n];
  if (n < 100) return TENS[Math.floor(n / 10)] + (n % 10 ? "-" + ONES[n % 10] : "");
  if (n < 1000) return ONES[Math.floor(n / 100)] + " hundred" + (n % 100 ? " " + convert(n % 100) : "");
  if (n < 1e6) return convert(Math.floor(n / 1000)) + " thousand" + (n % 1000 ? " " + convert(n % 1000) : "");
  if (n < 1e9) return convert(Math.floor(n / 1e6)) + " million" + (n % 1e6 ? " " + convert(n % 1e6) : "");
  if (n < 1e12) return convert(Math.floor(n / 1e9)) + " billion" + (n % 1e9 ? " " + convert(n % 1e9) : "");
  return convert(Math.floor(n / 1e12)) + " trillion" + (n % 1e12 ? " " + convert(n % 1e12) : "");
}

function toOrdinal(n: number): string {
  const w = convert(n);
  if (w.endsWith("one") && n !== 11) return w.slice(0, -3) + "first";
  if (w.endsWith("two") && n !== 12) return w.slice(0, -3) + "second";
  if (w.endsWith("three") && n !== 13) return w.slice(0, -5) + "third";
  return w + "th";
}

export function NumberToWords() {
  const [input, setInput] = useState("2026");
  const [showOrdinal, setShowOrdinal] = useState(false);

  const n = parseFloat(input.replace(/,/g, ""));
  const valid = !isNaN(n) && Number.isInteger(n) && n >= -999999999999 && n <= 999999999999;
  const words = valid ? convert(Math.round(n)) : "";
  const ordinal = valid && n >= 0 ? toOrdinal(Math.round(n)) : "";
  const capitalized = words ? words.charAt(0).toUpperCase() + words.slice(1) : "";

  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="n2w-input">Number</label>
        <input id="n2w-input" type="text" value={input} onChange={(e) => setInput(e.target.value)}
          placeholder="12345"
          className="mt-2 w-full rounded-xl bg-muted/40 px-4 py-3 text-lg font-mono focus:outline-none focus:ring-2 focus:ring-primary/40" />
        <p className="mt-1 text-xs text-muted-foreground">Supports integers from −999,999,999,999 to 999,999,999,999</p>
      </div>
      <label className="flex items-center gap-2 cursor-pointer select-none text-sm font-semibold">
        <input type="checkbox" checked={showOrdinal} onChange={(e) => setShowOrdinal(e.target.checked)} className="accent-violet-600" />
        Also show ordinal (first, second, third…)
      </label>
      {words && (
        <div className="space-y-3">
          <div className="glass-strong rounded-2xl p-5 space-y-2">
            <div className="text-xs text-muted-foreground uppercase tracking-wider">Cardinal</div>
            <div className="text-lg font-semibold leading-relaxed">{capitalized}</div>
            <CopyButton value={capitalized} label="Copy" />
          </div>
          {showOrdinal && ordinal && (
            <div className="glass rounded-2xl p-5 space-y-2">
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Ordinal</div>
              <div className="text-lg font-semibold leading-relaxed">{ordinal.charAt(0).toUpperCase() + ordinal.slice(1)}</div>
              <CopyButton value={ordinal.charAt(0).toUpperCase() + ordinal.slice(1)} label="Copy" />
            </div>
          )}
        </div>
      )}
      {input && !valid && (
        <div className="rounded-xl bg-rose-500/10 text-rose-700 px-4 py-3 text-sm">Please enter a valid integer.</div>
      )}
    </div>
  );
}
