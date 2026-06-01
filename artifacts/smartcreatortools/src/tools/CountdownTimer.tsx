import { useState, useEffect } from "react";

interface Unit { label: string; key: string; value: number }

function calcRemaining(target: Date): Unit[] {
  const diff = Math.max(0, target.getTime() - Date.now());
  const total = Math.floor(diff / 1000);
  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  const mins = Math.floor((total % 3600) / 60);
  const secs = total % 60;
  return [
    { label: "Days", key: "d", value: days },
    { label: "Hours", key: "h", value: hours },
    { label: "Minutes", key: "m", value: mins },
    { label: "Seconds", key: "s", value: secs },
  ];
}

const PRESETS = [
  { label: "New Year", date: () => new Date(`${new Date().getFullYear() + 1}-01-01T00:00:00`) },
  { label: "+1 Hour", date: () => new Date(Date.now() + 3600000) },
  { label: "+1 Day", date: () => new Date(Date.now() + 86400000) },
  { label: "+1 Week", date: () => new Date(Date.now() + 604800000) },
];

export function CountdownTimer() {
  const [targetStr, setTargetStr] = useState(() => {
    const d = new Date(Date.now() + 86400000);
    return d.toISOString().slice(0, 16);
  });
  const [eventName, setEventName] = useState("My Event");
  const [units, setUnits] = useState<Unit[]>([]);
  const [done, setDone] = useState(false);

  const target = new Date(targetStr);

  useEffect(() => {
    const tick = () => {
      const remaining = calcRemaining(target);
      setUnits(remaining);
      setDone(remaining.every((u) => u.value === 0));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetStr]);

  const setPreset = (date: () => Date) => {
    const d = date();
    setTargetStr(d.toISOString().slice(0, 16));
  };

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="cd-name">Event name</label>
          <input id="cd-name" type="text" value={eventName} onChange={(e) => setEventName(e.target.value)}
            className="mt-2 w-full rounded-xl bg-muted/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="cd-target">Target date & time</label>
          <input id="cd-target" type="datetime-local" value={targetStr} onChange={(e) => setTargetStr(e.target.value)}
            className="mt-2 w-full rounded-xl bg-muted/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {PRESETS.map(({ label, date }) => (
          <button key={label} type="button" onClick={() => setPreset(date)}
            className="glass rounded-xl px-3 py-1.5 text-xs font-semibold hover:bg-primary/10 hover:text-primary transition-colors">
            {label}
          </button>
        ))}
      </div>

      <div className="glass-strong rounded-2xl p-6 text-center space-y-4">
        {eventName && <div className="text-xs font-bold uppercase tracking-wider text-primary">{eventName}</div>}
        {done ? (
          <div className="text-3xl font-extrabold gradient-text">🎉 Time's up!</div>
        ) : (
          <div className="grid grid-cols-4 gap-3 sm:gap-4">
            {units.map(({ label, value }) => (
              <div key={label} className="space-y-1">
                <div className="glass rounded-xl py-3 sm:py-4">
                  <div className="text-3xl sm:text-4xl font-extrabold font-mono gradient-text">
                    {String(value).padStart(2, "0")}
                  </div>
                </div>
                <div className="text-[10px] sm:text-xs text-muted-foreground font-semibold uppercase tracking-wider">{label}</div>
              </div>
            ))}
          </div>
        )}
        <div className="text-xs text-muted-foreground">{target.toLocaleString()}</div>
      </div>
    </div>
  );
}
