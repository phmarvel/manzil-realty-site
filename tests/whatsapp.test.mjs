// MNZ-4 WhatsApp contact button: data and link logic. Run: node --test tests/
import test from 'node:test';
import assert from 'node:assert/strict';
import { agents, whatsapp, whatsappText, content } from '../src/data/demo.js';
import { buildWaLink, waMessage, waAgentHref } from '../src/whatsapp.js';

const decode = (href) => decodeURIComponent(new URL(href).searchParams.get('text'));
const hasArabic = (s) => /[؀-ۿ]/.test(s);
const hasLatinWord = (s) => /[A-Za-z]{3,}/.test(s);

test('AC2: buildWaLink makes a wa.me URL with digits only and an encoded text', () => {
  const href = buildWaLink('+966 55 501 0100', 'a b؟&');
  assert.match(href, /^https:\/\/wa\.me\/966555010100\?text=/);
  assert.equal(decode(href), 'a b؟&');
});

test('AC2: the message is in the requested language', () => {
  const ar = waMessage({ lang: 'ar' });
  const en = waMessage({ lang: 'en' });
  assert.ok(hasArabic(ar) && !hasLatinWord(ar), ar);
  assert.ok(!hasArabic(en) && hasLatinWord(en), en);
});

test('AC2: a neighbourhood being viewed is named in the message', () => {
  assert.match(waMessage({ lang: 'en', hood: 'albalad' }), /Al-Balad/);
  assert.match(waMessage({ lang: 'ar', hood: 'albalad' }), /البلد/);
  assert.notEqual(waMessage({ lang: 'en', hood: 'albalad' }), waMessage({ lang: 'en' }));
});

test('AC3: every agent has their own number', () => {
  const nums = agents.map((a) => whatsapp.agents[a.id]);
  assert.ok(nums.every(Boolean), 'a number is missing');
  assert.equal(new Set(nums).size, agents.length);
  assert.ok(nums.every((n) => /^\d{11,15}$/.test(n)));
});

test('AC3: an agent link goes to that agent and names them, in each language', () => {
  for (const a of agents) {
    for (const lang of ['ar', 'en']) {
      const href = waAgentHref(a, lang);
      assert.ok(href.startsWith(`https://wa.me/${whatsapp.agents[a.id]}?text=`));
      assert.ok(decode(href).includes(a.name[lang]), decode(href));
    }
  }
});

test('AC4: both languages have the same non-empty strings and are joined to content', () => {
  assert.deepEqual(Object.keys(whatsappText.ar).sort(), Object.keys(whatsappText.en).sort());
  for (const l of ['ar', 'en']) {
    assert.equal(content[l].whatsapp, whatsappText[l]);
    for (const [k, v] of Object.entries(whatsappText[l])) assert.ok(v.length > 0, `${l}.${k}`);
  }
  assert.ok(hasArabic(whatsappText.ar.short) && whatsappText.en.short === 'WhatsApp');
});

test('the agency has a number and shared lists have no wa fields', () => {
  assert.match(whatsapp.agency, /^\d{11,15}$/);
  assert.ok(agents.every((a) => !('wa' in a) && !('whatsapp' in a)));
});
