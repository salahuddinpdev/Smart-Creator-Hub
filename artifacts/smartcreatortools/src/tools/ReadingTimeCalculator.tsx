import { useState, useMemo } from "react";

export function ReadingTimeCalculator() {
  const [text, setText] = useState("Paste your article, blog post, or essay here to estimate reading and speaking time. Reading time is calculated at 200 words per minute — the average for adult readers in English. Speaking time is at 130 words per minute, ideal for presentations and voiceovers.");
  const [wpm, setWpm] = useState(200);
  const [swpm, setSwpm] = useState(130);

  const stats = useMemo(() => {
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const chars = text.length;
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length;
    const paragraphs = text.split(/\n{2,}/).filter((p) => p.trim().length > 0).length;
    const readSec = Math.ceil((words / wpm) * 60);
    const speakSec = Math.ceil((words / swpm) * 60);
    const fmt = (s: number) => {
      const m = Math.floor(s / 60);
      const sec = s % 60;
      if (m === 0) return `${sec}s`;
      return sec === 0 ? `${m}m` : `${m}m ${sec}s`;
    };
    return { words, chars, sentences, paragraphs, readTime: fmt(readSec), speakTime: fmt(speakSec), readSec, speakSec };
  }, [text, wpm, swpm]);

  const Stat = ({ label, value, sub }: { label: string; value: string | number; sub?: string }) => (
    <div className="glass rounded-xl p-4 text-center">
      <div className="text-2xl sm:text-3xl font-extrabold gradient-text">{value}</div>
      <div className="text-xs text-muted-foreground mt-1 font-semibold">{label}</div>
      {sub && <div className="text-[10px] text-muted-foreground">{sub}</div>}
    </div>
  );

  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="rt-text">Paste your text</label>
        <textarea id="rt-text" value={text} onChange={(e) => setText(e.target.value)} rows={6}
          className="mt-2 w-full rounded-xl bg-muted/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-y" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Stat label="Words" value={stats.words.toLocaleString()} />
        <Stat label="Characters" value={stats.chars.toLocaleString()} />
        <Stat label="Sentences" value={stats.sentences.toLocaleString()} />
        <Stat label="Paragraphs" value={stats.paragraphs.toLocaleString()} />
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div className="glass-strong rounded-2xl p-4 text-center">
          <div className="text-xs font-bold uppercase tracking-wider text-primary">Reading Time</div>
          <div className="text-3xl font-extrabold gradient-text mt-2">{stats.readTime}</div>
          <div className="mt-2 text-xs text-muted-foreground">
            <label>WPM: </label>
            <input type="number" value={wpm} min={50} max={1000} onChange={(e) => setWpm(Number(e.target.value))}
              className="w-16 bg-muted/40 rounded-lg px-2 py-1 text-center focus:outline-none" />
          </div>
        </div>
        <div className="glass-strong rounded-2xl p-4 text-center">
          <div className="text-xs font-bold uppercase tracking-wider text-primary">Speaking Time</div>
          <div className="text-3xl font-extrabold gradient-text mt-2">{stats.speakTime}</div>
          <div className="mt-2 text-xs text-muted-foreground">
            <label>WPM: </label>
            <input type="number" value={swpm} min={50} max={400} onChange={(e) => setSwpm(Number(e.target.value))}
              className="w-16 bg-muted/40 rounded-lg px-2 py-1 text-center focus:outline-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
