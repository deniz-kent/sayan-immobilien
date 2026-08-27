import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const objekte = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx,json}", base: "./src/content/objekte" }),
  schema: z.object({
    id: z.string(),
    status: z.enum(["aktiv", "verkauft", "neu"]),
    ort: z.string(),
    kategorie: z.string(),
    titel: z.string(),
    beschreibung: z.string(),
    flaeche: z.number(),
    zimmer: z.number(),
    preis: z.number(),
    bilder: z.array(z.string()),
    exposeUrl: z.string().url(),
    energie: z.string(),
  }),
});

export const collections = { objekte };
