import { fetchPublishedProperties } from '../src/server/properties.ts';
import { OnOfficeError } from '../src/server/onoffice-api.ts';

// Validate the real integration before replacing the current Vercel deployment.
// No credentials, records or upstream error messages are printed.
if (process.env.VERCEL_ENV === 'production') {
  try {
    const properties = await fetchPublishedProperties();
    console.log(`[onOffice] Verbindung erfolgreich: ${properties.length} öffentliche Angebote.`);
  } catch (error) {
    console.error(`[onOffice] Prüfung fehlgeschlagen: ${error instanceof OnOfficeError ? error.code : 'UNEXPECTED_ERROR'}.`);
    process.exitCode = 1;
  }
} else {
  console.log('[onOffice] Live-Verbindung wird beim Vercel-Production-Deployment geprüft.');
}
