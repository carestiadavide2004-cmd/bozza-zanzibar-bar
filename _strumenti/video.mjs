// Reel della sezione "Sui social": video verticali leggeri 720x1280, H.264, senza audio,
// frame rate costante, loop con dissolvenza invisibile + poster WebP. Obiettivo: meno di 1,5 MB l'uno.
// Uso: node _strumenti/video.mjs <cartella-video>
// Nella cartella ci sono i video sorgente verticali: v<ID Pexels>.mp4 (o i video veri, es. vcaffe.mp4 con id 'caffe').
// Per trovare un buon punto di loop: node _strumenti/loopfind.mjs <video.mp4> <durata-min> <durata-max>
// Salta i file già presenti: per rifarne uno, prima sposta altrove il vecchio .mp4 e il suo .webp.
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { existsSync, statSync, mkdtempSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';

const run = promisify(execFile);
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const V = join(ROOT, 'assets/video');
const SRC = process.argv[2];
if (!SRC) { console.log('Uso: node _strumenti/video.mjs <cartella-video>'); process.exit(1); }
const TMP = mkdtempSync(join(tmpdir(), 'reel-'));

// nome, id sorgente, inizio (s), durata del tratto (s), fps, dissolvenza (s)
const R = [
  ['reel-1', '33563650', 3.4, 5.0, 30, 0.5],  // espresso che scende
  ['reel-2', '28889095', 1.0, 7.5, 25, 0.8],  // latte art sul cappuccino
  ['reel-3', '39913183', 0.2, 5.8, 30, 1.0],  // vetrina di cornetti e dolci
  ['reel-4', '36391232', 0.0, 7.3, 30, 0.9],  // spaghetti al pomodoro
  ['reel-5', '7608898', 13.0, 6.0, 25, 0.8],  // calici e bollicine
];

const grafo = (fps, L, f) =>
  `[0:v]setpts=PTS-STARTPTS,scale=720:1280:force_original_aspect_ratio=increase:flags=lanczos,crop=720:1280,fps=${fps},setsar=1,format=yuv420p,split[a][b];` +
  `[a]trim=start=${f},setpts=PTS-STARTPTS[m];[b]trim=end=${f},setpts=PTS-STARTPTS[h];` +
  `[m][h]xfade=transition=fade:duration=${f}:offset=${(L - 2 * f).toFixed(3)},format=yuv420p[out]`;

for (const [nome, id, ss, L, fps, f] of R) {
  const src = join(SRC, `v${id}.mp4`), mp4 = join(V, `${nome}.mp4`), poster = join(V, `${nome}.webp`);
  if (!existsSync(src)) { console.log('MANCA', src); continue; }
  if (!existsSync(mp4)) {
    await run('ffmpeg', ['-nostdin', '-v', 'error', '-y', '-ss', String(ss), '-t', String(L), '-i', src,
      '-filter_complex', grafo(fps, L, f), '-map', '[out]', '-an',
      '-c:v', 'libx264', '-preset', 'slow', '-crf', '26', '-maxrate', '1500k', '-bufsize', '3000k',
      '-profile:v', 'high', '-level:v', '4.0', '-pix_fmt', 'yuv420p', '-r', String(fps), '-fps_mode', 'cfr', '-g', String(fps * 2),
      '-movflags', '+faststart', mp4], { maxBuffer: 1e8 });
  }
  if (!existsSync(poster)) {
    const png = join(TMP, `${nome}.png`);
    await run('ffmpeg', ['-nostdin', '-v', 'error', '-y', '-i', mp4, '-frames:v', '1', png]);
    await run('cwebp', ['-quiet', '-m', '6', '-q', '76', '-sharp_yuv', png, '-o', poster]);
  }
  console.log(nome, (statSync(mp4).size / 1048576).toFixed(2) + ' MB', (statSync(poster).size / 1024).toFixed(0) + ' KB poster');
}
