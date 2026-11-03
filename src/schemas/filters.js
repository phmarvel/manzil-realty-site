// MNZ-5: the schema of the search filters. Only the maximum price is typed; the other filters are choices from lists.
import { z } from '../../assets/vendor/zod/zod.min.js';
import { wholeNumber } from './normalize.js';

export function filtersSchema(t) {
  const f = (k) => t(`forms.errors.${k}`);
  const price = z.preprocess(wholeNumber, z.string()
    .regex(/^\d*$/, f('price'))
    .refine((v) => v === '' || Number(v) > 0, f('priceZero'))
    .refine((v) => v === '' || Number(v) <= 100000000, f('priceMax'))
    .transform((v) => (v === '' ? '' : String(Number(v)))));
  return z.object({ price });
}
