import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";

const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;

export default defineConfig({
  output: "static",
  adapter: vercel({ maxDuration: 60 }),
  base: "/",
  trailingSlash: "always",
  site: vercelHost ? `https://${vercelHost}` : "http://localhost:4322",
  vite: {
    build: {
      cssMinify: true,
    },
  },
});
