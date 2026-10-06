import { z } from "zod";
import { mapProperty, mapPropertyImage, propertyFields } from "../data/properties.ts";
import type { FieldDefinitions, Property } from "../data/properties.ts";
import { callOnOffice, OnOfficeError } from "./onoffice-api.ts";

export type PropertyCatalog = { available: true; properties: Property[] } | { available: false; properties: []; errorCode: string };
let catalogCache: { expires: number; value: PropertyCatalog } | undefined;
let pendingCatalog: Promise<PropertyCatalog> | undefined;
let fieldsCache: { expires: number; value: FieldDefinitions } | undefined;

async function getFields(): Promise<FieldDefinitions> {
  if (fieldsCache && Date.now() < fieldsCache.expires) return fieldsCache.value;
  const data = await callOnOffice("fields", {
    modules: ["estate"], fieldList: [...propertyFields], labels: true, language: "DEU",
  });
  const elements = data.records.find((record) => record.id === "estate")?.elements;
  const schema = z.record(z.object({
    label: z.string().optional(),
    permittedvalues: z.preprocess((value) => Array.isArray(value) && value.length === 0 ? null : value, z.record(z.unknown()).nullable().optional()),
  }));
  const selected = Object.fromEntries(propertyFields.flatMap((field) => {
    if (!elements || Array.isArray(elements) || typeof elements[field] !== "object" || elements[field] === null) return [];
    return [[field, elements[field]]];
  }));
  const parsed = schema.safeParse(selected);
  if (!parsed.success || Object.keys(parsed.data).length === 0) throw new OnOfficeError("INVALID_FIELD_CONFIGURATION");
  fieldsCache = { expires: Date.now() + 3600000, value: parsed.data };
  return fieldsCache.value;
}

export async function fetchPublishedProperties(): Promise<Property[]> {
  const fields = await getFields();
  const dataFields = [...new Set(["Id", "status", "veroeffentlichen", "verkauft", "referenz", "vermarktungsart", ...propertyFields.filter((field) => field in fields)])];
  const properties: Property[] = [];
  const limit = 100;
  // Paginate; fail visibly instead of silently truncating a larger catalog.
  for (let offset = 0; ; offset += limit) {
    if (offset >= 5000) throw new OnOfficeError("CATALOG_LIMIT_EXCEEDED");
    const data = await callOnOffice("estate", {
      data: dataFields, listlimit: limit, listoffset: offset,
      sortby: { Id: "DESC" }, formatoutput: false,
      filter: {
        status: [{ op: "=", val: 1 }],
        veroeffentlichen: [{ op: "=", val: 1 }],
      },
    });
    for (const record of data.records) {
      if (Array.isArray(record.elements)) throw new OnOfficeError("INVALID_ESTATE");
      const property = mapProperty(record.id, record.elements, fields);
      if (property) properties.push(property);
    }
    if (data.records.length < limit) break;
  }
  for (let offset = 0; offset < properties.length; offset += 100) {
    const batch = properties.slice(offset, offset + 100);
    const byId = new Map(batch.map((property) => [property.id, property]));
    const data = await callOnOffice("estatepictures", {
      estateids: batch.map((property) => Number(property.id)),
      categories: ["Titelbild", "Foto", "Foto_gross", "Grundriss", "Lageplan", "Epass_Skala"],
      publicationSetting: "Homepage", size: "1600x1200",
    });
    for (const record of data.records) {
      const images = Array.isArray(record.elements) ? record.elements : [record.elements];
      for (const raw of images) {
        const property = byId.get(String(raw.estateid));
        const image = mapPropertyImage(raw);
        if (property && image && !property.images.some((existing) => existing.url === image.url)) property.images.push(image);
      }
    }
    for (const property of batch) property.images.sort((a, b) => Number(b.category === "Titelbild") - Number(a.category === "Titelbild"));
  }
  return properties;
}

export async function getPropertyCatalog(): Promise<PropertyCatalog> {
  if (catalogCache && Date.now() < catalogCache.expires) return catalogCache.value;
  if (pendingCatalog) return pendingCatalog;
  pendingCatalog = (async (): Promise<PropertyCatalog> => {
    try {
      const value: PropertyCatalog = { available: true, properties: await fetchPublishedProperties() };
      catalogCache = { expires: Date.now() + 60000, value };
      return value;
    } catch (error) {
      const errorCode = error instanceof OnOfficeError ? error.code : "UNEXPECTED_ERROR";
      console.error(`[onOffice] ${errorCode}`);
      const value: PropertyCatalog = { available: false, properties: [], errorCode };
      catalogCache = { expires: Date.now() + 10000, value };
      return value;
    } finally { pendingCatalog = undefined; }
  })();
  return pendingCatalog;
}

export function setPropertyCacheHeaders(headers: Headers, available: boolean) {
  headers.set("Cache-Control", available ? "public, max-age=0, must-revalidate" : "no-store");
  headers.set("CDN-Cache-Control", available ? "public, max-age=60" : "no-store");
}
