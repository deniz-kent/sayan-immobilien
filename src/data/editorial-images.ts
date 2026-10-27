export type EditorialImage = {
  src: string;
  srcSet: string;
  alt: string;
  position: string;
};

const photo = (name: string, alt: string, position = "50% 40%"): EditorialImage => ({
  src: `/images/${name}-1440.webp`,
  srcSet: `/images/${name}-640.webp 640w, /images/${name}-1440.webp 1440w`,
  alt,
  position,
});

export const editorialImages = {
  company: photo("sayan-persoenlich", "Persönliche Beratung am Besprechungstisch", "50% 35%"),
  viewing: photo("sayan-besichtigung", "Unser Team zeigt einem Paar eine Immobilie", "50% 40%"),
  rental: photo("sayan-vermietung", "Unser Immobilienberater in einem hellen Innenraum am Fenster", "50% 35%"),
  advice: photo("sayan-beratung", "Unser Immobilienberater mit einem Tablet in einer Wohnung", "55% 40%"),
  documents: photo("sayan-unterlagen", "Unser Immobilienberater mit Unterlagen am Besprechungstisch", "50% 40%"),
  contact: photo("sayan-kontakt", "Unser Immobilienberater in einem hellen Wohnraum", "55% 35%"),
};

// Only use a photograph where its subject supports the service being explained.
export const serviceImages: Partial<Record<string, EditorialImage>> = {
  "immobilienverkauf": editorialImages.viewing,
  "immobilienvermietung": editorialImages.rental,
  "wertermittlung": editorialImages.advice,
  "marktpreisanalyse": editorialImages.advice,
  "verkaufsunterlagen": editorialImages.documents,
  "diskrete-vermarktung": editorialImages.advice,
  "besichtigungen": editorialImages.viewing,
  "interessentenpruefung": editorialImages.documents,
  "verkaufsabwicklung": editorialImages.documents,
  "finanzierung": editorialImages.documents,
};
