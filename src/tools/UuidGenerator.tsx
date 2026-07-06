import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { RefreshCw } from "lucide-react";

function genUuid(): string {
  return crypto.randomUUID();
}

export function UuidGenerator() {
  const [count, setCount] = useState(5);
  const [uuids, setUuids] = useState<string[]>(() => Array.from({ length: 5 }, genUuid));
  const [uppercase, setUppercase] = useState(false);

  const generate = () => setUuids(Array.from({ length: count }, genUuid));
  const display = (u: string) => uppercase ? u.toUpperCase() : u;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 items-end">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="uuid-count">Count</label>
          <input id="uuid-count" type="number" min={1} max={50} value={count}
            onChange={(e) => setCount(Math.max(1, Math.min(50, Number(e.target.value))))}
            className="mt-2 w-24 block rounded-xl bg-muted/40 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
        </div>
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input type="checkbox" checked={uppercase} onChange={(e) => setUppercase(e.target.checked)} className="accent-violet-600" />
          <span className="text-sm font-semibold">UPPERCASE</span>
        </label>
        <button type="button" onClick={generate}
          className="rounded-xl gradient-bg px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/30 hover:-translate-y-px transition-all flex items-center gap-2">
          <RefreshCw className="w-4 h-4" /> Generate
        </button>
        <CopyButton value={uuids.map(display).join("\n")} label="Copy All" />
      </div>

      <div className="space-y-2">
        {uuids.map((u, i) => (
          <div key={i} className="glass rounded-xl px-4 py-3 flex items-center justify-between gap-3">
            <code className="text-sm font-mono flex-1 break-all">{display(u)}</code>
            <CopyButton value={display(u)} label="Copy" />
          </div>
        ))}
      </div>
    </div>
  );
}
