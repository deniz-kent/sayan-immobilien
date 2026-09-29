export type Service = {
  slug: string;
  title: string;
  group: "Eigentümer" | "Vermarktung" | "Abschluss" | "Weitere Leistungen";
  summary: string;
  intro: string;
  details: string[];
  points: string[];
  related: string[];
};

export const services: Service[] = [
  {
    slug: "immobilienverkauf",
    title: "Immobilie verkaufen",
    group: "Eigentümer",
    summary: "Von der ersten Besichtigung bis zur Übergabe.",
    intro: "Ein Immobilienverkauf verlangt Zeit, Marktkenntnis und eine gute Vorbereitung. Wir übernehmen die Vermittlung und stimmen jeden wichtigen Schritt mit Ihnen ab.",
    details: [
      "Zuerst sehen wir uns Ihre Immobilie an. Wir prüfen die Unterlagen, besprechen den möglichen Angebotspreis und legen gemeinsam fest, wie das Objekt angeboten wird.",
      "Danach kümmern wir uns um die Präsentation, beantworten Anfragen, führen Besichtigungen und begleiten die Verhandlungen. Auch beim Notartermin und bei der Übergabe sind wir für Sie da.",
    ],
    points: ["Bewertung und Preisfindung", "Exposé und Vermarktung", "Besichtigungen und Interessentenprüfung", "Verhandlung, Notartermin und Übergabe"],
    related: ["wertermittlung", "vermarktung", "verkaufsabwicklung"],
  },
  {
    slug: "immobilienvermietung",
    title: "Immobilie vermieten",
    group: "Eigentümer",
    summary: "Mieter finden, prüfen und die Wohnung übergeben.",
    intro: "Wir kümmern uns um die Vermietung Ihrer Wohn- oder Gewerbeimmobilie – von den Fotos bis zum Mietvertrag und zur Übergabe.",
    details: [
      "Wir erstellen das Exposé, veröffentlichen das Angebot auf passenden Kanälen und berücksichtigen vorgemerkte Interessenten aus unserer Kartei. Anfragen und Besichtigungen koordinieren wir für Sie.",
      "Vor einer Entscheidung prüfen wir die Interessenten. Anschließend unterstützen wir bei Mietvertrag, Energieausweis und Wohnungsübergabe. Auf Wunsch helfen wir auch bei Handwerkerfragen oder der Mietverwaltung.",
    ],
    points: ["Fotografie und Exposé", "Inserate und Besichtigungen", "Bonitätsprüfung", "Mietvertrag, Übergabe und Abnahme"],
    related: ["fotografie-und-expose", "besichtigungen", "interessentenpruefung"],
  },
  {
    slug: "wertermittlung",
    title: "Immobilienbewertung",
    group: "Eigentümer",
    summary: "Ein realistischer Wert als Grundlage für den Verkauf.",
    intro: "Wer verkaufen möchte, muss wissen, was die eigene Immobilie am Markt wert ist. Dafür reicht ein Blick auf den Quadratmeterpreis nicht aus.",
    details: [
      "Wir sehen uns Lage, Zustand, Ausstattung und Unterlagen an. Auch die aktuelle Nachfrage und vergleichbare Immobilien fließen in unsere Einschätzung ein.",
      "Die Online-Bewertung bietet einen ersten Einstieg. Über den Angebotspreis für die Vermarktung sprechen wir erst nach einer persönlichen Prüfung des Objekts.",
    ],
    points: ["Immobilie und Unterlagen prüfen", "Lage und Nachfrage berücksichtigen", "Angebotspreis gemeinsam festlegen"],
    related: ["marktpreisanalyse", "immobilienverkauf"],
  },
  {
    slug: "marktpreisanalyse",
    title: "Marktpreisanalyse",
    group: "Eigentümer",
    summary: "Den Angebotspreis mit dem Markt abgleichen.",
    intro: "Ein zu hoher Startpreis kann den Verkauf verzögern. Ein zu niedriger Preis verschenkt möglicherweise Geld. Deshalb betrachten wir Ihre Immobilie im konkreten Marktumfeld.",
    details: [
      "Wir vergleichen ähnliche Angebote, prüfen Nachfrage, Lage und Besonderheiten Ihrer Immobilie. Daraus leiten wir eine Preisempfehlung ab, die wir mit Ihnen besprechen.",
      "Die Entscheidung über den Angebotspreis treffen wir gemeinsam. Wenn sich die Marktlage während der Vermarktung verändert, sprechen wir auch darüber offen mit Ihnen.",
    ],
    points: ["Vergleichbare Immobilien ansehen", "Lokale Nachfrage einordnen", "Preisempfehlung mit Ihnen besprechen"],
    related: ["wertermittlung", "vermarktung"],
  },
  {
    slug: "verkaufsunterlagen",
    title: "Verkaufsunterlagen",
    group: "Eigentümer",
    summary: "Die nötigen Dokumente rechtzeitig zusammenstellen.",
    intro: "Fehlende Unterlagen kosten Zeit – oft gerade dann, wenn ein Käufer bereits gefunden ist. Wir klären frühzeitig, was für Ihre Immobilie benötigt wird.",
    details: [
      "Je nach Objekt gehören dazu beispielsweise Grundbuchauszug, Bauunterlagen, Grundrisse, Flächenangaben und Energieausweis. Bei Eigentumswohnungen kommen Unterlagen der Gemeinschaft hinzu.",
      "Wir prüfen mit Ihnen, was vorhanden ist und welche Dokumente noch beschafft werden müssen. So können Interessenten und finanzierende Banken die Immobilie besser beurteilen.",
    ],
    points: ["Vorhandene Unterlagen sichten", "Fehlende Dokumente benennen", "Angaben für Exposé und Verkauf abgleichen"],
    related: ["energieausweis", "fotografie-und-expose", "verkaufsabwicklung"],
  },
  {
    slug: "energieausweis",
    title: "Energieausweis",
    group: "Eigentümer",
    summary: "Energiedaten für Verkauf oder Vermietung vorbereiten.",
    intro: "Beim Verkauf oder bei der Vermietung gehört der Energieausweis zu den wichtigen Objektunterlagen. Wir prüfen, ob ein gültiger Ausweis vorliegt und kümmern uns bei Bedarf um die Erstellung.",
    details: [
      "Für Inserat und Exposé benötigen wir die Angaben aus dem Energieausweis. Welche Daten im Einzelfall erforderlich sind, hängt vom Gebäude und vom vorhandenen Ausweis ab.",
      "Wir besprechen mit Ihnen frühzeitig, was vorhanden ist. So fehlen die Angaben nicht erst, wenn Besichtigungstermine anstehen.",
    ],
    points: ["Vorhandenen Ausweis prüfen", "Fehlende Erstellung organisieren", "Energiedaten für die Vermarktung übernehmen"],
    related: ["verkaufsunterlagen", "immobilienvermietung"],
  },
  {
    slug: "fotografie-und-expose",
    title: "Fotografie und Exposé",
    group: "Vermarktung",
    summary: "Ihre Immobilie klar und ansprechend zeigen.",
    intro: "Die meisten Interessenten sehen zunächst Bilder und Eckdaten. Deshalb achten wir auf helle, aussagekräftige Fotos und ein Exposé, das die Immobilie verständlich beschreibt.",
    details: [
      "Nach der Besichtigung vereinbaren wir einen Fototermin. Wir berücksichtigen Licht, Räume und die Besonderheiten des Objekts. Grundrisse und die wesentlichen Angaben bereiten wir für Interessenten auf.",
      "Das Exposé soll neugierig machen, aber auch Fragen beantworten. Wir stimmen die Darstellung und die Veröffentlichung mit Ihnen ab.",
    ],
    points: ["Professionelle Innen- und Außenaufnahmen", "Grundrisse und Objektdaten aufbereiten", "Individuelles Exposé erstellen"],
    related: ["home-staging", "rundgang-360-grad", "vermarktung"],
  },
  {
    slug: "home-staging",
    title: "Home Staging",
    group: "Vermarktung",
    summary: "Räume für Fotos und Besichtigungen vorbereiten.",
    intro: "Nicht jede Immobilie braucht eine neue Einrichtung. Oft helfen schon kleine Veränderungen, damit Räume auf Fotos und bei Besichtigungen besser wirken.",
    details: [
      "Möbel, Accessoires, Licht und freie Flächen beeinflussen den ersten Eindruck. Wir sehen uns gemeinsam an, ob eine optische Auffrischung für Ihr Objekt sinnvoll ist.",
      "Wenn Home Staging passt, stimmen wir Art und Umfang mit Ihnen ab. Es ist eine mögliche Maßnahme der Vermarktung, kein Automatismus.",
    ],
    points: ["Räume und ersten Eindruck prüfen", "Sinnvolle Maßnahmen besprechen", "Objekt für Aufnahmen und Termine vorbereiten"],
    related: ["fotografie-und-expose", "besichtigungen"],
  },
  {
    slug: "rundgang-360-grad",
    title: "360-Grad-Besichtigung",
    group: "Vermarktung",
    summary: "Ein erster Rundgang, bevor jemand vor Ort ist.",
    intro: "Bei passenden Immobilien ermöglichen wir Interessenten einen digitalen Rundgang. So können sie sich vor einem Termin einen besseren Eindruck von den Räumen verschaffen.",
    details: [
      "Die Räume werden an mehreren Standpunkten aufgenommen und zu einer begehbaren Ansicht zusammengesetzt. Ergänzend können Fotos oder Videos eingesetzt werden.",
      "Der Zugang zur Tour kann geschützt und auf freigegebene Interessenten beschränkt werden. Ob ein Rundgang für Ihre Immobilie sinnvoll ist, entscheiden wir mit Ihnen.",
    ],
    points: ["Immobilie digital erfassbar machen", "Interessenten vorselektieren", "Zugang bei Bedarf beschränken"],
    related: ["fotografie-und-expose", "besichtigungen", "diskrete-vermarktung"],
  },
  {
    slug: "vermarktung",
    title: "Immobilienvermarktung",
    group: "Vermarktung",
    summary: "Die passenden Menschen über die passenden Kanäle erreichen.",
    intro: "Eine Wohnung, ein Gewerbeobjekt und ein Bauprojekt werden nicht auf die gleiche Weise angeboten. Wir wählen die Maßnahmen nach Objekt und Zielgruppe aus.",
    details: [
      "Dazu gehören Exposé und Bilder, Immobilienportale, regionale Medien und unsere Interessentenkartei. Wo es sinnvoll ist, kommen weitere Werbemittel hinzu.",
      "Wir besprechen den Vermarktungsplan mit Ihnen. Wenn Sie keine öffentliche Werbung möchten, prüfen wir eine diskrete Vermittlung.",
    ],
    points: ["Zielgruppe und Kanäle festlegen", "Anzeigen und Exposé vorbereiten", "Resonanz und Anfragen begleiten"],
    related: ["fotografie-und-expose", "diskrete-vermarktung", "immobilienverkauf"],
  },
  {
    slug: "diskrete-vermarktung",
    title: "Diskrete Vermarktung",
    group: "Vermarktung",
    summary: "Verkaufen, ohne die Absicht öffentlich zu machen.",
    intro: "Sie möchten keine öffentlichen Anzeigen oder Bilder Ihrer Immobilie? Dann sprechen wir ausgewählte Interessenten direkt an.",
    details: [
      "Grundlage dafür ist unsere über Jahre gewachsene Interessentenkartei und unser regionales Netzwerk. Informationen geben wir gezielt weiter und besprechen mit Ihnen, was potenzielle Käufer erfahren dürfen.",
      "Diskretion kann bei Wohn-, Gewerbe- und Anlageimmobilien wichtig sein. Sie bestimmen mit, wie sichtbar Ihr Verkaufsvorhaben sein soll.",
    ],
    points: ["Keine öffentlichen Objektbilder nötig", "Ausgewählte Interessenten ansprechen", "Informationen kontrolliert weitergeben"],
    related: ["vermarktung", "interessentenpruefung"],
  },
  {
    slug: "besichtigungen",
    title: "Besichtigungen",
    group: "Vermarktung",
    summary: "Termine mit gut vorbereiteten Interessenten.",
    intro: "Nicht jede Anfrage muss sofort zu einem Vor-Ort-Termin führen. Wir klären wichtige Fragen vorher und organisieren Besichtigungen mit Interessenten, für die das Objekt infrage kommt.",
    details: [
      "Fotos, Exposé und gegebenenfalls ein 360-Grad-Rundgang helfen bei der Vorbereitung. Bei der Besichtigung zeigen wir die Immobilie und beantworten Fragen zu Lage, Ausstattung und Ablauf.",
      "Je nach Objekt kommen Einzeltermine, ein Open House oder eine weitere Besichtigung mit den entscheidenden Personen infrage. Wir stimmen die Termine mit Ihnen ab.",
    ],
    points: ["Anfragen vorab einordnen", "Einzeltermine oder Open House planen", "Interessenten durch das Objekt führen"],
    related: ["rundgang-360-grad", "interessentenpruefung"],
  },
  {
    slug: "interessentenpruefung",
    title: "Interessentenprüfung",
    group: "Abschluss",
    summary: "Vor einer Zusage die wichtigen Fragen klären.",
    intro: "Ein guter Eindruck allein reicht bei Verkauf oder Vermietung nicht. Wir prüfen, ob das Vorhaben des Interessenten zur Immobilie passt und wie die Finanzierung beziehungsweise Bonität aussieht.",
    details: [
      "Bei Kaufinteressenten klären wir die Finanzierungsseite, bevor ein Notartermin vorbereitet wird. Bei Mietinteressenten gehört die Bonitätsprüfung zur Auswahl.",
      "Sie treffen die Entscheidung, an wen Sie verkaufen oder vermieten. Wir stellen Ihnen die Informationen für diese Entscheidung zusammen und besprechen sie mit Ihnen.",
    ],
    points: ["Ernsthafte Interessenten erkennen", "Finanzierung oder Bonität prüfen", "Eigentümer bei der Auswahl unterstützen"],
    related: ["besichtigungen", "verkaufsabwicklung", "immobilienvermietung"],
  },
  {
    slug: "verkaufsabwicklung",
    title: "Verhandlung und Notartermin",
    group: "Abschluss",
    summary: "Den Verkauf bis zur Beurkundung begleiten.",
    intro: "Wenn ein Käufer gefunden ist, geht die Arbeit weiter. Wir führen die Verhandlungen, klären offene Fragen und koordinieren die nächsten Schritte bis zum Notartermin.",
    details: [
      "Wir prüfen die Finanzierungszusage und stimmen die für den Kaufvertragsentwurf nötigen Angaben mit den Beteiligten und dem Notariat ab. Bei mehreren Interessenten unterstützen wir Sie bei der Auswahl.",
      "Wir begleiten Sie zum Notartermin und bleiben auch danach für Fragen zur Abwicklung erreichbar.",
    ],
    points: ["Verhandlungen führen", "Finanzierungszusage prüfen", "Kaufvertragsentwurf und Notartermin koordinieren"],
    related: ["interessentenpruefung", "after-sales-service"],
  },
  {
    slug: "after-sales-service",
    title: "Übergabe und After-Sales-Service",
    group: "Abschluss",
    summary: "Auch nach dem Vertrag bleiben wir ansprechbar.",
    intro: "Mit der Unterschrift ist nicht jede Frage erledigt. Auf Wunsch begleiten wir die Schlüssel- oder Wohnungsübergabe und halten den Zustand in einem Protokoll fest.",
    details: [
      "Wir unterstützen bei Fragen zur Vertragsabwicklung und können Kontakte zu bewährten Handwerkern, Umzugsunternehmen oder anderen Fachleuten aus der Region vermitteln.",
      "Bei einer Vermietung gehören auf Wunsch auch die Wohnungsübergabe beim Einzug und die Abnahme beim Auszug zu unserer Betreuung.",
    ],
    points: ["Übergabetermin begleiten", "Übergabeprotokoll erstellen", "Kontakte für die Zeit danach vermitteln"],
    related: ["verkaufsabwicklung", "immobilienvermietung"],
  },
  {
    slug: "bautraeger-vertrieb",
    title: "Bauträgervertrieb",
    group: "Weitere Leistungen",
    summary: "Vermarktung und Verkauf für Bauprojekte.",
    intro: "Für Bauträger entwickeln wir ein Vermarktungskonzept, das zum Projekt und zum lokalen Markt passt. Am besten sprechen wir bereits in der Planungsphase miteinander.",
    details: [
      "Je nach Vorhaben können Marktpreisanalyse, Projektseite, Portale, Printanzeigen, Außenwerbung, visualisierte Grundrisse und Verkaufsunterlagen dazugehören.",
      "Wir organisieren Besichtigungen, gegebenenfalls eine Verkaufsstelle vor Ort, und begleiten den Vertrieb bis zum Notartermin. Auch danach bleiben wir erreichbar.",
    ],
    points: ["Projekt und Markt frühzeitig einordnen", "Verkaufsunterlagen und Kanäle planen", "Besichtigungen und Verkauf begleiten"],
    related: ["marktpreisanalyse", "vermarktung", "verkaufsabwicklung"],
  },
  {
    slug: "portfolio-vertrieb",
    title: "Portfoliovertrieb",
    group: "Weitere Leistungen",
    summary: "Immobilienbestände bewerten, vermieten oder verkaufen.",
    intro: "Wir arbeiten auch für Eigentümer größerer Wohn- und Gewerbebestände. Dabei kann es um die Vermietung einzelner Einheiten oder den Verkauf eines ganzen Portfolios gehen.",
    details: [
      "Wir erfassen den Bestand, erarbeiten passende Abläufe und stimmen die Vermarktung auf die Ziele des Auftraggebers ab. Für den selektiven Verkauf nutzen wir Kontakte zu privaten und institutionellen Anlegern.",
      "Diskretion ist bei Portfolios häufig entscheidend. Vertraulichkeit und Freigaben für Interessenten vereinbaren wir deshalb vorab.",
    ],
    points: ["Bestand und Markt bewerten", "Vermietung oder Verkauf planen", "Interessenten gezielt und vertraulich ansprechen"],
    related: ["marktpreisanalyse", "diskrete-vermarktung", "vermarktung"],
  },
  {
    slug: "finanzierung",
    title: "Immobilienfinanzierung",
    group: "Weitere Leistungen",
    summary: "Käufer bei der Suche nach einer passenden Finanzierung unterstützen.",
    intro: "Beim Immobilienkauf muss die Finanzierung zum Objekt und zur persönlichen Situation passen. Auf Wunsch besprechen wir mit Ihnen den Finanzierungsbedarf und vermitteln Kontakte zu Finanzierungspartnern.",
    details: [
      "Eigenkapital, Kreditbetrag, Laufzeit und Tilgung gehören ebenso in die Betrachtung wie Kaufnebenkosten und ein finanzieller Puffer. Konditionen verschiedener Anbieter sollten verglichen werden.",
      "Wir helfen Ihnen, die richtigen Fragen zu stellen, und weisen auf mögliche Förderungen hin. Die konkrete Finanzierung vereinbaren Sie mit dem jeweiligen Kreditinstitut.",
    ],
    points: ["Finanzierungsbedarf besprechen", "Kaufnebenkosten berücksichtigen", "Kontakte zu Finanzierungspartnern vermitteln"],
    related: ["immobilienverkauf", "interessentenpruefung"],
  },
  {
    slug: "tippgeber",
    title: "Tippgeber",
    group: "Weitere Leistungen",
    summary: "Sie kennen einen Eigentümer mit Verkaufsabsicht?",
    intro: "Wenn Sie von einer Immobilie erfahren, die verkauft werden soll, können Sie uns darauf aufmerksam machen. Wir besprechen mit Ihnen, ob und wie wir Kontakt zum Eigentümer aufnehmen können.",
    details: [
      "Wichtig ist, dass der Eigentümer mit einer Kontaktaufnahme einverstanden ist. Vertrauliche Informationen behandeln wir entsprechend sorgfältig.",
      "Melden Sie sich telefonisch oder per E-Mail, bevor Sie persönliche Daten weitergeben. Wir erklären Ihnen dann den Ablauf und die Bedingungen für einen Tipp.",
    ],
    points: ["Tipp zunächst mit uns besprechen", "Einverständnis des Eigentümers beachten", "Bedingungen vorab klären"],
    related: ["immobilienverkauf"],
  },
];

export const serviceBySlug = Object.fromEntries(services.map((service) => [service.slug, service])) as Record<string, Service>;
