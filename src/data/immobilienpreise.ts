// Immobilienrichtwerte Köln (amtlich), Quelle: Gutachterausschuss für Grundstückswerte in der Stadt Köln,
// über BORIS-NRW / opengeodata.nrw.de (Datensätze IRW 2026 und IRW 2025, Stichtage 01.01.2026 und 01.01.2025).
// Werte in €/m² Wohnfläche für ein normiertes Referenzobjekt der jeweiligen Lage (Baujahr, Wohnfläche siehe Felder).
// Abgerufen am 02.11.2026. Jährlich mit den neuen Richtwerten aktualisieren.
export type Richtwert = { wert: number; vorjahr: number | null; baujahr: number; flaeche: number };
export type Lage = { name: string; bezirk: string; wohnung: Richtwert | null; haus: Richtwert | null };

export const stichtag = "01.01.2026";
export const quelle = { name: "Gutachterausschuss für Grundstückswerte in der Stadt Köln, BORIS-NRW", url: "https://www.boris.nrw.de" };

export const lagen: Lage[] = [
  {
    "name": "Agnes-Viertel Ost",
    "bezirk": "Innenstadt",
    "wohnung": {
      "wert": 4760,
      "vorjahr": 4620,
      "baujahr": 1955,
      "flaeche": 60
    },
    "haus": null
  },
  {
    "name": "Altstadt Nord",
    "bezirk": "Innenstadt",
    "wohnung": {
      "wert": 5240,
      "vorjahr": 5080,
      "baujahr": 1955,
      "flaeche": 60
    },
    "haus": null
  },
  {
    "name": "Altstadt Süd",
    "bezirk": "Innenstadt",
    "wohnung": {
      "wert": 4610,
      "vorjahr": 4610,
      "baujahr": 1955,
      "flaeche": 60
    },
    "haus": null
  },
  {
    "name": "Auweiler",
    "bezirk": "Chorweiler",
    "wohnung": null,
    "haus": {
      "wert": 3700,
      "vorjahr": 3800,
      "baujahr": 1975,
      "flaeche": 100
    }
  },
  {
    "name": "Bayenthal",
    "bezirk": "Rodenkirchen",
    "wohnung": {
      "wert": 4800,
      "vorjahr": 4610,
      "baujahr": 1985,
      "flaeche": 60
    },
    "haus": null
  },
  {
    "name": "Belgisches Viertel",
    "bezirk": "Innenstadt",
    "wohnung": {
      "wert": 5550,
      "vorjahr": 5090,
      "baujahr": 1955,
      "flaeche": 60
    },
    "haus": null
  },
  {
    "name": "Bickendorf",
    "bezirk": "Ehrenfeld",
    "wohnung": null,
    "haus": {
      "wert": 5800,
      "vorjahr": 5500,
      "baujahr": 1930,
      "flaeche": 80
    }
  },
  {
    "name": "Bilderstöckchen",
    "bezirk": "Nippes",
    "wohnung": {
      "wert": 3600,
      "vorjahr": 3600,
      "baujahr": 1955,
      "flaeche": 60
    },
    "haus": {
      "wert": 4300,
      "vorjahr": 4100,
      "baujahr": 1955,
      "flaeche": 100
    }
  },
  {
    "name": "Blumenberg",
    "bezirk": "Chorweiler",
    "wohnung": null,
    "haus": {
      "wert": 3600,
      "vorjahr": 3800,
      "baujahr": 1995,
      "flaeche": 120
    }
  },
  {
    "name": "Bocklemünd / Mengenich",
    "bezirk": "Ehrenfeld",
    "wohnung": null,
    "haus": {
      "wert": 3600,
      "vorjahr": 3700,
      "baujahr": 1975,
      "flaeche": 100
    }
  },
  {
    "name": "Braunsfeld Nord",
    "bezirk": "Lindenthal",
    "wohnung": {
      "wert": 4530,
      "vorjahr": 4120,
      "baujahr": 1955,
      "flaeche": 60
    },
    "haus": null
  },
  {
    "name": "Braunsfeld Süd",
    "bezirk": "Lindenthal",
    "wohnung": {
      "wert": 5140,
      "vorjahr": 5290,
      "baujahr": 1955,
      "flaeche": 60
    },
    "haus": null
  },
  {
    "name": "Brück",
    "bezirk": "Kalk",
    "wohnung": null,
    "haus": {
      "wert": 4300,
      "vorjahr": 4300,
      "baujahr": 1955,
      "flaeche": 120
    }
  },
  {
    "name": "Buchheim",
    "bezirk": "Mülheim",
    "wohnung": {
      "wert": 3130,
      "vorjahr": 3130,
      "baujahr": 1955,
      "flaeche": 60
    },
    "haus": {
      "wert": 3400,
      "vorjahr": 3200,
      "baujahr": 1955,
      "flaeche": 120
    }
  },
  {
    "name": "Chorweiler",
    "bezirk": "Chorweiler",
    "wohnung": null,
    "haus": {
      "wert": 3400,
      "vorjahr": 3600,
      "baujahr": 1985,
      "flaeche": 140
    }
  },
  {
    "name": "Dellbrück / Holweide",
    "bezirk": "Mülheim",
    "wohnung": null,
    "haus": {
      "wert": 3500,
      "vorjahr": 3700,
      "baujahr": 1955,
      "flaeche": 140
    }
  },
  {
    "name": "Dellbrück Süd",
    "bezirk": "Mülheim",
    "wohnung": null,
    "haus": {
      "wert": 4400,
      "vorjahr": 4400,
      "baujahr": 1955,
      "flaeche": 120
    }
  },
  {
    "name": "Dellbrück West",
    "bezirk": "Mülheim",
    "wohnung": null,
    "haus": {
      "wert": 4400,
      "vorjahr": 4400,
      "baujahr": 1975,
      "flaeche": 140
    }
  },
  {
    "name": "Deutz",
    "bezirk": "Innenstadt",
    "wohnung": {
      "wert": 4780,
      "vorjahr": 4640,
      "baujahr": 1955,
      "flaeche": 60
    },
    "haus": null
  },
  {
    "name": "Dünnwald Ost",
    "bezirk": "Mülheim",
    "wohnung": null,
    "haus": {
      "wert": 4100,
      "vorjahr": 4100,
      "baujahr": 1955,
      "flaeche": 120
    }
  },
  {
    "name": "Dünnwald West",
    "bezirk": "Mülheim",
    "wohnung": null,
    "haus": {
      "wert": 3800,
      "vorjahr": 3800,
      "baujahr": 1955,
      "flaeche": 120
    }
  },
  {
    "name": "Ehrenfeld",
    "bezirk": "Ehrenfeld",
    "wohnung": {
      "wert": 4500,
      "vorjahr": 4320,
      "baujahr": 1955,
      "flaeche": 60
    },
    "haus": null
  },
  {
    "name": "Ehrenfeld Kanalstraße",
    "bezirk": "Ehrenfeld",
    "wohnung": {
      "wert": 3610,
      "vorjahr": 3280,
      "baujahr": 1975,
      "flaeche": 35
    },
    "haus": null
  },
  {
    "name": "Ehrenfeld Lukasstraße",
    "bezirk": "Ehrenfeld",
    "wohnung": {
      "wert": 4610,
      "vorjahr": 4520,
      "baujahr": 1995,
      "flaeche": 60
    },
    "haus": null
  },
  {
    "name": "Ehrenfeld Süd",
    "bezirk": "Ehrenfeld",
    "wohnung": {
      "wert": 4900,
      "vorjahr": 4630,
      "baujahr": 1995,
      "flaeche": 60
    },
    "haus": null
  },
  {
    "name": "Ehrenfeld West",
    "bezirk": "Ehrenfeld",
    "wohnung": {
      "wert": 4810,
      "vorjahr": 4450,
      "baujahr": 1995,
      "flaeche": 60
    },
    "haus": null
  },
  {
    "name": "Eigelstein",
    "bezirk": "Innenstadt",
    "wohnung": {
      "wert": 4640,
      "vorjahr": 4740,
      "baujahr": 1955,
      "flaeche": 60
    },
    "haus": null
  },
  {
    "name": "Eil / Finkenberg / Porz / Urbach / Elsdorf",
    "bezirk": "Porz",
    "wohnung": null,
    "haus": {
      "wert": 3200,
      "vorjahr": 3100,
      "baujahr": 1975,
      "flaeche": 120
    }
  },
  {
    "name": "Eil / Porz Ost / Urbach",
    "bezirk": "Porz",
    "wohnung": {
      "wert": 2830,
      "vorjahr": 2620,
      "baujahr": 1975,
      "flaeche": 60
    },
    "haus": null
  },
  {
    "name": "Esch",
    "bezirk": "Chorweiler",
    "wohnung": null,
    "haus": {
      "wert": 3700,
      "vorjahr": 3800,
      "baujahr": 1975,
      "flaeche": 100
    }
  },
  {
    "name": "Flittard",
    "bezirk": "Mülheim",
    "wohnung": null,
    "haus": {
      "wert": 4200,
      "vorjahr": 4400,
      "baujahr": 1955,
      "flaeche": 100
    }
  },
  {
    "name": "Gerichtsviertel",
    "bezirk": "Innenstadt",
    "wohnung": {
      "wert": 5390,
      "vorjahr": 5400,
      "baujahr": 1955,
      "flaeche": 60
    },
    "haus": null
  },
  {
    "name": "Godorf",
    "bezirk": "Rodenkirchen",
    "wohnung": null,
    "haus": {
      "wert": 2800,
      "vorjahr": 2900,
      "baujahr": 1975,
      "flaeche": 120
    }
  },
  {
    "name": "Grengel / Wahnheide / Wahn / Lind",
    "bezirk": "Porz",
    "wohnung": null,
    "haus": {
      "wert": 3200,
      "vorjahr": 3200,
      "baujahr": 1975,
      "flaeche": 120
    }
  },
  {
    "name": "Heimersdorf",
    "bezirk": "Chorweiler",
    "wohnung": null,
    "haus": {
      "wert": 3800,
      "vorjahr": 3600,
      "baujahr": 1955,
      "flaeche": 100
    }
  },
  {
    "name": "Holweide",
    "bezirk": "Mülheim",
    "wohnung": {
      "wert": 3040,
      "vorjahr": 3050,
      "baujahr": 1975,
      "flaeche": 60
    },
    "haus": null
  },
  {
    "name": "Humboldt / Gremberg",
    "bezirk": "Kalk",
    "wohnung": {
      "wert": 3010,
      "vorjahr": 3240,
      "baujahr": 1955,
      "flaeche": 60
    },
    "haus": null
  },
  {
    "name": "Höhenberg / Vingst",
    "bezirk": "Kalk",
    "wohnung": {
      "wert": 3200,
      "vorjahr": 2910,
      "baujahr": 1955,
      "flaeche": 60
    },
    "haus": null
  },
  {
    "name": "Höhenhaus",
    "bezirk": "Mülheim",
    "wohnung": null,
    "haus": {
      "wert": 3600,
      "vorjahr": 3600,
      "baujahr": 1955,
      "flaeche": 120
    }
  },
  {
    "name": "Höhenhaus / Dünnwald",
    "bezirk": "Mülheim",
    "wohnung": null,
    "haus": {
      "wert": 3200,
      "vorjahr": 3200,
      "baujahr": 1955,
      "flaeche": 120
    }
  },
  {
    "name": "Höhenhaus Süd",
    "bezirk": "Mülheim",
    "wohnung": null,
    "haus": {
      "wert": 3600,
      "vorjahr": 3600,
      "baujahr": 1955,
      "flaeche": 120
    }
  },
  {
    "name": "Höhenhaus West",
    "bezirk": "Mülheim",
    "wohnung": null,
    "haus": {
      "wert": 3400,
      "vorjahr": 3400,
      "baujahr": 1955,
      "flaeche": 140
    }
  },
  {
    "name": "Immendorf",
    "bezirk": "Rodenkirchen",
    "wohnung": null,
    "haus": {
      "wert": 3400,
      "vorjahr": 3400,
      "baujahr": 1955,
      "flaeche": 140
    }
  },
  {
    "name": "Junkersdorf",
    "bezirk": "Lindenthal",
    "wohnung": {
      "wert": 4280,
      "vorjahr": 4410,
      "baujahr": 1985,
      "flaeche": 60
    },
    "haus": null
  },
  {
    "name": "Junkersdorf I",
    "bezirk": "Lindenthal",
    "wohnung": null,
    "haus": {
      "wert": 6200,
      "vorjahr": 6300,
      "baujahr": 1955,
      "flaeche": 140
    }
  },
  {
    "name": "Junkersdorf II",
    "bezirk": "Lindenthal",
    "wohnung": null,
    "haus": {
      "wert": 7900,
      "vorjahr": 7700,
      "baujahr": 1930,
      "flaeche": 220
    }
  },
  {
    "name": "Junkersdorf III",
    "bezirk": "Lindenthal",
    "wohnung": null,
    "haus": {
      "wert": 9100,
      "vorjahr": 8800,
      "baujahr": 1930,
      "flaeche": 220
    }
  },
  {
    "name": "Junkersdorf IIII",
    "bezirk": "Lindenthal",
    "wohnung": null,
    "haus": {
      "wert": 9500,
      "vorjahr": 9200,
      "baujahr": 2005,
      "flaeche": 140
    }
  },
  {
    "name": "Kalk",
    "bezirk": "Kalk",
    "wohnung": {
      "wert": 3060,
      "vorjahr": 3190,
      "baujahr": 1955,
      "flaeche": 60
    },
    "haus": null
  },
  {
    "name": "Klettenberg",
    "bezirk": "Lindenthal",
    "wohnung": {
      "wert": 4770,
      "vorjahr": 4220,
      "baujahr": 1930,
      "flaeche": 60
    },
    "haus": {
      "wert": 6700,
      "vorjahr": 6800,
      "baujahr": 1930,
      "flaeche": 160
    }
  },
  {
    "name": "Langel",
    "bezirk": "Porz",
    "wohnung": null,
    "haus": {
      "wert": 3900,
      "vorjahr": 3800,
      "baujahr": 1985,
      "flaeche": 120
    }
  },
  {
    "name": "Lindenthal",
    "bezirk": "Lindenthal",
    "wohnung": {
      "wert": 5190,
      "vorjahr": 4800,
      "baujahr": 1955,
      "flaeche": 60
    },
    "haus": null
  },
  {
    "name": "Lindenthal / Braunsfeld Süd",
    "bezirk": "Lindenthal",
    "wohnung": null,
    "haus": {
      "wert": 7500,
      "vorjahr": 7100,
      "baujahr": 1955,
      "flaeche": 220
    }
  },
  {
    "name": "Lindweiler",
    "bezirk": "Chorweiler",
    "wohnung": null,
    "haus": {
      "wert": 3700,
      "vorjahr": 3600,
      "baujahr": 1975,
      "flaeche": 100
    }
  },
  {
    "name": "Longerich",
    "bezirk": "Nippes",
    "wohnung": null,
    "haus": {
      "wert": 4600,
      "vorjahr": 4200,
      "baujahr": 1955,
      "flaeche": 100
    }
  },
  {
    "name": "Lövenich",
    "bezirk": "Lindenthal",
    "wohnung": null,
    "haus": {
      "wert": 4500,
      "vorjahr": 4600,
      "baujahr": 1975,
      "flaeche": 120
    }
  },
  {
    "name": "Marienburg",
    "bezirk": "Rodenkirchen",
    "wohnung": {
      "wert": 5930,
      "vorjahr": 5920,
      "baujahr": 1975,
      "flaeche": 60
    },
    "haus": null
  },
  {
    "name": "Marienburg / Bayenthal Süd",
    "bezirk": "Rodenkirchen",
    "wohnung": null,
    "haus": {
      "wert": 11700,
      "vorjahr": 11700,
      "baujahr": 1930,
      "flaeche": 220
    }
  },
  {
    "name": "Mauenheim",
    "bezirk": "Nippes",
    "wohnung": null,
    "haus": {
      "wert": 4500,
      "vorjahr": 4300,
      "baujahr": 1930,
      "flaeche": 100
    }
  },
  {
    "name": "Mauenheim / Rennbahn-Viertel",
    "bezirk": "Nippes",
    "wohnung": {
      "wert": 3750,
      "vorjahr": 3870,
      "baujahr": 1930,
      "flaeche": 60
    },
    "haus": null
  },
  {
    "name": "Merheim",
    "bezirk": "Kalk",
    "wohnung": {
      "wert": 3230,
      "vorjahr": 3220,
      "baujahr": 1955,
      "flaeche": 60
    },
    "haus": {
      "wert": 3800,
      "vorjahr": 3800,
      "baujahr": 1955,
      "flaeche": 120
    }
  },
  {
    "name": "Meschenich",
    "bezirk": "Rodenkirchen",
    "wohnung": null,
    "haus": {
      "wert": 2800,
      "vorjahr": 2800,
      "baujahr": 1975,
      "flaeche": 120
    }
  },
  {
    "name": "Mülheim",
    "bezirk": "Mülheim",
    "wohnung": {
      "wert": 3480,
      "vorjahr": 3410,
      "baujahr": 1955,
      "flaeche": 60
    },
    "haus": null
  },
  {
    "name": "Mülheim West",
    "bezirk": "Mülheim",
    "wohnung": {
      "wert": 3810,
      "vorjahr": 3660,
      "baujahr": 1955,
      "flaeche": 60
    },
    "haus": null
  },
  {
    "name": "Müngersdorf Nord",
    "bezirk": "Lindenthal",
    "wohnung": null,
    "haus": {
      "wert": 7000,
      "vorjahr": 7400,
      "baujahr": 1985,
      "flaeche": 220
    }
  },
  {
    "name": "Neubrück",
    "bezirk": "Kalk",
    "wohnung": {
      "wert": 2590,
      "vorjahr": 2520,
      "baujahr": 1975,
      "flaeche": 60
    },
    "haus": {
      "wert": 3700,
      "vorjahr": 3500,
      "baujahr": 1975,
      "flaeche": 120
    }
  },
  {
    "name": "Neuehrenfeld",
    "bezirk": "Ehrenfeld",
    "wohnung": {
      "wert": 4840,
      "vorjahr": 4750,
      "baujahr": 1995,
      "flaeche": 60
    },
    "haus": {
      "wert": 5200,
      "vorjahr": 5000,
      "baujahr": 1930,
      "flaeche": 180
    }
  },
  {
    "name": "Niehl",
    "bezirk": "Nippes",
    "wohnung": {
      "wert": 3470,
      "vorjahr": 3470,
      "baujahr": 1975,
      "flaeche": 60
    },
    "haus": null
  },
  {
    "name": "Nippes",
    "bezirk": "Nippes",
    "wohnung": {
      "wert": 4650,
      "vorjahr": 4320,
      "baujahr": 1955,
      "flaeche": 60
    },
    "haus": null
  },
  {
    "name": "Nordpark",
    "bezirk": "Nippes",
    "wohnung": {
      "wert": 3760,
      "vorjahr": 3410,
      "baujahr": 1955,
      "flaeche": 60
    },
    "haus": null
  },
  {
    "name": "Ossendorf",
    "bezirk": "Ehrenfeld",
    "wohnung": null,
    "haus": {
      "wert": 3900,
      "vorjahr": 3900,
      "baujahr": 1975,
      "flaeche": 120
    }
  },
  {
    "name": "Ostheim",
    "bezirk": "Kalk",
    "wohnung": {
      "wert": 2520,
      "vorjahr": 2520,
      "baujahr": 1975,
      "flaeche": 35
    },
    "haus": {
      "wert": 3500,
      "vorjahr": 3400,
      "baujahr": 1955,
      "flaeche": 140
    }
  },
  {
    "name": "Pesch",
    "bezirk": "Chorweiler",
    "wohnung": {
      "wert": 2820,
      "vorjahr": 2880,
      "baujahr": 1975,
      "flaeche": 60
    },
    "haus": {
      "wert": 3900,
      "vorjahr": 3800,
      "baujahr": 1975,
      "flaeche": 100
    }
  },
  {
    "name": "Poll Nord",
    "bezirk": "Porz",
    "wohnung": null,
    "haus": {
      "wert": 4500,
      "vorjahr": 4500,
      "baujahr": 1955,
      "flaeche": 120
    }
  },
  {
    "name": "Poll Süd",
    "bezirk": "Porz",
    "wohnung": null,
    "haus": {
      "wert": 4300,
      "vorjahr": 3900,
      "baujahr": 1930,
      "flaeche": 120
    }
  },
  {
    "name": "Porz / Zündorf Nord",
    "bezirk": "Porz",
    "wohnung": {
      "wert": 2810,
      "vorjahr": 2700,
      "baujahr": 1975,
      "flaeche": 60
    },
    "haus": null
  },
  {
    "name": "Rath / Heumar",
    "bezirk": "Kalk",
    "wohnung": null,
    "haus": {
      "wert": 3700,
      "vorjahr": 3500,
      "baujahr": 1955,
      "flaeche": 120
    }
  },
  {
    "name": "Rathenau-Viertel",
    "bezirk": "Innenstadt",
    "wohnung": {
      "wert": 5010,
      "vorjahr": 4820,
      "baujahr": 1955,
      "flaeche": 60
    },
    "haus": null
  },
  {
    "name": "Rheinauhafen",
    "bezirk": "Innenstadt",
    "wohnung": {
      "wert": 10400,
      "vorjahr": 10100,
      "baujahr": 2005,
      "flaeche": 135
    },
    "haus": null
  },
  {
    "name": "Riehl Niederländer Viertel",
    "bezirk": "Nippes",
    "wohnung": {
      "wert": 3930,
      "vorjahr": 3820,
      "baujahr": 1975,
      "flaeche": 60
    },
    "haus": null
  },
  {
    "name": "Riehl Süd",
    "bezirk": "Nippes",
    "wohnung": {
      "wert": 4530,
      "vorjahr": 4410,
      "baujahr": 1955,
      "flaeche": 60
    },
    "haus": null
  },
  {
    "name": "Rodenkirchen",
    "bezirk": "Rodenkirchen",
    "wohnung": {
      "wert": 3950,
      "vorjahr": 3850,
      "baujahr": 1975,
      "flaeche": 60
    },
    "haus": null
  },
  {
    "name": "Rodenkirchen Nord",
    "bezirk": "Rodenkirchen",
    "wohnung": null,
    "haus": {
      "wert": 6000,
      "vorjahr": 6300,
      "baujahr": 1955,
      "flaeche": 140
    }
  },
  {
    "name": "Rodenkirchen Ost",
    "bezirk": "Rodenkirchen",
    "wohnung": null,
    "haus": {
      "wert": 5600,
      "vorjahr": 5900,
      "baujahr": 1955,
      "flaeche": 220
    }
  },
  {
    "name": "Rodenkirchen Süd",
    "bezirk": "Rodenkirchen",
    "wohnung": null,
    "haus": {
      "wert": 8300,
      "vorjahr": 8400,
      "baujahr": 2015,
      "flaeche": 100
    }
  },
  {
    "name": "Roggendorf / Thenhoven",
    "bezirk": "Chorweiler",
    "wohnung": null,
    "haus": {
      "wert": 3200,
      "vorjahr": 3100,
      "baujahr": 1955,
      "flaeche": 140
    }
  },
  {
    "name": "Rondorf",
    "bezirk": "Rodenkirchen",
    "wohnung": null,
    "haus": {
      "wert": 4200,
      "vorjahr": 4100,
      "baujahr": 1975,
      "flaeche": 120
    }
  },
  {
    "name": "Seeberg",
    "bezirk": "Chorweiler",
    "wohnung": null,
    "haus": {
      "wert": 4200,
      "vorjahr": 4100,
      "baujahr": 1975,
      "flaeche": 100
    }
  },
  {
    "name": "Severins-Viertel",
    "bezirk": "Innenstadt",
    "wohnung": {
      "wert": 4990,
      "vorjahr": 4750,
      "baujahr": 1955,
      "flaeche": 60
    },
    "haus": null
  },
  {
    "name": "Stammheim Nord",
    "bezirk": "Mülheim",
    "wohnung": null,
    "haus": {
      "wert": 3200,
      "vorjahr": 3200,
      "baujahr": 1955,
      "flaeche": 140
    }
  },
  {
    "name": "Stammheim Süd",
    "bezirk": "Mülheim",
    "wohnung": null,
    "haus": {
      "wert": 3500,
      "vorjahr": 3500,
      "baujahr": 1955,
      "flaeche": 120
    }
  },
  {
    "name": "Stüttgerhofsweg",
    "bezirk": "Lindenthal",
    "wohnung": {
      "wert": 3010,
      "vorjahr": 3010,
      "baujahr": 1975,
      "flaeche": 60
    },
    "haus": null
  },
  {
    "name": "Südstadt",
    "bezirk": "Innenstadt",
    "wohnung": {
      "wert": 5760,
      "vorjahr": 5430,
      "baujahr": 1900,
      "flaeche": 60
    },
    "haus": null
  },
  {
    "name": "Sülz",
    "bezirk": "Lindenthal",
    "wohnung": {
      "wert": 5250,
      "vorjahr": 5050,
      "baujahr": 1955,
      "flaeche": 60
    },
    "haus": {
      "wert": 7000,
      "vorjahr": 6600,
      "baujahr": 1955,
      "flaeche": 140
    }
  },
  {
    "name": "Sülz Justiz Viertel",
    "bezirk": "Lindenthal",
    "wohnung": {
      "wert": 3510,
      "vorjahr": 3250,
      "baujahr": 1975,
      "flaeche": 60
    },
    "haus": null
  },
  {
    "name": "Sürth",
    "bezirk": "Rodenkirchen",
    "wohnung": null,
    "haus": {
      "wert": 4700,
      "vorjahr": 4500,
      "baujahr": 1955,
      "flaeche": 140
    }
  },
  {
    "name": "Sürth / Weiß",
    "bezirk": "Rodenkirchen",
    "wohnung": {
      "wert": 4440,
      "vorjahr": 3930,
      "baujahr": 1995,
      "flaeche": 60
    },
    "haus": null
  },
  {
    "name": "Urbach Süd",
    "bezirk": "Porz",
    "wohnung": {
      "wert": 2270,
      "vorjahr": 2270,
      "baujahr": 1975,
      "flaeche": 60
    },
    "haus": null
  },
  {
    "name": "Vogelsang",
    "bezirk": "Ehrenfeld",
    "wohnung": null,
    "haus": {
      "wert": 5200,
      "vorjahr": 5500,
      "baujahr": 1930,
      "flaeche": 120
    }
  },
  {
    "name": "Volkhoven / Weiler",
    "bezirk": "Chorweiler",
    "wohnung": null,
    "haus": {
      "wert": 3500,
      "vorjahr": 3700,
      "baujahr": 1955,
      "flaeche": 140
    }
  },
  {
    "name": "Volksgarten-Viertel",
    "bezirk": "Innenstadt",
    "wohnung": {
      "wert": 5070,
      "vorjahr": 4840,
      "baujahr": 1955,
      "flaeche": 60
    },
    "haus": null
  },
  {
    "name": "Wahn / Wahnheide / Grengel",
    "bezirk": "Porz",
    "wohnung": {
      "wert": 2720,
      "vorjahr": 2870,
      "baujahr": 1975,
      "flaeche": 60
    },
    "haus": null
  },
  {
    "name": "Weiden Nord",
    "bezirk": "Lindenthal",
    "wohnung": {
      "wert": 3390,
      "vorjahr": 3200,
      "baujahr": 1975,
      "flaeche": 60
    },
    "haus": {
      "wert": 5000,
      "vorjahr": 4500,
      "baujahr": 1975,
      "flaeche": 140
    }
  },
  {
    "name": "Weiden Ost",
    "bezirk": "Lindenthal",
    "wohnung": null,
    "haus": {
      "wert": 5400,
      "vorjahr": 4900,
      "baujahr": 1995,
      "flaeche": 120
    }
  },
  {
    "name": "Weiden Süd",
    "bezirk": "Lindenthal",
    "wohnung": {
      "wert": 3090,
      "vorjahr": 3090,
      "baujahr": 1975,
      "flaeche": 100
    },
    "haus": null
  },
  {
    "name": "Weiden West",
    "bezirk": "Lindenthal",
    "wohnung": null,
    "haus": {
      "wert": 5400,
      "vorjahr": 4900,
      "baujahr": 1975,
      "flaeche": 120
    }
  },
  {
    "name": "Weidenpesch",
    "bezirk": "Nippes",
    "wohnung": {
      "wert": 3030,
      "vorjahr": 3030,
      "baujahr": 1975,
      "flaeche": 60
    },
    "haus": null
  },
  {
    "name": "Weiß",
    "bezirk": "Rodenkirchen",
    "wohnung": null,
    "haus": {
      "wert": 5900,
      "vorjahr": 5700,
      "baujahr": 1975,
      "flaeche": 100
    }
  },
  {
    "name": "Westhoven / Ensen",
    "bezirk": "Porz",
    "wohnung": {
      "wert": 2770,
      "vorjahr": 2690,
      "baujahr": 1975,
      "flaeche": 60
    },
    "haus": {
      "wert": 3900,
      "vorjahr": 3700,
      "baujahr": 1975,
      "flaeche": 120
    }
  },
  {
    "name": "Widdersdorf Alt",
    "bezirk": "Lindenthal",
    "wohnung": null,
    "haus": {
      "wert": 4800,
      "vorjahr": 4500,
      "baujahr": 1955,
      "flaeche": 120
    }
  },
  {
    "name": "Widdersdorf Neu",
    "bezirk": "Lindenthal",
    "wohnung": null,
    "haus": {
      "wert": 7200,
      "vorjahr": 6500,
      "baujahr": 2015,
      "flaeche": 120
    }
  },
  {
    "name": "Worringen Ost",
    "bezirk": "Chorweiler",
    "wohnung": null,
    "haus": {
      "wert": 3400,
      "vorjahr": 3600,
      "baujahr": 1985,
      "flaeche": 120
    }
  },
  {
    "name": "Worringen West",
    "bezirk": "Chorweiler",
    "wohnung": null,
    "haus": {
      "wert": 3400,
      "vorjahr": 3500,
      "baujahr": 1955,
      "flaeche": 100
    }
  },
  {
    "name": "Zollstock",
    "bezirk": "Rodenkirchen",
    "wohnung": {
      "wert": 4260,
      "vorjahr": 4100,
      "baujahr": 1955,
      "flaeche": 60
    },
    "haus": null
  },
  {
    "name": "Zollstock Vorgebirgspark",
    "bezirk": "Rodenkirchen",
    "wohnung": {
      "wert": 3520,
      "vorjahr": 3520,
      "baujahr": 1975,
      "flaeche": 60
    },
    "haus": null
  },
  {
    "name": "Zündorf",
    "bezirk": "Porz",
    "wohnung": {
      "wert": 3260,
      "vorjahr": 3360,
      "baujahr": 1985,
      "flaeche": 60
    },
    "haus": {
      "wert": 3600,
      "vorjahr": 3600,
      "baujahr": 1975,
      "flaeche": 120
    }
  }
];
