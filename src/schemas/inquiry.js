// MNZ-5: the schema of the inquiry and viewing form. Messages come from content (src/data/demo.js) through `t`.
import { z } from '../../assets/vendor/zod/zod.min.js';
import { trimText, saudiMobile } from './normalize.js';

const toDay = (iso) => { const [y, m, d] = String(iso).split('-').map(Number); return new Date(y, m - 1, d); };

// t: the i18n `t` function of the current language. now: injectable for tests.
export function inquirySchema(t, now = new Date()) {
  const e = (k) => t(`contact.form.errors.${k}`);
  const f = (k) => t(`forms.errors.${k}`);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const last = new Date(today); last.setMonth(last.getMonth() + 3);

  const base = z.object({
    name: z.preprocess(trimText, z.string().min(1, f('nameEmpty')).regex(/\p{L}.*\p{L}/u, e('name'))),
    phone: z.preprocess(saudiMobile, z.string().min(1, f('phoneEmpty')).regex(/^05\d{8}$/, e('phone'))),
    property: z.string().min(1, e('property')),
    message: z.preprocess(trimText, z.string().max(500, f('notesLong'))),
  });
  const inquiry = base.extend({ intent: z.literal('inquiry'), date: z.string().optional(), time: z.string().optional() });
  const viewing = base.extend({
    intent: z.literal('viewing'),
    date: z.string().min(1, e('dateEmpty'))
      .refine((v) => !v || toDay(v) >= today, e('datePast'))
      .refine((v) => !v || toDay(v) <= last, e('dateFar')),
    time: z.string().min(1, e('time')),
  });
  return z.discriminatedUnion('intent', [inquiry, viewing]);
}
