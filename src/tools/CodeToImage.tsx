import { useMemo, useRef, useState } from "react";
import { toPng } from "html-to-image";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";

const LANGUAGES = ["javascript", "typescript", "python", "html", "css", "json", "bash"] as const;
type Lang = (typeof LANGUAGES)[number];

const GRADIENTS = [
  { name: "Aurora", value: "linear-gradient(135deg, #7c3aed 0%, #ec4899 50%, #f59e0b 100%)" },
  { name: "Ocean", value: "linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)" },
  { name: "Sunset", value: "linear-gradient(135deg, #f97316 0%, #ec4899 100%)" },
  { name: "Forest", value: "linear-gradient(135deg, #10b981 0%, #14b8a6 100%)" },
  { name: "Midnight", value: "linear-gradient(135deg, #1e293b 0%, #334155 100%)" },
  { name: "Candy", value: "linear-gradient(135deg, #f472b6 0%, #a78bfa 100%)" },
];

const KEYWORDS: Record<Lang, RegExp> = {
  javascript:
    /\b(const|let|var|function|return|if|else|for|while|class|extends|new|import|export|from|default|async|await|try|catch|throw|typeof|instanceof|in|of|true|false|null|undefined|this)\b/g,
  typescript:
    /\b(const|let|var|function|return|if|else|for|while|class|extends|new|import|export|from|default|async|await|try|catch|throw|typeof|instanceof|in|of|true|false|null|undefined|this|interface|type|enum|public|private|protected|readonly|as|implements|namespace|declare)\b/g,
  python:
    /\b(def|class|return|if|elif|else|for|while|import|from|as|try|except|finally|raise|with|lambda|pass|None|True|False|self|yield|global|nonlocal|in|not|and|or|is|async|await)\b/g,
  html: /(&lt;\/?[a-zA-Z][^\s&]*|&gt;)/g,
  css: /([.#][a-zA-Z][\w-]*|\b(?:color|background|margin|padding|display|flex|grid|font-size|width|height|border|position|top|left|right|bottom|z-index|opacity|transform|transition)\b)/g,
  json: /"([^"]+)"(?=\s*:)/g,
  bash: /\b(echo|cd|ls|pwd|mkdir|rm|cp|mv|cat|grep|sed|awk|curl|wget|sudo|export|if|then|fi|for|do|done|while|case|esac|function)\b/g,
};

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const highlight = (code: string, lang: Lang) => {
  let out = escapeHtml(code);
  out = out.replace(/(\/\/[^\n]*|#[^\n]*)/g, '<span style="color:#7c8898">$1</span>');
  out = out.replace(/("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/g, '<span style="color:#a3e635">$1</span>');
  out = out.replace(/\b(\d+(?:\.\d+)?)\b/g, '<span style="color:#fb923c">$1</span>');
  const kwRe = KEYWORDS[lang];
  if (kwRe) {
    out = out.replace(kwRe, (m) => `<span style="color:#c084fc;font-weight:600">${m}</span>`);
  }
  return out;
};

const DEFAULT_CODE = `function greet(name) {
  const message = \`Hello, \${name}!\`;
  console.log(message);
  return message;
}

greet("world");`;

export function CodeToImage() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [lang, setLang] = useState<Lang>("javascript");
  const [gradient, setGradient] = useState(GRADIENTS[0].value);
  const [padding, setPadding] = useState(48);
  const [filename, setFilename] = useState("snippet.js");
  const cardRef = useRef<HTMLDivElement>(null);

  const lines = useMemo(() => code.split("\n"), [code]);
  const highlighted = useMemo(() => highlight(code, lang), [code, lang]);

  const exportPng = async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await toPng(cardRef.current, { pixelRatio: 2, cacheBust: true });
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "code-snippet.png";
      link.click();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-5">
      <div className="grid lg:grid-cols-[1fr_280px] gap-5">
        <div
          ref={cardRef}
          style={{ background: gradient, padding: `${padding}px` }}
          className="rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="rounded-xl overflow-hidden shadow-2xl bg-[#1e1e2e]">
            <div className="flex items-center gap-2 px-4 py-3 bg-[#181825]">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-[#f38ba8]" />
                <div className="h-3 w-3 rounded-full bg-[#f9e2af]" />
                <div className="h-3 w-3 rounded-full bg-[#a6e3a1]" />
              </div>
              <span className="ml-3 text-xs text-[#9399b2] font-mono">{filename}</span>
            </div>
            <div className="p-5 overflow-x-auto">
              <pre className="text-sm leading-relaxed font-mono text-[#cdd6f4] whitespace-pre">
                <code dangerouslySetInnerHTML={{ __html: highlighted }} />
              </pre>
              <div className="sr-only">{lines.length} lines</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="glass rounded-2xl p-4 space-y-3">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Language
              </label>
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as Lang)}
                className="mt-2 w-full rounded-lg bg-muted/40 px-3 py-2 text-sm font-mono"
              >
                {LANGUAGES.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Filename
              </label>
              <input
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                className="mt-2 w-full rounded-lg bg-muted/40 px-3 py-2 text-sm font-mono"
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Padding
                </label>
                <span className="text-xs font-bold tabular-nums">{padding}px</span>
              </div>
              <input
                type="range"
                min={16}
                max={96}
                value={padding}
                onChange={(e) => setPadding(Number(e.target.value))}
                className="mt-2 w-full accent-primary"
              />
            </div>
          </div>

          <div className="glass rounded-2xl p-4">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Background
            </label>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {GRADIENTS.map((g) => (
                <button
                  key={g.name}
                  type="button"
                  onClick={() => setGradient(g.value)}
                  style={{ background: g.value }}
                  className={cn(
                    "h-12 rounded-lg ring-2 transition-all",
                    gradient === g.value
                      ? "ring-primary ring-offset-2 ring-offset-background"
                      : "ring-transparent",
                  )}
                  title={g.name}
                />
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={exportPng}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl gradient-bg px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow"
          >
            <Download className="w-4 h-4" />
            Export PNG
          </button>
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Your code
        </label>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          rows={10}
          spellCheck={false}
          className="mt-2 w-full rounded-2xl glass border-0 p-4 text-sm leading-relaxed font-mono resize-y focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>
    </div>
  );
}
