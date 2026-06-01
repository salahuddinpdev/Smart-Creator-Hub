import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";

const PRESETS = [
  { name: "Tweet", limit: 280 },
  { name: "SMS", limit: 160 },
  { name: "Meta Desc", limit: 158 },
  { name: "LinkedIn", limit: 3000 },
  { name: "Instagram", limit: 2200 },
  { name: "TikTok", limit: 2200 },
  { name: "Meta Title", limit: 60 },
  { name: "YouTube Title", limit: 100 },
  { name: "OG Description", limit: 200 },
];

export function CharacterLimitChecker() {
  const [text, setText] = useState("");
  const [limit, setLimit] = useState(280);

  const chars = text.length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const remaining = limit - chars;
  const pct = Math.min(100, (chars / limit) * 100);
  const over = chars > limit;

  const barColor = pct < 70 ? "bg-emerald-500" : pct < 90 ? "bg-amber-500" : "bg-rose-500";

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Character limit</span>
          <div className="flex items-center gap-2">
            <input type="number" min={1} max={100000} value={limit}
              onChange={(e) => setLimit(Math.max(1, Number(e.target.value)))}
              className="w-24 rounded-xl bg-muted/40 px-3 py-1.5 text-sm text-center focus:outline-none focus:ring-2 focus:ring-primary/40" />
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {PRESETS.map(({ name, limit: l }) => (
            <button key={name} type="button" onClick={() => setLimit(l)}
              className={`rounded-xl px-3 py-1.5 text-[10px] font-bold transition-all ${limit === l ? "gradient-bg text-white shadow-md shadow-primary/20" : "glass hover:bg-primary/10 hover:text-primary"}`}>
              {name} ({l})
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="clc-text">Your text</label>
        <textarea id="clc-text" value={text} onChange={(e) => setText(e.target.value)} rows={6}
          placeholder={`Type or paste your text here (limit: ${limit} chars)…`}
          className="mt-2 w-full rounded-xl bg-muted/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-y" />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="flex gap-4">
            <span className="font-bold">{chars.toLocaleString()} chars</span>
            <span className="text-muted-foreground">{words} words</span>
          </span>
          <span className={`font-bold text-lg ${over ? "text-rose-500" : "text-emerald-500"}`}>
            {over ? `${Math.abs(remaining)} over` : `${remaining} left`}
          </span>
        </div>
        <div className="h-2.5 rounded-full bg-muted/40 overflow-hidden">
          <div className={`h-full rounded-full transition-all ${barColor}`} style={{ width: `${pct}%` }} />
        </div>
      </div>

      {text && <CopyButton value={text} label="Copy Text" />}
    </div>
  );
}
