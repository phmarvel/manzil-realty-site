// Writes the Arabic (default language) strings from src/data/demo.js into index.html,
// so the page has real text before JavaScript runs. Run: node scripts/prerender.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { content } from '../src/data/demo.js';

const ar = content.ar;
const get = (path) => path.split('.').reduce((o, k) => o?.[k], ar);
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const file = new URL('../index.html', import.meta.url);
let html = readFileSync(file, 'utf8');

html = html.replace(/<([a-z0-9]+)\b([^>]*?)data-i18n="([^"]+)"([^>]*)>([^<]*)<\/\1>/g, (m, tag, a, path, b, _old) => {
  const v = get(path);
  if (v == null) throw new Error(`missing ar string: ${path}`);
  return `<${tag}${a}data-i18n="${path}"${b}>${esc(v)}</${tag}>`;
});
html = html.replace(/<[a-z0-9]+\b[^>]*data-i18n-attr="[^"]+"[^>]*>/g, (tag) => {
  const spec = tag.match(/data-i18n-attr="([^"]+)"/)[1];
  return spec.split(';').reduce((acc, pair) => {
    const [attr, path] = pair.split(':');
    const v = esc(get(path));
    return new RegExp(`\\s${attr}="[^"]*"`).test(acc) ? acc.replace(new RegExp(`(\\s${attr}=)"[^"]*"`), `$1"${v}"`) : acc.replace(/>$/, ` ${attr}="${v}">`);
  }, tag);
});
writeFileSync(file, html);
