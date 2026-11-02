import type { APIRoute } from "astro";
import { services } from "../data/services";

const staticPaths = [
  "/", "/immobilien/", "/immobilienpreise-koeln/", "/leistung/", "/ueber-uns/", "/kontakt/", "/suchservice/",
  "/impressum/", "/datenschutz/", "/widerrufsbelehrung/",
];

export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL("http://localhost:4322");
  const today = new Date().toISOString().slice(0, 10);
  const urls = [...staticPaths, ...services.map((s) => `/leistung/${s.slug}/`)]
    .map((path) => `  <url><loc>${new URL(path, base)}</loc><lastmod>${today}</lastmod></url>`)
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
