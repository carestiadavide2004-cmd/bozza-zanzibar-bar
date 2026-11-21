// Foto del sito in WebP: larghezze 640 / 1280 / 1920 / 2560, mai ingrandite.
// Uso: node _strumenti/foto.mjs <cartella-originali>
// Nella cartella ci sono gli originali JPG: <ID Pexels>.jpg (oppure le foto vere, es. bancone.jpg).
// Per cambiare una foto: metti il file nella cartella, scrivi il suo nome (senza .jpg) nella tabella e rilancia.
// Salta i file già presenti: per rifarne uno, prima sposta altrove i vecchi .webp (non cancellarli alla cieca).
// Alla fine stampa le misure da copiare in config.js (larghezza e altezza della versione più grande).
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { existsSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const run = promisify(execFile);
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'assets/img');
const SRC = process.argv[2];
if (!SRC) { console.log('Uso: node _strumenti/foto.mjs <cartella-originali>'); process.exit(1); }

// nome nel sito, file originale (senza .jpg), taglio [x, y, larghezza, altezza] in pixel dell'originale (facoltativo)
const T = [
  // HERO: computer (orizzontale) e telefono (verticale)
  ['hero-colazione', '12716046'],
  ['hero-colazione-telefono', '30232066'],
  ['hero-pranzo', '6287525'],
  ['hero-pranzo-telefono', '31637793', [1366, 0, 2509, 3763]],
  ['hero-aperitivo', '18582299'],
  ['hero-aperitivo-telefono', '39215046'],
  // IL BAR (4:5)
  ['bar-1', '35411022', [3354, 0, 4329, 5411]],
  // COLAZIONE (4:5)
  ['colazione-1', '302894', [1393, 0, 3185, 3981]],
  ['colazione-2', '6205530', [1872, 0, 2995, 3744]],
  ['colazione-3', '19498996', [0, 681, 5464, 6830]],
  ['colazione-4', '30919066', [1372, 0, 3304, 4130]],
  // PAUSA PRANZO (4:5)
  ['pranzo-1', '29873027', [1520, 0, 2673, 3341]],
  ['pranzo-2', '12041931'],
  ['pranzo-3', '13823542', [589, 0, 2048, 2560]],
  ['pranzo-4', '33254065', [0, 126, 3024, 3780]],
  ['pranzo-5', '17615602', [1037, 0, 3110, 3888]],
  ['pranzo-6', '10821321', [0, 500, 4000, 5000]],
  // APERITIVO: due strisce (formato originale)
  ['aperitivo-1', '39215058'], ['aperitivo-2', '5865336'], ['aperitivo-3', '36468084'], ['aperitivo-4', '29068725'],
  ['aperitivo-5', '36786940'], ['aperitivo-6', '10313343'], ['aperitivo-7', '3794291'], ['aperitivo-8', '5638748'],
  ['aperitivo-9', '35438980'], ['aperitivo-10', '11653571'], ['aperitivo-11', '29068724'], ['aperitivo-12', '39948650'],
  ['aperitivo-13', '10766723'], ['aperitivo-14', '10265450'],
  // CATERING & EVENTI (4:5)
  ['catering-1', '38774600', [0, 486, 3895, 4869]],
];
const LARGHEZZE = [640, 1280, 1920, 2560];
const QUALITA = { 640: 80, 1280: 80, 1920: 78, 2560: 76 };

function misure(f) { // dimensioni reali del JPEG (marcatore SOF)
  const b = readFileSync(f); let i = 2;
  while (i < b.length) {
    if (b[i] !== 0xFF) { i++; continue; }
    const m = b[i + 1];
    if ([0xC0, 0xC1, 0xC2].includes(m)) return [b.readUInt16BE(i + 7), b.readUInt16BE(i + 5)];
    i += 2 + b.readUInt16BE(i + 2);
  }
  throw new Error('misure non trovate: ' + f);
}

const lavori = [], risultato = {};
for (const [nome, file, taglio] of T) {
  const src = join(SRC, file + '.jpg');
  if (!existsSync(src)) { console.log('MANCA', src); continue; }
  const [W, H] = misure(src);
  const [, , cw, ch] = taglio || [0, 0, W, H];
  const ws = LARGHEZZE.filter(w => w <= cw);
  const max = ws[ws.length - 1];
  risultato[nome] = [max, Math.round(max * ch / cw)];
  for (const w of ws) {
    const out = join(OUT, `${nome}-${w}.webp`);
    if (existsSync(out)) continue;
    const arg = ['-quiet', '-m', '6', '-q', String(QUALITA[w]), '-sharp_yuv', '-metadata', 'none'];
    if (taglio) arg.push('-crop', ...taglio.map(String));
    arg.push('-resize', String(w), '0', src, '-o', out);
    lavori.push(() => run('cwebp', arg));
  }
}
let k = 0;
await Promise.all(Array.from({ length: 6 }, async () => { while (k < lavori.length) await lavori[k++](); }));
console.log(`fatte ${lavori.length} immagini`);
for (const [n, [w, h]] of Object.entries(risultato)) console.log(`${n}: ${w}x${h}`);
