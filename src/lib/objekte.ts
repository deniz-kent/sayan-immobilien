import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";

export async function getObjekte() {
  // Späterer Austauschpunkt für onOffice-API oder OpenImmo-Import plus Deploy-Hook.
  const entries = (await getCollection("objekte")) as CollectionEntry<"objekte">[];
  return entries.filter((entry) => entry.data.id !== "platzhalter").map((entry) => entry.data);
}
