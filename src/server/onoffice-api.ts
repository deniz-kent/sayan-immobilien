import { createHmac } from "node:crypto";
import { z } from "zod";

const endpoint = "https://api.onoffice.de/api/stable/api.php";
const actionPrefix = "urn:onoffice-de-ns:smart:2.5:smartml:action:";
const recordSchema = z.object({
  id: z.union([z.string(), z.number()]),
  elements: z.union([z.record(z.unknown()), z.array(z.record(z.unknown()))]),
});
const responseSchema = z.object({
  status: z.object({ code: z.number(), errorcode: z.number() }),
  response: z.object({ results: z.array(z.object({
    status: z.object({ errorcode: z.number() }),
    data: z.object({
      meta: z.object({ cntabsolute: z.union([z.number(), z.string()]).nullable().optional() }).optional(),
      records: z.array(recordSchema),
    }).optional(),
  })) }).optional(),
});

export class OnOfficeError extends Error {
  code: string;
  constructor(code: string) {
    super(`onOffice: ${code}`);
    this.code = code;
    this.name = "OnOfficeError";
  }
}

export function buildRequest(resource: "estate" | "estatepictures" | "fields", parameters: Record<string, unknown>, timestamp = Math.floor(Date.now() / 1000)) {
  const token = process.env.ONOFFICE_API_TOKEN;
  const secret = process.env.ONOFFICE_API_SECRET;
  if (![token, secret].every((value) => value?.trim() && value !== "undefined")) throw new OnOfficeError("MISSING_CREDENTIALS");
  const actionid = `${actionPrefix}${resource === "estate" ? "read" : "get"}`;
  return {
    token,
    request: { actions: [{
      actionid, resourceid: "", identifier: "sayan-website", resourcetype: resource,
      timestamp, hmac_version: "2",
      hmac: createHmac("sha256", secret!).update(`${timestamp}${token}${resource}${actionid}`).digest("base64"),
      parameters,
    }] },
  };
}

export function parseResponse(payload: unknown) {
  // Error responses need not contain the successful records envelope.
  // Inspect status first so authentication/action errors are not hidden by
  // validation of an empty or differently shaped error payload.
  const envelope = z.object({
    status: z.object({ code: z.number(), errorcode: z.number() }),
    response: z.unknown().optional(),
  }).safeParse(payload);
  if (!envelope.success) throw new OnOfficeError("INVALID_STATUS");
  const actionStatus = z.object({ results: z.array(z.object({
    status: z.object({ errorcode: z.number() }),
  })) }).safeParse(envelope.data.response);
  const actionError = actionStatus.success ? actionStatus.data.results[0]?.status.errorcode : undefined;
  if (actionError && (envelope.data.status.errorcode === 97 || envelope.data.status.errorcode === 0)) {
    throw new OnOfficeError(`ACTION_ERROR_${actionError}`);
  }
  if (envelope.data.status.code !== 200 || envelope.data.status.errorcode !== 0) {
    throw new OnOfficeError(`API_ERROR_${envelope.data.status.errorcode}`);
  }
  const parsed = responseSchema.safeParse(payload);
  if (!parsed.success) throw new OnOfficeError("INVALID_RESPONSE");
  const { status, response } = parsed.data;
  if (status.code !== 200 || status.errorcode !== 0) throw new OnOfficeError(`API_ERROR_${status.errorcode}`);
  const result = response?.results[0];
  if (!result) throw new OnOfficeError("MISSING_RESULT");
  if (result.status.errorcode !== 0) throw new OnOfficeError(`ACTION_ERROR_${result.status.errorcode}`);
  if (!result.data) throw new OnOfficeError("MISSING_DATA");
  return result.data;
}

// Allowlisted read/get actions only. Never log requests or upstream messages.
export async function callOnOffice(resource: "estate" | "estatepictures" | "fields", parameters: Record<string, unknown>) {
  const body = buildRequest(resource, parameters);
  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body), redirect: "error", signal: AbortSignal.timeout(10000),
    });
  } catch { throw new OnOfficeError("NETWORK_ERROR"); }
  if (!response.ok) throw new OnOfficeError(`HTTP_${response.status}`);
  let payload: unknown;
  try { payload = await response.json(); }
  catch { throw new OnOfficeError("INVALID_JSON"); }
  return parseResponse(payload);
}
