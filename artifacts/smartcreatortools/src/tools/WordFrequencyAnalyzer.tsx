import { useState, useMemo } from "react";

const STOPWORDS = new Set("a an the and or but in on at to for of with is are was were be been being have has had do does did will would could should may might must shall can".split(" "));

export function WordFrequencyAnalyzer() {
  const [text, setText] = useState("The quick brown fox jumps over the lazy dog. The dog barked at the fox. The fox ran away quickly.");
  const [showStop, setShowStop] = useState(false);
  const [limit, setLimit] = useState(20);

  const freq = useMemo(() => {
    if (!text) return [];
    const words = text.toLowerCase().replace(/[^a-z\s'-]/g, " ").split(/\s+/).filter(Boolean);
    const map = new Map<string, number>();
    words.forEach((w) => { if (showStop || !STOPWORDS.has(w)) map.set(w, (map.get(w) ?? 0) + 1); });
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]).slice(0, limit);
  }, [text, showStop, limit]);

  const max = freq[0]?.[1] ?? 1;

  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="wf-text">Text to analyze</label>
        <textarea id="wf-text" value={text} onChange={(e) => setText(e.target.value)} rows={5}
          className="mt-2 w-full rounded-xl bg-muted/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-y" />
      </div>
      <div className="flex flex-wrap gap-4 items-center">
        <label className="flex items-center gap-2 cursor-pointer select-none text-sm font-semibold">
          <input type="checkbox" checked={showStop} onChange={(e) => setShowStop(e.target.checked)} className="accent-violet-600" />
          Include stop words
        </label>
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Top</label>
          <select value={limit} onChange={(e) => setLimit(Number(e.target.value))}
            className="rounded-lg bg-muted/40 px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40">
            {[10, 20, 30, 50].map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
      </div>

      {freq.length > 0 && (
        <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
          {freq.map(([word, count], i) => (
            <div key={word} className="flex items-center gap-3">
              <span className="text-[10px] text-muted-foreground w-6 text-right shrink-0">{i + 1}</span>
              <span className="text-sm font-mono w-32 truncate shrink-0">{word}</span>
              <div className="flex-1 bg-muted/30 rounded-full h-2 overflow-hidden">
                <div className="h-full rounded-full gradient-bg transition-all" style={{ width: `${(count / max) * 100}%` }} />
              </div>
              <span className="text-sm font-bold w-8 text-right shrink-0">{count}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
