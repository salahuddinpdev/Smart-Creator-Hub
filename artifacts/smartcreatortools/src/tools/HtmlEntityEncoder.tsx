import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";

const encode = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
   .replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/\//g, "&#47;");

const decode = (s: string) =>
  s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
   .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&#47;/g, "/")
   .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
   .replace(/&([a-z]+);/gi, (orig, name) => {
     const d = document.createElement("textarea");
     d.innerHTML = orig;
     return d.value;
   });

export function HtmlEntityEncoder() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState('<h1 class="title">Hello "World" & more</h1>');
  const output = input ? (mode === "encode" ? encode(input) : decode(input)) : "";

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["encode", "decode"] as const).map((m) => (
          <button key={m} type="button" onClick={() => setMode(m)}
            className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-all capitalize ${mode === m ? "gradient-bg text-white shadow-lg shadow-primary/30" : "glass hover:bg-primary/10 hover:text-primary"}`}>
            {m}
          </button>
        ))}
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="html-ent-input">
          {mode === "encode" ? "HTML / Text to encode" : "HTML entities to decode"}
        </label>
        <textarea id="html-ent-input" value={input} onChange={(e) => setInput(e.target.value)} rows={5}
          className="mt-2 w-full rounded-xl bg-muted/40 px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/40 resize-y" />
      </div>
      {output && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {mode === "encode" ? "Encoded" : "Decoded"}
            </span>
            <CopyButton value={output} label="Copy" />
          </div>
          <pre className="w-full rounded-xl bg-muted/40 px-4 py-3 text-sm font-mono whitespace-pre-wrap break-all">{output}</pre>
        </div>
      )}
      <div className="glass rounded-xl p-4">
        <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Common entities reference</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[["&", "&amp;"], ["<", "&lt;"], [">", "&gt;"], ['"', "&quot;"], ["'", "&#39;"], ["©", "&copy;"], ["®", "&reg;"], ["€", "&euro;"]].map(([c, e]) => (
            <div key={c} className="text-xs font-mono flex items-center gap-1.5">
              <span className="font-bold">{c}</span>
              <span className="text-muted-foreground">→</span>
              <span>{e}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
