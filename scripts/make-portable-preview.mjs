import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const distDir = path.resolve("dist");
const pages = [
  ["index.html", "sayan-testseite.html"],
  ["leistung/index.html", "sayan-leistung.html"],
  ["leistung/formular/index.html", "sayan-formular.html"],
  ["kontakt/index.html", "sayan-kontakt.html"],
  ["impressum/index.html", "sayan-impressum.html"],
  ["datenschutz/index.html", "sayan-datenschutz.html"],
  ["widerrufsbelehrung/index.html", "sayan-widerrufsbelehrung.html"],
  ["widerruf/index.html", "sayan-widerruf.html"],
  ["bald/index.html", "sayan-bald.html"],
];

const portableLinks = {
  "/leistung/": "sayan-leistung.html",
  "/leistung/formular/": "sayan-formular.html",
  "/kontakt/": "sayan-kontakt.html",
  "/impressum/": "sayan-impressum.html",
  "/datenschutz/": "sayan-datenschutz.html",
  "/widerrufsbelehrung/": "sayan-widerrufsbelehrung.html",
  "/widerruf/": "sayan-widerruf.html",
  "/bald/": "sayan-bald.html",
  "/": "sayan-testseite.html",
};

for (const [sourceName, outputName] of pages) {
const sourcePath = path.join(distDir, sourceName);
const outputPath = path.join(distDir, outputName);
let html = await readFile(sourcePath, "utf8");

const stylesheetPattern = /<link rel="stylesheet" href="([^"]+)">/g;
const stylesheets = [...html.matchAll(stylesheetPattern)];

for (const match of stylesheets) {
  const assetPath = match[1].replace(/^\/\.\//, "").replace(/^\//, "");
  let css = await readFile(path.join(distDir, assetPath), "utf8");

  const fontPattern = /url\((['"]?)(\/[^)'"?]+\.(?:woff2?|ttf))\1\)/g;
  const fontMatches = [...css.matchAll(fontPattern)];

  for (const fontMatch of fontMatches) {
    const fontPath = fontMatch[2].replace(/^\//, "");
    const bytes = await readFile(path.join(distDir, fontPath));
    const extension = path.extname(fontPath);
    const mime = extension === ".woff2" ? "font/woff2" : extension === ".woff" ? "font/woff" : "font/ttf";
    css = css.replace(fontMatch[0], `url(data:${mime};base64,${bytes.toString("base64")})`);
  }

  html = html.replace(match[0], `<style>${css}</style>`);
}

html = html.replace(/<link rel="icon"[^>]*>/, "");
for (const [webPath, portablePath] of Object.entries(portableLinks)) {
  html = html.replaceAll(`href="${webPath}"`, `href="${portablePath}"`);
  html = html.replaceAll(`href="${webPath}#`, `href="${portablePath}#`);
  html = html.replaceAll(`href="${webPath}?`, `href="${portablePath}?`);
}
await writeFile(outputPath, html, "utf8");
console.log(outputPath);
}
