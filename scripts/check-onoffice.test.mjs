import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import test from "node:test";
import { buildRequest, parseCount } from "./check-onoffice.mjs";

test("signs a read-only request and restricts it to active, published properties", () => {
  const request = buildRequest("test-token", "test-secret", 1700000000);
  const action = request.request.actions[0];
  const expected = createHmac("sha256", "test-secret")
    .update("1700000000test-tokenestateurn:onoffice-de-ns:smart:2.5:smartml:action:read")
    .digest("base64");
  assert.equal(action.hmac, expected);
  assert.equal(action.hmac_version, "2");
  assert.equal(action.resourceid, "");
  assert.deepEqual(action.parameters.data, ["Id"]);
  assert.equal(action.parameters.listlimit, 1);
  assert.deepEqual(action.parameters.filter, {
    status: [{ op: "=", val: 1 }],
    veroeffentlichen: [{ op: "=", val: 1 }],
  });
  assert.equal(JSON.stringify(request).includes("test-secret"), false);
});

test("rejects missing credentials before any network call", () => {
  for (const value of [undefined, "", " ", "undefined"]) {
    assert.throws(() => buildRequest(value, "test-secret", 1700000000));
    assert.throws(() => buildRequest("test-token", value, 1700000000));
  }
});

function success(count) {
  return {
    status: { code: 200, errorcode: 0 },
    response: { results: [{ status: { errorcode: 0 }, data: { meta: { cntabsolute: count }, records: [] } }] },
  };
}

test("accepts an authenticated empty result", () => {
  assert.equal(parseCount(success(0)), 0);
  assert.equal(parseCount(success("12")), 12);
});

test("does not turn API or malformed responses into an empty successful result", () => {
  assert.throws(() => parseCount({ status: { code: 200, errorcode: 99, message: "sensitive" } }), /abgelehnt/);
  const denied = success(0);
  denied.response.results[0].status.errorcode = 99;
  assert.throws(() => parseCount(denied), /Leserechte/);
  for (const count of [undefined, -1, "invalid", 1.5]) {
    assert.throws(() => parseCount(success(count)), /unerwartete/);
  }
  assert.throws(() => parseCount({}), /abgelehnt/);
});
