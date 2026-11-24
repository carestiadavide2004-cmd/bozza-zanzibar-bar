# Design — Zanzibar · Bar

**Tipo:** bar (colazioni, pranzi, aperitivi) · **Zona:** Torre de' Passeri (PE), di fronte alla stazione · **Stato:** sito definitivo online su https://zanzibartorre.com (dal 24/11/2026)
Dettagli completi in `DIREZIONE.md`. Dati e testi in `config.js`.

## Direzione
"La giornata di Zanzibar": la luce dello sfondo segue il bar dal mattino alla sera. Stessa famiglia del catering, più calda e viva.

## Font (in `fonts/`)
- Titoli: Bodoni Moda variabile (+ corsivo per la parola del momento)
- Testo: Manrope variabile

## Palette
Mattino `#FAF2E4→#F3E3CC` · Mezzogiorno `#FFFBF1→#F8EDD3` · Sera oro `#EBBE76→#DD9A5C` · Notte `#16223A→#0D0B0A`
Inchiostro `#15120F` · Avorio `#F6F1E8` · Caffè `#62544A` · Oro `#E8BD6E`
**Rosso del logo** `#C7472E` (accento, con parsimonia: linee, punti, pulsanti secondari con testo bianco) · per il testo piccolo sui chiari `#B03D28`

## Logo
Logo vero del cliente (rombo con la donna che beve il caffè + ZANZIBAR + Coffee & Lounge Bar), usato come immagine, mai ridisegnato. Completo nella hero e nel footer, orizzontale nel menu (chiaro sulla foto, scuro sulla barra chiara), rombo per le favicon.

## Firma visiva
Sfondo a tre strati che segue la giornata + parola del momento che sale dietro una maschera + due strisce di foto.

## Animazioni
Livello alto, GSAP/ScrollTrigger/SplitText locali. Solo transform, opacity, clip-path. Easing cubic-bezier(.22,1,.36,1), 0,6–1,2 s.

## Regole da non violare
- Nessuna richiesta esterna al caricamento; Maps solo al clic; nessun credito dell'autore.
- Niente prezzi. I piatti del pranzo sono quelli veri del cliente; le foto sono indicative.
- Strisce che non si fermano al passaggio del mouse.
