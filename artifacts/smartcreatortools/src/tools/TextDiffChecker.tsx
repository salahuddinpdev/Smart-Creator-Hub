import { useState } from "react";

type DiffPart = { type: "same" | "add" | "remove"; text: string };

function diffLines(a: string, b: string): DiffPart[] {
  const la = a.split("\n");
  const lb = b.split("\n");
  const m = la.length, n = lb.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) {
    if (la[i - 1] === lb[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
    else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
  }
  const parts: DiffPart[] = [];
  let i = m, j = n;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && la[i - 1] === lb[j - 1]) {
      parts.unshift({ type: "same", text: la[i - 1] });
      i--; j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      parts.unshift({ type: "add", text: lb[j - 1] });
      j--;
    } else {
      parts.unshift({ type: "remove", text: la[i - 1] });
      i--;
    }
  }
  return parts;
}

export function TextDiffChecker() {
  const [a, setA] = useState("The quick brown fox\njumps over the lazy dog\nHello World");
  const [b, setB] = useState("The fast brown fox\njumps over the lazy cat\nHello World\nNew line added");
  const diff = diffLines(a, b);
  const adds = diff.filter((d) => d.type === "add").length;
  const removes = diff.filter((d) => d.type === "remove").length;

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="diff-a">Original text</label>
          <textarea id="diff-a" value={a} onChange={(e) => setA(e.target.value)} rows={8}
            className="mt-2 w-full rounded-xl bg-muted/40 px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/40 resize-y" />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="diff-b">Modified text</label>
          <textarea id="diff-b" value={b} onChange={(e) => setB(e.target.value)} rows={8}
            className="mt-2 w-full rounded-xl bg-muted/40 px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/40 resize-y" />
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm">
        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-emerald-500/30 border border-emerald-500" /><span className="font-semibold text-emerald-600">{adds} added</span></span>
        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-rose-500/30 border border-rose-500" /><span className="font-semibold text-rose-600">{removes} removed</span></span>
      </div>

      <div className="rounded-xl bg-muted/40 overflow-hidden font-mono text-sm">
        {diff.map((part, i) => (
          <div key={i} className={`px-4 py-0.5 flex gap-3 ${part.type === "add" ? "bg-emerald-500/15 text-emerald-800 dark:text-emerald-300" : part.type === "remove" ? "bg-rose-500/15 text-rose-800 dark:text-rose-300" : ""}`}>
            <span className="w-4 shrink-0 text-muted-foreground select-none">
              {part.type === "add" ? "+" : part.type === "remove" ? "−" : " "}
            </span>
            <span className="whitespace-pre-wrap break-all">{part.text || " "}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
