# Design — Zanzibar · Bar

**Tipo:** bar (colazioni, pranzi, aperitivi) · **Zona:** Torre de' Passeri (PE), di fronte alla stazione · **Stato:** bozza per cliente reale (noindex)
Dettagli completi in `DIREZIONE.md`. Dati e testi in `config.js`.

## Direzione
"La giornata di Zanzibar": la luce dello sfondo segue il bar dal mattino alla sera. Stessa famiglia del catering, più calda e viva.

## Font (in `fonts/`)
- Titoli: Bodoni Moda variabile (+ corsivo per la parola del momento)
- Testo: Manrope variabile

## Palette
Mattino `#FAF2E4→#F3E3CC` · Mezzogiorno `#FFFBF1→#F8EDD3` · Sera oro `#EBBE76→#DD9A5C` · Notte `#16223A→#0D0B0A`
Inchiostro `#15120F` · Avorio `#F6F1E8` · Caffè `#62544A` · Terracotta `#A6461F` · Oro `#E8BD6E`

## Firma visiva
Sfondo a tre strati che segue la giornata + parola del momento che sale dietro una maschera + due strisce di foto.

## Animazioni
Livello alto, GSAP/ScrollTrigger/SplitText locali. Solo transform, opacity, clip-path. Easing cubic-bezier(.22,1,.36,1), 0,6–1,2 s.

## Regole da non violare
- Nessuna richiesta esterna al caricamento; Maps solo al clic; nessun credito dell'autore.
- Niente prezzi, niente piatti presentati come veri ("Proposta di esempio").
- Strisce che non si fermano al passaggio del mouse.
