import { useState, useEffect, useRef, useCallback } from "react";
import { Play, Pause, RotateCcw, CheckCircle } from "lucide-react";

type Phase = "work" | "short-break" | "long-break";

const PHASES: Record<Phase, { label: string; color: string; defaultMin: number }> = {
  "work": { label: "Focus", color: "from-violet-500 to-fuchsia-500", defaultMin: 25 },
  "short-break": { label: "Short Break", color: "from-emerald-500 to-teal-500", defaultMin: 5 },
  "long-break": { label: "Long Break", color: "from-sky-500 to-blue-500", defaultMin: 15 },
};

export function PomodoroTimer() {
  const [durations, setDurations] = useState({ work: 25, "short-break": 5, "long-break": 15 });
  const [phase, setPhase] = useState<Phase>("work");
  const [seconds, setSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = durations[phase] * 60;
  const pct = ((total - seconds) / total) * 100;
  const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");

  const stop = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setRunning(false);
  }, []);

  const advance = useCallback(() => {
    stop();
    if (phase === "work") {
      const next = (sessions + 1) % 4 === 0 ? "long-break" : "short-break";
      setSessions((s) => s + 1);
      setPhase(next);
      setSeconds(durations[next] * 60);
    } else {
      setPhase("work");
      setSeconds(durations.work * 60);
    }
  }, [phase, sessions, durations, stop]);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => {
          if (s <= 1) { advance(); return 0; }
          return s - 1;
        });
      }, 1000);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running, advance]);

  const reset = () => { stop(); setSeconds(durations[phase] * 60); };
  const switchPhase = (p: Phase) => { stop(); setPhase(p); setSeconds(durations[p] * 60); };

  const radius = 80;
  const circ = 2 * Math.PI * radius;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 justify-center">
        {(Object.keys(PHASES) as Phase[]).map((p) => (
          <button key={p} type="button" onClick={() => switchPhase(p)}
            className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${phase === p ? `bg-gradient-to-r ${PHASES[p].color} text-white shadow-lg` : "glass hover:bg-primary/10 hover:text-primary"}`}>
            {PHASES[p].label}
          </button>
        ))}
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="relative h-48 w-48">
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r={radius} fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="12" />
            <circle cx="100" cy="100" r={radius} fill="none"
              stroke="url(#timer-grad)" strokeWidth="12" strokeLinecap="round"
              strokeDasharray={circ} strokeDashoffset={circ * (1 - pct / 100)}
              style={{ transition: "stroke-dashoffset 1s linear" }} />
            <defs>
              <linearGradient id="timer-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#7c3aed" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-extrabold font-mono">{mins}:{secs}</span>
            <span className="text-xs text-muted-foreground mt-1">{PHASES[phase].label}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button type="button" onClick={reset} className="glass rounded-xl p-3 hover:bg-primary/10 transition-colors">
            <RotateCcw className="w-5 h-5" />
          </button>
          <button type="button" onClick={() => setRunning((r) => !r)}
            className="gradient-bg rounded-xl px-8 py-3 text-sm font-bold text-white shadow-lg shadow-primary/30 hover:-translate-y-px transition-all flex items-center gap-2">
            {running ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            {running ? "Pause" : "Start"}
          </button>
          <button type="button" onClick={advance} className="glass rounded-xl p-3 hover:bg-primary/10 transition-colors" title="Skip">
            <CheckCircle className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className={`h-2 w-8 rounded-full transition-all ${i < (sessions % 4) ? "gradient-bg" : "bg-muted/40"}`} />
          ))}
          <span className="text-xs text-muted-foreground ml-1">{sessions} session{sessions !== 1 ? "s" : ""}</span>
        </div>
      </div>

      <div className="glass rounded-xl p-4">
        <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Customize durations (min)</div>
        <div className="grid grid-cols-3 gap-3">
          {(["work", "short-break", "long-break"] as Phase[]).map((p) => (
            <div key={p}>
              <label className="text-[10px] text-muted-foreground">{PHASES[p].label}</label>
              <input type="number" min={1} max={99} value={durations[p]}
                onChange={(e) => { const v = Math.max(1, Math.min(99, Number(e.target.value))); setDurations((d) => ({ ...d, [p]: v })); if (phase === p && !running) setSeconds(v * 60); }}
                className="mt-1 w-full rounded-lg bg-muted/40 px-3 py-1.5 text-sm text-center focus:outline-none focus:ring-2 focus:ring-primary/40" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
