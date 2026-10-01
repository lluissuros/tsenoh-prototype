# Tsenoh! prototype

Static site on GitHub Pages: https://lluissuros.github.io/tsenoh-prototype/

- Before any style or content change, read `estilos/README.md` and `estilos/LOG.md`. Add a dated entry to `estilos/LOG.md` when a style decision is made.
- `/` is the current version (v2). `/v1/` is a frozen copy of the first version: do not edit it.
- Text in both languages lives in `copy.js`. Products come from `data.js` (`tools/build-data.py`).
- Brush strokes, marble and the sheep banner come from `tools/build-assets.py` (`uv run --with pillow --with numpy tools/build-assets.py`).
- Commit as `lluissuros@gmail.com`. A push to `main` publishes the site.
