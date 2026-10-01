# Tsenoh! prototype

Static site on GitHub Pages: https://lluissuros.github.io/tsenoh-prototype/

- At the start of a session, read `estilos/CONTINUAR-PROTO3.md` for the handoff, then `estilos/README.md` and `estilos/LOG.md` before any style/content change. Add a dated entry to `estilos/LOG.md` when a style decision is made.
- `/v3/` is the current hybrid prototype. `/` preserves v2; `/v1/` is a frozen copy of the first version: do not edit it.
- For v3, text in both languages lives in `v3/copy.js`; behaviour/styles are `v3/app.js` and `v3/styles.css`. v2 text lives in `copy.js`. Products come from `data.js` (`tools/build-data.py`).
- Brush strokes, marble and the sheep banner come from `tools/build-assets.py` (`uv run --with pillow --with numpy tools/build-assets.py`).
- Commit as `lluissuros@gmail.com`. A push to `main` publishes the site.

- Luis authorized direct commits/push to `main`, without pull requests. Preserve Proto 1 and Proto 2 when working on Proto 3.
