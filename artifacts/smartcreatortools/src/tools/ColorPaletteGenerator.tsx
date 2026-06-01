import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { RefreshCw } from "lucide-react";

function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
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
  return [h * 360, s * 100, l * 100];
}

function hslToHex(h: number, s: number, l: number): string {
  h /= 360; s /= 100; l /= 100;
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1; if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };
  const r = Math.round(hue2rgb(p, q, h + 1/3) * 255);
  const g = Math.round(hue2rgb(p, q, h) * 255);
  const b = Math.round(hue2rgb(p, q, h - 1/3) * 255);
  return "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
}

type PaletteType = "complementary" | "triadic" | "analogous" | "split" | "tetradic" | "monochromatic";

function generatePalette(hex: string, type: PaletteType): string[] {
  const [h, s, l] = hexToHsl(hex);
  switch (type) {
    case "complementary": return [hex, hslToHex((h + 180) % 360, s, l)];
    case "triadic": return [hex, hslToHex((h + 120) % 360, s, l), hslToHex((h + 240) % 360, s, l)];
    case "analogous": return [hslToHex((h - 30 + 360) % 360, s, l), hex, hslToHex((h + 30) % 360, s, l)];
    case "split": return [hex, hslToHex((h + 150) % 360, s, l), hslToHex((h + 210) % 360, s, l)];
    case "tetradic": return [hex, hslToHex((h + 90) % 360, s, l), hslToHex((h + 180) % 360, s, l), hslToHex((h + 270) % 360, s, l)];
    case "monochromatic": return [hslToHex(h, s, Math.max(10, l - 30)), hslToHex(h, s, Math.max(10, l - 15)), hex, hslToHex(h, s, Math.min(90, l + 15)), hslToHex(h, s, Math.min(90, l + 30))];
  }
}

const TYPES: { id: PaletteType; label: string }[] = [
  { id: "complementary", label: "Complementary" },
  { id: "triadic", label: "Triadic" },
  { id: "analogous", label: "Analogous" },
  { id: "split", label: "Split" },
  { id: "tetradic", label: "Tetradic" },
  { id: "monochromatic", label: "Monochromatic" },
];

export function ColorPaletteGenerator() {
  const [base, setBase] = useState("#7c3aed");
  const [type, setType] = useState<PaletteType>("triadic");

  const palette = generatePalette(base, type);

  const randomBase = () => {
    const h = Math.floor(Math.random() * 360);
    const s = 60 + Math.floor(Math.random() * 30);
    const l = 35 + Math.floor(Math.random() * 25);
    setBase(hslToHex(h, s, l));
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-3 items-end">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Base Color</label>
          <div className="mt-2 flex items-center gap-2">
            <input type="color" value={base} onChange={(e) => setBase(e.target.value)}
              className="h-12 w-12 rounded-xl cursor-pointer border-0 p-0" />
            <input type="text" value={base} onChange={(e) => /^#[0-9a-fA-F]{0,6}$/.test(e.target.value) && setBase(e.target.value)}
              className="rounded-xl bg-muted/40 px-3 py-2 text-sm font-mono w-28 focus:outline-none focus:ring-2 focus:ring-primary/40" />
            <button type="button" onClick={randomBase} className="glass rounded-xl p-2.5 hover:bg-primary/10 hover:text-primary transition-colors" title="Random color">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {TYPES.map(({ id, label }) => (
          <button key={id} type="button" onClick={() => setType(id)}
            className={`rounded-xl px-3 py-2 text-xs font-semibold transition-all ${type === id ? "gradient-bg text-white shadow-lg shadow-primary/30" : "glass hover:bg-primary/10 hover:text-primary"}`}>
            {label}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        <div className="flex gap-2 h-20 rounded-2xl overflow-hidden">
          {palette.map((color) => (
            <div key={color} className="flex-1 transition-all" style={{ background: color }} />
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {palette.map((color, i) => (
            <div key={i} className="glass rounded-xl p-3 flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg shrink-0 ring-2 ring-white/20" style={{ background: color }} />
              <code className="text-xs font-mono flex-1">{color.toUpperCase()}</code>
              <CopyButton value={color.toUpperCase()} label="Copy" />
            </div>
          ))}
        </div>
        <CopyButton value={palette.map((c) => c.toUpperCase()).join(", ")} label="Copy All" />
      </div>
    </div>
  );
}
