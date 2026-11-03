// Inquiry and viewing form: schema validation (src/schemas/inquiry.js), inline errors, an error summary and a confirmation.
import { listings, neighbourhoods, viewingSlots } from './data/demo.js';
import { t, pick, fmtDate, fmtTime } from './i18n.js';
import { inquirySchema } from './schemas/inquiry.js';
import { compactPhone } from './schemas/normalize.js';
import { runSchema, paintField, bindFields } from './validation.js';

const $ = (id) => document.getElementById(id);
const form = $('inquiry');
const FIELDS = ['name', 'phone', 'property', 'date', 'time', 'message'];
const ctl = { name: $('c-name'), phone: $('c-phone'), property: $('c-property'), date: $('c-date'), time: $('c-time'), message: $('c-message') };
// Each field: the element that carries aria-invalid (the fieldset for the time radios) and its error element.
const fields = FIELDS.map((name) => ({ name, root: ctl[name], err: $(`c-${name}-err`), shown: false }));
const byName = Object.fromEntries(fields.map((f) => [f.name, f]));
let success = null;   // last confirmation data, kept so it can be re-rendered on a language change
let sending = false;  // true while the request runs, so a second press does nothing
let summary = {};     // field -> message currently listed in the error summary

const intent = () => form.elements.intent.value;
export const cleanPhone = compactPhone;
const pad = (n) => String(n).padStart(2, '0');
const iso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const today = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };
const values = () => ({
  intent: intent(), name: ctl.name.value, phone: ctl.phone.value, property: ctl.property.value,
  date: ctl.date.value, time: form.elements.time?.value || '', message: ctl.message.value,
});
const validate = () => runSchema(inquirySchema(t), values());

// The message for one field, or '' when it is fine.
export function check(field) { return validate().errors[field] || ''; }

// Link target of a field in the summary: the field itself, or the first radio of a group.
const target = (f) => (f === 'time' ? $('c-time-0') : ctl[f]);

function paintSummary(errors) {
  summary = {};
  FIELDS.forEach((f) => { if (errors[f]) summary[f] = errors[f]; });
  const keys = Object.keys(summary);
  $('form-errors').hidden = !keys.length;
  $('form-errors-title').textContent = t('contact.form.errorsTitle');
  $('form-errors-list').innerHTML = keys.map((f) => `<li><a class="underline underline-offset-4" href="#${target(f).id}" data-field="${f}"></a></li>`).join('');
  $('form-errors-list').querySelectorAll('a').forEach((a) => { a.textContent = summary[a.dataset.field]; });
}

// Repaint the fields that show an error (after a language change the messages are re-made in the new language).
function refresh() {
  const { errors } = validate();
  fields.forEach((f) => { if (f.shown) paintField(f, errors[f.name] || ''); });
  if (!$('form-errors').hidden) paintSummary(Object.fromEntries(Object.keys(summary).map((k) => [k, errors[k]]).filter(([, v]) => v)));
}

export function renderForm() {
  const prop = ctl.property.value;
  ctl.property.innerHTML = `<option value="">${t('contact.form.propertyPh')}</option>`
    + `<optgroup label="${t('contact.form.groupListings')}">${listings.map((l) => `<option value="${l.id}">${pick(l.title)}</option>`).join('')}</optgroup>`
    + `<optgroup label="${t('contact.form.groupHoods')}">${neighbourhoods.map((h) => `<option value="hood:${h.id}">${pick(h.name)}</option>`).join('')}</optgroup>`
    + `<option value="any">${t('contact.form.notSure')}</option>`;
  ctl.property.value = prop;
  const time = form.elements.time?.value;
  $('c-time-opts').innerHTML = viewingSlots.map((s, i) => `<label><input type="radio" name="time" id="c-time-${i}" value="${s}"${s === time ? ' checked' : ''}><span>${fmtTime(s)}</span></label>`).join('');
  refresh();
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
  ctl.date.required = viewing;
  if (!viewing) { paintField(byName.date, ''); paintField(byName.time, ''); refresh(); }
}

export function prefill(propertyId) {
  ctl.property.value = propertyId;
  form.elements.intent.value = 'inquiry';
  syncIntent(); paintField(byName.property, ''); refresh();
}

const busy = (on) => {
  const btn = $('c-submit');
  btn.setAttribute('aria-busy', on ? 'true' : 'false');
  btn.innerHTML = on ? `<svg class="spin size-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12a9 9 0 1 1-6.2-8.55" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg><span></span>` : '<span></span>';
  btn.lastChild.textContent = t(on ? 'contact.form.sending' : 'contact.form.submit');
};

export function initForm() {
  const t0 = today(); const max = new Date(t0); max.setMonth(max.getMonth() + 3);
  ctl.date.min = iso(t0); ctl.date.max = iso(max);

  form.addEventListener('change', (e) => { if (e.target.name === 'intent') syncIntent(); });
  // Time radios sit in a fieldset; the fieldset is "left" when focus goes outside it.
  bindFields(fields, check, () => { if (!$('form-errors').hidden) refresh(); });

  $('form-errors-list').addEventListener('click', (e) => {
    const a = e.target.closest('a[data-field]');
    if (!a) return;
    e.preventDefault();
    target(a.dataset.field).focus();
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (sending) return;
    $('form-fail').hidden = true;
    const r = validate();
    fields.forEach((f) => paintField(f, r.errors[f.name] || ''));
    paintSummary(r.errors);
    if (!r.ok) { $('form-errors').focus(); return; }
    sending = true; busy(true);
    try {
      await send();
      success = { intent: r.data.intent, name: r.data.name, phone: r.data.phone, property: r.data.property, date: r.data.date || '', time: r.data.time || '' };
      showSuccess(success);
      $('form-success').focus();
    } catch {
      $('form-fail').hidden = false;
    } finally {
      sending = false; busy(false);
    }
  });

  $('form-again').addEventListener('click', () => {
    success = null; form.reset(); syncIntent(); fields.forEach((f) => paintField(f, '')); paintSummary({});
    $('form-success').hidden = true; form.hidden = false; ctl.name.focus();
  });
  syncIntent();
}
