import type { APIRoute } from "astro";

// Solange die Seite nur unter *.vercel.app läuft, bleibt sie für Suchmaschinen gesperrt.
// Sobald die echte Domain (z. B. sayan-immo.de) als Production-Domain in Vercel hängt, wird sie freigegeben.
export const GET: APIRoute = ({ site }) => {
  const host = site?.host ?? "";
  const isPreviewHost = host.endsWith("vercel.app") || host.startsWith("localhost");
  const body = isPreviewHost
    ? "User-agent: *\nDisallow: /\n"
    : `User-agent: *\nAllow: /\nDisallow: /leistung/formular/\nDisallow: /widerruf/\n\nSitemap: ${new URL("/sitemap.xml", site)}\n`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
