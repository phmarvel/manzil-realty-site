// Listing detail pages (MNZ-3): the pure route helpers. Run: node --test tests/
import test from 'node:test';
import assert from 'node:assert/strict';
import { FILTER_KEYS, detailHref, parseDetail, backUrl } from '../src/listing-route.js';

const l = { slug: 'villa-alshati-420' };

test('filter keys match the landing page filters', () => {
  assert.deepEqual([...FILTER_KEYS], ['status', 'type', 'hood', 'price', 'beds']);
});

test('detailHref carries the slug and only the filters that are set', () => {
  assert.equal(detailHref(l, { status: 'sale', type: '', hood: '', price: '', beds: '' }), 'listing.html?slug=villa-alshati-420');
  assert.equal(detailHref(l, { status: 'rent', type: '', hood: 'albalad', price: '', beds: '2' }), 'listing.html?slug=villa-alshati-420&status=rent&hood=albalad&beds=2');
});

test('parseDetail reads the slug and whitelisted filters', () => {
  assert.deepEqual(parseDetail('?slug=villa-alshati-420&status=rent&hood=albalad'), { slug: 'villa-alshati-420', filters: { status: 'rent', hood: 'albalad' } });
  assert.equal(parseDetail(''), null);
  assert.equal(parseDetail('?status=rent'), null);
  assert.equal(parseDetail('?slug=%3Cb%3E'), null);
});

test('backUrl drops unknown keys and unsafe values', () => {
  assert.equal(backUrl('?slug=x'), 'index.html#listings');
  assert.equal(backUrl('?slug=x&status=rent&hood=albalad&evil=1'), 'index.html?status=rent&hood=albalad#listings');
  assert.equal(backUrl('?slug=x&hood=%2F%2Fevil.com&type=a%20b&beds=%3Cscript%3E'), 'index.html#listings');
});

test('round trip: filters in the card link come back from the back link', () => {
  const state = { status: 'rent', type: 'apartment', hood: 'albalad', price: '50000', beds: '2' };
  const href = detailHref(l, state);
  assert.equal(backUrl(href.slice(href.indexOf('?'))), 'index.html?status=rent&type=apartment&hood=albalad&price=50000&beds=2#listings');
});
