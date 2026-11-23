// Anteprima social og.jpg (1200x630) con il logo.
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
.f{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 62%}
.o{position:absolute;inset:0;background:linear-gradient(180deg,rgba(13,11,10,.8),rgba(13,11,10,.62) 55%,rgba(13,11,10,.78))}
.l{position:absolute;left:50%;top:52px;width:520px;transform:translateX(-50%);filter:drop-shadow(0 2px 20px rgba(0,0,0,.5))}
h2{position:absolute;left:0;right:0;top:400px;text-align:center;color:#E8BD6E;font:italic 400 36px/1 BI}
p{position:absolute;left:0;right:0;bottom:56px;text-align:center;color:#FBF7F0;font:600 16px/1 M;letter-spacing:.28em;text-transform:uppercase}
p::before,p::after{content:"";display:inline-block;width:40px;height:1px;background:#C7472E;vertical-align:middle;margin:0 18px}
</style><img class="f" src="${f('assets/img/hero-aperitivo-1920.webp')}"><div class="o"></div>
<img class="l" src="${f('assets/logo/logo-completo-1440.webp')}">
<h2>Colazione · Pausa pranzo · Aperitivo cenato</h2><p>Di fronte alla stazione · ${S.contatti.citta}</p>
<script>Promise.all([document.fonts.ready,...[...document.images].map(i=>i.decode())]).then(()=>document.body.dataset.ok=1)</script>`);
await page.screenshot({ path: join(ROOT, 'og.jpg'), type: 'jpeg', quality: 86 });
console.log('og.jpg');
// le icone (favicon e apple-touch) si fanno dal logo: python3 _strumenti/logo.py
await browser.close();
