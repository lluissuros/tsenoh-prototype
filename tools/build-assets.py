"""Build v2 assets: brush strokes cut from Eva's references, marble backgrounds, sheep banner.

Run: uv run --with pillow --with numpy tools/build-assets.py
"""
import io, urllib.request
import numpy as np
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
REF = ROOT / "estilos" / "referencias"
OUT = ROOT / "assets"
SHEEP = "https://tsenoh.com/cdn/shop/files/OVEJAS_del_pueblo_de_Cris_Compress.jpg"  # tsenoh.com banner

# (reference, crop box in px, stroke is light?, paper level, erase box) -> brush/<name>.png,
# a white-on-transparent mask that CSS tints with mask-image.
BRUSH = {
    "star-big": ("pinceladas-blancas-sobre-negro.jpg", (70, 50, 420, 510), True, .28, None),
    "star-small": ("pinceladas-blancas-sobre-negro.jpg", (715, 15, 875, 220), True, .28, None),
    "star-tiny": ("pinceladas-blancas-sobre-negro.jpg", (240, 545, 370, 700), True, .28, None),
    "moon": ("pinceladas-blancas-sobre-negro.jpg", (860, 200, 1170, 560), True, .28, None),
    "star-ink": ("estrellas-negras-bufandas.jpg", (870, 165, 1180, 565), False, .28, (0, 0, 70, 80)),
    "star-ink-small": ("estrellas-negras-bufandas.jpg", (745, 65, 915, 225), False, .28, None),
    "moon-marker": ("rotulador-harvest-moon.jpg", (60, 60, 320, 330), False, .62, None),
}


def brush(name, src, box, light, paper, erase):
    g = np.asarray(Image.open(REF / src).convert("L").crop(box), dtype=np.float32) / 255
    a = g if light else 1 - g
    a = np.clip((a - paper) / 0.2, 0, 1)  # drop the paper, keep the dry-brush edges
    if erase:
        a[erase[1]:erase[3], erase[0]:erase[2]] = 0
    h, w = a.shape
    rgba = np.zeros((h, w, 4), np.uint8)
    rgba[..., :3] = 255
    rgba[..., 3] = (a * 255).astype(np.uint8)
    im = Image.fromarray(rgba, "RGBA")
    im = im.crop(im.getbbox())
    im.save(OUT / "brush" / f"{name}.png", optimize=True)


def noise(h, w, scale, seed):
    """Smooth, tileable value noise in [-1, 1]: a random grid tiled 3x3, upsampled, centre kept."""
    rng = np.random.default_rng(seed)
    gh, gw = max(2, h // scale), max(2, w // scale)
    small = Image.fromarray((np.tile(rng.random((gh, gw)), (3, 3)) * 255).astype(np.uint8))
    big = np.asarray(small.resize((w * 3, h * 3), Image.BICUBIC), np.float32) / 127.5 - 1
    return big[h:2 * h, w:2 * w]


def sample(field, x, y):
    """Bilinear lookup of field at float coords (wraps at the edges)."""
    h, w = field.shape
    x0, y0 = np.floor(x).astype(int), np.floor(y).astype(int)
    fx, fy = x - x0, y - y0
    x0, y0, x1, y1 = x0 % w, y0 % h, (x0 + 1) % w, (y0 + 1) % h
    top = field[y0, x0] * (1 - fx) + field[y0, x1] * fx
    bot = field[y1, x0] * (1 - fx) + field[y1, x1] * fx
    return top * (1 - fy) + bot * fy


def marble(name, colors, seed, w=1600, h=1600):
    """Paper marbling: stripes dragged through three rounds of noise warping."""
    y, x = np.mgrid[0:h, 0:w].astype(np.float32)
    fx = [noise(h, w, s, seed + i) for i, s in enumerate((380, 140))]
    fy = [noise(h, w, s, seed + 20 + i) for i, s in enumerate((380, 140))]
    for amp in (220, 120, 50):
        dx = sum(sample(f, x, y) * k for f, k in zip(fx, (1, .45)))
        dy = sum(sample(f, x, y) * k for f, k in zip(fy, (1, .45)))
        x, y = x + dx * amp, y + dy * amp
    v = (np.sin(x / 26 + y / 70) + 1) / 2
    v = v ** 2.2  # wide coloured pools, thin pale veins
    stops = np.linspace(0, 1, len(colors))
    rgb = np.stack([np.interp(v, stops, [c[i] for c in colors]) for i in range(3)], -1)
    grain = noise(h, w, 1, seed + 99) * 6
    rgb = np.clip(rgb + grain[..., None], 0, 255).astype(np.uint8)
    Image.fromarray(rgb).save(OUT / f"{name}.jpg", quality=84, optimize=True, progressive=True)


def hexrgb(s):
    return tuple(int(s[i:i + 2], 16) for i in (1, 3, 5))


if __name__ == "__main__":
    (OUT / "brush").mkdir(parents=True, exist_ok=True)
    for name, args in BRUSH.items():
        brush(name, *args)
    marble("marble-lilac", [hexrgb(c) for c in ["#7f6ae0", "#a593ef", "#c9bcf6", "#f6f2ff"]], 3)
    marble("marble-pink", [hexrgb(c) for c in ["#ea7fb4", "#f4a9cb", "#f9d0e2", "#fff5f9"]], 8)
    req = urllib.request.Request(SHEEP, headers={"User-Agent": "Mozilla/5.0"})
    sheep = Image.open(io.BytesIO(urllib.request.urlopen(req).read())).convert("RGB")
    for w in (1200, 2400):
        sheep.resize((w, round(sheep.height * w / sheep.width)), Image.LANCZOS).save(OUT / f"ovejas-{w}.jpg", quality=80, optimize=True, progressive=True)
