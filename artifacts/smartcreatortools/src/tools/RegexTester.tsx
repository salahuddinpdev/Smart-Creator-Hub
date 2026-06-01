import { useState, useMemo } from "react";

export function RegexTester() {
  const [pattern, setPattern] = useState("\\b\\w{5,}\\b");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState("The quick brown fox jumps over the lazy dog. Testing regex patterns here!");
  const [replace, setReplace] = useState("");
  const [showReplace, setShowReplace] = useState(false);

  const result = useMemo(() => {
    if (!pattern) return { valid: true, matches: [], replaced: text };
    try {
      const re = new RegExp(pattern, flags);
      const matches: { text: string; index: number; groups: string[] }[] = [];
      if (flags.includes("g")) {
        let m;
        while ((m = re.exec(text)) !== null) {
          matches.push({ text: m[0], index: m.index, groups: Array.from(m).slice(1) });
          if (!flags.includes("g")) break;
        }
      } else {
        const m = re.exec(text);
        if (m) matches.push({ text: m[0], index: m.index, groups: Array.from(m).slice(1) });
      }
      const replaced = showReplace ? text.replace(re, replace) : text;
      return { valid: true, matches, replaced };
    } catch (e: unknown) {
      return { valid: false, error: e instanceof Error ? e.message : "Invalid regex", matches: [], replaced: text };
    }
  }, [pattern, flags, text, replace, showReplace]);

  const highlighted = useMemo(() => {
    if (!result.valid || result.matches.length === 0) return [{ type: "text", val: text }];
    const parts: { type: string; val: string }[] = [];
    let last = 0;
    for (const m of result.matches) {
      if (m.index > last) parts.push({ type: "text", val: text.slice(last, m.index) });
      parts.push({ type: "match", val: m.text });
      last = m.index + m.text.length;
    }
    if (last < text.length) parts.push({ type: "text", val: text.slice(last) });
    return parts;
  }, [result, text]);

  const FLAG_OPTS = [
    { f: "g", label: "g (global)" },
    { f: "i", label: "i (case insensitive)" },
    { f: "m", label: "m (multiline)" },
  ];

  return (
    <div className="space-y-4">
      <div className="glass-strong rounded-2xl p-4 space-y-3">
        <div className="flex gap-2 items-start">
          <div className="flex-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="regex-pattern">Pattern</label>
            <input id="regex-pattern" value={pattern} onChange={(e) => setPattern(e.target.value)}
              placeholder="\\b\\w+\\b"
              className={`mt-1 w-full rounded-xl bg-muted/40 px-4 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 ${!result.valid ? "ring-2 ring-rose-500/50" : "focus:ring-primary/40"}`} />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Flags</label>
            <div className="mt-1 flex gap-1.5">
              {FLAG_OPTS.map(({ f, label }) => (
                <button key={f} type="button" title={label}
                  onClick={() => setFlags((fl) => fl.includes(f) ? fl.replace(f, "") : fl + f)}
                  className={`rounded-lg px-2.5 py-2 text-xs font-mono font-bold transition-all ${flags.includes(f) ? "gradient-bg text-white" : "glass hover:bg-primary/10"}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
        {!result.valid && <div className="text-xs text-rose-500 font-medium">{(result as { valid: false; error: string }).error}</div>}
      </div>

      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="regex-text">Test String</label>
        <textarea id="regex-text" value={text} onChange={(e) => setText(e.target.value)} rows={4}
          className="mt-2 w-full rounded-xl bg-muted/40 px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/40 resize-y" />
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" id="show-replace" checked={showReplace} onChange={(e) => setShowReplace(e.target.checked)} className="accent-violet-600" />
        <label htmlFor="show-replace" className="text-sm font-semibold cursor-pointer">Show replace</label>
        {showReplace && (
          <input value={replace} onChange={(e) => setReplace(e.target.value)} placeholder="Replacement…"
            className="flex-1 rounded-xl bg-muted/40 px-3 py-1.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/40" />
        )}
      </div>

      {result.valid && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-bold gradient-text">{result.matches.length}</span>
            <span className="text-muted-foreground">match{result.matches.length !== 1 ? "es" : ""}</span>
          </div>
          <div className="rounded-xl bg-muted/40 px-4 py-3 text-sm font-mono leading-relaxed">
            {highlighted.map((p, i) => (
              <span key={i} className={p.type === "match" ? "bg-violet-500/30 text-violet-800 dark:text-violet-200 rounded px-0.5" : ""}>{p.val}</span>
            ))}
          </div>
          {showReplace && (
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">After Replace</div>
              <div className="rounded-xl bg-muted/40 px-4 py-3 text-sm font-mono">{result.replaced}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
