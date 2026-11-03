// === Listing detail pages ===
// Copies the shared page shell (icon sprite, demo note, header, inquiry form, footer) from index.html into the marked
// slots of listing.html, so the two pages cannot drift. index.html is only read, never written.
// Run before scripts/prerender.mjs: node scripts/listing-sync.mjs && node scripts/prerender.mjs listing.html
import { readFileSync, writeFileSync } from 'node:fs';

const index = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const file = new URL('../listing.html', import.meta.url);
let page = readFileSync(file, 'utf8');
const fail = (m) => { throw new Error(`listing-sync: ${m}`); };

// Each block is cut from index.html between a start marker and the end of its closing tag text.
const after = (from, needle, start) => { const i = index.indexOf(needle, from); if (i < 0) fail(`"${needle}" not found in index.html`); return i + (start ? 0 : needle.length); };
const cut = (startTag, endTag) => { const s = after(0, startTag, true); const e = after(s, endTag, false); return index.slice(s, e); };
const formEnd = (() => {
  const s = after(0, '<form id="inquiry"', true);
  const again = after(s, 'id="form-again"', true);
  const btnEnd = after(again, '</button>', false);
  return after(btnEnd, '</div>', false); // closes #form-success
})();
const blocks = {
  sprite: cut('<svg width="0" height="0"', '</defs>\n  </svg>'),
  note: cut('<aside', '</aside>'),
  header: cut('<header', '</header>'),
  form: index.slice(after(0, '<form id="inquiry"', true), formEnd),
  footer: cut('<footer', '</footer>'),
};

// The form must still carry every id form.js reads.
['c-name', 'c-phone', 'c-property', 'c-date', 'c-time', 'c-submit', 'form-errors', 'form-errors-list', 'form-success', 'success-text', 'form-again', 'viewing-fields'].forEach((id) => {
  if (!blocks.form.includes(`id="${id}"`)) fail(`form block lost id "${id}"`);
});

for (const [name, html] of Object.entries(blocks)) {
  const re = new RegExp(`(<!-- sync:${name} -->)[\\s\\S]*?(<!-- /sync:${name} -->)`);
  if (!re.test(page)) fail(`markers for "${name}" missing in listing.html`);
  page = page.replace(re, (_, a, b) => `${a}\n${html}\n${b}`);
}
writeFileSync(file, page);
console.log('listing.html synced from index.html');
