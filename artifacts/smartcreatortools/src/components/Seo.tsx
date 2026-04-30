import { useEffect } from "react";

interface SeoProps {
  title: string;
  description: string;
  keywords?: string[];
  canonicalPath?: string;
  ogType?: "website" | "article";
  jsonLd?: Record<string, unknown>;
}

const setMeta = (name: string, content: string, attr: "name" | "property" = "name") => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const setLink = (rel: string, href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

export function Seo({
  title,
  description,
  keywords,
  canonicalPath,
  ogType = "website",
  jsonLd,
}: SeoProps) {
  useEffect(() => {
    const trimmedDesc = description.length > 158 ? description.slice(0, 155) + "..." : description;
    document.title = title;
    setMeta("description", trimmedDesc);
    if (keywords && keywords.length) setMeta("keywords", keywords.join(", "));
    setMeta("og:title", title, "property");
    setMeta("og:description", trimmedDesc, "property");
    setMeta("og:type", ogType, "property");
    setMeta("og:site_name", "SmartCreatorTools", "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", trimmedDesc);

    const url = window.location.origin + window.location.pathname;
    setMeta("og:url", url, "property");
    if (canonicalPath !== undefined) {
      setLink("canonical", window.location.origin + canonicalPath);
    } else {
      setLink("canonical", url);
    }

    let scriptEl: HTMLScriptElement | null = null;
    if (jsonLd) {
      scriptEl = document.createElement("script");
      scriptEl.type = "application/ld+json";
      scriptEl.text = JSON.stringify(jsonLd);
      scriptEl.dataset.seo = "true";
      document.head.appendChild(scriptEl);
    }

    return () => {
      if (scriptEl && scriptEl.parentNode) {
        scriptEl.parentNode.removeChild(scriptEl);
      }
    };
  }, [title, description, keywords?.join(","), canonicalPath, ogType, JSON.stringify(jsonLd)]);

  return null;
}
