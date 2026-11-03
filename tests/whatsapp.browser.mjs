// MNZ-4 WhatsApp contact button: browser checks per acceptance criterion.
// Run: PUPPETEER_CORE=/path/to/node_modules/puppeteer-core node tests/whatsapp.browser.mjs   (serves the repo itself)
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { agents, whatsapp } from '../src/data/demo.js';

const root = fileURLToPath(new URL('..', import.meta.url));
import { createRequire } from 'node:module';
const puppeteer = createRequire(import.meta.url)(process.env.PUPPETEER_CORE ?? 'puppeteer-core');
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.woff2': 'font/woff2', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml' };
const server = http.createServer(async (req, res) => {
  try {
    const p = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^(\.\.[/\\])+/, '');
    const body = await readFile(join(root, p === '/' ? 'index.html' : p));
    res.writeHead(200, { 'content-type': types[extname(p)] ?? (p === '/' ? 'text/html' : 'application/octet-stream') }).end(body);
  } catch { res.writeHead(404).end(); }
}).listen(0);
const base = `http://127.0.0.1:${server.address().port}/`;
const browser = await puppeteer.launch({ executablePath: process.env.CHROME ?? '/usr/bin/chromium', args: ['--no-sandbox'] });
let failed = 0;
const check = async (name, fn) => { try { await fn(); console.log('ok  ', name); } catch (e) { failed++; console.log('FAIL', name, '-', e.message.split('\n')[0]); } };
const dec = (href) => decodeURIComponent(new URL(href).searchParams.get('text'));

async function open(width, lang) {
  const page = await browser.newPage();
  await page.setViewport({ width, height: 900, deviceScaleFactor: 1 });
  await page.evaluateOnNewDocument((l) => { try { localStorage.setItem('manzil.lang', l); } catch {} }, lang);
  await page.goto(base, { waitUntil: 'networkidle0' });
  return page;
}
const info = (page) => page.$$eval('[data-wa]', (els) => els.map((el) => {
  const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
  return { inHeader: !!el.closest('header'), kind: el.dataset.wa, id: el.dataset.agent ?? '', href: el.href, target: el.target, rel: el.rel, text: el.innerText.trim(), hidden: cs.display === 'none' || cs.visibility === 'hidden' || el.closest('[hidden]') !== null,
    position: cs.position, w: r.width, h: r.height, top: r.top, bottom: r.bottom, left: r.left, right: r.right, vw: innerWidth, vh: innerHeight };
}));

for (const lang of ['ar', 'en']) {
  for (const width of [390, 1440]) {
    await check(`AC1 ${lang} ${width}: header link visible with the menu closed, nothing fixed`, async () => {
      const page = await open(width, lang);
      const header = (await info(page)).find((e) => e.kind === 'agency' && e.inHeader);
      assert.ok(header, 'no WhatsApp link in the header');
      assert.ok(!header.hidden && header.text.length > 0, 'hidden or no text');
      assert.ok(header.left >= 0 && header.right <= header.vw && header.bottom <= header.vh, 'outside the viewport');
      for (const e of await info(page)) assert.notEqual(e.position, 'fixed');
      assert.equal(await page.$eval('#menu-panel', (el) => el.hidden), true, 'menu should be closed');
      await page.close();
    });
    await check(`AC1 ${lang} ${width}: focused links are not covered`, async () => {
      const page = await open(width, lang);
      const n = (await info(page)).length;
      assert.ok(n >= 2 + agents.length, `only ${n} links`);
      for (let i = 0; i < n; i++) {
        const ok = await page.evaluate((i) => {
          const el = document.querySelectorAll('[data-wa]')[i];
          el.scrollIntoView({ block: 'center', behavior: 'instant' }); el.focus({ focusVisible: true });
          const r = el.getBoundingClientRect(); const pad = 4;
          // the centre, and points just outside the box where the ring is drawn
          const pts = [[r.x + r.width / 2, r.y + r.height / 2], [r.x + 2, r.y + 2], [r.right - 2, r.bottom - 2]];
          const covered = pts.some(([x, y]) => { const t = document.elementFromPoint(x, y); return !(t === el || el.contains(t)); });
          const ringTop = r.top - pad;
          const header = document.querySelector('header')?.getBoundingClientRect();
          const hiddenUnderHeader = header && !el.closest('header') && getComputedStyle(document.querySelector('header')).position !== 'static' && ringTop < header.bottom && r.bottom > header.top;
          return { covered, hiddenUnderHeader, matches: el.matches(':focus-visible'), outline: parseFloat(getComputedStyle(el).outlineWidth) };
        }, i);
        assert.ok(!ok.covered, `link ${i} covered`);
        assert.ok(!ok.hiddenUnderHeader, `link ${i} ring under the sticky header`);
        assert.ok(ok.outline >= 2, `link ${i} focus outline ${ok.outline}`);
      }
      await page.close();
    });
    await check(`AC4 ${lang} ${width}: label, 44px target`, async () => {
      const page = await open(width, lang);
      for (const e of await info(page)) {
        if (e.hidden) continue;
        assert.ok(e.text.length > 0, `${e.kind} has no text`);
        assert.ok(e.w >= 44 && e.h >= 44, `${e.kind} is ${e.w}x${e.h}`);
      }
      await page.close();
    });
  }
  for (const width of [320, 390, 768, 1024, 1440]) {
    await check(`AC1/AC4 ${lang} ${width}: no sideways scroll, header controls do not overlap`, async () => {
      const page = await open(width, lang);
      const r = await page.evaluate(() => {
        const bar = [...document.querySelectorAll('header .wrap > *')].filter((el) => el.offsetParent).map((el) => el.getBoundingClientRect());
        let overlap = false;
        for (let i = 0; i < bar.length; i++) for (let j = i + 1; j < bar.length; j++) { const a = bar[i], b = bar[j]; if (a.left < b.right - 0.5 && b.left < a.right - 0.5 && a.top < b.bottom - 0.5 && b.top < a.bottom - 0.5) overlap = true; }
        const clipped = [...document.querySelectorAll('header a, header button')].filter((el) => el.offsetParent && el.scrollWidth > el.clientWidth + 1).map((el) => el.id || el.textContent.trim().slice(0, 12));
        return { clipped, sw: document.documentElement.scrollWidth, iw: innerWidth, overlap, wa: !!document.querySelector('header [data-wa]') };
      });
      assert.ok(r.wa, 'no header link'); assert.ok(r.sw <= r.iw, `scrollWidth ${r.sw} > ${r.iw}`); assert.ok(!r.overlap, 'header controls overlap'); assert.deepEqual(r.clipped, [], 'clipped header text');
      await page.close();
    });
  }
}

await check('AC2: the link opens wa.me in a new tab with a message in the current language', async () => {
  const page = await open(1440, 'ar');
  let h = (await info(page)).find((e) => e.kind === 'agency' && e.inHeader);
  assert.match(h.href, /^https:\/\/wa\.me\/\d+\?text=/); assert.equal(h.target, '_blank'); assert.match(h.rel, /noopener/);
  assert.match(dec(h.href), /[؀-ۿ]/);
  await page.click('#lang-switch');
  h = (await info(page)).find((e) => e.kind === 'agency' && e.inHeader);
  assert.ok(!/[؀-ۿ]/.test(dec(h.href)) && /[A-Za-z]{3,}/.test(dec(h.href)), dec(h.href));
  assert.ok(h.href.includes(whatsapp.agency));
  await page.close();
});
await check('AC2: browsing a neighbourhood puts it in the message', async () => {
  const page = await open(1440, 'en');
  const before = dec((await info(page)).find((e) => e.kind === 'agency').href);
  await page.click('[data-hood="albalad"]');
  await page.hover('[data-wa="agency"]');
  const after = dec((await info(page)).find((e) => e.kind === 'agency').href);
  assert.notEqual(before, after); assert.match(after, /Al-Balad/);
  await page.close();
});
await check('AC3: each agent card links to that agent, also after a language switch', async () => {
  const page = await open(1440, 'ar');
  for (const lang of ['ar', 'en']) {
    if (lang === 'en') await page.click('#lang-switch');
    const cards = (await info(page)).filter((e) => e.kind === 'agent');
    assert.equal(cards.length, agents.length);
    for (const a of agents) {
      const c = cards.find((e) => e.id === a.id);
      assert.ok(c, `no link for ${a.id}`);
      assert.ok(c.href.startsWith(`https://wa.me/${whatsapp.agents[a.id]}?text=`), c.href);
      assert.ok(dec(c.href).includes(a.name[lang]), dec(c.href));
      assert.equal(c.target, '_blank');
    }
  }
  await page.close();
});
await check('AC4: mirrors in Arabic (icon at the inline start, header order reversed)', async () => {
  const pos = {};
  for (const lang of ['ar', 'en']) {
    const page = await open(1440, lang);
    pos[lang] = await page.evaluate(() => {
      const a = document.querySelector('header [data-wa]'); const svg = a.querySelector('svg').getBoundingClientRect(); const r = a.getBoundingClientRect();
      const sw = document.getElementById('lang-switch').getBoundingClientRect();
      return { iconStart: (document.dir === 'rtl' ? r.right - svg.right : svg.left - r.left), waBeforeSwitch: r.left < sw.left, dir: document.dir };
    });
    await page.close();
  }
  assert.equal(pos.ar.dir, 'rtl');
  assert.ok(pos.ar.iconStart < 32 && pos.en.iconStart < 32, JSON.stringify(pos));
  assert.notEqual(pos.ar.waBeforeSwitch, pos.en.waBeforeSwitch, 'header order does not mirror');
});

await browser.close(); server.close();
console.log(failed ? `${failed} check(s) failed` : 'all checks passed');
process.exit(failed ? 1 : 0);
