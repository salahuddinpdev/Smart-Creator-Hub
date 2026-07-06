import { useState, useCallback } from "react";
import { CopyButton } from "@/components/CopyButton";

function hexToRgb(h: string): { r: number; g: number; b: number } | null {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h);
  return r ? { r: parseInt(r[1], 16), g: parseInt(r[2], 16), b: parseInt(r[3], 16) } : null;
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hexToFormats(hex: string) {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;
  const { r, g, b } = rgb;
  const { h, s, l } = rgbToHsl(r, g, b);
  return {
    hex: hex.toUpperCase(),
    rgb: `rgb(${r}, ${g}, ${b})`,
    rgba: `rgba(${r}, ${g}, ${b}, 1)`,
    hsl: `hsl(${h}, ${s}%, ${l}%)`,
    css: `color: ${hex.toUpperCase()};`,
    tw: `[${hex.toUpperCase()}]`,
  };
}

export function ColorPicker() {
  const [hex, setHex] = useState("#7c3aed");
  const [textHex, setTextHex] = useState("#7c3aed");
  const formats = hexToFormats(hex);

  const updateHex = useCallback((val: string) => {
    setTextHex(val);
    if (/^#[0-9a-fA-F]{6}$/.test(val)) setHex(val);
  }, []);

  const PRESETS = ["#7c3aed", "#ec4899", "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4", "#84cc16", "#f97316"];

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative">
          <input type="color" value={hex} onChange={(e) => { setHex(e.target.value); setTextHex(e.target.value); }}
            className="h-24 w-24 rounded-2xl cursor-pointer border-0 p-0" style={{ background: "none" }} />
          <div className="absolute inset-0 rounded-2xl pointer-events-none ring-2 ring-white/20" />
        </div>
        <div className="flex-1 space-y-3 w-full">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">HEX value</label>
            <input value={textHex} onChange={(e) => updateHex(e.target.value)}
              placeholder="#7c3aed"
              className="mt-1 w-full rounded-xl bg-muted/40 px-4 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/40" />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {PRESETS.map((p) => (
              <button key={p} type="button" onClick={() => { setHex(p); setTextHex(p); }}
                className="h-7 w-7 rounded-lg ring-2 ring-white/20 hover:scale-110 transition-transform"
                style={{ background: p }} title={p} />
            ))}
          </div>
        </div>
      </div>

      {formats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Object.entries(formats).map(([label, val]) => (
            <div key={label} className="glass rounded-xl px-4 py-3 flex items-center justify-between gap-2">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{label}</div>
                <code className="text-sm font-mono">{val}</code>
              </div>
              <CopyButton value={val} label="Copy" />
            </div>
          ))}
        </div>
      )}

      <div className="rounded-xl overflow-hidden h-20" style={{ background: `linear-gradient(135deg, ${hex}, ${hex}88)` }}>
        <div className="h-full flex items-center justify-center">
          <span className="text-white font-bold text-sm drop-shadow">{hex.toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
}
