# SAYAN Immobilien Köln

Lokale Astro-Testseite nach dem bestätigten SAYAN-Designsystem.

## Entwicklung

```bash
npm install
npm run dev
```

Die lokale Angebotsvorschau läuft unter `http://localhost:4322`.

## Prüfung

```bash
npm run check
npm test
npm run build
```

## onOffice auf Vercel

Für den Serverbetrieb wurde Astro auf 7.3.5 und der Vercel-Adapter auf 11.0.11 aktualisiert. Die indirekte Routing-Abhängigkeit `path-to-regexp` ist auf die gepatchte 6.3.0 festgelegt. Der vorherige Git-Stand bleibt als Rückweg erhalten; keine CRM-Daten werden verändert.

Die Startseite, Angebotsübersicht und Objektseiten werden serverseitig auf Vercel mit aktuellen onOffice-Daten gerendert. Keine API-Zugangsdaten gelangen in Browser-JavaScript.

Im Vercel-Projekt `sayan-immobilien` müssen die beiden Secrets `ONOFFICE_API_TOKEN` und `ONOFFICE_API_SECRET` für **Production** gesetzt sein. Kein `PUBLIC_`-Präfix verwenden. Preview benötigt separate, bewusst freigegebene Secrets; ohne Zugangsdaten erscheinen dort keine Angebote.

Der Production-Build prüft die echte Verbindung einschließlich Objekt- und Bildabruf, bevor das bisherige Deployment ersetzt wird. Ein Fehler stoppt den Build; die bisherige Website bleibt online. Änderungen der Umgebungsvariablen benötigen ein neues Deployment. Die Prüfung protokolliert nur Angebotsanzahl oder Fehlercode, niemals Zugangsdaten oder Objektdaten.

Veröffentlicht werden ausschließlich aktive, für die eigene Homepage freigegebene Objekte, keine verkauften/vermieteten oder Referenzobjekte. In onOffice unter **Vermarktung → Eigene Internetseite** veröffentlichen. Fotos/Grundrisse brauchen unter **Dateien → Veröffentlichung** die Freigabe **eigene Homepage / API**. Der API-Benutzer benötigt Leserechte für diese Objekte; Schreib- oder Administratorrechte sind nicht erforderlich.

Die Angebotsdaten werden kurz zwischengespeichert; Änderungen sind normalerweise innerhalb von etwa zwei Minuten sichtbar. Leere Bestände und API-Ausfälle haben getrennte Anzeigen; Einzelangebote liefern bei fehlender Freigabe 404 und bei API-Ausfall 503. Angefragt werden nur freigegebene öffentliche Objektfelder, keine Eigentümer-, Interessenten- oder internen Daten.

Kontakt zum Objekt erfolgt vorerst per E-Mail/Telefon. Formulare übertragen keine Daten an onOffice; das ist nicht Teil dieser Anbindung. Das bestehende Bewertungstool bleibt unverändert.

Protokollquellen: [Authentifizierung](https://apidoc.onoffice.de/erste-schritte/), [Objekte](https://apidoc.onoffice.de/actions/datensatz-lesen/objekte/), [Homepage-Bilder](https://apidoc.onoffice.de/actions/informationen-abfragen/auf-homepage-veroeffentlichte-objektbilder/), [Feldkonfiguration](https://apidoc.onoffice.de/actions/informationen-abfragen/feldkonfiguration/).

Die Angebotsvorschau ist bis zur ausdrücklichen Produktionsfreigabe für Suchmaschinen auf `noindex` gesetzt.
