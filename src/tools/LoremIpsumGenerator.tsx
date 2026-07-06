import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";

const WORDS = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum".split(" ");

const rnd = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

function sentence(): string {
  const len = rnd(6, 18);
  const words: string[] = [];
  for (let i = 0; i < len; i++) words.push(WORDS[rnd(0, WORDS.length - 1)]);
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(" ") + ".";
}

function paragraph(): string {
  const count = rnd(3, 7);
  const sentences: string[] = [];
  for (let i = 0; i < count; i++) sentences.push(sentence());
  return sentences.join(" ");
}

function randomWords(n: number): string {
  const out: string[] = [];
  for (let i = 0; i < n; i++) out.push(WORDS[rnd(0, WORDS.length - 1)]);
  return out.join(" ");
}

type Mode = "paragraphs" | "sentences" | "words";

export function LoremIpsumGenerator() {
  const [mode, setMode] = useState<Mode>("paragraphs");
  const [count, setCount] = useState(3);
  const [output, setOutput] = useState("");

  const generate = () => {
    if (mode === "paragraphs") {
      setOutput(Array.from({ length: count }, paragraph).join("\n\n"));
    } else if (mode === "sentences") {
      setOutput(Array.from({ length: count }, sentence).join(" "));
    } else {
      setOutput(randomWords(count));
    }
  };

  const MODES: { v: Mode; label: string }[] = [
    { v: "paragraphs", label: "Paragraphs" },
    { v: "sentences", label: "Sentences" },
    { v: "words", label: "Words" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 items-end">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Type</label>
          <div className="mt-2 flex gap-2">
            {MODES.map(({ v, label }) => (
              <button
                key={v}
                type="button"
                onClick={() => setMode(v)}
                className={`rounded-xl px-3 py-2 text-xs font-semibold transition-all ${mode === v ? "gradient-bg text-white shadow-lg shadow-primary/30" : "glass hover:bg-primary/10 hover:text-primary"}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="lorem-count" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Count</label>
          <input
            id="lorem-count"
            type="number"
            min={1}
            max={20}
            value={count}
            onChange={(e) => setCount(Math.max(1, Math.min(20, Number(e.target.value))))}
            className="mt-2 w-20 rounded-xl bg-muted/40 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 block"
          />
        </div>
        <button
          type="button"
          onClick={generate}
          className="rounded-xl gradient-bg px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/30 hover:-translate-y-px transition-all"
        >
          Generate
        </button>
      </div>

      {output && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Output</span>
            <CopyButton value={output} label="Copy" />
          </div>
          <div className="rounded-xl bg-muted/40 px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap max-h-96 overflow-y-auto">
            {output}
          </div>
        </div>
      )}
    </div>
  );
}
