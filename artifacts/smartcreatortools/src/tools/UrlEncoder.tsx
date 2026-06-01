import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";

export function UrlEncoder() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const process = (m: "encode" | "decode", val: string) => {
    setError("");
    if (!val) { setOutput(""); return; }
    try {
      setOutput(m === "encode" ? encodeURIComponent(val) : decodeURIComponent(val.trim()));
    } catch {
      setError("Invalid URL-encoded input.");
      setOutput("");
    }
  };

  const switchMode = (m: "encode" | "decode") => {
    setMode(m); setInput(""); setOutput(""); setError("");
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["encode", "decode"] as const).map((m) => (
          <button key={m} type="button" onClick={() => switchMode(m)}
            className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-all capitalize ${mode === m ? "gradient-bg text-white shadow-lg shadow-primary/30" : "glass hover:bg-primary/10 hover:text-primary"}`}>
            {m}
          </button>
        ))}
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="url-input">
          {mode === "encode" ? "Text to encode" : "URL-encoded string to decode"}
        </label>
        <textarea
          id="url-input"
          value={input}
          onChange={(e) => { setInput(e.target.value); process(mode, e.target.value); }}
          placeholder={mode === "encode" ? "https://example.com/path?q=hello world&lang=en" : "https%3A%2F%2Fexample.com%2Fpath%3Fq%3Dhello%20world"}
          rows={4}
          className="mt-2 w-full rounded-xl bg-muted/40 px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/40 resize-y"
        />
      </div>
      {error && <div className="rounded-xl bg-rose-500/10 text-rose-700 px-4 py-3 text-sm">{error}</div>}
      {output && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {mode === "encode" ? "URL Encoded" : "Decoded"}
            </span>
            <CopyButton value={output} label="Copy" />
          </div>
          <pre className="w-full rounded-xl bg-muted/40 px-4 py-3 text-sm font-mono whitespace-pre-wrap break-all">{output}</pre>
        </div>
      )}
    </div>
  );
}
