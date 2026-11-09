import en from "./en.json";

// Englische Fassung: Die deutsche Seite wird gerendert und Text für Text über das Wörterbuch übersetzt.
// Fehlt ein Eintrag, bleibt der deutsche Text stehen (z. B. Stadtteilnamen, Namen, Zahlen).
const dict = en as Record<string, string>;

/** Seiten, die es auf Englisch gibt. Rechtstexte bleiben deutsch. */
const EN_SECTIONS = new Set(["", "ueber-uns", "kontakt", "immobilien", "suchservice", "immobilienpreise-koeln", "leistung"]);

export function hasEnglish(pathname: string): boolean {
  const first = pathname.split("/")[1] ?? "";
  return EN_SECTIONS.has(first) || pathname === "/";
}

export const toEnglishPath = (dePath: string) => (dePath === "/" ? "/en/" : `/en${dePath}`);
export const toGermanPath = (enPath: string) => enPath.replace(/^\/en(?=\/|$)/, "") || "/";

const norm = (s: string) => s.replace(/\s+/g, " ").trim();

function translateText(raw: string): string {
  const key = norm(raw);
  if (!key) return raw;
  const hit = dict[key];
  if (!hit) return raw;
  const lead = raw.match(/^\s*/)?.[0] ?? "";
  const trail = raw.match(/\s*$/)?.[0] ?? "";
  return lead + hit + trail;
}

function rewriteHref(tag: string): string {
  if (/\shreflang=/.test(tag)) return tag;
  return tag.replace(/\shref="(\/[^"]*)"/, (match, href: string) => {
    if (href.startsWith("/en/") || href === "/en") return match;
    const [pathPart] = href.split(/[?#]/);
    if (!hasEnglish(pathPart || "/")) return match;
    return ` href="${toEnglishPath(href.startsWith("/#") || href.startsWith("/?") ? "/" + href.slice(1) : href)}"`;
  });
}

function translateChunk(html: string): string {
  // Text zwischen Tags
  let out = html.replace(/>([^<]+)</g, (_m, text: string) => `>${translateText(text)}<`);
  // Attribute
  out = out.replace(/(\s(?:alt|aria-label|placeholder|title|content)=")([^"]*)(")/g, (_m, a: string, v: string, b: string) => `${a}${translateText(v)}${b}`);
  // Interne Links auf die englische Fassung umbiegen
  out = out.replace(/<a\b[^>]*>/g, rewriteHref);
  return out;
}

export function translateHtml(html: string): string {
  // Skripte und Styles nicht anfassen
  const parts = html.split(/(<script\b[^>]*>[\s\S]*?<\/script>|<style\b[^>]*>[\s\S]*?<\/style>)/g);
  const body = parts.map((part, i) => (i % 2 === 1 ? part : translateChunk(part))).join("");
  return body
    .replace(/<html lang="de"/, '<html lang="en"')
    .replace('content="de_DE"', 'content="en_GB"');
}
