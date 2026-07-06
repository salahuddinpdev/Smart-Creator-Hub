import { useMemo, useState } from "react";
import { CopyButton } from "@/components/CopyButton";

const SAMPLE = "";

export function WordCounter() {
  const [text, setText] = useState(SAMPLE);

  const stats = useMemo(() => {
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s+/g, "").length;
    const words = text.trim() ? text.trim().split(/\s+/).filter(Boolean) : [];
    const sentences = text
      .split(/[.!?]+(?=\s|$)/)
      .map((s) => s.trim())
      .filter(Boolean).length;
    const paragraphs = text
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean).length;
    const readingMinutes = Math.max(1, Math.round(words.length / 200));
    const speakingMinutes = Math.max(1, Math.round(words.length / 130));

    let longest = "";
    const counts: Record<string, number> = {};
    for (const w of words) {
      const cleaned = w.replace(/[^A-Za-z0-9'-]/g, "");
      if (cleaned.length > longest.length) longest = cleaned;
      const lower = cleaned.toLowerCase();
      if (lower.length >= 3) {
        counts[lower] = (counts[lower] || 0) + 1;
      }
    }
    const mostCommon = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];

    return {
      chars,
      charsNoSpaces,
      words: words.length,
      sentences,
      paragraphs,
      readingMinutes,
      speakingMinutes,
      longest: longest || "—",
      mostCommon: mostCommon ? `${mostCommon[0]} (×${mostCommon[1]})` : "—",
    };
  }, [text]);

  const summary = `Characters: ${stats.chars}
Characters (no spaces): ${stats.charsNoSpaces}
Words: ${stats.words}
Sentences: ${stats.sentences}
Paragraphs: ${stats.paragraphs}
Reading time: ${stats.readingMinutes} min
Speaking time: ${stats.speakingMinutes} min`;

  return (
    <div className="grid lg:grid-cols-[1fr_320px] gap-5">
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Your text
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={18}
          placeholder="Start typing or paste your text here..."
          className="mt-2 w-full rounded-2xl glass border-0 p-5 text-base leading-relaxed font-sans resize-y focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>
      <div className="space-y-3">
        <Stat label="Words" value={stats.words.toLocaleString()} highlight />
        <div className="grid grid-cols-2 gap-3">
          <Stat label="Characters" value={stats.chars.toLocaleString()} />
          <Stat label="No spaces" value={stats.charsNoSpaces.toLocaleString()} />
          <Stat label="Sentences" value={stats.sentences.toLocaleString()} />
          <Stat label="Paragraphs" value={stats.paragraphs.toLocaleString()} />
        </div>
        <Stat label="Reading time" value={`${stats.readingMinutes} min`} />
        <Stat label="Speaking time" value={`${stats.speakingMinutes} min`} />
        <Stat label="Longest word" value={stats.longest} small />
        <Stat label="Most common" value={stats.mostCommon} small />
        <CopyButton value={summary} label="Copy Stats" className="w-full justify-center" />
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  highlight,
  small,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  small?: boolean;
}) {
  return (
    <div
      className={
        highlight
          ? "rounded-2xl gradient-bg p-4 text-white shadow-lg shadow-primary/30"
          : "rounded-2xl glass p-4"
      }
    >
      <div
        className={`text-[10px] font-bold uppercase tracking-wider ${
          highlight ? "text-white/80" : "text-muted-foreground"
        }`}
      >
        {label}
      </div>
      <div
        className={`mt-1 font-extrabold tabular-nums ${
          highlight ? "text-3xl" : small ? "text-base truncate" : "text-xl"
        }`}
      >
        {value}
      </div>
    </div>
  );
}
