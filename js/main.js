/* =====================================================================
   Zanzibar · Bar — main.js
   Testi e dati arrivano da config.js (window.SITO).
   Animazioni con GSAP + ScrollTrigger + SplitText (in js/vendor, locali).
   Regole: solo transform / opacity / clip-path, nessuno scroll-jacking,
   ricalcoli solo quando cambia la LARGHEZZA della finestra.
   ===================================================================== */
(() => {
  'use strict';

  const S = window.SITO || {};
  const D = document, H = D.documentElement, B = D.body;
  const $ = (s, r = D) => r.querySelector(s);
  const $$ = (s, r = D) => [...r.querySelectorAll(s)];
  const RIDOTTO = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const gsap = window.gsap, ScrollTrigger = window.ScrollTrigger, SplitText = window.SplitText;
  const ANIM = !RIDOTTO && !!(gsap && ScrollTrigger);
  H.classList.add('pronto');
  if (!ANIM) H.classList.add('no-anim');
  if (gsap && ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    if (SplitText) gsap.registerPlugin(SplitText);
    // niente ricalcoli quando si apre la tastiera o cambia la barra del browser
    ScrollTrigger.config({ ignoreMobileResize: true, autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load' });
  }

  /* ---------- Utilità ---------- */
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const enfasi = s => esc(s).replace(/\*(.+?)\*([,.;:!?]+)/g, '*$1$2*').replace(/\*(.+?)\*/g, '<em>$1</em>');
  const prendi = p => p.split('.').reduce((o, k) => (o == null ? o : o[k]), S);
  const due = n => String(n).padStart(2, '0');
  const C = S.contatti || {};
  const T = S.testi || {};
  const LARGHEZZE = [640, 1280, 1920, 2560];
  const ICONA = {
    sx: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M10.5 2.5 5 8l5.5 5.5" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
    dx: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5.5 2.5 11 8l-5.5 5.5" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
    x: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5l14 14M19 5 5 19" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
    play: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4.5 2.8v10.4L13 8 4.5 2.8Z" fill="currentColor"/></svg>',
    reel: '<svg class="reel__icona" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="4.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M3.5 8.5h17M8.5 3.5l2.6 5M14 3.5l2.6 5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10.3 11.6v5.2l4.3-2.6-4.3-2.6Z" fill="currentColor"/></svg>',
  };

  // Ricalcoli SOLO quando cambia la larghezza (non con tastiera o barra del browser)
  const allaLarghezza = [];
  let ultimaL = innerWidth, timerL = 0;
  addEventListener('resize', () => {
    if (innerWidth === ultimaL) return;
    ultimaL = innerWidth;
    clearTimeout(timerL);
    timerL = setTimeout(() => {
      allaLarghezza.forEach(f => f());
      if (ANIM) ScrollTrigger.refresh();
    }, 160);
  });

  /* ---------- Foto ---------- */
  const larghezzeDi = w => LARGHEZZE.filter(x => x <= w);
  const srcset = ([f, w]) => larghezzeDi(w).map(x => `assets/img/${f}-${x}.webp ${x}w`).join(', ');
  const src = ([f, w], pref = 1280) => { const ws = larghezzeDi(w); return `assets/img/${f}-${ws.includes(pref) ? pref : ws[ws.length - 1]}.webp`; };
  function img(foto, { sizes = '100vw', pref = 1280, stile = '' } = {}) {
    const [, w, h, alt] = foto;
    return `<img src="${src(foto, pref)}" srcset="${srcset(foto)}" sizes="${sizes}" width="${w}" height="${h}" alt="${esc(alt)}" loading="lazy" decoding="async" draggable="false"${stile ? ` style="${stile}"` : ''}>`;
  }

  /* ---------- Ora italiana e orari ---------- */
  const GIORNI = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];
  const MESI = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];
  const maiuscola = s => s.charAt(0).toUpperCase() + s.slice(1);
  function oraRoma() {
    const p = {};
    try {
      new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Rome', weekday: 'short', day: 'numeric', month: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false })
        .formatToParts(new Date()).forEach(x => { p[x.type] = x.value; });
      return { g: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(p.weekday), min: (+p.hour % 24) * 60 + +p.minute, giorno: +p.day, mese: +p.month - 1 };
    } catch (e) {
      const d = new Date();
      return { g: d.getDay(), min: d.getHours() * 60 + d.getMinutes(), giorno: d.getDate(), mese: d.getMonth() };
    }
  }
  const minuti = s => { const [h, m] = String(s).split(':'); return +h * 60 + +m; };
  const fasce = g => S.orari?.giorni?.[g] || [];
  const testoFasce = g => (fasce(g).length ? fasce(g).map(([a, b]) => `${a} – ${b}`).join(' · ') : 'Chiuso');
  function statoAdesso() {
    const { g, min } = oraRoma();
    for (const [a, b] of fasce(g)) if (min >= minuti(a) && min < minuti(b)) return { aperto: true, testo: `Aperto ora · chiude alle ${b}` };
    for (let k = 0; k < 7; k++) {
      const gg = (g + k) % 7;
      for (const [a] of fasce(gg)) {
        if (k === 0 && minuti(a) <= min) continue;
        return { aperto: false, testo: `Chiuso · apre ${k === 0 ? 'oggi' : k === 1 ? 'domani' : GIORNI[gg]} alle ${a}` };
      }
    }
    return { aperto: false, testo: 'Chiuso' };
  }
  function aggiornaOrari() {
    const st = statoAdesso(), { g, giorno, mese } = oraRoma();
    $$('[data-stato]').forEach(el => {
      el.classList.toggle('is-aperto', st.aperto); el.classList.toggle('is-chiuso', !st.aperto);
      const t = $('[data-stato-testo]', el); if (t) t.textContent = st.testo;
    });
    $$('[data-oggi]').forEach(el => { el.textContent = testoFasce(g); });
    $$('[data-oggi-data]').forEach(el => { el.textContent = `Oggi, ${GIORNI[g]} ${giorno} ${MESI[mese]}`; });
    const tb = $('[data-render="orari"]');
    if (tb) tb.innerHTML = [1, 2, 3, 4, 5, 6, 0].map(d => `<tr${d === g ? ' class="is-oggi"' : ''}><th scope="row">${maiuscola(GIORNI[d])}${d === g ? '<span class="orari__oggi">Oggi</span>' : ''}</th><td>${testoFasce(d)}</td></tr>`).join('');
  }

  /* ---------- Collegamenti ---------- */
  const indirizzo = () => `${C.indirizzo}, ${C.cap} ${C.citta} (${C.provincia})`;
  const luogo = () => C.mappa || indirizzo();
  const linkWa = testo => `https://wa.me/${C.whatsapp || ''}?text=${encodeURIComponent(testo || '')}`;

  /* =====================================================================
     1. TESTI E DATI DA config.js
     ===================================================================== */
  function riempi() {
    $$('[data-t]').forEach(el => { const v = prendi(el.dataset.t); if (v != null && typeof v !== 'object') el.textContent = v; });
    $$('[data-h]').forEach(el => { const v = prendi(el.dataset.h); if (v != null) el.innerHTML = enfasi(v); });
    $$('[data-indirizzo]').forEach(el => { el.textContent = indirizzo(); });
    $$('[data-anno]').forEach(el => { el.textContent = new Date().getFullYear(); });
    $$('[data-link]').forEach(a => {
      const t = a.dataset.link;
      const href = {
        tel: `tel:${C.telefonoLink || ''}`,
        mail: `mailto:${C.email || ''}`,
        'mail-privacy': `mailto:${S.legale?.emailPrivacy || ''}`,
        wa: linkWa(S.whatsapp?.generico),
        'wa-pranzo': linkWa(S.whatsapp?.pranzo),
        maps: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(luogo())}`,
        dir: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(luogo())}`,
        menu: S.link?.menu,
        catering: S.link?.catering,
      }[t] || S.social?.[t];
      if (href) a.href = href;
      if (!/^(tel|mail)/.test(t)) { a.target = '_blank'; a.rel = 'noopener'; }
    });
    aggiornaOrari();
  }

  /* =====================================================================
     2. CONTENUTI RIPETUTI (da config.js)
     ===================================================================== */
  function rendi() {
    const r = n => $(`[data-render="${n}"]`);
    let el;
    if ((el = r('momenti'))) el.innerHTML = (T.bar?.momenti || []).map((m, i) => `<li><span>${due(i + 1)}</span>${esc(m)}</li>`).join('');

    if ((el = r('colazione'))) el.innerHTML = (S.foto?.colazione || []).map(f => `
      <li class="mosaico__i"><figure><div class="mosaico__foto">${img(f, { sizes: '(min-width: 900px) 23vw, 46vw', pref: 640 })}</div><figcaption>${esc(f[4] || '')}</figcaption></figure></li>`).join('');

    if ((el = r('pranzo'))) el.innerHTML = (S.foto?.pranzo || []).map(f => `
      <li class="piatti__i"><figure><div class="piatti__foto">${img(f, { sizes: '(min-width: 1024px) 15vw, 62vw', pref: 640 })}</div>
      <figcaption><span class="piatti__portata">${esc(f[5] || '')}</span><span class="piatti__nome">${esc(f[4] || '')}</span></figcaption></figure></li>`).join('');

    if ((el = r('titolo-aperitivo'))) {
      const righe = [].concat(T.aperitivo?.titolo || []);
      if (righe.length) el.innerHTML = righe.map(t => `<span class="riga-maschera"><span class="riga">${enfasi(t)}</span></span>`).join('');
    }

    if ((el = r('strisce'))) {
      const lista = S.foto?.aperitivo || [];
      el._foto = lista;
      const meta = Math.ceil(lista.length / 2);
      const righe = [lista.slice(0, meta).map((f, i) => [f, i]), lista.slice(meta).map((f, i) => [f, i + meta])];
      const alt = [[230, 400], [180, 310]]; // altezze telefono / computer (come nel CSS)
      el.innerHTML = righe.map((riga, ri) => `
        <div class="striscia striscia--${ri ? 'b' : 'a'}" data-dir="${ri ? 1 : -1}">
          <div class="striscia__vista"><div class="striscia__in"><ul class="striscia__traccia">
            ${riga.map(([f, i]) => {
              const k = f[1] / f[2];
              const sizes = `(max-width: 767px) ${Math.round(alt[ri][0] * k)}px, ${Math.round(alt[ri][1] * k)}px`;
              return `<li class="striscia__item"><button class="striscia__btn" type="button" data-lb="${i}" aria-label="Apri la foto: ${esc(f[3])}">${img(f, { sizes, pref: 640, stile: `--r-img:${f[1]}/${f[2]}` })}</button></li>`;
            }).join('')}
          </ul></div></div>
          <button class="striscia__freccia striscia__freccia--prev" type="button" aria-label="Foto precedenti">${ICONA.sx}</button>
          <button class="striscia__freccia striscia__freccia--next" type="button" aria-label="Foto successive">${ICONA.dx}</button>
        </div>`).join('');
    }

    if ((el = r('reel'))) el.innerHTML = (S.reel || []).map(([n, dida]) => `
      <li class="reel__i"><figure class="reel__box" role="button" tabindex="0" aria-label="Video: ${esc(dida)}">
        <video muted loop playsinline preload="none" poster="assets/video/${n}.webp" data-src="assets/video/${n}.mp4" width="720" height="1280" disablepictureinpicture disableremoteplayback aria-hidden="true" tabindex="-1"></video>
        ${ICONA.reel}<figcaption class="reel__dida">${ICONA.play}${esc(dida)}</figcaption></figure></li>`).join('');

    if ((el = r('recensioni'))) el.innerHTML = (S.recensioni || []).map(([q, chi, det]) => `
      <li><figure class="rec"><blockquote class="rec__q"><p>“${esc(q)}”</p></blockquote><figcaption class="rec__chi"><strong>${esc(chi)}</strong> · ${esc(det)}</figcaption></figure></li>`).join('');
  }

  /* =====================================================================
     3. HEADER, MENU DEL TELEFONO, BARRA IN BASSO
     ===================================================================== */
  function header() {
    const hd = $('[data-hd]'), hero = $('[data-hero]');
    if (!hd) return;
    if (!hero) { hd.classList.add('is-pieno'); return; }
    new IntersectionObserver(([e]) => hd.classList.toggle('is-pieno', !e.isIntersecting), { rootMargin: '-80px 0px 0px 0px' }).observe(hero);
  }

  function menuTelefono() {
    const btn = $('[data-burger]'), mm = $('[data-mm]');
    if (!btn || !mm) return;
    let t = 0;
    const apri = () => {
      clearTimeout(t); mm.hidden = false;
      requestAnimationFrame(() => requestAnimationFrame(() => mm.classList.add('is-aperto')));
      btn.setAttribute('aria-expanded', 'true'); btn.setAttribute('aria-label', 'Chiudi il menu');
      H.classList.add('mm-aperto', 'blocca');
    };
    const chiudi = (focus = true) => {
      mm.classList.remove('is-aperto');
      btn.setAttribute('aria-expanded', 'false'); btn.setAttribute('aria-label', 'Apri il menu');
      H.classList.remove('mm-aperto', 'blocca');
      t = setTimeout(() => { mm.hidden = true; }, 720);
      if (focus) btn.focus({ preventScroll: true });
    };
    btn.addEventListener('click', () => (btn.getAttribute('aria-expanded') === 'true' ? chiudi() : apri()));
    mm.addEventListener('click', e => { if (e.target.closest('a')) chiudi(false); });
    D.addEventListener('keydown', e => { if (e.key === 'Escape' && H.classList.contains('mm-aperto')) chiudi(); });
    allaLarghezza.push(() => { if (innerWidth >= 1100 && H.classList.contains('mm-aperto')) chiudi(false); });
  }

  function barraTelefono() {
    const bar = $('[data-mbar]'), azioni = $('.hero__azioni');
    if (!bar) return;
    if (!azioni) { bar.classList.add('is-su'); return; }
    // compare quando i pulsanti della hero sono passati sopra lo schermo
    new IntersectionObserver(([e]) => bar.classList.toggle('is-su', !e.isIntersecting && e.boundingClientRect.top < 0)).observe(azioni);
  }

  /* =====================================================================
     4. HERO: momento della giornata, dissolvenza lenta, parola che cambia
     ===================================================================== */
  const ORDINE = ['colazione', 'pranzo', 'aperitivo'];
  let avviaCicloHero = () => {};
  function hero() {
    const el = $('[data-hero]');
    if (!el) return;
    if (!ORDINE.includes(H.dataset.momento)) H.dataset.momento = 'colazione';
    if (RIDOTTO) return; // ferma sul momento attuale
    const parole = Object.fromEntries($$('[data-parola]', el).map(p => [p.dataset.parola, p]));
    let i = ORDINE.indexOf(H.dataset.momento), timer = 0, visibile = true, partito = false;
    const vai = () => {
      const vecchia = parole[ORDINE[i]];
      i = (i + 1) % ORDINE.length;
      vecchia?.classList.add('is-esce');
      H.dataset.momento = ORDINE[i];
      setTimeout(() => {
        if (!vecchia) return;
        vecchia.classList.add('senza-trans'); vecchia.classList.remove('is-esce');
        requestAnimationFrame(() => requestAnimationFrame(() => vecchia.classList.remove('senza-trans')));
      }, 1150);
    };
    const ciclo = () => { clearInterval(timer); if (partito && visibile && !D.hidden) timer = setInterval(vai, 6000); };
    new IntersectionObserver(([e]) => { visibile = e.isIntersecting; ciclo(); }).observe(el);
    D.addEventListener('visibilitychange', ciclo);
    avviaCicloHero = () => { partito = true; ciclo(); };
  }

  function entrata() {
    const el = $('[data-hero]');
    if (!el) return;
    if (!ANIM) { avviaCicloHero(); return; }
    const nome = $('[data-nome]', el);
    const attiva = $(`[data-parola="${H.dataset.momento}"]`, el);
    const parti = () => {
      const lettere = SplitText ? new SplitText(nome, { type: 'chars' }).chars : [nome];
      gsap.timeline({ defaults: { ease: 'power4.out' }, onComplete: avviaCicloHero })
        .fromTo('[data-hero-foto]', { scale: 1.08 }, { scale: 1, duration: 1.6, ease: 'power3.out', clearProps: 'transform' }, 0)
        .set(nome, { visibility: 'visible', clipPath: 'inset(-40% -8% 0% -8%)' }, 0)
        .fromTo(lettere, { yPercent: 108 }, { yPercent: 0, duration: 0.95, stagger: 0.045 }, 0.1)
        .set(nome, { clearProps: 'clipPath' })
        .set('.hero__parola', { opacity: 1 }, 0.5)
        .fromTo(attiva, { yPercent: 110 }, { yPercent: 0, duration: 0.85, clearProps: 'transform' }, 0.5)
        .fromTo('[data-entra]', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.75, stagger: 0.07, clearProps: 'transform' }, 0.62)
        .fromTo('.hd__nav', { opacity: 0 }, { opacity: 1, duration: 0.7 }, 0.8);
    };
    // parte quando la foto del momento e i font sono pronti (al massimo dopo 1,3 s)
    const foto = $(`.hero__slide[data-slide="${H.dataset.momento}"] img`, el);
    const immagine = foto && !foto.complete
      ? new Promise(r => { foto.addEventListener('load', r, { once: true }); foto.addEventListener('error', r, { once: true }); })
      : Promise.resolve();
    let fatto = false;
    const via = () => { if (!fatto) { fatto = true; parti(); } };
    Promise.all([D.fonts ? D.fonts.ready : null, immagine]).then(via, via);
    setTimeout(via, 1300);
  }

  /* =====================================================================
     5. LA LUCE DELLA GIORNATA: lo sfondo cambia con la sezione al centro
     ===================================================================== */
  function luce() {
    const sez = $$('main [data-mood]');
    if (!sez.length) return;
    const vis = new Set();
    // una linea sottile a metà schermo: la sezione che la attraversa decide la luce
    const io = new IntersectionObserver(es => {
      es.forEach(e => (e.isIntersecting ? vis.add(e.target) : vis.delete(e.target)));
      const attiva = sez.find(s => vis.has(s));
      H.dataset.cielo = attiva ? attiva.dataset.mood : 'mattino';
    }, { rootMargin: '-50% 0px -49% 0px' });
    sez.forEach(s => io.observe(s));
  }

  /* =====================================================================
     6. MAPPA SOLO AL CLIC
     ===================================================================== */
  function mappa() {
    $$('[data-mappa-carica]').forEach(b => b.addEventListener('click', () => {
      const box = b.closest('[data-mappa]');
      const f = D.createElement('iframe');
      f.src = `https://www.google.com/maps?q=${encodeURIComponent(luogo())}&output=embed`;
      f.title = `Mappa: ${S.nome || 'Zanzibar'}, ${S.posizione || ''}`;
      f.loading = 'lazy'; f.allowFullscreen = true; f.referrerPolicy = 'no-referrer-when-downgrade';
      box.replaceChildren(f);
    }));
  }

  /* =====================================================================
     7. STRISCE DI FOTO: scorrimento continuo (rAF + translate3d)
     Non si fermano al passaggio del mouse. Si fermano solo fuori schermo
     e con la lightbox aperta; ripartono da dove erano. (Come nel catering.)
     ===================================================================== */
  const strisce = [];
  let rafId = 0, tPrec = 0, lbAperta = false;
  function ciclo(t) {
    const dt = tPrec ? Math.min(0.05, (t - tPrec) / 1000) : 0;
    tPrec = t;
    let vive = 0;
    for (const s of strisce) if (s.vai && s.visibile && !lbAperta) { s.passo(dt); vive++; }
    if (vive) rafId = requestAnimationFrame(ciclo);
    else { rafId = 0; tPrec = 0; }
  }
  const avvia = () => { if (!rafId) { tPrec = 0; rafId = requestAnimationFrame(ciclo); } };

  class Striscia {
    constructor(el) {
      this.el = el;
      this.vista = $('.striscia__vista', el);
      this.dentro = $('.striscia__in', el);
      this.traccia = $('.striscia__traccia', el);
      this.dir = +el.dataset.dir || -1;
      this.x = 0; this.spinta = 0; this.fattore = 1;
      this.vai = false; this.visibile = false; this.trascina = false; this.bloccaClic = 0;
      this.originali = $$('.striscia__item', this.traccia);
      $('.striscia__freccia--next', el).addEventListener('click', () => this.spingi(-1));
      $('.striscia__freccia--prev', el).addEventListener('click', () => this.spingi(1));
      if (RIDOTTO) return;
      this.costruisci();
      this.trascinamento();
      new IntersectionObserver(([e]) => { this.visibile = e.isIntersecting; if (this.visibile) avvia(); }, { rootMargin: '80px 0px' }).observe(el);
    }
    velocita() { return innerWidth < 768 ? 24 : 34; } // pixel al secondo
    costruisci() {
      $$('.is-clone', this.traccia).forEach(n => n.remove());
      const gap = parseFloat(getComputedStyle(this.traccia).columnGap) || 0;
      this.periodo = this.traccia.scrollWidth + gap;
      const copie = Math.ceil(this.vista.clientWidth / this.periodo) + 1;
      for (let k = 0; k < copie; k++) this.originali.forEach(n => {
        const c = n.cloneNode(true);
        c.classList.add('is-clone'); c.setAttribute('aria-hidden', 'true');
        $$('button', c).forEach(b => { b.tabIndex = -1; });
        this.traccia.append(c);
      });
      this.applica();
    }
    applica() {
      const P = this.periodo;
      if (!P) return;
      this.x = ((this.x % P) - P) % P; // sempre tra -periodo e 0: giro infinito senza salti
      this.traccia.style.transform = `translate3d(${this.x.toFixed(2)}px,0,0)`;
    }
    passo(dt) {
      if (this.trascina) return;
      const k = 1 - Math.exp(-dt * 5);
      const d = this.spinta * k;
      this.spinta -= d;
      if (Math.abs(this.spinta) < 0.5) { this.spinta = 0; this.fattore = Math.min(1, this.fattore + dt * 0.8); }
      this.x += this.dir * this.velocita() * this.fattore * dt + d;
      this.applica();
    }
    spingi(verso) {
      if (RIDOTTO) {
        this.vista.scrollBy({ left: -verso * this.vista.clientWidth * 0.8, behavior: 'auto' });
        this.traccia.animate([{ opacity: 0.35 }, { opacity: 1 }], { duration: 260, easing: 'ease-out' });
        return;
      }
      this.spinta += verso * this.vista.clientWidth * 0.55;
      this.fattore = 0;
      if (!this.vai) { this.x += this.spinta; this.spinta = 0; this.applica(); }
      avvia();
    }
    trascinamento() {
      const v = this.vista;
      let id = null, x0 = 0, xs = 0, ult = 0, tUlt = 0, vel = 0, mosso = false;
      v.addEventListener('pointerdown', e => {
        if (e.button !== 0) return;
        if (e.pointerType === 'mouse') e.preventDefault();
        id = e.pointerId; x0 = ult = e.clientX; xs = this.x; tUlt = performance.now(); vel = 0; mosso = false;
      });
      v.addEventListener('pointermove', e => {
        if (e.pointerId !== id) return;
        const dx = e.clientX - x0;
        if (!mosso && Math.abs(dx) > 6) { mosso = true; this.trascina = true; v.setPointerCapture(id); v.classList.add('is-trascina'); }
        if (!mosso) return;
        this.x = xs + dx; this.applica();
        const ora = performance.now();
        vel = ((e.clientX - ult) / Math.max(1, ora - tUlt)) * 1000; ult = e.clientX; tUlt = ora;
      });
      const fine = e => {
        if (e.pointerId !== id) return;
        id = null;
        if (!mosso) return;
        this.trascina = false; v.classList.remove('is-trascina');
        this.spinta = Math.max(-1600, Math.min(1600, vel)) * 0.28; this.fattore = 0; this.bloccaClic = performance.now();
        avvia();
      };
      v.addEventListener('pointerup', fine);
      v.addEventListener('pointercancel', fine);
      v.addEventListener('click', e => { if (performance.now() - this.bloccaClic < 90) { e.preventDefault(); e.stopPropagation(); } }, true);
    }
    entra(ritardo = 0) {
      if (!ANIM) { this.vai = true; avvia(); return; }
      const voci = $$('.striscia__item', this.traccia).slice(0, 9);
      const foto = voci.map(n => $('img', n));
      const da = this.dir < 0 ? 1 : -1; // riga alta entra da destra, riga bassa da sinistra
      gsap.timeline({ delay: ritardo, onComplete: () => { this.vai = true; avvia(); } })
        .fromTo(this.dentro, { x: da * innerWidth * 0.2 }, { x: 0, duration: 1.7, ease: 'power3.out', clearProps: 'transform' }, 0)
        .fromTo(voci, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, stagger: 0.09, ease: 'power3.inOut' }, 0)
        .fromTo(foto, { scale: 1.12 }, { scale: 1, duration: 1.5, stagger: 0.09, ease: 'power3.out', clearProps: 'transform' }, 0.05);
    }
  }

  function avviaStrisce() {
    const box = $('[data-render="strisce"]');
    if (!box) return;
    if (RIDOTTO) box.classList.add('is-ferme');
    $$('.striscia', box).forEach(el => strisce.push(new Striscia(el)));
    allaLarghezza.push(() => strisce.forEach(s => !RIDOTTO && s.costruisci()));
    box.addEventListener('click', e => {
      const b = e.target.closest('[data-lb]');
      if (b) apriLightbox(box._foto, +b.dataset.lb, b);
    });
    if (!ANIM) { strisce.forEach(s => s.entra()); return; }
    strisce.forEach(s => gsap.set($$('.striscia__item', s.traccia).slice(0, 9), { clipPath: 'inset(100% 0% 0% 0%)' }));
    ScrollTrigger.create({ trigger: box, start: 'top 85%', once: true, onEnter: () => strisce.forEach((s, i) => s.entra(i * 0.18)) });
  }

  /* =====================================================================
     8. LIGHTBOX (X da 52px, frecce, contatore, swipe, Esc)
     ===================================================================== */
  const LB = { el: null, foto: [], i: 0, ritorno: null, img: null, conta: null, dida: null };
  function creaLightbox() {
    const el = D.createElement('div');
    el.className = 'lb'; el.hidden = true;
    el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true'); el.setAttribute('aria-label', 'Galleria fotografica');
    el.innerHTML = `
      <div class="lb__barra"><p class="lb__conta" aria-live="polite"></p><button class="lb__chiudi" type="button" aria-label="Chiudi la galleria">${ICONA.x}</button></div>
      <div class="lb__palco"><img class="lb__img" alt="" draggable="false">
        <button class="lb__nav lb__nav--prev" type="button" aria-label="Foto precedente">${ICONA.sx}</button>
        <button class="lb__nav lb__nav--next" type="button" aria-label="Foto successiva">${ICONA.dx}</button></div>
      <p class="lb__dida"></p>`;
    B.append(el);
    Object.assign(LB, { el, img: $('.lb__img', el), conta: $('.lb__conta', el), dida: $('.lb__dida', el) });
    $('.lb__chiudi', el).addEventListener('click', chiudiLightbox);
    $('.lb__nav--prev', el).addEventListener('click', () => mostraFoto(LB.i - 1));
    $('.lb__nav--next', el).addEventListener('click', () => mostraFoto(LB.i + 1));
    el.tabIndex = -1; // un tocco sulla foto lascia il focus dentro la galleria
    D.addEventListener('keydown', e => {
      if (!lbAperta) return;
      if (e.key === 'Escape') chiudiLightbox();
      else if (e.key === 'ArrowLeft') mostraFoto(LB.i - 1);
      else if (e.key === 'ArrowRight') mostraFoto(LB.i + 1);
      else if (e.key === 'Tab') {
        const f = $$('button', el), i = f.indexOf(D.activeElement);
        e.preventDefault();
        f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
      }
    });
    const palco = $('.lb__palco', el);
    let x0 = null, y0 = 0;
    palco.addEventListener('pointerdown', e => { x0 = e.clientX; y0 = e.clientY; });
    palco.addEventListener('pointerup', e => {
      if (x0 == null) return;
      const dx = e.clientX - x0, dy = e.clientY - y0; x0 = null;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) mostraFoto(LB.i + (dx < 0 ? 1 : -1));
    });
    palco.addEventListener('click', e => { if (e.target === palco) chiudiLightbox(); });
  }
  function mostraFoto(i) {
    const n = LB.foto.length;
    LB.i = (i + n) % n;
    const f = LB.foto[LB.i];
    LB.img.classList.add('is-cambio');
    const nuova = new Image();
    nuova.sizes = '100vw'; nuova.srcset = srcset(f); nuova.src = src(f, 1920);
    const metti = () => {
      LB.img.sizes = '100vw'; LB.img.srcset = nuova.srcset; LB.img.src = nuova.src;
      LB.img.alt = f[3]; LB.img.width = f[1]; LB.img.height = f[2];
      requestAnimationFrame(() => LB.img.classList.remove('is-cambio'));
    };
    if (nuova.decode) nuova.decode().then(metti, metti); else nuova.onload = metti;
    LB.conta.textContent = `${LB.i + 1} / ${n}`;
    LB.dida.textContent = f[3];
    [LB.i + 1, LB.i - 1].forEach(k => { const p = LB.foto[(k + n) % n]; const im = new Image(); im.sizes = '100vw'; im.srcset = srcset(p); });
  }
  function apriLightbox(foto, i, ritorno) {
    if (!LB.el) creaLightbox();
    Object.assign(LB, { foto, ritorno });
    lbAperta = true;
    H.classList.add('blocca');
    LB.el.hidden = false;
    mostraFoto(i);
    requestAnimationFrame(() => LB.el.classList.add('is-aperto'));
    $('.lb__chiudi', LB.el).focus();
  }
  function chiudiLightbox() {
    if (!LB.el || LB.el.hidden) return;
    LB.el.classList.remove('is-aperto');
    H.classList.remove('blocca');
    setTimeout(() => { LB.el.hidden = true; }, 360);
    lbAperta = false;
    avvia(); // le strisce ripartono da dove erano
    LB.ritorno?.focus({ preventScroll: true });
  }

  /* =====================================================================
     9. REEL: video muti in loop, solo sullo schermo, uno alla volta
     ===================================================================== */
  function reel() {
    const lista = $('[data-render="reel"]');
    if (!lista) return;
    const voci = $$('.reel__i', lista);
    const vid = li => $('video', li);
    const vis = new Map();
    let attivo = null, sopra = null, timer = 0, inVista = false;
    const suona = li => {
      const v = vid(li);
      if (!v.getAttribute('src')) v.src = v.dataset.src;
      v.muted = true;
      const p = v.play(); if (p) p.catch(() => {});
      li.classList.add('is-attivo');
    };
    const ferma = li => { const v = vid(li); if (!v.paused) v.pause(); li.classList.remove('is-attivo'); };
    const candidati = () => voci.filter(li => (vis.get(li) || 0) >= 0.6);
    const piuCentrale = c => c.map(li => { const r = li.getBoundingClientRect(); return [li, Math.abs(r.left + r.width / 2 - innerWidth / 2)]; }).sort((a, b) => a[1] - b[1])[0][0];
    const metti = li => {
      if (li !== attivo) { if (attivo) ferma(attivo); attivo = li; }
      if (li && vid(li).paused) suona(li);
      ritmo();
    };
    const ritmo = () => { // sul computer (tanti reel visibili) passa al successivo ogni 6,5 s
      clearTimeout(timer);
      const c = candidati();
      if (!attivo || sopra || c.length < 3) return;
      timer = setTimeout(() => { const k = c.indexOf(attivo); metti(c[(k + 1) % c.length]); }, 6500);
    };
    const scegli = () => {
      if (RIDOTTO) return;
      const c = candidati();
      if (!inVista || D.hidden || !c.length) { clearTimeout(timer); if (attivo) ferma(attivo); attivo = null; return; }
      if (sopra && c.includes(sopra)) return metti(sopra);
      if (attivo && c.includes(attivo)) return metti(attivo);
      metti(c.length >= 3 ? c[0] : piuCentrale(c));
    };
    const io = new IntersectionObserver(es => { es.forEach(e => vis.set(e.target, e.intersectionRatio)); scegli(); }, { threshold: [0, 0.6, 1] });
    voci.forEach(li => io.observe(li));
    new IntersectionObserver(([e]) => { inVista = e.isIntersecting; scegli(); }, { threshold: 0.2 }).observe(lista);
    D.addEventListener('visibilitychange', scegli);
    if (matchMedia('(hover: hover)').matches) voci.forEach(li => {
      li.addEventListener('pointerenter', () => { sopra = li; scegli(); });
      li.addEventListener('pointerleave', () => { sopra = null; ritmo(); });
    });
    // tocco: avvia o ferma (con "riduci movimento" è l'unico modo per farli partire)
    voci.forEach(li => {
      const box = $('.reel__box', li);
      const tocca = () => { if (attivo === li && !vid(li).paused) { ferma(li); attivo = null; clearTimeout(timer); } else metti(li); };
      box.addEventListener('click', tocca);
      box.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tocca(); } });
    });
  }

  /* =====================================================================
     10. ANIMAZIONI ALLO SCORRIMENTO
     ===================================================================== */
  function scorrimento() {
    if (!ANIM) return;
    const una = (trigger, fn, start = 'top 86%') => ScrollTrigger.create({ trigger, start, once: true, onEnter: fn });

    // testi che salgono e compaiono
    $$('[data-rivela]').forEach(el => gsap.fromTo(el, { opacity: 0, y: 26 }, {
      opacity: 1, y: 0, duration: 1, ease: 'power3.out', clearProps: 'transform',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    }));

    // titoli riga per riga (divisi quando i font sono pronti; ridivisi se cambia la larghezza prima di comparire)
    const titoli = $$('[data-righe]').map(el => ({ el, split: null, visto: false }));
    const dividi = t => {
      t.split?.revert();
      t.split = SplitText ? new SplitText(t.el, { type: 'lines', mask: 'lines' }) : null;
      gsap.set(t.split ? t.split.lines : t.el, t.split ? { yPercent: 106 } : { opacity: 0, y: 24 });
    };
    const mostra = t => {
      t.visto = true;
      if (!t.split) return gsap.to(t.el, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
      gsap.to(t.split.lines, { yPercent: 0, duration: 1.1, stagger: 0.1, ease: 'power4.out', onComplete: () => { t.split.revert(); t.split = null; } });
    };
    (D.fonts?.ready || Promise.resolve()).then(() => {
      titoli.forEach(t => { dividi(t); una(t.el, () => mostra(t), 'top 88%'); });
      allaLarghezza.push(() => titoli.forEach(t => { if (!t.visto) dividi(t); }));
      ScrollTrigger.refresh();
    });

    // titolo dell'aperitivo: le righe scritte in config salgono una alla volta
    const righeApe = $$('#aperitivi-t .riga');
    if (righeApe.length) {
      gsap.set(righeApe, { yPercent: 108 });
      una('#aperitivi-t', () => gsap.to(righeApe, { yPercent: 0, duration: 1.2, stagger: 0.16, ease: 'power4.out' }), 'top 84%');
    }

    // foto grandi: tendina che scende + ritorno di scala
    $$('[data-tenda]').forEach(el => {
      const im = $('img', el);
      gsap.set(el, { clipPath: 'inset(0% 0% 100% 0%)' });
      una(el, () => gsap.timeline()
        .to(el, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.25, ease: 'power4.inOut' })
        .fromTo(im, { scale: 1.14 }, { scale: 1, duration: 1.6, ease: 'power3.out', clearProps: 'transform' }, 0.1), 'top 82%');
    });

    // parallasse leggera (massimo 8%)
    $$('[data-para]').forEach(el => gsap.fromTo(el, { yPercent: -4 }, {
      yPercent: 4, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
    }));

    // colazione: foto che entrano sfalsate
    const mos = $('.mosaico');
    if (mos) {
      const foto = $$('.mosaico__foto', mos), im = $$('.mosaico__foto img', mos), dida = $$('figcaption', mos);
      gsap.set(foto, { clipPath: 'inset(100% 0% 0% 0%)' });
      gsap.set(dida, { opacity: 0 });
      una(mos, () => gsap.timeline()
        .to(foto, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.15, stagger: 0.14, ease: 'power4.inOut' })
        .fromTo(im, { scale: 1.16 }, { scale: 1, duration: 1.5, stagger: 0.14, ease: 'power3.out', clearProps: 'transform' }, 0.05)
        .to(dida, { opacity: 1, duration: 0.8, stagger: 0.14, ease: 'power2.out' }, 0.6), 'top 84%');
    }

    // piatti, reel e recensioni: salgono uno dopo l'altro
    [['.piatti__i', '.piatti'], ['.reel__i', '.reel'], ['.rec__lista > li', '.rec__lista']].forEach(([voci, box]) => {
      const v = $$(voci), b = $(box);
      if (!v.length || !b) return;
      gsap.set(v, { opacity: 0, y: 40 });
      una(b, () => gsap.to(v, { opacity: 1, y: 0, duration: 1, stagger: 0.09, ease: 'power3.out', clearProps: 'transform' }), 'top 88%');
    });
  }

  /* =====================================================================
     AVVIO
     ===================================================================== */
  riempi();
  rendi();
  header();
  menuTelefono();
  barraTelefono();
  hero();
  entrata();
  luce();
  mappa();
  avviaStrisce();
  reel();
  scorrimento();
  setInterval(aggiornaOrari, 60000);
})();
