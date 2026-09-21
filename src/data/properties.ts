// TODO: onOffice/OnImmo-Anbindung
// Sobald der API-Zugang vorliegt, diese Datei durch einen echten Abruf ersetzen
// (z. B. in den betroffenen Seiten per fetch gegen import.meta.env.ONIMMO_API_URL).
// Bis dahin liefert dieses Array nur Platzhalter für Übersicht und Detailseiten,
// damit Layout, Routing und Kartendarstellung schon stehen.

export interface PlaceholderProperty {
  id: string;
  type: "kaufen" | "mieten";
  category: string;
}

export const properties: PlaceholderProperty[] = [
  { id: "1", type: "kaufen", category: "Haus" },
  { id: "2", type: "mieten", category: "Wohnung" },
  { id: "3", type: "kaufen", category: "Wohnung" },
  { id: "4", type: "mieten", category: "Mehrfamilienhaus" },
  { id: "5", type: "kaufen", category: "Mehrfamilienhaus" },
  { id: "6", type: "mieten", category: "Haus" },
];
