import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import { buildRequest, parseResponse, callOnOffice } from '../src/server/onoffice-api.ts';
import { mapProperty, mapPropertyImage, plainText, propertyFields } from '../src/data/properties.ts';
import { fetchPublishedProperties, setPropertyCacheHeaders } from '../src/server/properties.ts';

process.env.ONOFFICE_API_TOKEN = 'test-token';
process.env.ONOFFICE_API_SECRET = 'test-secret';
const raw = { status: 1, veroeffentlichen: 1, verkauft: 0, referenz: 0, vermarktungsart: 'kauf', objekttitel: 'Wohnung', kaufpreis: '350000', wohnflaeche: '80' };
const response = (records, count = null) => ({ status: { code: 200, errorcode: 0 }, response: { results: [{ status: { errorcode: 0 }, data: { meta: { cntabsolute: count }, records } }] } });

test('signs read requests using HMAC v2 without writes', () => {
  const request = buildRequest('estate', { data: ['Id'] }, 123);
  const action = request.request.actions[0];
  assert.equal(action.hmac, createHmac('sha256', 'test-secret').update(`123test-tokenestate${action.actionid}`).digest('base64'));
  assert.equal(action.resourceid, '');
  assert.ok(action.actionid.endsWith(':read'));
});
test('accepts documented nullable metadata counts', () => assert.deepEqual(parseResponse(response([])).records, []));
test('rejects upstream errors without leaking messages', () => {
  assert.throws(() => parseResponse({ status: { code: 200, errorcode: 8, message: 'private-secret' } }), /API_ERROR_8/);
  assert.throws(() => parseResponse({ status: { code: 400, errorcode: 18, message: 'private-secret' }, response: [] }), /API_ERROR_18/);
  assert.throws(() => parseResponse({ status: { code: 500, errorcode: 97 }, response: { results: [{ status: { errorcode: 144, message: 'private-secret' }, data: [] }] } }), /ACTION_ERROR_144/);
});
test('never displays inactive, unpublished, sold or reference properties', () => {
  for (const change of [{ status: 0 }, { veroeffentlichen: 0 }, { verkauft: 1 }, { referenz: 1 }]) assert.equal(mapProperty(1, { ...raw, ...change }, {}), null);
  assert.equal(mapProperty('../private', raw, {}), null);
});
test('falls back to a usable commercial area and rental price', () => {
  const property = mapProperty(2, { ...raw, vermarktungsart: 'miete', wohnflaeche: 0, nutzflaeche: 120, kaltmiete: '', nettokaltmiete: 900 }, {});
  assert.equal(property.area, '120 m²');
  assert.match(property.price, /900/);
});
test('converts descriptions to escaped plain text and omits private fields', () => {
  assert.equal(plainText('<p>Schön &amp; hell</p><script>steal()</script>'), 'Schön & hell');
  const property = mapProperty(1, { ...raw, eigentuemer: 'private-owner' }, {});
  assert.ok(!JSON.stringify(property).includes('private-owner'));
  assert.ok(!propertyFields.includes('eigentuemer'));
});
test('only permits HTTPS onOffice photos', () => {
  for (const url of ['javascript:alert(1)', 'https://onoffice.de.evil.test/photo', 'http://image.onoffice.de/p', 'https://user:pass@image.onoffice.de/p']) assert.equal(mapPropertyImage({ url, type: 'Foto' }), null);
  assert.equal(mapPropertyImage({ url: 'https://image.onoffice.de/p?a=1&amp;b=2', type: 'Foto' }).url, 'https://image.onoffice.de/p?a=1&b=2');
});
test('fetches published objects and only their released pictures across pages', async (t) => {
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    assert.equal(url, 'https://api.onoffice.de/api/stable/api.php');
    assert.equal(options.redirect, 'error');
    const action = JSON.parse(options.body).request.actions[0];
    if (action.resourcetype === 'fields') return Response.json(response([{ id: 'estate', elements: Object.fromEntries(propertyFields.map(field => [field, { label: field, permittedvalues: [] }])) }]));
    if (action.resourcetype === 'estate') {
      assert.deepEqual(action.parameters.filter.veroeffentlichen, [{ op: '=', val: 1 }]);
      const records = action.parameters.listoffset === 0 ? Array.from({ length: 100 }, (_, i) => ({ id: i + 1, elements: raw })) : [{ id: 101, elements: { ...raw, verkauft: 1 } }];
      return Response.json(response(records, 101));
    }
    assert.equal(action.parameters.publicationSetting, 'Homepage');
    return Response.json(response([{ id: 1, elements: [{ estateid: 1, type: 'Titelbild', url: 'https://image.onoffice.de/photo' }, { estateid: 101, type: 'Foto', url: 'https://image.onoffice.de/private' }] }]));
  });
  const properties = await fetchPublishedProperties();
  assert.equal(properties.length, 100);
  assert.equal(properties[0].images.length, 1);
  assert.ok(!JSON.stringify(properties).includes('/private'));
});
test('network failures expose only a safe diagnostic code', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => { throw new Error('private-secret'); });
  await assert.rejects(callOnOffice('estate', {}), /NETWORK_ERROR/);
});
test('error pages are not cached', () => {
  const headers = new Headers();
  setPropertyCacheHeaders(headers, false);
  assert.equal(headers.get('Cache-Control'), 'no-store');
  assert.equal(headers.get('CDN-Cache-Control'), 'no-store');
});
