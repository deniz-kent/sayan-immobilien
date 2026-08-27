import { defineConfig } from "astro/config";

const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;

export default defineConfig({
  output: "static",
  base: "./",
  trailingSlash: "always",
  site: vercelHost ? `https://${vercelHost}` : "http://localhost:4322",
  vite: {
    build: {
      cssMinify: true,
    },
  },
});
