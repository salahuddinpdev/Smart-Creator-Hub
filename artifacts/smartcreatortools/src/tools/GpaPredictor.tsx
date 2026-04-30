import { useMemo, useState } from "react";
import { Calculator } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from "recharts";
import { cn } from "@/lib/utils";

interface Result {
  required: number;
  feasible: "achievable" | "hard" | "impossible";
  message: string;
}

function calculate(
  currentGpa: number,
  creditsDone: number,
  targetGpa: number,
  creditsRemaining: number,
): Result {
  if (creditsRemaining <= 0) {
    return {
      required: 0,
      feasible: "impossible",
      message: "You need at least 1 credit remaining to calculate.",
    };
  }
  const totalCredits = creditsDone + creditsRemaining;
  const required = (targetGpa * totalCredits - currentGpa * creditsDone) / creditsRemaining;
  if (!Number.isFinite(required)) {
    return { required: 0, feasible: "impossible", message: "Invalid inputs." };
  }
  if (required > 4.0) {
    return {
      required,
      feasible: "impossible",
      message: `You'd need a ${required.toFixed(2)} GPA — above the 4.0 maximum. Adjust your target.`,
    };
  }
  if (required < 0) {
    return {
      required: 0,
      feasible: "achievable",
      message: "You've already exceeded your target — coast through!",
    };
  }
  if (required > 3.7) {
    return {
      required,
      feasible: "hard",
      message: `Tough but possible. You need a ${required.toFixed(2)} GPA across remaining credits.`,
    };
  }
  return {
    required,
    feasible: "achievable",
    message: `Achievable. Maintain a ${required.toFixed(2)} GPA in your remaining ${creditsRemaining} credits.`,
  };
}

export function GpaPredictor() {
  const [currentGpa, setCurrentGpa] = useState("3.2");
  const [creditsDone, setCreditsDone] = useState("60");
  const [targetGpa, setTargetGpa] = useState("3.5");
  const [creditsRemaining, setCreditsRemaining] = useState("60");
  const [result, setResult] = useState<Result | null>(null);

  const compute = () => {
    setResult(
      calculate(
        Number(currentGpa) || 0,
        Number(creditsDone) || 0,
        Number(targetGpa) || 0,
        Number(creditsRemaining) || 0,
      ),
    );
  };

  const data = useMemo(() => {
    if (!result) return [];
    return [
      { name: "Current", value: Number(currentGpa) || 0, fill: "hsl(199, 89%, 56%)" },
      { name: "Target", value: Number(targetGpa) || 0, fill: "hsl(262, 83%, 58%)" },
      { name: "Required", value: Math.max(0, Math.min(4, result.required)), fill: "hsl(326, 78%, 60%)" },
    ];
  }, [result, currentGpa, targetGpa]);

  return (
    <div className="grid lg:grid-cols-2 gap-5">
      <div className="space-y-4">
        <NumberField label="Current CGPA" value={currentGpa} onChange={setCurrentGpa} step="0.01" max={4} />
        <NumberField label="Credits Completed" value={creditsDone} onChange={setCreditsDone} />
        <NumberField label="Target CGPA" value={targetGpa} onChange={setTargetGpa} step="0.01" max={4} />
        <NumberField
          label="Credits Remaining"
          value={creditsRemaining}
          onChange={setCreditsRemaining}
        />
        <button
          type="button"
          onClick={compute}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl gradient-bg px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow"
        >
          <Calculator className="w-4 h-4" />
          Calculate Required GPA
        </button>
      </div>

      <div className="space-y-4">
        {result ? (
          <>
            <div className="glass-strong rounded-2xl p-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Required GPA in remaining credits
              </div>
              <div className="mt-2 flex items-baseline gap-3">
                <span className="text-5xl font-extrabold gradient-text tabular-nums">
                  {Math.max(0, Math.min(4, result.required)).toFixed(2)}
                </span>
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-bold uppercase",
                    result.feasible === "achievable" && "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
                    result.feasible === "hard" && "bg-amber-500/15 text-amber-700 dark:text-amber-300",
                    result.feasible === "impossible" && "bg-rose-500/15 text-rose-700 dark:text-rose-300",
                  )}
                >
                  {result.feasible}
                </span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{result.message}</p>
            </div>
            <div className="glass rounded-2xl p-4 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsla(240, 20%, 50%, 0.15)" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis domain={[0, 4]} tick={{ fontSize: 12 }} />
                  <Tooltip
                    cursor={{ fill: "hsla(240, 20%, 50%, 0.05)" }}
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid hsla(0,0%,100%,0.6)",
                      background: "hsla(0,0%,100%,0.9)",
                      backdropFilter: "blur(20px)",
                    }}
                  />
                  <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                    {data.map((d, i) => (
                      <Cell key={i} fill={d.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        ) : (
          <div className="glass rounded-2xl p-12 text-center text-muted-foreground">
            <Calculator className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">Enter your numbers and tap Calculate to see your target.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
  step,
  max,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  step?: string;
  max?: number;
}) {
  return (
    <div className="glass rounded-2xl p-4">
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        step={step ?? "1"}
        min="0"
        max={max}
        className="mt-2 w-full bg-transparent border-0 outline-none text-2xl font-bold tabular-nums"
      />
    </div>
  );
}
