// Language state and helpers. Arabic (RTL) is the default; the choice is kept in localStorage under "manzil.lang".
import { content } from './data/demo.js';

const KEY = 'manzil.lang';
const LOCALES = { ar: 'ar-SA-u-ca-gregory-nu-latn', en: 'en-GB' };
let lang = 'ar';
try { const v = localStorage.getItem(KEY); if (v === 'en' || v === 'ar') lang = v; } catch { /* storage blocked: keep default */ }
const listeners = [];

export const getLang = () => lang;
export const other = () => (lang === 'ar' ? 'en' : 'ar');
export const onLang = (fn) => listeners.push(fn);
const get = (obj, path) => path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj);
const fill = (s, vars = {}) => String(s).replace(/\{(\w+)\}/g, (m, k) => (vars[k] ?? m));

export function t(path, vars) {
  const v = get(content[lang], path);
  return v == null ? path : fill(v, vars);
}
export const tRaw = (path) => get(content[lang], path);
export const pick = (obj) => obj[lang];

export function plural(path, n, vars = {}) {
  const forms = get(content[lang], path);
  const cat = n === 0 && forms.zero !== undefined ? 'zero' : new Intl.PluralRules(lang).select(n);
  return fill(forms[cat] ?? forms.other, { n: fmtNum(n), ...vars });
}
export const fmtNum = (n) => new Intl.NumberFormat(LOCALES[lang]).format(n);
export const fmtMoney = (n) => new Intl.NumberFormat(LOCALES[lang], { style: 'currency', currency: 'SAR', maximumFractionDigits: 0 }).format(n);
export const fmtDate = (d) => new Intl.DateTimeFormat(LOCALES[lang], { dateStyle: 'full' }).format(d);
export const fmtTime = (hhmm) => { const [h, m] = hhmm.split(':').map(Number); return new Intl.DateTimeFormat(LOCALES[lang], { timeStyle: 'short' }).format(new Date(2000, 0, 1, h, m)); };

export function applyStatic() {
  const root = document.documentElement;
  root.lang = lang;
  root.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.title = t('meta.title');
  document.querySelector('meta[name="description"]').content = t('meta.description');
  document.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
    el.dataset.i18nAttr.split(';').forEach((pair) => { const [attr, path] = pair.split(':'); el.setAttribute(attr, t(path)); });
  });
}

export function setLang(next) {
  lang = next;
  try { localStorage.setItem(KEY, next); } catch { /* ignore */ }
  applyStatic();
  listeners.forEach((fn) => fn(next));
}
