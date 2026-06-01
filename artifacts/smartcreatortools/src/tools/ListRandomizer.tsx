import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { Shuffle } from "lucide-react";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function ListRandomizer() {
  const [input, setInput] = useState("Alice\nBob\nCarol\nDave\nEve\nFrank\nGrace\nHenry");
  const [shuffled, setShuffled] = useState<string[]>([]);
  const [pickN, setPickN] = useState(0);

  const items = input.split("\n").map((l) => l.trim()).filter(Boolean);
  const doShuffle = () => setShuffled(shuffle(items));
  const pick = () => {
    const n = pickN > 0 ? Math.min(pickN, items.length) : items.length;
    setShuffled(shuffle(items).slice(0, n));
  };

  const output = shuffled.join("\n");

  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="list-input">Items (one per line)</label>
        <textarea id="list-input" value={input} onChange={(e) => { setInput(e.target.value); setShuffled([]); }} rows={8}
          className="mt-2 w-full rounded-xl bg-muted/40 px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/40 resize-y" />
        <p className="mt-1 text-xs text-muted-foreground">{items.length} item{items.length !== 1 ? "s" : ""}</p>
      </div>
      <div className="flex flex-wrap gap-3 items-end">
        <button type="button" onClick={doShuffle} disabled={items.length === 0}
          className="rounded-xl gradient-bg px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/30 hover:-translate-y-px transition-all disabled:opacity-40 flex items-center gap-2">
          <Shuffle className="w-4 h-4" /> Shuffle All
        </button>
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap">Pick</label>
          <input type="number" min={0} max={items.length} value={pickN || ""}
            onChange={(e) => setPickN(Number(e.target.value))}
            placeholder="N"
            className="w-16 rounded-xl bg-muted/40 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
          <button type="button" onClick={pick} disabled={items.length === 0}
            className="rounded-xl glass px-4 py-2.5 text-sm font-semibold hover:bg-primary/10 hover:text-primary transition-all disabled:opacity-40">
            Pick Random
          </button>
        </div>
      </div>
      {shuffled.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{shuffled.length} items</span>
            <CopyButton value={output} label="Copy" />
          </div>
          <ol className="space-y-1.5">
            {shuffled.map((item, i) => (
              <li key={i} className="glass rounded-xl px-4 py-2.5 text-sm flex items-center gap-3">
                <span className="text-[10px] font-bold text-muted-foreground w-5 text-right shrink-0">{i + 1}</span>
                <span className="font-medium">{item}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
