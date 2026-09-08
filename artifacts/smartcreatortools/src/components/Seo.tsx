import { useEffect } from "react";
import {
  absoluteUrl,
  normalizeSeoTitle,
  OG_IMAGE,
  SITE_NAME,
  SITE_URL,
  trimSeoDescription,
  TWITTER_HANDLE,
} from "@/seo/metadata";

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface SeoProps {
  title: string;
  description: string;
  keywords?: string[];
  canonicalPath?: string;
  ogType?: "website" | "article";
  jsonLd?: Record<string, unknown>;
  breadcrumbs?: BreadcrumbItem[];
  noIndex?: boolean;
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

const setLink = (rel: string, href: string, extra?: Record<string, string>) => {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
  if (extra) {
    Object.entries(extra).forEach(([k, v]) => el!.setAttribute(k, v));
  }
};

const upsertScript = (id: string, content: Record<string, unknown>) => {
  let el = document.head.querySelector<HTMLScriptElement>(`script[data-seo-id="${id}"]`);
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.dataset.seoId = id;
    document.head.appendChild(el);
  }
  el.text = JSON.stringify(content);
  return el;
};

const removeScript = (id: string) => {
  const el = document.head.querySelector(`script[data-seo-id="${id}"]`);
  if (el) el.remove();
};

export function Seo({
  title,
  description,
  keywords,
  canonicalPath,
  ogType = "website",
  jsonLd,
  breadcrumbs,
  noIndex = false,
}: SeoProps) {
  useEffect(() => {
    const normalizedTitle = normalizeSeoTitle(title);
    const trimmedDesc = trimSeoDescription(description);
    const canonical =
      canonicalPath !== undefined
        ? absoluteUrl(canonicalPath)
        : absoluteUrl(window.location.pathname);
    const pageUrl = canonical;

    document.title = normalizedTitle;

    setMeta("description", trimmedDesc);
    setMeta("keywords", keywords?.join(", ") ?? "");
    setMeta("author", SITE_NAME);
    setMeta("robots", noIndex ? "noindex, nofollow" : "index, follow");
    setMeta("googlebot", noIndex ? "noindex, nofollow" : "index, follow");

    setMeta("og:title", normalizedTitle, "property");
    setMeta("og:description", trimmedDesc, "property");
    setMeta("og:type", ogType, "property");
    setMeta("og:url", pageUrl, "property");
    setMeta("og:site_name", SITE_NAME, "property");
    setMeta("og:image", OG_IMAGE, "property");
    setMeta("og:image:width", "1200", "property");
    setMeta("og:image:height", "630", "property");
    setMeta("og:image:alt", `${SITE_NAME} — Free Online Tools`, "property");
    setMeta("og:locale", "en_US", "property");

    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:site", TWITTER_HANDLE);
    setMeta("twitter:creator", TWITTER_HANDLE);
    setMeta("twitter:title", normalizedTitle);
    setMeta("twitter:description", trimmedDesc);
    setMeta("twitter:image", OG_IMAGE);
    setMeta("twitter:image:alt", `${SITE_NAME} — Free Online Tools`);

    setLink("canonical", canonical);

    if (jsonLd) {
      upsertScript("page-jsonld", jsonLd);
    } else {
      removeScript("page-jsonld");
    }

    if (breadcrumbs && breadcrumbs.length > 0) {
      const breadcrumbLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
          ...breadcrumbs.map((crumb, i) => ({
            "@type": "ListItem",
            position: i + 2,
            name: crumb.name,
            item: SITE_URL + crumb.href,
          })),
        ],
      };
      upsertScript("breadcrumb-jsonld", breadcrumbLd);
    } else {
      removeScript("breadcrumb-jsonld");
    }

    return () => {
      removeScript("page-jsonld");
      removeScript("breadcrumb-jsonld");
    };
  }, [title, description, keywords?.join(","), canonicalPath, ogType, JSON.stringify(jsonLd), JSON.stringify(breadcrumbs), noIndex]);

  return null;
}
