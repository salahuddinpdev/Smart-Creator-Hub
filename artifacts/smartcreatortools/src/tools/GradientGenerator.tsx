import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { Plus, Trash2 } from "lucide-react";

type Direction = "to right" | "to left" | "to bottom" | "to top" | "to bottom right" | "to bottom left" | "135deg" | "45deg";
type GType = "linear" | "radial" | "conic";

const DIRECTIONS: { val: Direction; label: string }[] = [
  { val: "to right", label: "→" },
  { val: "to bottom", label: "↓" },
  { val: "to bottom right", label: "↘" },
  { val: "135deg", label: "135°" },
  { val: "to top", label: "↑" },
  { val: "to left", label: "←" },
  { val: "45deg", label: "45°" },
  { val: "to bottom left", label: "↙" },
];

export function GradientGenerator() {
  const [type, setType] = useState<GType>("linear");
  const [dir, setDir] = useState<Direction>("to right");
  const [stops, setStops] = useState([
    { color: "#7c3aed", pos: 0 },
    { color: "#ec4899", pos: 100 },
  ]);

  const stopsStr = stops.map((s) => `${s.color} ${s.pos}%`).join(", ");
  const css = type === "linear"
    ? `linear-gradient(${dir}, ${stopsStr})`
    : type === "radial"
    ? `radial-gradient(circle, ${stopsStr})`
    : `conic-gradient(${stopsStr})`;

  const cssRule = `background: ${css};`;
  const tailwind = `bg-[${css.replace(/\s/g, "_")}]`;

  const addStop = () => setStops((s) => [...s, { color: "#3b82f6", pos: 50 }].sort((a, b) => a.pos - b.pos));
  const removeStop = (i: number) => setStops((s) => s.filter((_, j) => j !== i));
  const updateStop = (i: number, key: "color" | "pos", val: string | number) =>
    setStops((s) => s.map((st, j) => j === i ? { ...st, [key]: val } : st).sort((a, b) => a.pos - b.pos));

  const PRESETS = [
    { name: "Ocean", stops: [{ color: "#0ea5e9", pos: 0 }, { color: "#7c3aed", pos: 100 }] },
    { name: "Sunset", stops: [{ color: "#f97316", pos: 0 }, { color: "#ec4899", pos: 100 }] },
    { name: "Forest", stops: [{ color: "#10b981", pos: 0 }, { color: "#3b82f6", pos: 100 }] },
    { name: "Fire", stops: [{ color: "#ef4444", pos: 0 }, { color: "#f59e0b", pos: 100 }] },
    { name: "Aurora", stops: [{ color: "#8b5cf6", pos: 0 }, { color: "#06b6d4", pos: 50 }, { color: "#10b981", pos: 100 }] },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {(["linear", "radial", "conic"] as GType[]).map((t) => (
          <button key={t} type="button" onClick={() => setType(t)}
            className={`rounded-xl px-3 py-2 text-xs font-semibold capitalize transition-all ${type === t ? "gradient-bg text-white shadow-lg shadow-primary/30" : "glass hover:bg-primary/10 hover:text-primary"}`}>
            {t}
          </button>
        ))}
      </div>

      {type === "linear" && (
        <div className="flex flex-wrap gap-2">
          {DIRECTIONS.map(({ val, label }) => (
            <button key={val} type="button" onClick={() => setDir(val)}
              className={`rounded-xl px-3 py-2 text-sm font-bold transition-all ${dir === val ? "gradient-bg text-white" : "glass hover:bg-primary/10 hover:text-primary"}`}>
              {label}
            </button>
          ))}
        </div>
      )}

      <div className="h-32 rounded-2xl transition-all" style={{ background: css }} />

      <div className="space-y-2">
        {stops.map((stop, i) => (
          <div key={i} className="flex items-center gap-3 glass rounded-xl px-4 py-2.5">
            <input type="color" value={stop.color} onChange={(e) => updateStop(i, "color", e.target.value)}
              className="h-8 w-8 rounded-lg cursor-pointer border-0 p-0 shrink-0" />
            <code className="text-xs font-mono text-muted-foreground w-20">{stop.color.toUpperCase()}</code>
            <input type="range" min={0} max={100} value={stop.pos} onChange={(e) => updateStop(i, "pos", Number(e.target.value))}
              className="flex-1 accent-violet-600" />
            <span className="text-xs font-mono w-8 text-right">{stop.pos}%</span>
            {stops.length > 2 && (
              <button type="button" onClick={() => removeStop(i)} className="text-rose-500 hover:text-rose-700 transition-colors shrink-0">
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addStop} className="glass w-full rounded-xl px-4 py-2.5 text-xs font-semibold hover:bg-primary/10 hover:text-primary transition-colors flex items-center justify-center gap-1.5">
          <Plus className="w-3.5 h-3.5" /> Add Color Stop
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">CSS</div>
          <div className="flex items-start justify-between gap-2 glass rounded-xl px-4 py-3">
            <code className="text-xs font-mono break-all">{cssRule}</code>
            <CopyButton value={cssRule} label="Copy" />
          </div>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Presets</div>
          <div className="flex flex-wrap gap-1.5">
            {PRESETS.map(({ name, stops: ps }) => (
              <button key={name} type="button" onClick={() => setStops(ps)}
                className="glass rounded-xl px-3 py-1.5 text-xs font-semibold hover:bg-primary/10 hover:text-primary transition-colors">
                {name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
