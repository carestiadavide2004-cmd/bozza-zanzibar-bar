/* =====================================================================
   Zanzibar · Bar — TUTTI i dati e i testi del sito.
   Per il cliente vero si cambia solo questo file.
   // DA CONFERMARE                 = dato segnaposto da chiedere al cliente
   // TESTO DI ESEMPIO DA CONFERMARE = testo scritto da noi, da far approvare
   Nei testi, *parola* diventa corsivo.
   ===================================================================== */
window.SITO = {
  nome: 'Zanzibar',
  tipo: 'Bar',
  sottotitolo: 'Coffee & Lounge Bar',   // la riga sotto il nome nel logo
  posizione: "Di fronte alla stazione di Torre de' Passeri",
  indirizzoSito: 'https://zanzibartorre.com/',

  // Gli altri due siti della famiglia Zanzibar
  link: {
    menu: 'https://menu.zanzibartorre.com',   // menù digitale (QR ai tavoli)
    catering: 'https://zetacatering.com',     // sito del catering
  },

  contatti: {
    telefono: '+39 392 285 0875',          // come si legge
    telefonoLink: '+393922850875',          // stesso numero, senza spazi
    whatsapp: '393922850875',               // solo cifre, con 39 davanti
    email: 'email@esempio.it',              // DA CONFERMARE (finché è un segnaposto non compare sul sito)
    indirizzo: 'Viale della Repubblica 72 bis',
    cap: '65029',                           // VERIFICARE CAP
    citta: "Torre de' Passeri",
    provincia: 'PE',
    // ricerca usata per mappa, "Apri in Google Maps" e "Indicazioni"
    mappa: "Viale della Repubblica 72 bis, 65029 Torre de' Passeri PE",
  },

  // Messaggi già scritti per WhatsApp
  whatsapp: {
    generico: "Ciao! Vorrei un'informazione.",
    pranzo: 'Ciao! Vorrei prenotare il pranzo per oggi alle ore … per … persone.',
  },

  // Orari: 0 = domenica, 1 = lunedì … 6 = sabato. Più fasce: [['06:00','13:00'], ['16:00','21:00']]. Giorno chiuso: []
  // Se la chiusura è più piccola dell'apertura (es. '01:00') vuol dire DOPO MEZZANOTTE, cioè il giorno dopo.
  orari: {
    giorni: {
      1: [['06:00', '01:00']],
      2: [['06:00', '01:00']],
      3: [['06:00', '01:00']],
      4: [['06:00', '01:00']],
      5: [['06:00', '01:00']],
      6: [['06:00', '01:00']],
      0: [['07:00', '01:00']],
    },
    nota: '',  // una riga sotto la tabella (vuota = non compare)
  },
  // Da che ora la hero mostra colazione, pranzo e aperitivo (ora italiana)
  momenti: { colazione: '05:00', pranzo: '11:00', aperitivo: '15:30' },

  social: {
    instagram: 'https://www.instagram.com/zanzibar_torre/',
    tiktok: '',       // DA CONFERMARE: link non ancora disponibile (vuoto = pulsante nascosto)
    facebook: 'https://www.facebook.com/zanzibarpub/',
  },

  // Dati legali (footer e privacy). Finché sono segnaposto ("esempio", "Nome attività", zeri) NON compaiono sul sito:
  // basta scrivere quelli veri qui e le righe appaiono da sole.
  legale: {
    ragioneSociale: 'Nome attività S.r.l.',                          // DA CONFERMARE
    piva: '00000000000',                                             // DA CONFERMARE
    sedeLegale: "Via Esempio 1, 65029 Torre de' Passeri (PE)",       // DA CONFERMARE
    emailPrivacy: 'privacy@esempio.it',                              // DA CONFERMARE
    aggiornamentoPrivacy: '24 novembre 2026',
  },

  // Pausa pranzo: i piatti che si preparano più spesso. [nome, foto in assets/img (vuoto = icona), descrizione della foto]
  // Foto quadrate (Pexels, provvisorie): assets/img/<foto>-640.webp e -1280.webp
  pranzo: {
    primi: [
      ['Amatriciana', 'pranzo-amatriciana', "Rigatoni all'amatriciana con pecorino grattugiato"],
      ['Zucca, speck e gorgonzola', '', ''],   // nessuna foto credibile trovata: per ora un'icona
      ['Sagne e fagioli', 'pranzo-sagne-fagioli', 'Pasta fresca con fagioli e pomodoro'],
      ['Sagne e ceci', 'pranzo-sagne-ceci', 'Pasta e ceci in brodo, servita nel piatto fondo'],
      ['Orecchiette alle cime di rapa', 'pranzo-orecchiette', 'Pasta con cime di rapa e peperoncino'],
      ['Gnocchi al pomodoro', 'pranzo-gnocchi', 'Gnocchi al sugo di pomodoro con formaggio grattugiato'],
    ],
    secondi: [
      ['Pollo arrosto', 'pranzo-pollo', 'Pollo arrosto dorato sul tagliere'],
      ['Salsicce', 'pranzo-salsicce', 'Salsicce alla brace'],
      ['Polpette', 'pranzo-polpette', 'Polpette al sugo in una ciotola'],
      ['Hamburger', 'pranzo-hamburger', 'Hamburger di carne cotti alla piastra'],
      ['Rollè di tacchino', 'pranzo-rolle', 'Fette di rollè ripieno con purè'],
    ],
  },

  testi: {
    hero: {
      parole: ['Colazione', 'Pausa pranzo', 'Aperitivo'],
      scorri: 'Scorri',
    },
    bar: { // TESTO DI ESEMPIO DA CONFERMARE
      etichetta: 'Il bar',
      titolo: 'Dalla colazione all’*aperitivo cenato*, un solo bancone',
      testo: "Da Zanzibar la giornata comincia presto, con il primo caffè per chi prende il treno, e continua con il pranzo per chi lavora qui intorno. La sera arrivano l’aperitivo cenato, i cocktail e le serate con gli amici.",
      momenti: ['Colazione al banco', 'Pausa pranzo', 'Aperitivi e aperitivi cenati', 'Cocktail bar', 'Serate ed eventi'],
    },
    colazione: { // TESTO DI ESEMPIO DA CONFERMARE
      parola: 'Colazione',
      titolo: 'Il primo caffè, *al banco*',
      testo: 'Espresso, cappuccino e cornetti per chi parte presto e per chi si concede due minuti in più. Dolci da banco, ogni mattina.',
    },
    pranzo: { // TESTO DI ESEMPIO DA CONFERMARE
      parola: 'Pausa pranzo',
      titolo: 'Un piatto caldo, *a due passi* dal treno',
      testo: 'Per chi lavora in zona e per chi passa dalla stazione: primi e secondi del giorno, serviti senza perdere tempo. Prenota il tavolo con un messaggio.',
      nota: 'Il menù del pranzo cambia ogni giorno: questi sono i piatti che prepariamo più spesso. La disponibilità varia in base al giorno: chiedi al banco o scrivici su WhatsApp.',
      primi: 'Primi',
      secondi: 'Secondi',
      fotoNota: 'Foto indicative',
      bottone: 'Prenota il pranzo su WhatsApp',
    },
    aperitivo: { // TESTO DI ESEMPIO DA CONFERMARE
      parola: 'Aperitivo',
      titolo: ['Quando il sole scende,', 'si apre il *tagliere*.'],
      testo: 'Spritz, calici e cocktail, con taglieri di salumi e formaggi, bruschette e stuzzichini. Il momento più bello della giornata, da dividere con gli amici.',
      nota: 'Tocca una foto per vederla grande',
    },
    menu: { // TESTO DI ESEMPIO DA CONFERMARE
      etichetta: 'Il menù',
      titolo: 'Sfoglia il *menù*',
      testo: 'Lo stesso menù che trovi al tavolo con il QR.',
      bottone: 'Apri il menù',
    },
    social: { // TESTO DI ESEMPIO DA CONFERMARE
      etichetta: 'Sui social',
      titolo: 'Seguici: ogni giorno *qualcosa di nuovo*',
      testo: "Il piatto del giorno, i dolci appena sfornati, l'aperitivo della sera: lo raccontiamo ogni giorno.",
      nota: '',   // vuota = non compare
    },
    catering: { // TESTO DI ESEMPIO DA CONFERMARE
      nome: 'Zeta Catering',
      titolo: 'La stessa cucina, *per la tua festa*',
      testo: 'Matrimoni, comunioni, compleanni e aperitivi aziendali: con Zeta Catering la nostra cucina arriva anche fuori dal bar.',
      bottone: 'Scopri Zeta Catering',
    },
    recensioni: { // sezione NASCOSTA in index.html (attributo hidden) finché non ci sono recensioni vere
      titolo: 'Recensioni di esempio',
      nota: 'Testi di esempio: qui andranno le recensioni vere.',
    },
    orari: { // TESTO DI ESEMPIO DA CONFERMARE
      etichetta: 'Orari e dove siamo',
      titolo: 'Proprio *di fronte* alla stazione',
      testo: "Proprio di fronte alla stazione di Torre de' Passeri: comodo per chi arriva in treno.",
    },
  },

  // Recensioni di esempio: [testo, nome, dettaglio]  — TESTO DI ESEMPIO DA CONFERMARE
  recensioni: [
    ['Il cappuccino prima del treno delle sette ormai è un rito.', 'Marco', 'pendolare · esempio'],
    ['Pausa pranzo veloce e un primo come a casa: si torna al lavoro contenti.', 'Giulia', 'lavora in zona · esempio'],
    ['Spritz e tagliere al tramonto: il posto giusto per staccare.', 'Luca', 'aperitivo del venerdì · esempio'],
  ],

  // Foto (Pexels, provvisorie): [nome file, larghezza, altezza, descrizione]. I file sono in assets/img/<nome>-<larghezza>.webp
  foto: {
    colazione: [
      ['colazione-1', 2560, 3200, "L'espresso che scende nella tazzina", 'Espresso'],
      ['colazione-2', 2560, 3200, 'Cappuccino servito al banco', 'Cappuccino'],
      ['colazione-3', 2560, 3200, 'Cornetti nella vetrina del bar', 'Cornetti'],
      ['colazione-4', 2560, 3200, 'Cornetti con cioccolato e pistacchio', 'Dolci da banco'],
    ],
    aperitivo: [ // le prime 7 nella striscia in alto, le altre in quella in basso
      ['aperitivo-1', 2560, 3840, 'Spritz al tramonto sul muretto, con le patatine'],
      ['aperitivo-2', 2560, 1707, 'Tagliere di salumi, olive e pane su marmo'],
      ['aperitivo-3', 2560, 3840, 'Due spritz con frutta secca su un tavolo di legno'],
      ['aperitivo-4', 2560, 1709, 'Prosciutto crudo e formaggi sul tagliere'],
      ['aperitivo-5', 2560, 1920, 'Due spritz e stuzzichini al sole della sera'],
      ['aperitivo-6', 2560, 1707, 'Bruschette al pomodoro su un tagliere'],
      ['aperitivo-7', 2560, 3200, "Negroni con la scorza d'arancia"],
      ['aperitivo-8', 2560, 1706, 'Brindisi tra amici a tavola'],
      ['aperitivo-9', 2560, 1708, 'Antipasto italiano con salumi, mozzarella e pomodori secchi'],
      ['aperitivo-10', 1920, 3333, 'Spritz con arancini'],
      ['aperitivo-11', 2560, 1709, 'Formaggi, focaccia e salumi sul legno'],
      ['aperitivo-12', 2560, 1707, 'Spritz appena servito sul bancone'],
      ['aperitivo-13', 2560, 3413, 'Olive e salumi sul tagliere'],
      ['aperitivo-14', 2560, 1440, 'Tagliere da dividere e calici di vino'],
    ],
  },

  // Video dei reel (assets/video/<nome>.mp4 + poster <nome>.webp): [nome, didascalia]
  reel: [
    ['reel-1', 'Il primo espresso'],
    ['reel-2', 'Cappuccino con il cuore'],
    ['reel-3', 'La vetrina del mattino'],
    ['reel-4', 'Il primo di oggi'],
    ['reel-5', 'Si brinda'],
  ],
};
