import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";

type ConvMode = "text-to-binary" | "binary-to-text" | "text-to-hex" | "hex-to-text";

const textToBin = (t: string) =>
  t.split("").map((c) => c.charCodeAt(0).toString(2).padStart(8, "0")).join(" ");
const binToText = (b: string) => {
  const clean = b.replace(/\s+/g, " ").trim();
  const bytes = clean.split(" ");
  return bytes.map((byte) => {
    const code = parseInt(byte, 2);
    return isNaN(code) ? "?" : String.fromCharCode(code);
  }).join("");
};
const textToHex = (t: string) =>
  t.split("").map((c) => c.charCodeAt(0).toString(16).padStart(2, "0")).join(" ");
const hexToText = (h: string) => {
  const clean = h.replace(/\s+/g, " ").trim();
  return clean.split(" ").map((byte) => {
    const code = parseInt(byte, 16);
    return isNaN(code) ? "?" : String.fromCharCode(code);
  }).join("");
};

const MODES: { id: ConvMode; label: string }[] = [
  { id: "text-to-binary", label: "Text → Binary" },
  { id: "binary-to-text", label: "Binary → Text" },
  { id: "text-to-hex", label: "Text → Hex" },
  { id: "hex-to-text", label: "Hex → Text" },
];

export function BinaryConverter() {
  const [mode, setMode] = useState<ConvMode>("text-to-binary");
  const [input, setInput] = useState("Hello");

  const output = (() => {
    if (!input) return "";
    try {
      if (mode === "text-to-binary") return textToBin(input);
      if (mode === "binary-to-text") return binToText(input);
      if (mode === "text-to-hex") return textToHex(input);
      if (mode === "hex-to-text") return hexToText(input);
    } catch { return "Conversion error"; }
    return "";
  })();

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {MODES.map(({ id, label }) => (
          <button key={id} type="button" onClick={() => { setMode(id); setInput(""); }}
            className={`rounded-xl px-3 py-2 text-xs font-semibold transition-all ${mode === id ? "gradient-bg text-white shadow-lg shadow-primary/30" : "glass hover:bg-primary/10 hover:text-primary"}`}>
            {label}
          </button>
        ))}
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="bin-input">Input</label>
        <textarea id="bin-input" value={input} onChange={(e) => setInput(e.target.value)} rows={4}
          placeholder={mode.startsWith("binary") ? "01001000 01100101 01101100 01101100 01101111" : mode.startsWith("hex") ? "48 65 6c 6c 6f" : "Hello, World!"}
          className="mt-2 w-full rounded-xl bg-muted/40 px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/40 resize-y" />
      </div>
      {output && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Output</span>
            <CopyButton value={output} label="Copy" />
          </div>
          <pre className="w-full rounded-xl bg-muted/40 px-4 py-3 text-sm font-mono whitespace-pre-wrap break-all">{output}</pre>
        </div>
      )}
    </div>
  );
}
