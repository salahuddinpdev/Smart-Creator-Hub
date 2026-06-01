import { useState, useCallback } from "react";
import { CopyButton } from "@/components/CopyButton";

type Algorithm = "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512";
const ALGOS: Algorithm[] = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"];

async function hashText(text: string, algo: Algorithm): Promise<string> {
  const encoded = new TextEncoder().encode(text);
  const buffer = await crypto.subtle.digest(algo, encoded);
  return Array.from(new Uint8Array(buffer)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function HashGenerator() {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<Partial<Record<Algorithm, string>>>({});
  const [loading, setLoading] = useState(false);

  const generate = useCallback(async () => {
    if (!input) return;
    setLoading(true);
    const results: Partial<Record<Algorithm, string>> = {};
    await Promise.all(ALGOS.map(async (a) => { results[a] = await hashText(input, a); }));
    setHashes(results);
    setLoading(false);
  }, [input]);

  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="hash-input">Text to hash</label>
        <textarea id="hash-input" value={input} onChange={(e) => setInput(e.target.value)}
          placeholder="Enter any text…" rows={4}
          className="mt-2 w-full rounded-xl bg-muted/40 px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/40 resize-y" />
      </div>
      <button type="button" onClick={generate} disabled={!input || loading}
        className="rounded-xl gradient-bg px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/30 hover:-translate-y-px transition-all disabled:opacity-40">
        {loading ? "Generating…" : "Generate Hashes"}
      </button>
      {Object.entries(hashes).map(([algo, hash]) => (
        <div key={algo} className="glass rounded-xl px-4 py-3">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">{algo}</span>
            <CopyButton value={hash} label="Copy" />
          </div>
          <code className="text-xs font-mono break-all text-foreground/80">{hash}</code>
        </div>
      ))}
    </div>
  );
}
