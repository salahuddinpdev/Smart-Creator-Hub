import { useState } from "react";

type Category = "Length" | "Weight" | "Temperature" | "Volume" | "Area" | "Digital";

interface Unit { id: string; label: string; toBase: (v: number) => number; fromBase: (v: number) => number; }

const UNITS: Record<Category, Unit[]> = {
  Length: [
    { id: "mm", label: "Millimeter (mm)", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    { id: "cm", label: "Centimeter (cm)", toBase: (v) => v / 100, fromBase: (v) => v * 100 },
    { id: "m", label: "Meter (m)", toBase: (v) => v, fromBase: (v) => v },
    { id: "km", label: "Kilometer (km)", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    { id: "in", label: "Inch (in)", toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
    { id: "ft", label: "Foot (ft)", toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
    { id: "yd", label: "Yard (yd)", toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
    { id: "mi", label: "Mile (mi)", toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
  ],
  Weight: [
    { id: "mg", label: "Milligram (mg)", toBase: (v) => v / 1e6, fromBase: (v) => v * 1e6 },
    { id: "g", label: "Gram (g)", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    { id: "kg", label: "Kilogram (kg)", toBase: (v) => v, fromBase: (v) => v },
    { id: "t", label: "Tonne (t)", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    { id: "oz", label: "Ounce (oz)", toBase: (v) => v * 0.02835, fromBase: (v) => v / 0.02835 },
    { id: "lb", label: "Pound (lb)", toBase: (v) => v * 0.453592, fromBase: (v) => v / 0.453592 },
    { id: "st", label: "Stone (st)", toBase: (v) => v * 6.35029, fromBase: (v) => v / 6.35029 },
  ],
  Temperature: [
    { id: "C", label: "Celsius (°C)", toBase: (v) => v, fromBase: (v) => v },
    { id: "F", label: "Fahrenheit (°F)", toBase: (v) => (v - 32) * 5 / 9, fromBase: (v) => v * 9 / 5 + 32 },
    { id: "K", label: "Kelvin (K)", toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
  ],
  Volume: [
    { id: "ml", label: "Milliliter (ml)", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    { id: "l", label: "Liter (L)", toBase: (v) => v, fromBase: (v) => v },
    { id: "floz", label: "Fl. Oz (fl oz)", toBase: (v) => v * 0.029574, fromBase: (v) => v / 0.029574 },
    { id: "cup", label: "Cup (US)", toBase: (v) => v * 0.236588, fromBase: (v) => v / 0.236588 },
    { id: "pt", label: "Pint (US pt)", toBase: (v) => v * 0.473176, fromBase: (v) => v / 0.473176 },
    { id: "qt", label: "Quart (US qt)", toBase: (v) => v * 0.946353, fromBase: (v) => v / 0.946353 },
    { id: "gal", label: "Gallon (US gal)", toBase: (v) => v * 3.785411, fromBase: (v) => v / 3.785411 },
  ],
  Area: [
    { id: "mm2", label: "mm²", toBase: (v) => v / 1e6, fromBase: (v) => v * 1e6 },
    { id: "cm2", label: "cm²", toBase: (v) => v / 1e4, fromBase: (v) => v * 1e4 },
    { id: "m2", label: "m²", toBase: (v) => v, fromBase: (v) => v },
    { id: "ha", label: "Hectare (ha)", toBase: (v) => v * 1e4, fromBase: (v) => v / 1e4 },
    { id: "km2", label: "km²", toBase: (v) => v * 1e6, fromBase: (v) => v / 1e6 },
    { id: "ft2", label: "ft²", toBase: (v) => v * 0.092903, fromBase: (v) => v / 0.092903 },
    { id: "ac", label: "Acre", toBase: (v) => v * 4046.86, fromBase: (v) => v / 4046.86 },
    { id: "mi2", label: "mi²", toBase: (v) => v * 2589988, fromBase: (v) => v / 2589988 },
  ],
  Digital: [
    { id: "b", label: "Bit (b)", toBase: (v) => v / 8, fromBase: (v) => v * 8 },
    { id: "B", label: "Byte (B)", toBase: (v) => v, fromBase: (v) => v },
    { id: "KB", label: "Kilobyte (KB)", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    { id: "MB", label: "Megabyte (MB)", toBase: (v) => v * 1e6, fromBase: (v) => v / 1e6 },
    { id: "GB", label: "Gigabyte (GB)", toBase: (v) => v * 1e9, fromBase: (v) => v / 1e9 },
    { id: "TB", label: "Terabyte (TB)", toBase: (v) => v * 1e12, fromBase: (v) => v / 1e12 },
  ],
};

const fmt = (n: number) => {
  if (n === 0) return "0";
  if (Math.abs(n) < 0.0001 || Math.abs(n) >= 1e10) return n.toExponential(6);
  return parseFloat(n.toPrecision(8)).toString();
};

export function UnitConverter() {
  const [cat, setCat] = useState<Category>("Length");
  const [from, setFrom] = useState("m");
  const [val, setVal] = useState("1");
  const units = UNITS[cat];
  const fromUnit = units.find((u) => u.id === from);
  const base = fromUnit && val !== "" ? fromUnit.toBase(parseFloat(val)) : null;

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto scrollbar-hide -mx-1 px-1">
        <div className="flex gap-2 w-max pb-1">
          {(Object.keys(UNITS) as Category[]).map((c) => (
            <button key={c} type="button" onClick={() => { setCat(c); setFrom(UNITS[c][0].id); setVal("1"); }}
              className={`rounded-xl px-3 py-2 text-xs font-semibold transition-all whitespace-nowrap ${cat === c ? "gradient-bg text-white shadow-lg shadow-primary/30" : "glass hover:bg-primary/10 hover:text-primary"}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3 items-end">
        <div className="flex-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Value</label>
          <input type="number" value={val} onChange={(e) => setVal(e.target.value)} placeholder="1"
            className="mt-2 w-full rounded-xl bg-muted/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
        </div>
        <div className="flex-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">From</label>
          <select value={from} onChange={(e) => setFrom(e.target.value)}
            className="mt-2 w-full rounded-xl bg-muted/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40">
            {units.map((u) => <option key={u.id} value={u.id}>{u.label}</option>)}
          </select>
        </div>
      </div>

      {base !== null && !isNaN(base) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {units.filter((u) => u.id !== from).map((u) => (
            <div key={u.id} className="glass rounded-xl px-4 py-3 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{u.label}</div>
                <div className="text-sm font-semibold font-mono mt-0.5">{fmt(u.fromBase(base))}</div>
              </div>
              <button type="button" onClick={() => { setFrom(u.id); setVal(fmt(u.fromBase(base))); }}
                className="text-xs text-primary font-semibold hover:underline">Use</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
