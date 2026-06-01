import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";

function gcd(a: number, b: number): number { return b === 0 ? a : gcd(b, a % b); }

export function AspectRatioCalculator() {
  const [w, setW] = useState("1920");
  const [h, setH] = useState("1080");
  const [ratioW, setRatioW] = useState("16");
  const [ratioH, setRatioH] = useState("9");
  const [scaleW, setScaleW] = useState("1280");
  const [mode, setMode] = useState<"calc" | "scale">("calc");

  const width = parseFloat(w) || 0;
  const height = parseFloat(h) || 0;
  const d = gcd(width, height);
  const ratio = d > 0 ? `${width / d}:${height / d}` : "—";
  const decimal = height > 0 ? (width / height).toFixed(4) : "—";

  const rw = parseFloat(ratioW) || 16;
  const rh = parseFloat(ratioH) || 9;
  const sw = parseFloat(scaleW) || 0;
  const scaledH = sw > 0 && rw > 0 ? Math.round(sw * rh / rw) : 0;
  const scaledW = scaledH > 0 ? sw : 0;

  const COMMON = [
    { r: "1:1", w: 1, h: 1 },
    { r: "4:3", w: 4, h: 3 },
    { r: "16:9", w: 16, h: 9 },
    { r: "16:10", w: 16, h: 10 },
    { r: "21:9", w: 21, h: 9 },
    { r: "9:16", w: 9, h: 16 },
    { r: "2:3", w: 2, h: 3 },
    { r: "3:2", w: 3, h: 2 },
  ];

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button type="button" onClick={() => setMode("calc")}
          className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${mode === "calc" ? "gradient-bg text-white shadow-lg shadow-primary/30" : "glass hover:bg-primary/10 hover:text-primary"}`}>
          Calculate Ratio
        </button>
        <button type="button" onClick={() => setMode("scale")}
          className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${mode === "scale" ? "gradient-bg text-white shadow-lg shadow-primary/30" : "glass hover:bg-primary/10 hover:text-primary"}`}>
          Scale by Ratio
        </button>
      </div>

      {mode === "calc" ? (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="ar-w">Width (px)</label>
              <input id="ar-w" type="number" min="1" value={w} onChange={(e) => setW(e.target.value)}
                className="mt-2 w-full rounded-xl bg-muted/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="ar-h">Height (px)</label>
              <input id="ar-h" type="number" min="1" value={h} onChange={(e) => setH(e.target.value)}
                className="mt-2 w-full rounded-xl bg-muted/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
            </div>
          </div>
          {width > 0 && height > 0 && (
            <div className="glass-strong rounded-2xl p-5 flex flex-wrap items-center justify-around gap-4">
              <div className="text-center">
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Ratio</div>
                <div className="text-3xl font-extrabold gradient-text mt-1">{ratio}</div>
                <CopyButton value={ratio} label="Copy" className="mt-2 mx-auto" />
              </div>
              <div className="text-center">
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Decimal</div>
                <div className="text-2xl font-bold mt-1">{decimal}</div>
              </div>
              <div className="rounded-xl overflow-hidden border border-white/10" style={{ width: 80, height: 80 * height / width }}>
                <div className="w-full h-full gradient-bg opacity-40" />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Ratio W</label>
              <input type="number" min="1" value={ratioW} onChange={(e) => setRatioW(e.target.value)}
                className="mt-2 w-full rounded-xl bg-muted/40 px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Ratio H</label>
              <input type="number" min="1" value={ratioH} onChange={(e) => setRatioH(e.target.value)}
                className="mt-2 w-full rounded-xl bg-muted/40 px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Target W (px)</label>
              <input type="number" min="1" value={scaleW} onChange={(e) => setScaleW(e.target.value)}
                className="mt-2 w-full rounded-xl bg-muted/40 px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
            </div>
          </div>
          {scaledH > 0 && (
            <div className="glass-strong rounded-2xl p-5 text-center">
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Result</div>
              <div className="text-3xl font-extrabold gradient-text mt-2">{scaledW} × {scaledH}</div>
              <CopyButton value={`${scaledW}x${scaledH}`} label="Copy" className="mt-3 mx-auto" />
            </div>
          )}
        </div>
      )}

      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Common ratios</div>
        <div className="flex flex-wrap gap-2">
          {COMMON.map(({ r, w: rw2, h: rh2 }) => (
            <button key={r} type="button"
              onClick={() => mode === "calc" ? (setW(String(rw2 * 100)), setH(String(rh2 * 100))) : (setRatioW(String(rw2)), setRatioH(String(rh2)))}
              className="glass rounded-xl px-3 py-1.5 text-xs font-bold hover:bg-primary/10 hover:text-primary transition-colors">
              {r}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
