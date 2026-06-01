import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";

const MORSE: Record<string, string> = {
  A:".-", B:"-...", C:"-.-.", D:"-..", E:".", F:"..-.", G:"--.", H:"....",
  I:"..", J:".---", K:"-.-", L:".-..", M:"--", N:"-.", O:"---", P:".--.",
  Q:"--.-", R:".-.", S:"...", T:"-", U:"..-", V:"...-", W:".--", X:"-..-",
  Y:"-.--", Z:"--..", "0":"-----", "1":".----", "2":"..---", "3":"...--",
  "4":"....-", "5":".....", "6":"-....", "7":"--...", "8":"---..", "9":"----.",
  ".":".-.-.-", ",":"--..--", "?":"..--..","!":"-.-.--", "/":"-..-.",
  "(":"-.--.", ")":"-.--.-", "&":".-...", ":":"---...", "=":"-...-",
  "+":".-.-.", "-":"-....-", '"':".-..-.", "@":".--.-.","'":".----.",
};
const RMORSE = Object.fromEntries(Object.entries(MORSE).map(([k, v]) => [v, k]));

const encode = (t: string) =>
  t.toUpperCase().split("").map((c) => c === " " ? "/" : (MORSE[c] ?? "?")).join(" ");

const decode = (m: string) =>
  m.split(" / ").map((word) =>
    word.split(" ").map((code) => RMORSE[code] ?? "?").join("")
  ).join(" ");

export function MorseCodeTranslator() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState("Hello World");
  const output = input ? (mode === "encode" ? encode(input) : decode(input)) : "";

  const placeholder = mode === "encode"
    ? "Type your message…"
    : ".... . .-.. .-.. --- / .-- --- .-. .-.. -..";

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["encode", "decode"] as const).map((m) => (
          <button key={m} type="button" onClick={() => { setMode(m); setInput(""); }}
            className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-all capitalize ${mode === m ? "gradient-bg text-white shadow-lg shadow-primary/30" : "glass hover:bg-primary/10 hover:text-primary"}`}>
            {m === "encode" ? "Text → Morse" : "Morse → Text"}
          </button>
        ))}
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="morse-input">
          {mode === "encode" ? "Plain text" : "Morse code (use / for word space)"}
        </label>
        <textarea id="morse-input" value={input} onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder} rows={4}
          className="mt-2 w-full rounded-xl bg-muted/40 px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/40 resize-y" />
      </div>
      {output && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {mode === "encode" ? "Morse Code" : "Decoded Text"}
            </span>
            <CopyButton value={output} label="Copy" />
          </div>
          <pre className="w-full rounded-xl bg-muted/40 px-4 py-3 text-sm font-mono whitespace-pre-wrap break-all leading-relaxed">{output}</pre>
        </div>
      )}
      <details className="glass rounded-xl">
        <summary className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground cursor-pointer">Morse code reference</summary>
        <div className="px-4 pb-4 grid grid-cols-4 sm:grid-cols-6 gap-2">
          {Object.entries(MORSE).slice(0, 36).map(([c, m]) => (
            <div key={c} className="text-xs font-mono flex gap-1"><span className="font-bold">{c}</span><span className="text-muted-foreground">{m}</span></div>
          ))}
        </div>
      </details>
    </div>
  );
}
