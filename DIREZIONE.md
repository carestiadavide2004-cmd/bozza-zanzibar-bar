# Direzione artistica — Zanzibar · Bar

Bozza per un cliente vero: il bar di Torre de' Passeri (PE), di fronte alla stazione dei treni.
Sito separato dal menù digitale (QR) e dal sito del catering, ma della **stessa famiglia**.

## L'idea: "La giornata di Zanzibar"
Il sito segue la giornata del bar, come chi ci entra tre volte al giorno:
**mattino** (colazione al banco) → **mezzogiorno** (la pausa pranzo) → **sera** (l'aperitivo con i taglieri).
Mentre si scorre cambia la luce: lo sfondo passa da crema caldo a luce piena, poi a oro di tramonto e infine al blu notte.
Dopo la notte il giorno ricomincia: social, recensioni e orari tornano nella luce del mattino ("ti aspettiamo domani").

Rispetto al catering (maison elegante, avorio e inchiostro) il bar è **più caldo e più vivo**:
più colore nella luce, foto più vicine al cibo, una voce più diretta, ma stessi font, stessi bottoni, stesso rigore.

## Parole guida
Bar di paese curato · luce del giorno · familiare e veloce · italiano vero.

## Palette per momento (contrasto WCAG calcolato)
Gli sfondi sono tre strati fissi che si alternano in dissolvenza (solo opacity). Il testo cambia colore con il momento.

| Momento | Sfondo (alto → basso) | Testo | Testo secondario | Accento |
|---|---|---|---|---|
| **Mattino** (latte e miele) | `#FAF2E4` → `#F3E3CC` | Inchiostro `#15120F` 14,8:1 | Caffè `#62544A` 5,8:1 | Terracotta `#A6461F` 4,7:1 |
| **Mezzogiorno** (luce piena) | `#FFFBF1` → `#F8EDD3` | Inchiostro 16,0:1 | Caffè 6,3:1 | Terracotta 5,1:1 |
| **Sera · oro** (tramonto) | `#EBBE76` → `#DD9A5C` | Inchiostro 7,9:1 | Bruno `#3F2B1B` 5,6:1 | Ruggine `#6A2A10` 4,5:1 |
| **Sera · notte** (blu notte → inchiostro) | `#16223A` → `#0D0B0A` | Avorio `#F6F1E8` 14,1:1 | Pietra `#B9AE9E` 7,3:1 | Oro `#E8BD6E` 9,0:1 |

Colori comuni con il catering: Inchiostro `#15120F`, Avorio `#F6F1E8`, Carta `#FBF7F0`, Terracotta `#A6461F` (su scuro `#D98B5F`).
Regole: l'accento compare al massimo 2-3 volte per schermata (etichette, linee, puntini). Mai come sfondo di grandi superfici.
I contrasti valgono nei punti più sfavorevoli di ogni sfondo (il basso della sfumatura). Sulle foto il testo sta sempre sopra una sfumatura scura graduale (niente blur).

## Font (gli stessi del catering, nel sito: `fonts/`, woff2, `font-display: swap`)
- **Bodoni Moda** variabile (opsz 6–96, 400–900) + corsivo: nome, titoli, la parola del momento. Una parola in *corsivo* dentro i titoli dritti.
- **Manrope** variabile (200–800): testi, menu, pulsanti, orari. Testo base 17px, campi minimo 16px.
- Etichette: Manrope 12–13px maiuscolo, spaziatura 0,18em, con lineetta d'accento (come nel catering).

## Spazi e forme
- Base 8px. Margine laterale da 16px (telefono) a 56px. Contenuto max 1320px.
- Sezioni da 88px (telefono) a 160px (computer); le fasce informative sono più compatte.
- Raggi quasi nulli (2px) su foto e pulsanti, come nel catering. Unica eccezione: i riquadri "reel" (6px), che ricordano lo schermo del telefono.
- Niente ombre pesanti. Paragrafi max 62 caratteri.

## Firma visiva
1. **La luce che cambia** con la giornata (sfondo a tre strati).
2. **La parola del momento**: nella hero, sotto il nome, "Colazione", "Pausa pranzo", "Aperitivo" salgono dietro una maschera insieme alla foto. Le stesse parole, in Bodoni corsivo, aprono le tre sezioni.
3. **Le due strisce di foto** in direzioni opposte (come nel catering, segno di famiglia), qui nella sera.
4. Dettaglio vivo: la hero parte dal momento della giornata in cui si apre il sito (mattina → colazione, pranzo → pasta, sera → spritz).

## Regole delle animazioni (livello alto)
- Solo `transform`, `opacity`, `clip-path`. Easing `cubic-bezier(0.22, 1, 0.36, 1)` (in GSAP `power4.out`), durate 0,6–1,2 s.
- GSAP + ScrollTrigger + SplitText scaricati da cdnjs e serviti dal sito (`js/vendor/`): nessuna richiesta esterna.
- **Entrata hero** (≈1,5 s, una volta): foto da scala 1,08 a 1 → lettere del nome che salgono dietro una maschera → parola del momento, riga dell'indirizzo, pulsanti.
- **Hero**: tre foto in dissolvenza lenta (≈6 s l'una), la parola cambia con una maschera che sale. Si ferma fuori schermo e a scheda nascosta.
- **Scorrimento**: titoli che salgono riga per riga; foto grandi con tendina clip-path + ritorno di scala; foto della colazione che entrano sfalsate; parallasse max 8%.
- **Sfondo**: `data-mood` sulle sezioni + IntersectionObserver; cambia solo l'opacità degli strati (dissolvenza 1,1 s), niente calcoli continui.
- **Strisce**: requestAnimationFrame + translate3d, non si fermano al passaggio del mouse; si fermano solo fuori schermo e con la lightbox aperta. Entrata: foto che salgono una dopo l'altra (clip-path + scala 1,12 → 1), fila sopra da destra, fila sotto da sinistra.
- **Reel**: video muti in loop, partono solo sullo schermo, uno alla volta.
- Niente scroll-jacking, niente scroll "morbido" finto, niente rimbalzi o rotazioni. Un solo effetto forte per schermata.
- Ricalcoli solo se cambia la larghezza (non con la tastiera).
- `prefers-reduced-motion`: solo dissolvenze brevi; hero ferma sul momento attuale; strisce ferme e scorrevoli con le frecce; reel fermi (si avviano solo toccandoli).

## Foto e video da cercare (Pexels, scaricati nel sito)
Tono comune: luce naturale calda, colori caldi e coerenti, cibo e bevande **italiani** (espresso, cappuccino, cornetti, pasta, spritz, taglieri), persone vere se presenti, niente loghi o scritte, niente colazioni all'americana, niente filtri.

- **Hero** (ognuna in orizzontale per computer + verticale per telefono; soggetto nella metà bassa o al centro, spazio calmo in alto per il nome):
  - `hero-colazione`: cappuccino o espresso con cornetti, sul banco o al tavolino, luce del mattino.
  - `hero-pranzo`: piatto di pasta fumante (pomodoro o ragù), tavola semplice e luminosa.
  - `hero-aperitivo`: spritz e tagliere al tramonto, luce dorata.
- **Il bar** `bar-1`: banco di un bar italiano con macchina dell'espresso o barista al lavoro (foto grande, verticale 4:5).
- **Colazione** `colazione-1…4`: espresso che scende, cappuccino con la schiuma, cornetti, dolci da banco.
- **Pausa pranzo** `pranzo-<piatto>`: i piatti più frequenti del cliente, foto quadrate piccole in una lista Primi / Secondi (vedi credits.md).
- **Aperitivo** `aperitivo-1…14` (due strisce): spritz, negroni o cocktail, barista che versa, calici di bollicine e brindisi, taglieri di salumi e formaggi, olive, bruschette e crostini, stuzzichini, tavolino all'aperto al tramonto.
- **Zeta Catering** `catering-1`: tavola apparecchiata o buffet elegante, in tono con il sito del catering.
- **Reel** `reel-1…5` (video verticali 1080×1920 → versione leggera 720×1280 sotto 1,5 MB): espresso che scende, latte art sul cappuccino, cornetti, pasta impiattata o fumante, spritz versato, brindisi o tagliere.
- **Anteprima social** `og.jpg` 1200×630: foto della hero con il nome.

Elenco finale con i link Pexels: `credits.md`. Foto da sostituire con quelle vere: `FOTO-DA-SCATTARE.md`.
