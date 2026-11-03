// === Listing detail pages ===
// Fills the synced footer shell of listing.html (contact, links, photo credits) from the same content and photos as the landing page.
import { photos, company } from './data/demo.js';
import { t, pick } from './i18n.js';
import { navItems } from './nav.js';

const icon = (id) => `<svg class="size-5 shrink-0 text-hajar" aria-hidden="true"><use href="#i-${id}"/></svg>`;
const tel = (p) => `tel:${p.replace(/\s/g, '')}`;
const rowLink = 'inline-flex min-h-11 min-w-11 items-center gap-2 rounded-sm hover:underline';

export function renderListingFooter() {
  const $ = (id) => document.getElementById(id);
  $('footer-contact').innerHTML = `
    <li class="flex items-start gap-2 py-2">${icon('pin')}<span>${t('footer.address')}</span></li>
    <li><a class="${rowLink}" href="${tel(company.phone)}">${icon('phone')}<bdi dir="ltr" class="num">${company.phone}</bdi></a></li>
    <li><a class="${rowLink}" href="mailto:${company.email}">${icon('mail')}<bdi dir="ltr">${company.email}</bdi></a></li>
    <li class="flex items-start gap-2 py-2">${icon('clock')}<span>${t('footer.hours')}</span></li>`;
  $('footer-links').innerHTML = navItems().map((i) => `<li><a class="${rowLink}" href="index.html${i.href}">${i.label}</a></li>`).join('');
  $('credits').innerHTML = Object.values(photos).map((p, i) => {
    const n = i + 1;
    const c = p.commons;
    const text = c ? t('footer.creditsItemCommons', { n, author: `<bdi>${pick(c.author)}</bdi>`, licence: `<bdi>${c.licence}</bdi>` }) : t('footer.creditsItem', { n });
    const href = c ? c.page : `https://images.unsplash.com/photo-${p.id}`;
    return `<li><a class="inline-flex min-h-11 min-w-11 items-center rounded-sm text-sm underline underline-offset-4 hover:text-hajar" href="${href}" target="_blank" rel="noopener" title="${pick(p.alt)}">${text}</a></li>`;
  }).join('');
}
