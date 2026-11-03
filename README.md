# manzil-realty-site

The website of Manzil Realty, a real estate agency in Jeddah, in Arabic and English.

Arabic (right to left) is the default; the language switch (top bar) flips the page to English and back. The choice is kept in `localStorage` under `manzil.lang`. **All content on the page is demo** (see `src/data/demo.js`).

## Run and build

Plain HTML, Tailwind CSS v4 (standalone CLI) and ES modules, no build server.

```sh
# one-time: download the Tailwind v4 standalone CLI (https://github.com/tailwindlabs/tailwindcss/releases) as ./tailwindcss
./tailwindcss -i src/input.css -o assets/app.css --minify   # rebuild CSS after changing classes or tokens
node scripts/prerender.mjs                                   # write the Arabic strings from demo.js into index.html
python3 -m http.server 8000                                  # open http://localhost:8000
```

Commit `assets/app.css` after rebuilding. Never use the in-browser Tailwind script.

## Files

- `src/data/demo.js`: all content, both languages (UI strings, listings, neighbourhoods, agents, photos with alt text). Swap it in one place.
- `src/input.css`: theme tokens (colours, fonts, radius, shadows, type scale), contrast table, focus rings, component classes.
- `src/i18n.js`, `filters.js`, `form.js`, `nav.js`, `main.js`: language, search filters (state in the URL query), form validation, phone menu, rendering.

## Design

Roshan, from Al-Balad in Jeddah. Colours: jiss (lime plaster `#F3EEE4`), hajar (coral stone `#D9CDB8`), teak (roshan timber `#3B2A1D`), bahr (Red Sea teal `#0F5E63`), henna (`#A8431F`, prices and errors). Signature idea: the arched roshan window around the hero photo and the lattice rows, drawn from one SVG mask. Fonts: IBM Plex Sans Arabic (Arabic) and IBM Plex Sans (Latin), self-hosted (SIL OFL, `assets/fonts/LICENSE-OFL.txt`).

## Credits

- Section structure follows the published patterns of Tailwind UI, Flowbite and HyperUI (MIT) blocks: collapsing navbar, split hero, filter bar, product grid, mosaic, team list, split contact form, multi-column footer. No template code was copied; the markup and look are original to this project.
- Photos: Unsplash (free licence, hot-linked) for homes and interiors; real Jeddah photos from Wikimedia Commons, copied into `assets/img/` (the hero, Al-Balad, Al-Shati and the Al-Balad and Al-Shati listings): "Old Jeddah" series by xiquinhosilva (CC BY 4.0), the Jeddah waterfront at evening by the Saudi Press Agency (CC BY-SA 4.0) and a Jeddah coast photo (CC BY-SA 4.0, author not stated). All are credited in the page footer. Unsplash photographer names are still to be added (see `.releasehub-context/needs.json`).
- Fonts: IBM Plex via Fontsource packages (OFL 1.1).
