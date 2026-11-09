import { defineMiddleware } from "astro:middleware";
import { translateHtml } from "./i18n/translate";

export const onRequest = defineMiddleware(async (context, next) => {
  const isEnglish = context.url.pathname === "/en" || context.url.pathname.startsWith("/en/");
  if (isEnglish) context.locals.lang = "en";
  const response = await next();
  if (!isEnglish) return response;
  const type = response.headers.get("content-type") ?? "";
  if (!type.includes("text/html")) return response;
  const html = translateHtml(await response.text());
  const headers = new Headers(response.headers);
  headers.delete("content-length");
  return new Response(html, { status: response.status, statusText: response.statusText, headers });
});
