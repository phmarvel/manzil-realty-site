# Zod (vendored)

- Package: `zod` **3.25.76** (exact), MIT licence in `LICENSE`.
- Source: `npm pack zod@3.25.76` (https://registry.npmjs.org/zod/-/zod-3.25.76.tgz).
- File: `zod.min.js` is a single self-contained ESM bundle of Zod's v3 API (no relative imports). It exports `z` (also as default) and the named API.
- Build command (run in an empty temp folder, nothing is added to the repository's dependencies):

```
npm pack zod@3.25.76 && tar xzf zod-3.25.76.tgz
npx esbuild package/v3/index.js --bundle --format=esm --minify --outfile=zod.min.js
```

Used only by `src/schemas/*.js`: `import { z } from '../../assets/vendor/zod/zod.min.js'`.
