// Entry point: renders every section from src/data/demo.js and wires the modules.
import { photos, photoUrl, neighbourhoods, agents, company, listings } from './data/demo.js';
import { applyStatic, setLang, onLang, getLang, other, t, tRaw, pick, plural } from './i18n.js';
import { renderNav, initNav, navItems } from './nav.js';
import { initFilters, renderControls, renderListings, setFilters, countByHood, state } from './filters.js';
import { initForm, renderForm, prefill } from './form.js';
import { waCardLink, initWhatsapp } from './whatsapp.js';

const $ = (id) => document.getElementById(id);
const icon = (id, cls = 'size-5 shrink-0') => `<svg class="${cls}" aria-hidden="true"><use href="#i-${id}"/></svg>`;
const tel = (p) => `tel:${p.replace(/\s/g, '')}`;
const rowLink = 'inline-flex min-h-11 min-w-11 items-center gap-2 rounded-sm hover:underline';

function renderStatic() {
  const hero = $('hero-img');
  hero.src = photoUrl('hero', 960, 1200);
  hero.alt = pick(photos.hero.alt);
  $('hero-facts').innerHTML = tRaw('hero.facts').map((f) => `<div><dt class="text-sm muted">${f.k}</dt><dd class="font-bold">${f.v}</dd></div>`).join('');
  const sw = document.querySelector('#lang-switch [data-i18n]');
  sw.lang = other();

  $('hood-grid').innerHTML = neighbourhoods.map((h, i) => {
    const big = i === 0;
    return `<li class="${big ? 'col-span-2 lg:row-span-2' : ''}"><button type="button" class="card group flex h-full w-full flex-col text-start transition-colors hover:border-bahr" data-hood="${h.id}" aria-label="${t('hoods.view', { name: pick(h.name) })}">
      <img class="w-full flex-1 bg-hajar object-cover ${big ? 'aspect-[4/3] lg:aspect-auto lg:min-h-80' : 'aspect-[4/3]'}" src="${photoUrl(h.photo, big ? 960 : 480, big ? 720 : 360)}" width="${big ? 960 : 480}" height="${big ? 720 : 360}" loading="lazy" alt="${pick(photos[h.photo].alt)}">
      <span class="block bg-teak p-4 text-jiss"><span class="block text-xl font-bold">${pick(h.name)}</span><span class="block text-sm text-hajar">${plural('hoods.count', countByHood(h.id))}</span>${big ? `<span class="mt-2 block max-w-[48ch] text-hajar">${pick(h.line)}</span>` : ''}</span>
    </button></li>`;
  }).join('');

  $('agent-grid').innerHTML = agents.map((a) => `<li class="card flex flex-col p-6">
    <div class="flex items-center gap-4">
      <span class="grid size-14 shrink-0 place-items-center rounded-full bg-teak font-bold text-hajar" aria-hidden="true">${pick(a.initials)}</span>
      <div><h3 class="h3">${pick(a.name)}</h3><p class="muted">${pick(a.role)}</p></div>
    </div>
    <p class="mt-4">${pick(a.line)}</p>
    <dl class="mt-4 space-y-1 text-sm"><div class="flex gap-2"><dt class="font-bold">${t('agents.areas')}:</dt><dd>${pick(a.areas)}</dd></div><div class="flex gap-2"><dt class="font-bold">${t('agents.langs')}:</dt><dd>${pick(a.langs)}</dd></div></dl>
    ${waCardLink(a)}
    <a class="btn btn-line mt-3 w-full" href="${tel(a.phone)}">${icon('phone')}<span class="sr-only">${t('agents.call', { name: pick(a.name) })}: </span><bdi dir="ltr" class="num">${a.phone}</bdi></a>
  </li>`).join('');

  $('steps').innerHTML = tRaw('contact.steps').map((s, i) => `<li class="flex items-start gap-4"><span class="grid size-9 shrink-0 place-items-center rounded-full border-2 border-hajar font-bold" aria-hidden="true">${i + 1}</span><span class="pt-1">${s}</span></li>`).join('');

  $('footer-contact').innerHTML = `
    <li class="flex items-start gap-2 py-2">${icon('pin', 'mt-1 size-5 shrink-0 text-hajar')}<span>${t('footer.address')}</span></li>
    <li><a class="${rowLink}" href="${tel(company.phone)}">${icon('phone', 'size-5 shrink-0 text-hajar')}<bdi dir="ltr" class="num">${company.phone}</bdi></a></li>
    <li><a class="${rowLink}" href="mailto:${company.email}">${icon('mail', 'size-5 shrink-0 text-hajar')}<bdi dir="ltr">${company.email}</bdi></a></li>
    <li class="flex items-start gap-2 py-2">${icon('clock', 'mt-1 size-5 shrink-0 text-hajar')}<span>${t('footer.hours')}</span></li>`;
  $('footer-links').innerHTML = navItems().map((i) => `<li><a class="${rowLink}" href="${i.href}">${i.label}</a></li>`).join('');
  $('credits').innerHTML = Object.values(photos).map((p, i) => {
    const n = i + 1;
    const c = p.commons;
    const text = c ? t('footer.creditsItemCommons', { n, author: `<bdi>${pick(c.author)}</bdi>`, licence: `<bdi>${c.licence}</bdi>` }) : t('footer.creditsItem', { n });
    const href = c ? c.page : `https://images.unsplash.com/photo-${p.id}`;
    return `<li><a class="inline-flex min-h-11 min-w-11 items-center rounded-sm text-sm underline underline-offset-4 hover:text-hajar" href="${href}" target="_blank" rel="noopener" title="${pick(p.alt)}">${text}</a></li>`;
  }).join('');
}

function renderAll() {
  renderNav(); renderStatic(); renderControls(); renderListings(); renderForm();
}

document.addEventListener('click', (e) => {
  const hood = e.target.closest('[data-hood]');
  if (hood) {
    const id = hood.dataset.hood;
    const has = (st) => listings.some((l) => l.hood === id && l.status === st);
    const alt = state.status === 'sale' ? 'rent' : 'sale';
    setFilters({ hood: id, type: '', price: '', beds: '', status: !has(state.status) && has(alt) ? alt : state.status });
    $('listings').scrollIntoView();
    return;
  }
  const ask = e.target.closest('[data-ask]');
  if (ask) { prefill(ask.dataset.ask); $('contact').scrollIntoView(); $('c-name').focus({ preventScroll: true }); }
});

$('lang-switch').addEventListener('click', () => setLang(other()));
applyStatic(); initNav(); initFilters(); initForm(); renderAll();
initWhatsapp();
onLang(renderAll);
