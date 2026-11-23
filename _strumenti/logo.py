# Toglie lo sfondo nero dal logo Zanzibar e prepara le versioni per il sito.
# Uso: python3 _strumenti/logo.py _strumenti/logo-originale.jpeg <cartella-uscita>   (servono Pillow e numpy)
# Poi copiare logo-*.png/webp in assets/logo, icone/* in assets/icone e favicon.ico nella cartella del sito.
import sys, os, struct, io
from PIL import Image
import numpy as np
SRC, OUT = sys.argv[1], sys.argv[2]
os.makedirs(OUT, exist_ok=True)
a = np.asarray(Image.open(SRC).convert('RGB')).astype(np.float64)
H, W, _ = a.shape
R = np.array([199., 71., 46.]); Wh = np.array([255., 255., 255.])
INK = np.array([21., 18., 15.])
# 1) scomposizione p = x*Bianco + y*Rosso (su nero), x,y >= 0
M = np.stack([Wh, R], 1)                     # 3x2
P = a.reshape(-1, 3).T                        # 3xN
G = M.T @ M; xy = np.linalg.solve(G, M.T @ P) # 2xN
x, y = xy
neg_x = x < 0; neg_y = y < 0
y = np.where(neg_x, (R @ P) / (R @ R), y); x = np.where(neg_x, 0, x)
x = np.where(neg_y & ~neg_x, (Wh @ P) / (Wh @ Wh), x); y = np.where(neg_y & ~neg_x, 0, y)
x = np.clip(x, 0, None); y = np.clip(y, 0, None)
alpha = np.clip(x + y, 0, 1)
quota_bianco = np.where(x + y > 1e-6, x / np.maximum(x + y, 1e-6), 1)
# rumore del JPEG sul nero: ginocchio morbido
t0 = 0.035
alpha = np.clip((alpha - t0) / (1 - t0), 0, 1)
alpha = alpha.reshape(H, W); quota_bianco = quota_bianco.reshape(H, W)
# 2) il rombo rosso (con l'illustrazione) resta pieno
red = (a[..., 0] > 150) & (a[..., 1] < 110) & (a[..., 2] < 90) & (a[..., 0] - a[..., 1] > 80)
red[560:] = False
ys, xs = np.nonzero(red)
cx = (xs.min() + xs.max()) / 2; cy = (ys.min() + ys.max()) / 2
yy, xx = np.mgrid[0:H, 0:W]
d1 = np.abs(xx - cx) + np.abs(yy - cy)
h = 238.5                              # bordo del rombo (metà intensità, misurato)
print('rombo', cx, cy, h)
geom = np.clip((h - d1) / np.sqrt(2) + 0.5, 0, 1)   # copertura geometrica del rombo
pieno = d1 <= 236
fascia = (d1 > 236) & (d1 < 257.5)      # bordo del rombo + spazio nero fino alla cornice bianca
alpha_tot = np.where(pieno, 1.0, np.where(fascia, geom, alpha))
dentro = pieno | fascia
orig_un = np.clip(a / np.maximum(alpha_tot[..., None], 1e-3), 0, 255)
fg = quota_bianco[..., None] * Wh + (1 - quota_bianco[..., None]) * R
col = np.where(pieno[..., None], a, np.where(fascia[..., None], orig_un, fg))
def rgba(col, al):
    return Image.fromarray(np.dstack([np.clip(col, 0, 255), al * 255]).round().astype(np.uint8), 'RGBA')
chiaro = rgba(col, alpha_tot)
# versione per sfondi chiari: il bianco diventa inchiostro (fuori dal rombo)
col_s = np.where(dentro[..., None], col, quota_bianco[..., None] * INK + (1 - quota_bianco[..., None]) * R)
scuro = rgba(col_s, alpha_tot)
# bordo esterno del logo
def bbox(img, pad):
    al = np.asarray(img)[..., 3] > 3
    ys, xs = np.nonzero(al)
    return (max(xs.min() - pad, 0), max(ys.min() - pad, 0), min(xs.max() + 1 + pad, W), min(ys.max() + 1 + pad, H))
def resize(img, w):
    if w >= img.width: return img.copy()
    h = round(img.height * w / img.width)
    return img.convert('RGBa').resize((w, h), Image.LANCZOS).convert('RGBA')
def salva(img, nome, larghezze):
    img.save(f'{OUT}/{nome}.png', optimize=True)
    for w in larghezze:
        if w > img.width: continue
        resize(img, w).save(f'{OUT}/{nome}-{w}.webp', 'WEBP', quality=92, alpha_quality=100, method=6)
    print(nome, img.size)
# a) logo completo
bb = bbox(chiaro, 6)
salva(chiaro.crop(bb), 'logo-completo', [480, 960, 1440])
salva(scuro.crop(bb), 'logo-completo-scuro', [480, 960, 1440])
# rombo (con la cornice bianca)
al = np.asarray(chiaro)[..., 3] > 3
al[560:] = False
ys, xs = np.nonzero(al)
rb = (xs.min(), ys.min(), xs.max() + 1, ys.max() + 1)
print('rombo bbox', rb)
rombo = chiaro.crop(rb); rombo_s = scuro.crop(rb)
# scritta ZANZIBAR
al2 = np.asarray(chiaro)[..., 3] > 3
al2[:560] = False; al2[800:] = False
ys, xs = np.nonzero(al2)
sb = (xs.min(), ys.min(), xs.max() + 1, ys.max() + 1)
print('scritta bbox', sb)
# b) orizzontale compatto: rombo + scritta centrata in verticale
def compatto(r, s):
    r = resize(r, round(r.width * 0.78))   # rombo un po' più piccolo: la scritta si legge meglio
    gap = round(r.height * 0.16)
    sc = s
    c = Image.new('RGBA', (r.width + gap + sc.width + 8, r.height + 8), (0, 0, 0, 0))
    c.alpha_composite(r, (4, 4))
    c.alpha_composite(sc, (4 + r.width + gap, 4 + (r.height - sc.height) // 2))
    return c
salva(compatto(rombo, chiaro.crop(sb)), 'logo-orizzontale', [400, 800])
salva(compatto(rombo_s, scuro.crop(sb)), 'logo-orizzontale-scuro', [400, 800])
# c) icone dal rombo
def quadrato(img, lato, pad, sfondo=None):
    c = Image.new('RGBA', (lato, lato), sfondo or (0, 0, 0, 0))
    k = (lato - 2 * pad) / max(img.width, img.height)
    im = resize(img, round(img.width * k))
    c.alpha_composite(im, ((lato - im.width) // 2, (lato - im.height) // 2))
    return c
# per le icone piccole solo il rombo rosso (senza cornice: a 32 px sparirebbe)
rr = chiaro.crop((int(cx - h - 2), int(cy - h - 2), int(cx + h + 3), int(cy + h + 3)))
ic = f'{OUT}/icone'; os.makedirs(ic, exist_ok=True)
quadrato(rr, 32, 0).save(f'{ic}/favicon-32.png', optimize=True)
quadrato(rombo, 192, 4).save(f'{ic}/favicon-192.png', optimize=True)
quadrato(rombo, 180, 22, (21, 18, 15, 255)).convert('RGB').save(f'{ic}/apple-touch-icon.png', optimize=True)
# favicon.ico con 16, 32, 48 (PNG dentro)
pngs = []
for s in (16, 32, 48):
    b = io.BytesIO(); quadrato(rr, s, 0).save(b, 'PNG'); pngs.append((s, b.getvalue()))
hdr = struct.pack('<HHH', 0, 1, len(pngs)); off = 6 + 16 * len(pngs); dirs = b''; data = b''
for s, d in pngs:
    dirs += struct.pack('<BBBBHHII', s % 256, s % 256, 0, 0, 1, 32, len(d), off + len(data)); data += d
open(f'{OUT}/favicon.ico', 'wb').write(hdr + dirs + data)
print('icone ok')
