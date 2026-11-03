// Search filters and the listing grid. State lives in the URL query (?status=rent&hood=albalad…).
import { listings, neighbourhoods, photos, photoUrl, priceSteps } from './data/demo.js';
import { t, tRaw, pick, plural, fmtNum, fmtMoney, getLang } from './i18n.js';

const $ = (id) => document.getElementById(id);
const form = $('filters');
const setMode = (v) => { form.querySelector(`input[name="status"][value="${v}"]`).checked = true; };
const KEYS = ['status', 'type', 'hood', 'price', 'beds'];
export const state = { status: 'sale', type: '', hood: '', price: '', beds: '' };
const hoodName = (id) => pick(neighbourhoods.find((h) => h.id === id).name);

function readUrl() {
  const q = new URLSearchParams(location.search);
  KEYS.forEach((k) => { if (q.has(k)) state[k] = q.get(k); });
  if (state.status !== 'rent') state.status = 'sale';
}
function writeUrl() {
  const q = new URLSearchParams();
  KEYS.forEach((k) => { if (state[k] && !(k === 'status' && state[k] === 'sale')) q.set(k, state[k]); });
  const s = q.toString();
  history.replaceState(null, '', s ? `?${s}${location.hash}` : `${location.pathname}${location.hash}`);
}

const opt = (v, label, sel) => `<option value="${v}"${sel ? ' selected' : ''}>${label}</option>`;

export function renderControls() {
  const types = tRaw('search.types');
  $('f-type').innerHTML = opt('', t('search.any'), !state.type) + Object.keys(types).map((k) => opt(k, types[k], state.type === k)).join('');
  $('f-hood').innerHTML = opt('', t('search.anyHood'), !state.hood) + neighbourhoods.map((h) => opt(h.id, pick(h.name), state.hood === h.id)).join('');
  $('f-price').innerHTML = opt('', t('search.anyPrice'), !state.price) + priceSteps[state.status].map((p) => opt(p, fmtMoney(p), String(p) === state.price)).join('');
  $('f-beds').innerHTML = opt('', t('search.anyBeds'), !state.beds) + [1, 2, 3, 4, 5].map((n) => opt(n, t('search.bedsMin', { n: fmtNum(n) }), String(n) === state.beds)).join('');
  $('f-price-label').innerHTML = `${t('search.price')} <span class="text-sm font-normal text-ink-soft">(${t(state.status === 'rent' ? 'search.priceNoteRent' : 'search.priceNoteSale')})</span>`;
  setMode(state.status);
}

const icon = (id) => `<svg class="size-5 shrink-0" aria-hidden="true"><use href="#i-${id}"/></svg>`;

function card(l) {
  const ph = photos[l.photo];
  const note = l.status === 'rent' ? t('listings.perYear') : t('listings.asking');
  return `<li><article class="card flex h-full flex-col" data-listing-id="${l.id}" data-listing-slug="${l.slug}">
    <div class="relative">
      <img class="aspect-[4/3] w-full bg-hajar object-cover" src="${photoUrl(l.photo, 720, 540)}" width="720" height="540" loading="lazy" alt="${ph.alt[getLang()]}">
      <span class="absolute start-3 top-3 rounded-sm bg-teak px-3 py-1 text-sm font-bold text-jiss">${t(l.status === 'rent' ? 'listings.statusRent' : 'listings.statusSale')}</span>
    </div>
    <div class="flex flex-1 flex-col p-5">
      <p class="num text-2xl font-bold text-henna">${fmtMoney(l.price)} <span class="text-sm font-normal text-ink-soft">${note}</span></p>
      <h3 class="h3 mt-2">${pick(l.title)}</h3>
      <p class="mt-1 flex items-center gap-1 text-ink-soft">${icon('pin')}<span>${hoodName(l.hood)}</span></p>
      <p class="mt-2 text-ink-soft">${pick(l.line)}</p>
      <ul class="num mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-hajar pt-4 text-sm">
        <li class="flex items-center gap-1.5">${icon('area')}<span>${fmtNum(l.area)} ${t('listings.areaUnit')}</span></li>
        <li class="flex items-center gap-1.5">${icon('bed')}<span>${plural('listings.bedsN', l.beds)}</span></li>
        <li class="flex items-center gap-1.5">${icon('bath')}<span>${plural('listings.bathsN', l.baths)}</span></li>
      </ul>
      <div class="mt-auto pt-5"><button type="button" class="btn btn-line w-full" data-ask="${l.id}">${t('listings.ask')}</button></div>
    </div></article></li>`;
}

export function matches(l) {
  return l.status === state.status && (!state.type || l.type === state.type) && (!state.hood || l.hood === state.hood)
    && (!state.price || l.price <= Number(state.price)) && (!state.beds || l.beds >= Number(state.beds));
}

export function renderListings() {
  const list = listings.filter(matches);
  $('listing-grid').innerHTML = list.map(card).join('');
  $('listing-empty').hidden = list.length > 0;
  $('results-count').textContent = plural('listings.count', list.length);
}

export function countByHood(id) { return listings.filter((l) => l.hood === id).length; }

export function setFilters(patch) {
  Object.assign(state, patch);
  renderControls(); renderListings(); writeUrl();
}

export function initFilters() {
  readUrl();
  form.addEventListener('change', (e) => {
    const patch = { [e.target.name]: e.target.value };
    if (e.target.name === 'status') patch.price = '';
    setFilters(patch);
  });
  const reset = () => setFilters({ type: '', hood: '', price: '', beds: '' });
  $('f-reset').addEventListener('click', reset);
  $('empty-reset').addEventListener('click', reset);
}
