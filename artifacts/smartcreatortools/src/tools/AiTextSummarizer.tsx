import { useMemo, useState } from "react";
import { FileText, RotateCcw, List, AlignLeft } from "lucide-react";
import { CopyButton } from "@/components/CopyButton";

type OutputMode = "paragraph" | "bullets";
type LengthMode = "short" | "medium" | "detailed";

const LENGTH_RATIO: Record<LengthMode, number> = {
  short: 0.20,
  medium: 0.30,
  detailed: 0.40,
};

const STOP_WORDS = new Set([
  "a","an","the","and","or","but","in","on","at","to","for","of","with",
  "by","from","is","are","was","were","be","been","being","have","has",
  "had","do","does","did","will","would","shall","should","may","might",
  "can","could","not","it","its","this","that","these","those","i","we",
  "you","he","she","they","me","him","her","us","them","my","our","your",
  "his","their","which","who","what","when","where","how","why","as","so",
  "if","than","then","also","just","more","very","much","such","into",
  "about","after","before","through","over","under","up","out","off","all",
  "no","there","here","any","each","both","few","own","same","only","now",
]);

function splitSentences(text: string): string[] {
  return text
    .replace(/\s+/g, " ")
    .trim()
    .split(/(?<=[.!?])\s+(?=[A-Z"'])/)
    .map((s) => s.trim())
    .filter((s) => s.length > 10 && s.split(/\s+/).length >= 4);
}

function wordFrequency(sentences: string[]): Map<string, number> {
  const freq = new Map<string, number>();
  for (const s of sentences) {
    for (const raw of s.split(/\s+/)) {
      const w = raw.toLowerCase().replace(/[^a-z]/g, "");
      if (w.length > 2 && !STOP_WORDS.has(w)) {
        freq.set(w, (freq.get(w) ?? 0) + 1);
      }
    }
  }
  return freq;
}

function scoreSentences(
  sentences: string[],
  freq: Map<string, number>,
  maxFreq: number,
): number[] {
  const n = sentences.length;
  return sentences.map((s, idx) => {
    const words = s.split(/\s+/);
    const wc = words.length;

    // TF score: sum of normalised word frequencies
    let tfScore = 0;
    for (const raw of words) {
      const w = raw.toLowerCase().replace(/[^a-z]/g, "");
      if (w.length > 2 && !STOP_WORDS.has(w)) {
        tfScore += (freq.get(w) ?? 0) / maxFreq;
      }
    }
    tfScore = wc > 0 ? tfScore / wc : 0;

    // Position bonus: first 15% and last 10% of the text matter most
    const posFraction = n > 1 ? idx / (n - 1) : 0;
    let posScore = 0;
    if (idx === 0) posScore = 0.25;
    else if (posFraction <= 0.15) posScore = 0.18;
    else if (posFraction >= 0.90) posScore = 0.12;
    else posScore = 0.05;

    // Length penalty: ideal sentence is 10–35 words
    let lenScore = 0;
    if (wc >= 10 && wc <= 35) lenScore = 0.10;
    else if (wc >= 5 && wc < 10) lenScore = 0.04;
    else if (wc > 35 && wc <= 55) lenScore = 0.06;

    // Presence of numbers / data boosts importance
    const hasData = /\d/.test(s) ? 0.05 : 0;

    return tfScore + posScore + lenScore + hasData;
  });
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function summarize(
  text: string,
  ratio: number,
): { sentences: string[]; ratio: number } {
  const sentences = splitSentences(text);
  if (sentences.length === 0) return { sentences: [], ratio: 0 };
  if (sentences.length <= 2) return { sentences, ratio: 1 };

  const freq = wordFrequency(sentences);
  const maxFreq = Math.max(...freq.values(), 1);
  const scores = scoreSentences(sentences, freq, maxFreq);

  const originalWords = countWords(text);
  const targetWords = Math.max(30, Math.round(originalWords * ratio));

  // Rank sentences by score, then pick until target word count is reached
  const ranked = sentences
    .map((s, i) => ({ s, i, score: scores[i] }))
    .sort((a, b) => b.score - a.score);

  const chosen = new Set<number>();
  let wordBudget = 0;
  for (const { s, i } of ranked) {
    if (wordBudget >= targetWords) break;
    chosen.add(i);
    wordBudget += countWords(s);
  }

  // Return in original document order
  const result = sentences.filter((_, i) => chosen.has(i));
  const summaryWords = result.reduce((acc, s) => acc + countWords(s), 0);
  const actualRatio = originalWords > 0 ? summaryWords / originalWords : 0;

  return { sentences: result, ratio: actualRatio };
}

const DEMO =
  "Artificial intelligence is transforming the way we work and communicate. Machine learning models can now generate text, images, and even code with remarkable fluency. These systems are trained on vast datasets scraped from the internet, giving them an impressive breadth of knowledge. However, they also inherit biases and gaps present in that data. Researchers are actively working to improve fairness and reliability. At the same time, businesses are racing to integrate AI into their products and workflows. Customer service chatbots, medical diagnosis tools, and code assistants are just a few examples of AI entering everyday life. Critics worry about job displacement and the environmental cost of training large models. Proponents argue that AI will create new categories of work and accelerate scientific discovery. The truth likely lies somewhere in between, and the outcome will depend heavily on the policy choices governments and companies make over the next decade.";

export function AiTextSummarizer() {
  const [input, setInput] = useState(DEMO);
  const [mode, setMode] = useState<OutputMode>("paragraph");
  const [length, setLength] = useState<LengthMode>("medium");

  const result = useMemo(() => {
    if (!input.trim()) return null;
    return summarize(input, LENGTH_RATIO[length]);
  }, [input, length]);

  const summaryText = useMemo(() => {
    if (!result || result.sentences.length === 0) return "";
    if (mode === "bullets") {
      return result.sentences.map((s) => `• ${s}`).join("\n");
    }
    return result.sentences.join(" ");
  }, [result, mode]);

  const inWords = countWords(input);
  const outWords = result ? result.sentences.reduce((a, s) => a + countWords(s), 0) : 0;
  const compression = inWords > 0 ? Math.round((1 - outWords / inWords) * 100) : 0;

  const LENGTH_OPTS: { key: LengthMode; label: string; hint: string }[] = [
    { key: "short",    label: "Short",    hint: "~20%" },
    { key: "medium",   label: "Medium",   hint: "~30%" },
    { key: "detailed", label: "Detailed", hint: "~40%" },
  ];

  return (
    <div className="space-y-5">
      {/* Controls */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mr-1">
            Length
          </span>
          {LENGTH_OPTS.map(({ key, label, hint }) => (
            <button
              key={key}
              type="button"
              onClick={() => setLength(key)}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                length === key
                  ? "gradient-bg text-white shadow-lg shadow-primary/30"
                  : "glass hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {label}
              <span className="ml-1 opacity-60">{hint}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mr-1">
            Format
          </span>
          <button
            type="button"
            onClick={() => setMode("paragraph")}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
              mode === "paragraph"
                ? "gradient-bg text-white shadow-lg shadow-primary/30"
                : "glass hover:bg-primary/10 hover:text-primary"
            }`}
          >
            <AlignLeft className="w-3 h-3" />
            Paragraph
          </button>
          <button
            type="button"
            onClick={() => setMode("bullets")}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
              mode === "bullets"
                ? "gradient-bg text-white shadow-lg shadow-primary/30"
                : "glass hover:bg-primary/10 hover:text-primary"
            }`}
          >
            <List className="w-3 h-3" />
            Bullets
          </button>
        </div>
      </div>

      {/* Editor columns */}
      <div className="grid lg:grid-cols-2 gap-5">
        {/* Input */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Original Text
            </label>
            <span className="text-xs text-muted-foreground">{inWords} words</span>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste any article, essay, email, or report here…"
            rows={14}
            className="w-full rounded-2xl glass border-0 p-4 text-sm leading-relaxed font-sans resize-y focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>

        {/* Output */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Summary
            </label>
            {outWords > 0 && (
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">{outWords} words</span>
                <span className="inline-flex items-center rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                  {compression}% shorter
                </span>
              </div>
            )}
          </div>
          <textarea
            value={summaryText}
            readOnly
            placeholder="Your summary will appear here…"
            rows={14}
            className="w-full rounded-2xl glass border-0 p-4 text-sm leading-relaxed font-sans resize-y focus:outline-none focus:ring-2 focus:ring-primary/40 bg-primary/[0.02]"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-3">
        <CopyButton value={summaryText} label="Copy Summary" />
        <button
          type="button"
          onClick={() => { setInput(""); }}
          className="inline-flex items-center gap-2 rounded-xl glass px-4 py-2.5 text-sm font-semibold hover:bg-muted/40 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Clear
        </button>
        <button
          type="button"
          onClick={() => setInput(DEMO)}
          className="inline-flex items-center gap-2 rounded-xl glass px-4 py-2.5 text-sm font-semibold hover:bg-muted/40 transition-colors"
        >
          <FileText className="w-4 h-4" />
          Load Demo
        </button>
      </div>

      {/* Stats row */}
      {outWords > 0 && (
        <div className="grid grid-cols-3 gap-3 text-center">
          {[
            { label: "Original", value: `${inWords} words` },
            { label: "Summary", value: `${outWords} words` },
            { label: "Reduction", value: `${compression}%` },
          ].map(({ label, value }) => (
            <div key={label} className="glass rounded-xl py-3 px-2">
              <div className="text-lg font-extrabold gradient-text">{value}</div>
              <div className="mt-0.5 text-[11px] text-muted-foreground font-medium uppercase tracking-wider">
                {label}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
