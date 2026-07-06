import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { RefreshCw } from "lucide-react";

export function TimestampConverter() {
  const now = Math.floor(Date.now() / 1000);
  const [unix, setUnix] = useState(String(now));
  const [dateStr, setDateStr] = useState(new Date().toISOString().slice(0, 16));
  const [ms, setMs] = useState(false);

  const fromUnix = (u: string) => {
    const n = parseFloat(u);
    if (isNaN(n)) return null;
    const d = ms ? new Date(n) : new Date(n * 1000);
    return isNaN(d.getTime()) ? null : d;
  };

  const date = fromUnix(unix);
  const updateFromDate = (v: string) => {
    setDateStr(v);
    const d = new Date(v);
    if (!isNaN(d.getTime())) setUnix(ms ? String(d.getTime()) : String(Math.floor(d.getTime() / 1000)));
  };
  const updateFromUnix = (v: string) => {
    setUnix(v);
    const d = fromUnix(v);
    if (d) setDateStr(d.toISOString().slice(0, 16));
  };

  const setNow = () => {
    const n = Date.now();
    setUnix(ms ? String(n) : String(Math.floor(n / 1000)));
    setDateStr(new Date(n).toISOString().slice(0, 16));
  };

  const formats = date ? [
    { label: "ISO 8601", val: date.toISOString() },
    { label: "UTC String", val: date.toUTCString() },
    { label: "Local String", val: date.toLocaleString() },
    { label: "Date only", val: date.toISOString().split("T")[0] },
    { label: "Time only (UTC)", val: date.toISOString().split("T")[1].split(".")[0] },
    { label: "Unix (seconds)", val: String(Math.floor(date.getTime() / 1000)) },
    { label: "Unix (ms)", val: String(date.getTime()) },
  ] : [];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 cursor-pointer select-none text-sm font-semibold">
          <input type="checkbox" checked={ms} onChange={(e) => setMs(e.target.checked)} className="accent-violet-600" />
          Milliseconds
        </label>
        <button type="button" onClick={setNow} className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline">
          <RefreshCw className="w-3.5 h-3.5" /> Use Now
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="ts-unix">Unix Timestamp</label>
          <input id="ts-unix" type="number" value={unix} onChange={(e) => updateFromUnix(e.target.value)}
            className="mt-2 w-full rounded-xl bg-muted/40 px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/40" />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="ts-date">Date & Time</label>
          <input id="ts-date" type="datetime-local" value={dateStr} onChange={(e) => updateFromDate(e.target.value)}
            className="mt-2 w-full rounded-xl bg-muted/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
        </div>
      </div>

      {formats.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {formats.map(({ label, val }) => (
            <div key={label} className="glass rounded-xl px-4 py-3 flex items-center justify-between gap-2">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{label}</div>
                <code className="text-xs font-mono break-all">{val}</code>
              </div>
              <CopyButton value={val} label="Copy" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
