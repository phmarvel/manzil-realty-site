// Listing detail pages (MNZ-3): one browser check per acceptance criterion, in both languages.
// Run: node tests/listing.browser.mjs   (needs puppeteer-core and /usr/bin/chromium; set NODE_PATH if installed outside the repo)
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { listings } from '../src/data/demo.js';

const require = createRequire(import.meta.url);
const puppeteer = require('puppeteer-core');
const PIXEL = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
const PORT = 4179, BASE = `http://127.0.0.1:${PORT}`;
const server = spawn('python3', ['-m', 'http.server', String(PORT), '--bind', '127.0.0.1'], { stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 800));
const browser = await puppeteer.launch({ executablePath: '/usr/bin/chromium', args: ['--no-sandbox'] });
let failed = 0;
const ok = (c, name, extra = '') => { if (!c) failed++; console.log(`${c ? 'PASS' : 'FAIL'}  ${name}${c ? '' : '  ' + extra}`); };

async function open(url, { lang = 'en', width = 1440, height = 900 } = {}) {
  const page = await browser.newPage();
  // Only the local site is loaded: external photos (Unsplash) are answered with a 1x1 pixel so the run is fast and offline-safe.
  await page.setRequestInterception(true);
  page.on('request', (r) => (r.url().startsWith(BASE) || r.url().startsWith('data:') ? r.continue() : r.respond({ status: 200, contentType: 'image/gif', body: PIXEL })));
  await page.setViewport({ width, height });
  await page.evaluateOnNewDocument((l) => { try { localStorage.setItem('manzil.lang', l); } catch {} }, lang);
  await page.goto(BASE + url, { waitUntil: 'load' });
  return page;
}
const text = (page, sel) => page.$eval(sel, (e) => e.textContent.trim()).catch(() => null);
const SLUG = 'apartment-albalad-95'; // rent, Al-Balad

for (const lang of ['en', 'ar']) {
  console.log(`\n--- ${lang} ---`);

  // 1. Own address; reload and shared link show the same property
  {
    const page = await open('/?status=rent', { lang });
    const title = await page.$eval(`[data-listing-slug="${SLUG}"] h3`, (e) => e.textContent.trim()).catch(() => null);
    const link = await page.$(`[data-listing-slug="${SLUG}"] a.card-link`);
    ok(!!link, '1 card has a link to its detail page');
    if (link) {
      await Promise.all([page.waitForNavigation({ waitUntil: 'load' }), link.click()]);
      ok(page.url().includes(`listing.html?slug=${SLUG}`), '1 URL has the slug', page.url());
      const h1 = await text(page, '[data-title]');
      ok(h1 === title, '1 title matches the card', `${h1} vs ${title}`);
      await page.reload({ waitUntil: 'load' });
      ok((await text(page, '[data-title]')) === title, '1 reload shows the same property');
      const fresh = await open(`/listing.html?slug=${SLUG}`, { lang });
      ok((await text(fresh, '[data-title]')) === title, '1 shared link in a fresh page shows the same property');
      await fresh.close();
      await page.goBack({ waitUntil: 'load' });
      ok(page.url().includes('status=rent'), '1 browser back returns to the listings');
    }
    await page.close();
    const nf = await open('/listing.html?slug=nope', { lang });
    ok((await nf.$('[data-not-found]')) !== null && (await nf.$('a[href^="index.html"]')) !== null, '1 unknown slug shows the not-found state');
    await nf.close();
  }

  // 2. All content, in each language; mirrored in Arabic
  {
    for (const l of listings) {
      const page = await open(`/listing.html?slug=${l.slug}`, { lang });
      const miss = [];
      const has = async (sel, label) => { if (!(await page.$(sel))) miss.push(label); };
      await has('[data-gallery] [data-thumb]', 'photos'); await has('[data-price]', 'price'); await has('[data-stat="area"]', 'area');
      await has('[data-stat="size"]', 'size'); await has('[data-stat="beds"]', 'beds'); await has('[data-stat="baths"]', 'baths');
      await has('[data-desc]', 'description'); await has('[data-facts] dt', 'key facts'); await has('[data-hood-about]', 'neighbourhood'); await has('[data-agent]', 'agent');
      const imgs = await page.$$eval('[data-gallery] [data-thumb]', (a) => a.length);
      const shown = await page.$eval('[data-shot]', (i) => i.complete && i.naturalWidth > 0).catch(() => false);
      if (imgs < 3 || !shown) miss.push(`photos (${imgs} thumbs, main loaded: ${shown})`);
      ok(miss.length === 0, `2 ${l.slug} has all content`, miss.join(', '));
      if (l === listings[0]) {
        const dir = await page.evaluate(() => document.documentElement.dir);
        ok(dir === (lang === 'ar' ? 'rtl' : 'ltr'), '2 direction is set', dir);
        const back = await page.$eval('[data-back]', (e) => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e.querySelector('svg')); return { x: r.x, right: r.right, w: innerWidth, flip: [cs.rotate === '0deg' ? 'none' : cs.rotate, cs.scale, cs.transform].join('|') }; }).catch(() => ({ x: 0, right: 0, w: 1, flip: '' }));
        ok(lang === 'ar' ? back.right > back.w / 2 : back.x < back.w / 2, '2 back link starts on the reading side', JSON.stringify(back));
        // the arrow sits in a left-pointing shape in English (rotated) and points right (unrotated) in Arabic, i.e. mirrored
        ok(lang === 'ar' ? /^none\|none\|none$/.test(back.flip) : !/^none\|none\|none$/.test(back.flip), '2 back arrow is mirrored with the direction', back.flip);
      }
      await page.close();
    }
  }

  // 3. The form names the property; same checks and confirmation as the landing page
  {
    const page = await open(`/listing.html?slug=${SLUG}`, { lang });
    const title = await text(page, '[data-title]');
    ok((await page.$eval('#c-property', (s) => s.value)) === 'l6', '3 property select is pre-filled');
    ok(((await text(page, '[data-asking]')) || '').includes(title), '3 a visible line names the property');
    await page.click('#c-submit');
    const errs = await page.$$eval('.err:not([hidden])', (a) => a.length);
    ok(errs >= 2, '3 empty submit shows errors', String(errs));
    await page.type('#c-name', lang === 'ar' ? 'سارة العتيبي' : 'Sara Al-Otaibi');
    await page.type('#c-phone', '0551234567');
    await page.click('#c-submit');
    await page.waitForSelector('#form-success:not([hidden])', { timeout: 4000 }).catch(() => {});
    const okMsg = await page.$eval('#form-success', (e) => !e.hidden).catch(() => false);
    ok(okMsg, '3 valid submit shows the confirmation');
    ok(((await text(page, '#success-text')) || '').includes(title), '3 confirmation names the property');
    await page.close();
  }

  // 4. Back link keeps the earlier filters
  {
    const page = await open('/?status=rent&hood=albalad', { lang });
    await page.select('#f-beds', '2');
    const href = await page.$eval(`[data-listing-slug="${SLUG}"] a.card-link`, (a) => a.getAttribute('href')).catch(() => '');
    ok(/status=rent/.test(href) && /hood=albalad/.test(href) && /beds=2/.test(href), '4 card link carries the current filters after a change', href);
    await Promise.all([page.waitForNavigation({ waitUntil: 'load' }), page.click(`[data-listing-slug="${SLUG}"] a.card-link`)]);
    await Promise.all([page.waitForNavigation({ waitUntil: 'load' }), page.click('[data-back]')]);
    const q = new URL(page.url()).searchParams;
    ok(q.get('status') === 'rent' && q.get('hood') === 'albalad' && q.get('beds') === '2', '4 back link restores the filters', page.url());
    ok((await page.$eval('#f-beds', (s) => s.value)) === '2' && (await page.$eval('#f-hood', (s) => s.value)) === 'albalad', '4 landing page shows the same choices');
    await page.close();
    const direct = await open(`/listing.html?slug=${SLUG}`, { lang });
    ok((await direct.$eval('[data-back]', (a) => a.getAttribute('href')).catch(() => '')) === 'index.html#listings', '4 direct open falls back to plain #listings');
    await direct.close();
  }

  // 5. 390px phone, menu closed: no sideways scroll, controls at least 44px
  for (const width of [390, 320]) {
    const page = await open(`/listing.html?slug=${SLUG}`, { lang, width, height: 800 });
    const r = await page.evaluate(() => {
      const bad = [];
      document.querySelectorAll('a, button, input:not([type=radio]), select, textarea, summary').forEach((e) => {
        const b = e.getBoundingClientRect(); const cs = getComputedStyle(e);
        if (!b.width || !b.height || cs.visibility === 'hidden' || e.closest('[hidden]') || e.closest('.sr-only')) return;
        if (e.matches('a') && e.closest('p, li > span')) return;
        if (b.width < 43.5 || b.height < 43.5) bad.push(`${e.tagName}#${e.id || ''}.${(e.className + '').slice(0, 30)} ${Math.round(b.width)}x${Math.round(b.height)}`);
      });
      return { sw: document.documentElement.scrollWidth, iw: innerWidth, bad, menu: document.getElementById('menu-panel')?.hidden };
    });
    ok(r.sw <= r.iw, `5 ${width}px: no sideways scroll`, `${r.sw} > ${r.iw}`);
    ok(r.menu === true, `5 ${width}px: menu is closed`);
    ok(r.bad.length === 0, `5 ${width}px: every control is at least 44px`, r.bad.slice(0, 6).join(' | '));
    await page.close();
  }
}

await browser.close(); server.kill();
console.log(failed ? `\n${failed} check(s) failed` : '\nall checks passed');
process.exit(failed ? 1 : 0);
