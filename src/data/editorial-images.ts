import type { Service } from "./services";

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

const interior: EditorialImage = {
  src: "/images/altbau-wohnzimmer-fischgraet.webp",
  srcSet: "/images/altbau-wohnzimmer-fischgraet.webp 1312w",
  alt: "Heller Wohnraum mit Fischgrätparkett und sorgfältig abgestimmter Einrichtung",
  position: "50% 50%",
};
const building: EditorialImage = {
  src: "/images/haus-modern-klinker.webp",
  srcSet: "/images/haus-modern-klinker.webp 1122w",
  alt: "Modernes Wohngebäude mit Klinkerfassade und großen Fenstern",
  position: "50% 50%",
};
const portfolio: EditorialImage = {
  src: "/images/fassade-balkone-klinker.webp",
  srcSet: "/images/fassade-balkone-klinker.webp 941w",
  alt: "Wohngebäude mit Balkonen und Klinkerfassade",
  position: "50% 50%",
};

// Every service has a visible lead photograph with a subject appropriate to its content.
export const serviceImages: Record<Service["slug"], EditorialImage> = {
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
  "energieausweis": editorialImages.documents,
  "fotografie-und-expose": interior,
  "home-staging": interior,
  "rundgang-360-grad": editorialImages.advice,
  "vermarktung": interior,
  "after-sales-service": editorialImages.viewing,
  "bautraeger-vertrieb": building,
  "portfolio-vertrieb": portfolio,
  "tippgeber": editorialImages.company,
};
