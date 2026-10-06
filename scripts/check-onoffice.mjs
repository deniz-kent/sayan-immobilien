import { createHmac } from "node:crypto";
import { loadEnvFile } from "node:process";
import { fileURLToPath } from "node:url";

const endpoint = "https://api.onoffice.de/api/stable/api.php";
const actionid = "urn:onoffice-de-ns:smart:2.5:smartml:action:read";

// Read-only connection check. Credentials, API messages and records are never logged.
// Protocol: https://apidoc.onoffice.de/erste-schritte/
export function buildRequest(token, secret, timestamp) {
  if (![token, secret].every((value) => typeof value === "string" && value.trim() && value !== "undefined")) {
    throw new Error("Token oder Secret fehlt in der lokalen .env.local-Datei.");
  }
  return {
    token,
    request: {
      actions: [{
        actionid,
        resourceid: "",
        identifier: "sayan-connection-check",
        resourcetype: "estate",
        timestamp,
        hmac_version: "2",
        hmac: createHmac("sha256", secret)
          .update(`${timestamp}${token}estate${actionid}`)
          .digest("base64"),
        parameters: {
          data: ["Id"],
          listlimit: 1,
          filter: {
            status: [{ op: "=", val: 1 }],
            veroeffentlichen: [{ op: "=", val: 1 }],
          },
        },
      }],
    },
  };
}

export function parseCount(payload) {
  if (payload?.status?.code !== 200 || payload?.status?.errorcode !== 0) {
    throw new Error("onOffice hat die Anfrage abgelehnt. Zugangsdaten und API-Freischaltung pruefen.");
  }
  const result = payload.response?.results?.[0];
  if (result?.status?.errorcode !== 0) {
    throw new Error("onOffice hat den Objektabruf abgelehnt. Leserechte und Objektfreigaben pruefen.");
  }
  const count = Number(result?.data?.meta?.cntabsolute);
  if (!Array.isArray(result?.data?.records) || !Number.isSafeInteger(count) || count < 0) {
    throw new Error("onOffice hat eine unerwartete Antwort geliefert.");
  }
  return count;
}

async function main() {
  try {
    loadEnvFile(fileURLToPath(new URL("../.env.local", import.meta.url)));
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
  }
  const body = buildRequest(
    process.env.ONOFFICE_API_TOKEN,
    process.env.ONOFFICE_API_SECRET,
    Math.floor(Date.now() / 1000),
  );
  let response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(15000),
      redirect: "error",
    });
  } catch {
    throw new Error("onOffice ist nicht erreichbar oder antwortet nicht rechtzeitig.");
  }
  if (!response.ok) throw new Error(`onOffice antwortet mit HTTP ${response.status}.`);
  let payload;
  try {
    payload = await response.json();
  } catch {
    throw new Error("onOffice hat keine gueltige JSON-Antwort geliefert.");
  }
  const count = parseCount(payload);
  console.log(`Verbindung erfolgreich. Aktive, fuer die Website freigegebene Immobilien: ${count}.`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : "Verbindungstest fehlgeschlagen.");
    process.exitCode = 1;
  });
}
