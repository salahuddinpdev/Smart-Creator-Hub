import { useMemo, useState } from "react";
import { Wand2, RotateCcw } from "lucide-react";
import { CopyButton } from "@/components/CopyButton";

const PHRASE_REPLACEMENTS: Array<[RegExp, string]> = [
  [/\bin order to\b/gi, "to"],
  [/\bdue to the fact that\b/gi, "because"],
  [/\ba large number of\b/gi, "many"],
  [/\bin the event that\b/gi, "if"],
  [/\bwith regard to\b/gi, "about"],
  [/\bat this point in time\b/gi, "now"],
  [/\bin spite of the fact that\b/gi, "though"],
  [/\bfor the purpose of\b/gi, "to"],
  [/\bprior to\b/gi, "before"],
  [/\bin the near future\b/gi, "soon"],
  [/\bas a matter of fact\b/gi, "actually"],
  [/\ba great deal of\b/gi, "a lot of"],
  [/\bin conclusion\b/gi, "so"],
  [/\bit is important to note that\b/gi, ""],
  [/\bit is worth noting that\b/gi, ""],
  [/\bin terms of\b/gi, "for"],
];

const WORD_REPLACEMENTS: Record<string, string> = {
  utilize: "use",
  utilizes: "uses",
  utilized: "used",
  utilizing: "using",
  commence: "start",
  commences: "starts",
  commenced: "started",
  commencing: "starting",
  terminate: "end",
  terminated: "ended",
  demonstrate: "show",
  demonstrates: "shows",
  demonstrated: "showed",
  additionally: "also",
  furthermore: "also",
  moreover: "also",
  however: "but",
  nevertheless: "still",
  therefore: "so",
  thus: "so",
  hence: "so",
  consequently: "so",
  subsequently: "then",
  approximately: "about",
  numerous: "many",
  individuals: "people",
  facilitate: "help",
  facilitates: "helps",
  endeavor: "try",
  ascertain: "find out",
  obtain: "get",
  obtains: "gets",
  obtained: "got",
  purchase: "buy",
  purchased: "bought",
  initiate: "start",
  initiated: "started",
  implement: "do",
  implemented: "did",
  modification: "change",
  modifications: "changes",
  assistance: "help",
  sufficient: "enough",
  comprehend: "understand",
  comprehends: "understands",
  comprehended: "understood",
  fundamental: "basic",
  optimal: "best",
  significantly: "a lot",
  ultimately: "in the end",
  presently: "now",
  currently: "now",
  regarding: "about",
  concerning: "about",
  pertaining: "about",
  whilst: "while",
  amongst: "among",
};

const CONTRACTIONS: Array<[RegExp, string]> = [
  [/\bdo not\b/gi, "don't"],
  [/\bdoes not\b/gi, "doesn't"],
  [/\bdid not\b/gi, "didn't"],
  [/\bcannot\b/gi, "can't"],
  [/\bcan not\b/gi, "can't"],
  [/\bwill not\b/gi, "won't"],
  [/\bshould not\b/gi, "shouldn't"],
  [/\bwould not\b/gi, "wouldn't"],
  [/\bcould not\b/gi, "couldn't"],
  [/\bis not\b/gi, "isn't"],
  [/\bare not\b/gi, "aren't"],
  [/\bwas not\b/gi, "wasn't"],
  [/\bwere not\b/gi, "weren't"],
  [/\bhave not\b/gi, "haven't"],
  [/\bhas not\b/gi, "hasn't"],
  [/\bhad not\b/gi, "hadn't"],
  [/\bit is\b/g, "it's"],
  [/\bIt is\b/g, "It's"],
  [/\bthat is\b/g, "that's"],
  [/\bThat is\b/g, "That's"],
  [/\bthere is\b/g, "there's"],
  [/\bThere is\b/g, "There's"],
  [/\byou are\b/g, "you're"],
  [/\bYou are\b/g, "You're"],
  [/\bthey are\b/g, "they're"],
  [/\bThey are\b/g, "They're"],
  [/\bwe are\b/g, "we're"],
  [/\bWe are\b/g, "We're"],
  [/\bI am\b/g, "I'm"],
];

const matchCase = (replacement: string, original: string): string => {
  if (!original) return replacement;
  if (original === original.toUpperCase()) return replacement.toUpperCase();
  if (original[0] === original[0].toUpperCase())
    return replacement[0].toUpperCase() + replacement.slice(1);
  return replacement;
};

export function humanize(input: string): string {
  let out = input;

  for (const [pattern, replacement] of PHRASE_REPLACEMENTS) {
    out = out.replace(pattern, replacement);
  }

  out = out.replace(/\b[A-Za-z]+\b/g, (word) => {
    const lower = word.toLowerCase();
    const replacement = WORD_REPLACEMENTS[lower];
    return replacement ? matchCase(replacement, word) : word;
  });

  for (const [pattern, replacement] of CONTRACTIONS) {
    out = out.replace(pattern, replacement);
  }

  out = out.replace(/  +/g, " ").replace(/ ([.,;:!?])/g, "$1");

  return out.trim();
}

export function AiTextHumanizer() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const stats = useMemo(() => {
    const w = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;
    return { in: w(input), out: w(output), chars: output.length };
  }, [input, output]);

  return (
    <div className="space-y-5">
      <div className="grid lg:grid-cols-2 gap-5">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Original (AI-style) text
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your AI-generated text here..."
            rows={12}
            className="mt-2 w-full rounded-2xl glass border-0 p-4 text-sm leading-relaxed font-sans resize-y focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          <p className="mt-2 text-xs text-muted-foreground">{stats.in} words</p>
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Humanized output
          </label>
          <textarea
            value={output}
            readOnly
            placeholder="Your humanized text will appear here..."
            rows={12}
            className="mt-2 w-full rounded-2xl glass border-0 p-4 text-sm leading-relaxed font-sans resize-y focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          <p className="mt-2 text-xs text-muted-foreground">
            {stats.out} words · {stats.chars} characters
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setOutput(humanize(input))}
          disabled={!input.trim()}
          className="inline-flex items-center gap-2 rounded-xl gradient-bg px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Wand2 className="w-4 h-4" />
          Humanize Text
        </button>
        <CopyButton value={output} />
        <button
          type="button"
          onClick={() => {
            setInput("");
            setOutput("");
          }}
          className="inline-flex items-center gap-2 rounded-xl glass-strong px-4 py-3 text-sm font-semibold hover:bg-muted/40"
        >
          <RotateCcw className="w-4 h-4" />
          Clear
        </button>
      </div>
    </div>
  );
}
