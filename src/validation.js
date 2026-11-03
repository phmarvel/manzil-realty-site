// MNZ-5: shared timing and painting for the inquiry form and the filters.
// A field is checked when the person leaves it and on submit; after it shows an error it is checked again on every input.

// Run a schema; returns { ok, data, errors } where errors maps a field name to its first message.
export function runSchema(schema, values) {
  const r = schema.safeParse(values);
  if (r.success) return { ok: true, data: r.data, errors: {} };
  const errors = {};
  r.error.issues.forEach((i) => { const k = i.path[0]; if (k !== undefined && !(k in errors)) errors[k] = i.message; });
  return { ok: false, data: null, errors };
}

const ICON = '<svg class="mt-0.5 size-5 shrink-0" aria-hidden="true"><use href="#i-alert"/></svg>';

// field: { root, err, shown } where root is the control (or the fieldset of a radio group) and err is the .err element.
export function paintField(field, message, announce = false) {
  const { root, err } = field;
  field.shown = !!message;
  root.setAttribute('aria-invalid', message ? 'true' : 'false');
  err.setAttribute('aria-live', announce ? 'polite' : 'off');
  if (message) {
    err.innerHTML = `${ICON}<span></span>`;
    err.lastChild.textContent = message;
  } else err.textContent = '';
  err.hidden = !message;
}

// check(name) returns the message for one field, or ''. onChange(field, message) runs after each single-field check.
export function bindFields(fields, check, onChange = () => {}) {
  fields.forEach((f) => {
    const run = (announce) => { const m = check(f.name); paintField(f, m, announce); onChange(f, m); };
    f.root.addEventListener('focusout', (e) => {
      if (f.root.contains(e.relatedTarget) || !document.hasFocus()) return;
      run(true);
    });
    const again = () => { if (f.shown) run(false); };
    f.root.addEventListener('input', again);
    f.root.addEventListener('change', again);
  });
}
