// Anteprima social og.jpg (1200x630) e icone del sito.
// Uso: node _strumenti/og.mjs   (serve Playwright, già installato in ~/.carestia-qa)
import { createRequire } from 'node:module';
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';
import { tmpdir, homedir } from 'node:os';
import vm from 'node:vm';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(join(homedir(), '.carestia-qa/'));
const { chromium } = require('playwright');
const ctx = { window: {} };
vm.runInNewContext(readFileSync(join(ROOT, 'config.js'), 'utf8'), ctx);
const S = ctx.window.SITO;
const f = p => pathToFileURL(join(ROOT, p)).href;
const TMP = mkdtempSync(join(tmpdir(), 'og-'));
const font = `@font-face{font-family:B;src:url(${f('fonts/bodoni-moda-latin.woff2')});font-weight:400 900}
@font-face{font-family:BI;src:url(${f('fonts/bodoni-moda-italic-latin.woff2')});font-weight:400 900;font-style:italic}
@font-face{font-family:M;src:url(${f('fonts/manrope-latin.woff2')});font-weight:200 800}`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
const apri = async (nome, html) => {
  const tmp = join(TMP, nome + '.html'); writeFileSync(tmp, html);
  await page.goto(pathToFileURL(tmp).href); await page.waitForSelector('body[data-ok]'); await page.waitForTimeout(150);
};

await apri('og', `<!doctype html><meta charset="utf-8"><style>${font}
*{margin:0;box-sizing:border-box}body{width:1200px;height:630px;overflow:hidden;background:#15120F;position:relative}
img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 62%}
.o{position:absolute;inset:0;background:linear-gradient(180deg,rgba(13,11,10,.72),rgba(13,11,10,.3) 46%,rgba(13,11,10,.1) 62%,rgba(13,11,10,.62))}
h1{position:absolute;left:0;right:0;top:44px;text-align:center;color:#FBF7F0;font:400 178px/1 B;letter-spacing:-.015em}
h2{position:absolute;left:0;right:0;top:236px;text-align:center;color:#E8BD6E;font:italic 400 40px/1 BI}
p{position:absolute;left:0;right:0;bottom:50px;text-align:center;color:#FBF7F0;font:600 17px/1 M;letter-spacing:.28em;text-transform:uppercase}
p::before,p::after{content:"";display:inline-block;width:40px;height:1px;background:#E8BD6E;vertical-align:middle;margin:0 18px}
</style><img src="${f('assets/img/hero-colazione-1920.webp')}"><div class="o"></div>
<h1>${S.nome}</h1><h2>Colazione · Pausa pranzo · Aperitivo</h2><p>${S.tipo} · ${S.contatti.citta}</p>
<script>document.fonts.ready.then(()=>document.body.dataset.ok=1)</script>`);
await page.screenshot({ path: join(ROOT, 'og.jpg'), type: 'jpeg', quality: 86 });
console.log('og.jpg');

// icone: "Z" in Bodoni avorio su terracotta (il catering usa l'inchiostro: stessa famiglia, più calda)
for (const [size, nome] of [[32, 'favicon-32.png'], [192, 'favicon-192.png'], [180, 'apple-touch-icon.png']]) {
  await page.setViewportSize({ width: size, height: size });
  const r = nome.startsWith('apple') ? 0 : Math.round(size * 0.18);
  await apri(nome, `<!doctype html><meta charset="utf-8"><style>${font}*{margin:0}html,body{width:${size}px;height:${size}px;background:transparent}
  div{width:${size}px;height:${size}px;border-radius:${r}px;background:#A6461F;display:grid;place-items:center;color:#FBF7F0;font:500 ${Math.round(size * 0.78)}px/1 B;padding-bottom:${Math.round(size * 0.04)}px}</style><div>Z</div>
  <script>document.fonts.ready.then(()=>document.body.dataset.ok=1)</script>`);
  await page.screenshot({ path: join(ROOT, `assets/icone/${nome}`), omitBackground: true });
  console.log('icona', nome);
}
await browser.close();
