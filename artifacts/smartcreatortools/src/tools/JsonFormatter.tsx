import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { CheckCircle, XCircle } from "lucide-react";

export function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"format" | "minify">("format");

  const process = (m: "format" | "minify") => {
    setMode(m);
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      setOutput(m === "format" ? JSON.stringify(parsed, null, 2) : JSON.stringify(parsed));
      setError("");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
      setOutput("");
    }
  };

  const validate = () => {
    try { JSON.parse(input); setError("✓ Valid JSON"); } catch (e: unknown) { setError(e instanceof Error ? e.message : "Invalid JSON"); }
  };

  const isValid = (() => { try { if (input) JSON.parse(input); return true; } catch { return false; } })();

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="json-input">Paste JSON</label>
          {input && (
            <span className={`flex items-center gap-1 text-xs font-semibold ${isValid ? "text-emerald-600" : "text-rose-500"}`}>
              {isValid ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
              {isValid ? "Valid" : "Invalid"}
            </span>
          )}
        </div>
        <textarea
          id="json-input"
          value={input}
          onChange={(e) => { setInput(e.target.value); setOutput(""); setError(""); }}
          placeholder='{"key": "value", "array": [1, 2, 3]}'
          rows={8}
          className="w-full rounded-xl bg-muted/40 px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/40 resize-y"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => process("format")} disabled={!input} className="rounded-xl gradient-bg px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-40">Format / Beautify</button>
        <button type="button" onClick={() => process("minify")} disabled={!input} className="rounded-xl glass px-4 py-2.5 text-sm font-semibold hover:bg-primary/10 hover:text-primary disabled:opacity-40 transition-all">Minify</button>
        <button type="button" onClick={validate} disabled={!input} className="rounded-xl glass px-4 py-2.5 text-sm font-semibold hover:bg-primary/10 hover:text-primary disabled:opacity-40 transition-all">Validate</button>
      </div>
      {error && (
        <div className={`rounded-xl px-4 py-3 text-sm font-medium ${error.startsWith("✓") ? "bg-emerald-500/10 text-emerald-700" : "bg-rose-500/10 text-rose-700"}`}>{error}</div>
      )}
      {output && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{mode === "format" ? "Formatted" : "Minified"} JSON</span>
            <CopyButton value={output} label="Copy" />
          </div>
          <pre className="w-full rounded-xl bg-muted/40 px-4 py-3 text-sm font-mono overflow-x-auto max-h-96 overflow-y-auto whitespace-pre-wrap">{output}</pre>
        </div>
      )}
    </div>
  );
}
