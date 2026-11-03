// === Listing detail pages ===
// Entry point of listing.html?slug=…: renders one listing from src/data/demo.js and mounts the landing page's inquiry form.
import { listings, neighbourhoods, agents, photos, photoUrl, listingDetails, hoodAbout } from './data/demo.js';
import { applyStatic, setLang, onLang, other, t, tRaw, pick, plural, fmtNum, fmtMoney, getLang } from './i18n.js';
import { renderNav, initNav } from './nav.js';
import { initForm, renderForm, prefill } from './form.js';
import { parseDetail, backUrl } from './listing-route.js';
import { renderListingFooter } from './listing-footer.js';

const $ = (id) => document.getElementById(id);
const q = (sel) => document.querySelector(sel);
const icon = (id, cls = 'size-5 shrink-0') => `<svg class="${cls}" aria-hidden="true"><use href="#i-${id}"/></svg>`;
const tel = (p) => `tel:${p.replace(/\s/g, '')}`;

const parsed = parseDetail(location.search);
const listing = parsed && listings.find((l) => l.slug === parsed.slug);
const details = listing && listingDetails[listing.id];
let shot = 0;          // gallery position
let formReady = false; // prefill once; later renders keep what the person typed

const hoodOf = (l) => neighbourhoods.find((h) => h.id === l.hood);
const photoAlt = (key) => pick(photos[key].alt);
const thumbBtn = 'thumb relative block h-[3.75rem] w-20 shrink-0 overflow-clip rounded-sm border-2 border-transparent aria-[current=true]:border-bahr';

// Header and footer links point at the landing page, because the sections they name live there.
function fixLinks() {
  document.querySelectorAll('#nav-desktop a, #nav-mobile a').forEach((a) => { a.setAttribute('href', `index.html${a.getAttribute('href')}`); });
  document.querySelectorAll('header a[href="#top"]').forEach((a) => a.setAttribute('href', 'index.html'));
}

function gallery(l, d) {
  const keys = d.gallery;
  return `<section data-gallery aria-label="${t('listing.galleryLabel')}" class="mt-6">
    <div class="relative overflow-clip rounded-md bg-hajar">
      <img data-shot class="aspect-[4/3] w-full object-cover" src="${photoUrl(keys[0], 800, 600)}" width="800" height="600" fetchpriority="high" alt="${photoAlt(keys[0])}">
      ${keys.length > 1 ? `<button type="button" data-step="-1" class="btn btn-light absolute start-3 top-1/2 -translate-y-1/2 px-0 shadow-panel" aria-label="${t('listing.prev')}">${icon('arrow', 'size-5 rotate-180 rtl:rotate-0')}</button>
      <button type="button" data-step="1" class="btn btn-light absolute end-3 top-1/2 -translate-y-1/2 px-0 shadow-panel" aria-label="${t('listing.next')}">${icon('arrow', 'size-5 rtl:rotate-180')}</button>` : ''}
      <p data-count role="status" aria-live="polite" class="num absolute bottom-3 end-3 rounded-sm bg-teak px-3 py-1 text-sm font-bold text-jiss">${t('listing.photoOf', { n: fmtNum(1), total: fmtNum(keys.length) })}</p>
    </div>
    <ul class="mt-3 flex gap-2 overflow-x-auto pb-2">${keys.map((k, i) => `<li><button type="button" data-thumb="${i}" class="${thumbBtn}" aria-label="${t('listing.showPhoto', { n: fmtNum(i + 1) })}" aria-current="${i === shot}"><img class="size-full object-cover" src="${photoUrl(k, 160, 120)}" width="160" height="120" loading="lazy" alt=""></button></li>`).join('')}</ul>
  </section>`;
}

function showShot(i) {
  const keys = details.gallery;
  shot = (i + keys.length) % keys.length;
  const img = q('[data-shot]');
  img.src = photoUrl(keys[shot], 800, 600); img.alt = photoAlt(keys[shot]);
  q('[data-count]').textContent = t('listing.photoOf', { n: fmtNum(shot + 1), total: fmtNum(keys.length) });
  document.querySelectorAll('[data-thumb]').forEach((b) => b.setAttribute('aria-current', String(Number(b.dataset.thumb) === shot)));
}

const stat = (key, ic, label, value) => `<div class="bg-paper p-4" data-stat="${key}"><dt class="flex items-center gap-2 text-sm muted">${icon(ic)}<span>${label}</span></dt><dd class="mt-1 text-lg font-bold">${value}</dd></div>`;
const fact = (label, value) => `<div class="flex flex-wrap justify-between gap-x-6 gap-y-1 border-b border-hajar py-3"><dt class="muted">${label}</dt><dd class="font-bold">${value}</dd></div>`;

function body(l, d) {
  const h = hoodOf(l);
  const a = agents.find((x) => x.id === d.agentId);
  const rent = l.status === 'rent';
  const f = d.facts;
  const filter = rent ? `status=rent&` : '';
  return `
    <div class="flex flex-wrap items-center gap-3">
      <span class="rounded-sm bg-teak px-3 py-1 text-sm font-bold text-jiss">${t(rent ? 'listings.statusRent' : 'listings.statusSale')}</span>
    </div>
    <h1 class="h1 mt-3" data-title>${pick(l.title)}</h1>
    <p class="mt-3 flex items-center gap-2 text-lg muted">${icon('pin')}<span>${pick(h.name)}</span></p>
    <p class="num mt-4 text-3xl font-bold text-henna" data-price>${fmtMoney(l.price)} <span class="text-base font-normal muted">${t(rent ? 'listings.perYear' : 'listings.asking')}</span></p>
    ${gallery(l, d)}
    <dl class="num mt-6 grid grid-cols-2 gap-px overflow-clip rounded-md border border-hajar bg-hajar sm:grid-cols-4">
      ${stat('area', 'pin', t('listing.statArea'), pick(h.name))}
      ${stat('size', 'area', t('listing.statSize'), `${fmtNum(l.area)} ${t('listings.areaUnit')}`)}
      ${stat('beds', 'bed', t('listing.statBeds'), plural('listings.bedsN', l.beds))}
      ${stat('baths', 'bath', t('listing.statBaths'), plural('listings.bathsN', l.baths))}
    </dl>

    <section class="mt-12" aria-labelledby="d-desc">
      <h2 class="h2" id="d-desc">${t('listing.descTitle')}</h2>
      <p class="lead mt-4" data-desc>${pick(d.desc)}</p>
    </section>

    <section class="mt-12" aria-labelledby="d-facts">
      <h2 class="h3" id="d-facts">${t('listing.factsTitle')}</h2>
      <dl class="mt-2 max-w-xl border-t border-hajar" data-facts>
        ${fact(t('listing.facts.deal'), t(rent ? 'listings.statusRent' : 'listings.statusSale'))}
        ${fact(t('listing.facts.type'), tRaw('search.types')[l.type])}
        ${fact(t('listing.facts.built'), String(f.built))}
        ${fact(t('listing.facts.level'), pick(f.level))}
        ${fact(t('listing.facts.parking'), plural('listing.parkingN', f.parking))}
        ${fact(t('listing.facts.furnished'), t(`listing.furnished.${f.furnished}`))}
        ${rent ? '' : fact(t('listing.facts.perM2'), `<span class="num">${fmtMoney(Math.round(l.price / l.area))}</span> ${t('listing.perM2Unit')}`)}
      </dl>
    </section>

    <section class="mt-12 grid items-start gap-6 md:grid-cols-[2fr_3fr]" aria-labelledby="d-hood">
      <img class="aspect-[4/3] w-full rounded-md bg-hajar object-cover" src="${photoUrl(h.photo, 640, 480)}" width="640" height="480" loading="lazy" alt="${photoAlt(h.photo)}">
      <div>
        <h2 class="h3" id="d-hood">${t('listing.hoodTitle', { name: pick(h.name) })}</h2>
        <p class="mt-3" data-hood-about>${pick(hoodAbout[h.id])}</p>
        <a class="btn-text mt-3 -ms-2" href="index.html?${filter}hood=${h.id}#listings">${t('listing.hoodLink', { name: pick(h.name) })}</a>
      </div>
    </section>

    <section class="card mt-12 p-6" aria-labelledby="d-agent" data-agent>
      <h2 class="h3" id="d-agent">${t('listing.agentTitle')}</h2>
      <div class="mt-4 flex items-center gap-4">
        <span class="grid size-14 shrink-0 place-items-center rounded-full bg-teak font-bold text-hajar" aria-hidden="true">${pick(a.initials)}</span>
        <div><p class="h3">${pick(a.name)}</p><p class="muted">${pick(a.role)}</p></div>
      </div>
      <p class="mt-4">${pick(a.line)}</p>
      <p class="mt-2 muted">${t('listing.agentLead')}</p>
      <dl class="mt-4 space-y-1 text-sm"><div class="flex gap-2"><dt class="font-bold">${t('agents.areas')}:</dt><dd>${pick(a.areas)}</dd></div><div class="flex gap-2"><dt class="font-bold">${t('agents.langs')}:</dt><dd>${pick(a.langs)}</dd></div></dl>
      <a class="btn btn-line mt-5 w-full sm:w-auto" href="${tel(a.phone)}">${icon('phone')}<span class="sr-only">${t('agents.call', { name: pick(a.name) })}: </span><bdi dir="ltr" class="num">${a.phone}</bdi></a>
    </section>`;
}

function render() {
  fixLinks();
  q('[data-back]').setAttribute('href', backUrl(location.search));
  renderListingFooter();
  if (!listing || !details) {
    q('[data-not-found]').hidden = false; q('[data-detail]').hidden = true;
    document.title = `${t('listing.notFoundTitle')} | ${t('brand')}`;
    return;
  }
  q('[data-not-found]').hidden = true; q('[data-detail]').hidden = false;
  $('detail-body').innerHTML = body(listing, details);
  q('[data-asking]').innerHTML = `${icon('pin', 'mt-1 size-5 shrink-0 text-bahr')}<span>${t('listing.asking', { title: pick(listing.title) })}</span>`;
  document.title = t('listing.pageTitle', { title: pick(listing.title) });
  q('meta[name="description"]').content = pick(listing.line);
  renderForm();
  if (!formReady) { prefill(listing.id); formReady = true; }
}

function onLangChange() {
  const sw = q('#lang-switch [data-i18n]'); sw.lang = other();
  renderNav(); render();
  if (details) showShot(shot);
}

document.addEventListener('click', (e) => {
  const step = e.target.closest('[data-step]');
  if (step) { showShot(shot + Number(step.dataset.step)); return; }
  const thumb = e.target.closest('[data-thumb]');
  if (thumb) showShot(Number(thumb.dataset.thumb));
});
$('lang-switch').addEventListener('click', () => setLang(other()));

applyStatic(); initNav(); if (details) initForm();
q('#lang-switch [data-i18n]').lang = other();
renderNav(); render();
onLang(onLangChange);
