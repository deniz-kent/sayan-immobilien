export interface PropertyImage {
  url: string;
  title: string;
  category: string;
}

export interface Property {
  id: string;
  reference: string;
  type: "kaufen" | "mieten";
  category: string;
  title: string;
  location: string;
  price: string;
  status: "Verfügbar" | "Reserviert";
  rooms: string;
  area: string;
  facts: Array<[string, string]>;
  energy: Array<[string, string]>;
  description: string;
  equipment: string;
  locationDescription: string;
  otherInformation: string;
  images: PropertyImage[];
}

export interface FieldDefinition {
  label?: string;
  permittedvalues?: Record<string, unknown> | null;
}

export type FieldDefinitions = Record<string, FieldDefinition>;

// Public field allowlist. No owners, tenants, internal notes or street addresses.
export const propertyFields = [
  "Id", "status", "veroeffentlichen", "verkauft", "reserviert", "referenz",
  "objektnr_extern", "objekttitel", "objektart", "objekttyp", "vermarktungsart",
  "ort", "plz", "kaufpreis", "kaltmiete", "nettokaltmiete", "warmmiete",
  "nebenkosten", "kaution", "aussen_courtage", "preisAufAnfrage", "preis_auf_anfrage",
  "wohnflaeche", "nutzflaeche", "gesamtflaeche", "grundstuecksflaeche", "anzahl_zimmer",
  "anzahl_schlafzimmer", "anzahl_badezimmer", "baujahr", "zustand", "verfuegbar_ab",
  "etage", "objektbeschreibung", "ausstatt_beschr", "lage", "sonstige_angaben",
  "energieausweistyp", "energieausweisgueltigbis", "energieausweis_gueltig_bis",
  "energieverbrauchskennwert", "endenergiebedarf", "energieeffizienzklasse",
  "wesentlicherenergietraeger", "wesentlicher_energietraeger", "heizungsart",
] as const;

// Astro still escapes every output. This makes CRM rich text readable as plain text.
export function plainText(value: unknown): string {
  if (typeof value !== "string" && typeof value !== "number") return "";
  const entities: Record<string, string> = {
    amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
    auml: "ä", ouml: "ö", uuml: "ü", Auml: "Ä", Ouml: "Ö", Uuml: "Ü", szlig: "ß",
    ndash: "–", mdash: "—", euro: "€",
  };
  return String(value).slice(0, 50000)
    .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, "")
    .replace(/<br\s*\/?\s*>|<\/(?:p|div|li|h[1-6])>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, entity: string) => {
      if (!entity.startsWith("#")) return entities[entity] ?? match;
      const code = entity[1].toLowerCase() === "x" ? parseInt(entity.slice(2), 16) : Number(entity.slice(1));
      return code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : "";
    })
    .replace(/\r/g, "").replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n").trim();
}

function enabled(value: unknown): boolean {
  return value === true || value === 1 || value === "1";
}

function number(value: unknown): number | undefined {
  if ((typeof value !== "number" && typeof value !== "string") || String(value).trim() === "") return;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
}

function quantity(value: unknown, unit = ""): string {
  const parsed = number(value);
  return parsed === undefined ? "" : `${new Intl.NumberFormat("de-DE", { maximumFractionDigits: 2 }).format(parsed)}${unit}`;
}

function firstPositive(...values: unknown[]): number | undefined {
  return values.map(number).find((value) => value !== undefined);
}

function money(value: unknown): string {
  const parsed = number(value);
  return parsed === undefined ? "" : new Intl.NumberFormat("de-DE", {
    style: "currency", currency: "EUR", maximumFractionDigits: 0,
  }).format(parsed);
}

function label(field: string, value: unknown, fields: FieldDefinitions): string {
  if (Array.isArray(value)) return value.map((item) => label(field, item, fields)).filter(Boolean).join(", ");
  const raw = plainText(value);
  const translated = fields[field]?.permittedvalues?.[raw];
  return plainText(translated) || raw.replace(/_/g, " ");
}

export function mapProperty(id: unknown, raw: Record<string, unknown>, fields: FieldDefinitions): Property | null {
  const safeId = plainText(id);
  if (!/^[1-9]\d{0,11}$/.test(safeId) || !enabled(raw.veroeffentlichen) || number(raw.status) !== 1 || enabled(raw.verkauft) || enabled(raw.referenz)) return null;
  const marketing = Array.isArray(raw.vermarktungsart) ? raw.vermarktungsart[0] : raw.vermarktungsart;
  const type = marketing === "kauf" ? "kaufen" : marketing === "miete" || marketing === "pacht" ? "mieten" : null;
  if (!type) return null;
  const category = label("objektart", raw.objektart, fields) || "Immobilie";
  const location = [plainText(raw.plz), plainText(raw.ort)].filter(Boolean).join(" ");
  const askPrice = enabled(raw.preisAufAnfrage) || enabled(raw.preis_auf_anfrage);
  const rent = firstPositive(raw.kaltmiete, raw.nettokaltmiete);
  const price = askPrice ? "Preis auf Anfrage" : type === "kaufen" ? money(raw.kaufpreis) : money(rent);
  const facts: Array<[string, string]> = [
    ["Objekt-Nr.", plainText(raw.objektnr_extern) || safeId],
    ["Objektart", label("objekttyp", raw.objekttyp, fields) || category],
    ["Wohnfläche", quantity(raw.wohnflaeche, " m²")],
    ["Nutzfläche", quantity(raw.nutzflaeche, " m²")],
    ["Gesamtfläche", quantity(raw.gesamtflaeche, " m²")],
    ["Grundstück", quantity(raw.grundstuecksflaeche, " m²")],
    ["Zimmer", quantity(raw.anzahl_zimmer)],
    ["Schlafzimmer", quantity(raw.anzahl_schlafzimmer)],
    ["Badezimmer", quantity(raw.anzahl_badezimmer)],
    ["Baujahr", plainText(raw.baujahr)],
    ["Zustand", label("zustand", raw.zustand, fields)],
    ["Verfügbar ab", plainText(raw.verfuegbar_ab)],
    ["Etage", plainText(raw.etage)],
    ["Außenprovision", plainText(raw.aussen_courtage)],
    ...(type === "mieten" ? [
      ["Kaltmiete", money(rent)],
      ["Warmmiete", money(raw.warmmiete)],
      ["Nebenkosten", money(raw.nebenkosten)],
      ["Kaution", plainText(raw.kaution)],
    ] as Array<[string, string]> : []),
  ];
  const energy: Array<[string, string]> = [
    ["Energieausweis", label("energieausweistyp", raw.energieausweistyp, fields)],
    ["Gültig bis", plainText(raw.energieausweisgueltigbis ?? raw.energieausweis_gueltig_bis)],
    ["Endenergiebedarf", quantity(raw.endenergiebedarf, " kWh/(m²·a)")],
    ["Energieverbrauch", quantity(raw.energieverbrauchskennwert, " kWh/(m²·a)")],
    ["Effizienzklasse", plainText(raw.energieeffizienzklasse)],
    ["Energieträger", label(raw.wesentlicherenergietraeger !== undefined ? "wesentlicherenergietraeger" : "wesentlicher_energietraeger", raw.wesentlicherenergietraeger ?? raw.wesentlicher_energietraeger, fields)],
    ["Heizung", label("heizungsart", raw.heizungsart, fields)],
  ];
  return {
    id: safeId, reference: plainText(raw.objektnr_extern) || safeId, type, category,
    title: plainText(raw.objekttitel) || [category, location].filter(Boolean).join(" in "),
    location,
    price: price ? `${price}${type === "mieten" && !askPrice ? " / Monat" : ""}` : "Preis auf Anfrage",
    status: enabled(raw.reserviert) ? "Reserviert" : "Verfügbar",
    rooms: quantity(raw.anzahl_zimmer),
    area: quantity(firstPositive(raw.wohnflaeche, raw.nutzflaeche, raw.gesamtflaeche, raw.grundstuecksflaeche), " m²"),
    facts: facts.filter(([, value]) => value !== ""), energy: energy.filter(([, value]) => value !== ""),
    description: plainText(raw.objektbeschreibung), equipment: plainText(raw.ausstatt_beschr),
    locationDescription: plainText(raw.lage), otherInformation: plainText(raw.sonstige_angaben), images: [],
  };
}

export function mapPropertyImage(raw: Record<string, unknown>): PropertyImage | null {
  const url = plainText(raw.url);
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:" || parsed.username || parsed.password ||
      !(parsed.hostname === "onoffice.de" || parsed.hostname.endsWith(".onoffice.de"))) return null;
  } catch { return null; }
  const category = plainText(raw.type);
  if (!["Titelbild", "Foto", "Foto_gross", "Grundriss", "Lageplan", "Epass_Skala"].includes(category)) return null;
  return { url, title: plainText(raw.title ?? raw.titel), category };
}
