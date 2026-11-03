// === Listing detail pages ===
// Route helpers for listing.html?slug=…: no DOM, so they can be unit-tested.
// The filter keys are the landing page's own (see KEYS in filters.js); status "sale" is the default and is left out.
export const FILTER_KEYS = ['status', 'type', 'hood', 'price', 'beds'];
const SAFE = /^[\w-]+$/;

function pairs(state) {
  return FILTER_KEYS.filter((k) => state[k] && SAFE.test(String(state[k])) && !(k === 'status' && state[k] === 'sale')).map((k) => `${k}=${encodeURIComponent(state[k])}`);
}

// Card link: the property plus the filters that are set right now (built from `state`, not location.search, which is stale while the grid renders).
export function detailHref(listing, state) {
  return `listing.html?${[`slug=${encodeURIComponent(listing.slug)}`, ...pairs(state)].join('&')}`;
}

// { slug, filters } from a query string, or null when there is no usable slug. Unknown keys and unsafe values are dropped.
export function parseDetail(search) {
  const q = new URLSearchParams(search);
  const slug = q.get('slug');
  if (!slug || !SAFE.test(slug)) return null;
  const filters = {};
  FILTER_KEYS.forEach((k) => { const v = q.get(k); if (v && SAFE.test(v)) filters[k] = v; });
  return { slug, filters };
}

// Back link to the landing page's listings with the earlier filters.
export function backUrl(search) {
  const parsed = parseDetail(search);
  const p = parsed ? pairs(parsed.filters) : [];
  return `index.html${p.length ? `?${p.join('&')}` : ''}#listings`;
}
