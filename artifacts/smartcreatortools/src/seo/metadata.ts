export const SITE_URL = "https://www.salahtoolshub.com";
export const SITE_NAME = "Salah Tools Hub";
export const TWITTER_HANDLE = "@SalahToolsHub";
export const OG_IMAGE = `${SITE_URL}/opengraph.jpg`;

const BRAND_SUFFIX = " | Salah Tools Hub";
const MAX_TITLE_LENGTH = 60;
const MAX_DESCRIPTION_LENGTH = 158;

export function normalizeSeoTitle(title: string): string {
  if (title.length <= MAX_TITLE_LENGTH) return title;

  const withoutBrand = title.replace(/\s*\|\s*Salah Tools Hub$/, "");
  const primaryTitle = withoutBrand.split(" — ")[0].split(" | ")[0].trim();
  const candidate = `${primaryTitle}${BRAND_SUFFIX}`;

  if (candidate.length <= MAX_TITLE_LENGTH) return candidate;

  const available = MAX_TITLE_LENGTH - BRAND_SUFFIX.length - 1;
  const shortened = primaryTitle
    .slice(0, available)
    .replace(/\s+\S*$/, "")
    .trimEnd();
  return `${shortened}…${BRAND_SUFFIX}`;
}

export function trimSeoDescription(description: string): string {
  return description.length > MAX_DESCRIPTION_LENGTH
    ? `${description.slice(0, MAX_DESCRIPTION_LENGTH - 3)}...`
    : description;
}

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path === "/" ? "/" : `/${path.replace(/^\/+/, "")}`}`;
}