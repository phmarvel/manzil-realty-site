// Inquiry and viewing form: validation, inline errors, live status and a confirmation.
import { listings, neighbourhoods, viewingSlots } from './data/demo.js';
import { t, pick, fmtDate, fmtTime } from './i18n.js';

const $ = (id) => document.getElementById(id);
const form = $('inquiry');
const FIELDS = ['name', 'phone', 'property', 'date', 'time'];
const ctl = { name: $('c-name'), phone: $('c-phone'), property: $('c-property'), date: $('c-date'), time: $('c-time') };
let errors = {};      // field -> error key under contact.form.errors
let success = null;   // last confirmation data, kept so it can be re-rendered on a language change

const intent = () => form.elements.intent.value;
const digits = (s) => s.replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d))).replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)));
export const cleanPhone = (s) => digits(s).replace(/[\s\-().]/g, '');
const pad = (n) => String(n).padStart(2, '0');
const iso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const today = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };

export function check(field) {
  const v = ctl[field].value.trim();
  switch (field) {
    case 'name': return /\p{L}.*\p{L}/u.test(v) ? '' : 'name';
    case 'phone': return /^(?:\+966|00966|966|0)?5\d{8}$/.test(cleanPhone(v)) ? '' : 'phone';
    case 'property': return v ? '' : 'property';
    case 'date': {
      if (intent() !== 'viewing') return '';
      if (!v) return 'dateEmpty';
      const [y, m, d] = v.split('-').map(Number);
      const picked = new Date(y, m - 1, d);
      const max = today(); max.setMonth(max.getMonth() + 3);
      return picked < today() ? 'datePast' : picked > max ? 'dateFar' : '';
    }
    case 'time': return intent() === 'viewing' && !v ? 'time' : '';
    default: return '';
  }
}

function paint(field) {
  const p = $(`c-${field}-err`);
  const key = errors[field];
  ctl[field].setAttribute('aria-invalid', key ? 'true' : 'false');
  if (key) {
    p.innerHTML = `<svg class="mt-0.5 size-4 shrink-0" aria-hidden="true"><use href="#i-alert"/></svg><span>${t(`contact.form.errors.${key}`)}</span>`;
  } else p.textContent = '';
  p.hidden = !key;
}

function paintSummary() {
  const keys = FIELDS.filter((f) => errors[f]);
  $('form-errors').hidden = !keys.length;
  $('form-errors-title').textContent = t('contact.form.errorsTitle');
  $('form-errors-list').innerHTML = keys.map((f) => `<li>${t(`contact.form.errors.${errors[f]}`)}</li>`).join('');
}

export function renderForm() {
  const prop = ctl.property.value;
  ctl.property.innerHTML = `<option value="">${t('contact.form.propertyPh')}</option>`
    + `<optgroup label="${t('contact.form.groupListings')}">${listings.map((l) => `<option value="${l.id}">${pick(l.title)}</option>`).join('')}</optgroup>`
    + `<optgroup label="${t('contact.form.groupHoods')}">${neighbourhoods.map((h) => `<option value="hood:${h.id}">${pick(h.name)}</option>`).join('')}</optgroup>`
    + `<option value="any">${t('contact.form.notSure')}</option>`;
  ctl.property.value = prop;
  const time = ctl.time.value;
  ctl.time.innerHTML = `<option value="">${t('contact.form.timePh')}</option>` + viewingSlots.map((s) => `<option value="${s}">${fmtTime(s)}</option>`).join('');
  ctl.time.value = time;
  FIELDS.forEach(paint); paintSummary();
  if (success) showSuccess(success);
}

const propertyLabel = (v) => {
  if (v === 'any') return t('contact.form.notSure');
  if (v.startsWith('hood:')) return pick(neighbourhoods.find((h) => h.id === v.slice(5)).name);
  return pick(listings.find((l) => l.id === v).title);
};

function showSuccess(s) {
  const viewing = s.intent === 'viewing';
  const [y, m, d] = (s.date || '2000-01-01').split('-').map(Number);
  $('success-text').innerHTML = t(viewing ? 'contact.form.successViewing' : 'contact.form.successInquiry', {
    name: `<bdi>${s.name}</bdi>`, phone: `<bdi dir="ltr">${s.phone}</bdi>`, property: `<bdi>${propertyLabel(s.property)}</bdi>`,
    date: viewing ? fmtDate(new Date(y, m - 1, d)) : '', time: viewing ? fmtTime(s.time) : '',
  });
  form.hidden = true;
  $('form-success').hidden = false;
}

// There is no backend in this demo: the request resolves locally, and fails only when the browser is offline.
const send = () => new Promise((resolve, reject) => setTimeout(() => (navigator.onLine === false ? reject(new Error('offline')) : resolve()), 700));

function syncIntent() {
  const viewing = intent() === 'viewing';
  $('viewing-fields').hidden = !viewing;
  ctl.date.required = viewing; ctl.time.required = viewing;
  if (!viewing) { errors.date = errors.time = ''; paint('date'); paint('time'); paintSummary(); }
}

export function prefill(propertyId) {
  ctl.property.value = propertyId;
  form.elements.intent.value = 'inquiry';
  syncIntent(); errors.property = ''; paint('property'); paintSummary();
}

export function initForm() {
  const t0 = today(); const max = new Date(t0); max.setMonth(max.getMonth() + 3);
  ctl.date.min = iso(t0); ctl.date.max = iso(max);

  form.addEventListener('change', (e) => { if (e.target.name === 'intent') syncIntent(); });
  FIELDS.forEach((f) => {
    const re = () => { if (errors[f]) { errors[f] = check(f); paint(f); paintSummary(); } };
    ctl[f].addEventListener('input', re); ctl[f].addEventListener('change', re);
    ctl[f].addEventListener('blur', () => { if (ctl[f].value.trim() || errors[f]) { errors[f] = check(f); paint(f); paintSummary(); } });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    $('form-fail').hidden = true;
    errors = {};
    FIELDS.forEach((f) => { errors[f] = check(f); paint(f); });
    paintSummary();
    const first = FIELDS.find((f) => errors[f]);
    if (first) { ctl[first].focus(); return; }
    const btn = $('c-submit');
    btn.disabled = true; btn.textContent = t('contact.form.sending');
    try {
      await send();
      success = { intent: intent(), name: ctl.name.value.trim(), phone: cleanPhone(ctl.phone.value), property: ctl.property.value, date: ctl.date.value, time: ctl.time.value };
      showSuccess(success);
      $('form-success').focus();
    } catch {
      $('form-fail').hidden = false;
    } finally {
      btn.disabled = false; btn.textContent = t('contact.form.submit');
    }
  });

  $('form-again').addEventListener('click', () => {
    success = null; form.reset(); errors = {}; syncIntent(); FIELDS.forEach(paint); paintSummary();
    $('form-success').hidden = true; form.hidden = false; ctl.name.focus();
  });
  syncIntent();
}
