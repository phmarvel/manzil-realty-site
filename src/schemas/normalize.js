// MNZ-5: normalise what people type before a schema checks it. Used inside the schemas (z.preprocess) only.
const ARABIC_INDIC = '٠١٢٣٤٥٦٧٨٩';
const PERSIAN = '۰۱۲۳۴۵۶۷۸۹';
const MARKS = /[‎‏‪-‮⁦-⁩]/g; // invisible direction marks that come with pasted text

export const toLatinDigits = (s) => String(s ?? '')
  .replace(/[٠-٩]/g, (d) => ARABIC_INDIC.indexOf(d))
  .replace(/[۰-۹]/g, (d) => PERSIAN.indexOf(d));

export const trimText = (s) => String(s ?? '').trim();

// Digits only (plus a leading +): spaces, dashes, dots and brackets are dropped.
export const compactPhone = (s) => toLatinDigits(s).replace(MARKS, '').replace(/[\s\-().‐-―−]/g, '');

// A Saudi mobile written as 05XXXXXXXX, 5XXXXXXXX, +9665XXXXXXXX, 009665XXXXXXXX or 9665XXXXXXXX comes out as 05XXXXXXXX.
// Anything else is returned compacted, so the schema can reject it and the message can say what to enter.
export function saudiMobile(s) {
  const v = compactPhone(s);
  const m = v.match(/^(?:(?:\+|00)?966)?0?(5\d{8})$/);
  return m ? `0${m[1]}` : v;
}

// A whole number typed with spaces or thousands separators (, ، ٬) and any kind of digits.
export const wholeNumber = (s) => toLatinDigits(s).replace(MARKS, '').replace(/[\s,،٬_]/g, '');
