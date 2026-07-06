import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";

export function MetaTagGenerator() {
  const [title, setTitle] = useState("My Awesome Page");
  const [desc, setDesc] = useState("A brief description of this page for search engines and social media.");
  const [keywords, setKeywords] = useState("keyword one, keyword two, keyword three");
  const [author, setAuthor] = useState("Salah Tools Hub");
  const [url, setUrl] = useState("https://example.com/page");
  const [image, setImage] = useState("https://example.com/og-image.jpg");
  const [twitter, setTwitter] = useState("@handle");
  const [robots, setRobots] = useState("index, follow");

  const trimDesc = desc.length > 158 ? desc.slice(0, 155) + "..." : desc;
  const trimTitle = title.length > 60 ? title.slice(0, 57) + "..." : title;

  const output = `<!-- Primary Meta Tags -->
<title>${trimTitle}</title>
<meta name="title" content="${trimTitle}" />
<meta name="description" content="${trimDesc}" />
<meta name="keywords" content="${keywords}" />
<meta name="author" content="${author}" />
<meta name="robots" content="${robots}" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content="${url}" />
<meta property="og:title" content="${trimTitle}" />
<meta property="og:description" content="${trimDesc}" />
<meta property="og:image" content="${image}" />

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="${url}" />
<meta property="twitter:title" content="${trimTitle}" />
<meta property="twitter:description" content="${trimDesc}" />
<meta property="twitter:image" content="${image}" />
<meta name="twitter:site" content="${twitter}" />

<!-- Canonical -->
<link rel="canonical" href="${url}" />`;

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-3">
        {[
          { id: "mt-title", label: "Page Title", val: title, set: setTitle, max: 60 },
          { id: "mt-url", label: "Page URL", val: url, set: setUrl },
          { id: "mt-image", label: "OG Image URL", val: image, set: setImage },
          { id: "mt-author", label: "Author", val: author, set: setAuthor },
          { id: "mt-twitter", label: "Twitter Handle", val: twitter, set: setTwitter },
          { id: "mt-robots", label: "Robots", val: robots, set: setRobots },
        ].map(({ id, label, val, set, max }) => (
          <div key={id}>
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor={id}>{label}</label>
              {max && <span className={`text-[10px] font-semibold ${val.length > max ? "text-rose-500" : "text-muted-foreground"}`}>{val.length}/{max}</span>}
            </div>
            <input id={id} value={val} onChange={(e) => set(e.target.value)}
              className="mt-1 w-full rounded-xl bg-muted/40 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
          </div>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="mt-desc">Meta Description</label>
          <span className={`text-[10px] font-semibold ${desc.length > 158 ? "text-rose-500" : "text-emerald-600"}`}>{desc.length}/158</span>
        </div>
        <textarea id="mt-desc" value={desc} onChange={(e) => setDesc(e.target.value)} rows={3}
          className="mt-1 w-full rounded-xl bg-muted/40 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-y" />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Generated HTML Meta Tags</span>
          <CopyButton value={output} label="Copy All" />
        </div>
        <pre className="w-full rounded-xl bg-muted/40 px-4 py-3 text-xs font-mono whitespace-pre-wrap overflow-x-auto max-h-72 overflow-y-auto">{output}</pre>
      </div>
    </div>
  );
}
