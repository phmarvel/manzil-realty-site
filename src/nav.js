// Navigation: link lists and the phone menu (tap, Enter/Space, Esc, outside tap).
import { t } from './i18n.js';

const ITEMS = [['search', '#search'], ['listings', '#listings'], ['hoods', '#hoods'], ['agents', '#agents'], ['contact', '#contact']];
const btn = document.getElementById('menu-btn');
const panel = document.getElementById('menu-panel');
const icon = btn.querySelector('use');

export function navItems() { return ITEMS.map(([k, href]) => ({ href, label: t(`nav.${k}`) })); }

export function renderNav() {
  document.getElementById('nav-desktop').innerHTML = navItems().map((i) => `<a class="inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm px-3 font-medium hover:bg-hajar" href="${i.href}">${i.label}</a>`).join('');
  document.getElementById('nav-mobile').innerHTML = navItems().map((i) => `<a class="flex min-h-12 items-center rounded-sm border-b border-hajar px-1 text-lg font-medium hover:bg-hajar" href="${i.href}" data-menu-link>${i.label}</a>`).join('');
  syncButton();
}

function syncButton() {
  const open = !panel.hidden;
  btn.setAttribute('aria-expanded', String(open));
  btn.setAttribute('aria-label', t(open ? 'nav.menuClose' : 'nav.menuOpen'));
  icon.setAttribute('href', open ? '#i-close' : '#i-menu');
}
function setOpen(open, returnFocus) {
  panel.hidden = !open;
  syncButton();
  if (!open && returnFocus) btn.focus();
}

export function initNav() {
  btn.addEventListener('click', () => setOpen(panel.hidden));
  panel.addEventListener('click', (e) => { if (e.target.closest('[data-menu-link]')) setOpen(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !panel.hidden) setOpen(false, true); });
  document.addEventListener('click', (e) => { if (!panel.hidden && !e.target.closest('header')) setOpen(false); });
  matchMedia('(min-width: 64rem)').addEventListener('change', (m) => { if (m.matches) setOpen(false); });
}
