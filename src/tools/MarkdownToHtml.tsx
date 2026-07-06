import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";

function mdToHtml(md: string): string {
  let html = md
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    // Headings
    .replace(/^#{6}\s+(.+)$/gm, "<h6>$1</h6>")
    .replace(/^#{5}\s+(.+)$/gm, "<h5>$1</h5>")
    .replace(/^#{4}\s+(.+)$/gm, "<h4>$1</h4>")
    .replace(/^#{3}\s+(.+)$/gm, "<h3>$1</h3>")
    .replace(/^#{2}\s+(.+)$/gm, "<h2>$1</h2>")
    .replace(/^#{1}\s+(.+)$/gm, "<h1>$1</h1>")
    // Code blocks
    .replace(/```[\w]*\n([\s\S]*?)```/gm, "<pre><code>$1</code></pre>")
    // Inline code
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    // Bold + Italic
    .replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/__(.+?)__/g, "<strong>$1</strong>")
    .replace(/_(.+?)_/g, "<em>$1</em>")
    // Strikethrough
    .replace(/~~(.+?)~~/g, "<del>$1</del>")
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // Images
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" src="$2" />')
    // Horizontal rule
    .replace(/^---$/gm, "<hr />")
    // Blockquote
    .replace(/^&gt;\s+(.+)$/gm, "<blockquote>$1</blockquote>")
    // Unordered list items
    .replace(/^[\-\*]\s+(.+)$/gm, "<li>$1</li>")
    // Ordered list items
    .replace(/^\d+\.\s+(.+)$/gm, "<li>$1</li>")
    // Paragraphs: blank-line-separated blocks
    .replace(/\n{2,}/g, "\n\n");

  // Wrap consecutive <li> in <ul>
  html = html.replace(/(<li>.*<\/li>(\n|$))+/g, (m) => `<ul>${m}</ul>`);

  // Paragraphs
  html = html.split("\n\n").map((block) => {
    const b = block.trim();
    if (!b) return "";
    if (/^<(h[1-6]|ul|ol|blockquote|pre|hr)/.test(b)) return b;
    return `<p>${b.replace(/\n/g, "<br />")}</p>`;
  }).filter(Boolean).join("\n");

  return html;
}

const SAMPLE = `# Hello, Markdown!\n\nThis is a **bold** statement and this is *italic*.\n\n## Features\n\n- Headings (H1–H6)\n- **Bold** and *italic*\n- \`inline code\`\n- [Links](https://example.com)\n- Lists and blockquotes\n\n> A blockquote looks like this.\n\n\`\`\`js\nconsole.log("Hello!");\n\`\`\``;

export function MarkdownToHtml() {
  const [md, setMd] = useState(SAMPLE);
  const [tab, setTab] = useState<"html" | "preview">("preview");
  const html = mdToHtml(md);

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="md-input">Markdown</label>
          <textarea
            id="md-input"
            value={md}
            onChange={(e) => setMd(e.target.value)}
            rows={14}
            className="mt-2 w-full rounded-xl bg-muted/40 px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/40 resize-y"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex gap-2">
              {(["preview", "html"] as const).map((t) => (
                <button key={t} type="button" onClick={() => setTab(t)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all capitalize ${tab === t ? "gradient-bg text-white" : "glass hover:bg-primary/10 hover:text-primary"}`}>
                  {t === "html" ? "HTML" : "Preview"}
                </button>
              ))}
            </div>
            <CopyButton value={html} label="Copy HTML" />
          </div>
          {tab === "preview" ? (
            <div
              className="rounded-xl bg-muted/40 px-4 py-3 text-sm leading-relaxed overflow-y-auto max-h-80 prose prose-sm max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          ) : (
            <pre className="rounded-xl bg-muted/40 px-4 py-3 text-sm font-mono whitespace-pre-wrap overflow-y-auto max-h-80">{html}</pre>
          )}
        </div>
      </div>
    </div>
  );
}
