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
  company: photo("sayan-persoenlich", "Candan Sayan an einem Besprechungstisch", "50% 35%"),
  viewing: photo("sayan-besichtigung", "Candan Sayan zeigt einem Paar eine Immobilie", "50% 40%"),
  rental: photo("sayan-vermietung", "Candan Sayan in einem hellen Innenraum am Fenster", "50% 35%"),
  advice: photo("sayan-beratung", "Candan Sayan mit einem Tablet in einer Wohnung", "55% 40%"),
  documents: photo("sayan-unterlagen", "Candan Sayan mit Unterlagen am Besprechungstisch", "50% 40%"),
  contact: photo("sayan-kontakt", "Candan Sayan in einem hellen Wohnraum", "55% 35%"),
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
