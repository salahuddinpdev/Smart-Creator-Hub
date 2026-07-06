import { useState } from "react";

interface AgeResult {
  years: number; months: number; days: number;
  totalDays: number; totalWeeks: number;
  nextBirthday: number;
}

function calcAge(dob: string, target: string): AgeResult | null {
  const birth = new Date(dob);
  const now = new Date(target);
  if (isNaN(birth.getTime()) || isNaN(now.getTime()) || birth > now) return null;
  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  let days = now.getDate() - birth.getDate();
  if (days < 0) { months--; const prev = new Date(now.getFullYear(), now.getMonth(), 0); days += prev.getDate(); }
  if (months < 0) { years--; months += 12; }
  const totalMs = now.getTime() - birth.getTime();
  const totalDays = Math.floor(totalMs / 86400000);
  const nextBd = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
  if (nextBd <= now) nextBd.setFullYear(now.getFullYear() + 1);
  const nextBirthday = Math.ceil((nextBd.getTime() - now.getTime()) / 86400000);
  return { years, months, days, totalDays, totalWeeks: Math.floor(totalDays / 7), nextBirthday };
}

export function AgeCalculator() {
  const today = new Date().toISOString().split("T")[0];
  const [dob, setDob] = useState("1990-01-01");
  const [target, setTarget] = useState(today);
  const result = calcAge(dob, target);

  const Stat = ({ label, value }: { label: string; value: string | number }) => (
    <div className="glass rounded-xl p-4 text-center">
      <div className="text-2xl font-extrabold gradient-text">{value}</div>
      <div className="text-xs text-muted-foreground mt-1">{label}</div>
    </div>
  );

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="dob">Date of Birth</label>
          <input id="dob" type="date" value={dob} max={today} onChange={(e) => setDob(e.target.value)}
            className="mt-2 w-full rounded-xl bg-muted/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="age-target">Calculate on</label>
          <input id="age-target" type="date" value={target} onChange={(e) => setTarget(e.target.value)}
            className="mt-2 w-full rounded-xl bg-muted/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
        </div>
      </div>

      {result ? (
        <div className="space-y-3">
          <div className="glass-strong rounded-2xl p-5 text-center">
            <div className="text-4xl font-extrabold gradient-text">{result.years} <span className="text-2xl">years</span></div>
            <div className="text-lg font-semibold mt-1">{result.months} months, {result.days} days</div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Stat label="Total Days" value={result.totalDays.toLocaleString()} />
            <Stat label="Total Weeks" value={result.totalWeeks.toLocaleString()} />
            <Stat label="Total Hours" value={(result.totalDays * 24).toLocaleString()} />
            <Stat label="Days to Birthday" value={result.nextBirthday} />
          </div>
        </div>
      ) : (
        <div className="glass rounded-xl px-4 py-3 text-sm text-muted-foreground text-center">
          Enter a valid date of birth to see results.
        </div>
      )}
    </div>
  );
}
