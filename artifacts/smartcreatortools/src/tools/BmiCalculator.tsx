import { useState } from "react";

function getBmiCategory(bmi: number): { label: string; color: string; advice: string } {
  if (bmi < 18.5) return { label: "Underweight", color: "text-sky-500", advice: "Consider consulting a nutritionist for a healthy weight gain plan." };
  if (bmi < 25) return { label: "Healthy Weight", color: "text-emerald-500", advice: "Great! Maintain your current lifestyle with balanced nutrition and exercise." };
  if (bmi < 30) return { label: "Overweight", color: "text-amber-500", advice: "Moderate diet and regular exercise can help reach a healthy range." };
  if (bmi < 35) return { label: "Obese (Class I)", color: "text-orange-500", advice: "Consult a healthcare provider for a personalized weight management plan." };
  return { label: "Obese (Class II+)", color: "text-rose-500", advice: "Please consult a healthcare professional for medical guidance." };
}

export function BmiCalculator() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [height, setHeight] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [weight, setWeight] = useState("");

  let bmi: number | null = null;
  if (unit === "metric") {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    if (h > 0 && w > 0) bmi = w / (h * h);
  } else {
    const inches = parseFloat(heightFt) * 12 + parseFloat(heightIn || "0");
    const lbs = parseFloat(weight);
    if (inches > 0 && lbs > 0) bmi = (lbs / (inches * inches)) * 703;
  }

  const cat = bmi ? getBmiCategory(bmi) : null;
  const pct = bmi ? Math.min(100, ((bmi - 10) / 30) * 100) : 0;

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        {(["metric", "imperial"] as const).map((u) => (
          <button key={u} type="button" onClick={() => setUnit(u)}
            className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-all capitalize ${unit === u ? "gradient-bg text-white shadow-lg shadow-primary/30" : "glass hover:bg-primary/10 hover:text-primary"}`}>
            {u}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {unit === "metric" ? (
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="bmi-height-cm">Height (cm)</label>
            <input id="bmi-height-cm" type="number" placeholder="175" value={height} onChange={(e) => setHeight(e.target.value)}
              className="mt-2 w-full rounded-xl bg-muted/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
          </div>
        ) : (
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Height (ft / in)</label>
            <div className="mt-2 flex gap-2">
              <input type="number" placeholder="5" value={heightFt} onChange={(e) => setHeightFt(e.target.value)}
                className="w-1/2 rounded-xl bg-muted/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
              <input type="number" placeholder="10" value={heightIn} onChange={(e) => setHeightIn(e.target.value)}
                className="w-1/2 rounded-xl bg-muted/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
            </div>
          </div>
        )}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="bmi-weight">{unit === "metric" ? "Weight (kg)" : "Weight (lbs)"}</label>
          <input id="bmi-weight" type="number" placeholder={unit === "metric" ? "70" : "154"} value={weight} onChange={(e) => setWeight(e.target.value)}
            className="mt-2 w-full rounded-xl bg-muted/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
        </div>
      </div>

      {bmi && cat && (
        <div className="glass-strong rounded-2xl p-5 space-y-4">
          <div className="text-center">
            <div className="text-5xl font-extrabold gradient-text">{bmi.toFixed(1)}</div>
            <div className={`text-xl font-bold mt-1 ${cat.color}`}>{cat.label}</div>
          </div>
          <div className="relative h-3 rounded-full overflow-hidden" style={{ background: "linear-gradient(to right, #38bdf8, #34d399, #facc15, #f97316, #ef4444)" }}>
            <div className="absolute top-0 h-full w-1 bg-white shadow-lg transition-all" style={{ left: `${pct}%` }} />
          </div>
          <div className="flex justify-between text-[10px] text-muted-foreground font-semibold">
            <span>Under 18.5</span><span>18.5–25</span><span>25–30</span><span>30+</span>
          </div>
          <p className="text-sm text-muted-foreground text-center">{cat.advice}</p>
          <p className="text-[10px] text-muted-foreground text-center">BMI is a screening tool, not a medical diagnosis.</p>
        </div>
      )}
    </div>
  );
}
