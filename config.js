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
  posizione: "Di fronte alla stazione di Torre de' Passeri",
  indirizzoSito: 'https://carestiadavide2004-cmd.github.io/bozza-zanzibar-bar/',

  // Gli altri due siti della famiglia Zanzibar
  link: {
    menu: 'https://carestiadavide2004-cmd.github.io/zanzibar/',                      // menù digitale (QR ai tavoli)
    catering: 'https://carestiadavide2004-cmd.github.io/bozza-zanzibar-catering/',   // sito del catering
  },

  contatti: {
    telefono: '+39 000 000 0000',          // DA CONFERMARE (come si legge)
    telefonoLink: '+390000000000',          // DA CONFERMARE (stesso numero, senza spazi)
    whatsapp: '390000000000',               // DA CONFERMARE (solo cifre, con 39 davanti)
    email: 'email@esempio.it',              // DA CONFERMARE
    indirizzo: 'Via Esempio 1',             // DA CONFERMARE
    cap: '65029',
    citta: "Torre de' Passeri",
    provincia: 'PE',
    // ricerca usata per mappa e indicazioni: quando c'è l'indirizzo esatto, mettere quello
    mappa: "Stazione di Torre de' Passeri, 65029 Torre de' Passeri PE", // DA CONFERMARE
  },

  // Messaggi già scritti per WhatsApp
  whatsapp: {
    generico: "Ciao! Vorrei un'informazione.",
    pranzo: 'Ciao! Vorrei prenotare il pranzo per oggi alle ore … per … persone.',
  },

  // Orari: 0 = domenica, 1 = lunedì … 6 = sabato. Più fasce: [['06:00','13:00'], ['16:00','21:00']]. Giorno chiuso: []
  orari: {
    giorni: {                                // DA CONFERMARE (tutti gli orari)
      1: [['06:00', '21:00']],
      2: [['06:00', '21:00']],
      3: [['06:00', '21:00']],
      4: [['06:00', '21:00']],
      5: [['06:00', '21:00']],
      6: [['06:30', '21:00']],
      0: [['07:00', '13:00']],
    },
    nota: 'Orari di esempio, da confermare.', // DA CONFERMARE
  },
  // Da che ora la hero mostra colazione, pranzo e aperitivo (ora italiana)
  momenti: { colazione: '05:00', pranzo: '11:00', aperitivo: '15:30' },

  social: {
    instagram: 'https://www.instagram.com/zanzibar_torre/',
    tiktok: '',       // DA CONFERMARE: link non ancora disponibile (vuoto = pulsante nascosto)
    facebook: 'https://www.facebook.com/zanzibarpub/',
  },

  // Dati legali (footer e privacy)
  legale: {
    ragioneSociale: 'Nome attività S.r.l.',                          // DA CONFERMARE
    piva: '00000000000',                                             // DA CONFERMARE
    sedeLegale: "Via Esempio 1, 65029 Torre de' Passeri (PE)",       // DA CONFERMARE
    emailPrivacy: 'privacy@esempio.it',                              // DA CONFERMARE
    aggiornamentoPrivacy: '21 novembre 2026',
  },

  // Il piatto del giorno: si cambia ogni mattina, solo qui
  piattoDelGiorno: {
    nome: 'Gnocchi alla sorrentina',                    // TESTO DI ESEMPIO DA CONFERMARE
    descrizione: 'Pomodoro, mozzarella filante e basilico.', // TESTO DI ESEMPIO DA CONFERMARE
    nota: 'Proposta di esempio',
  },

  testi: {
    hero: {
      parole: ['Colazione', 'Pausa pranzo', 'Aperitivo'],
      scorri: 'Scorri',
    },
    bar: { // TESTO DI ESEMPIO DA CONFERMARE
      etichetta: 'Il bar',
      titolo: 'Tre momenti, *un solo* bancone',
      testo: "Da Zanzibar la giornata comincia presto: il primo caffè per chi prende il treno, il pranzo per chi lavora qui intorno, l'aperitivo per chi torna a casa. Un bar di paese, tenuto con cura.",
      momenti: ['Colazione al banco', 'Pausa pranzo', 'Aperitivo e taglieri'],
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
      piattoEtichetta: 'Il piatto del giorno',
      bottone: 'Prenota il pranzo su WhatsApp',
      galleria: 'Proposte di esempio',
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
      nota: 'Video di esempio: qui andranno i video del bar.',
    },
    catering: { // TESTO DI ESEMPIO DA CONFERMARE
      etichetta: 'Catering & Eventi',
      titolo: 'La stessa cucina, *per la tua festa*',
      testo: 'Matrimoni, comunioni, compleanni e aperitivi aziendali: con il catering Zanzibar porta la sua cucina anche fuori dal bar.',
      bottone: 'Scopri il catering',
    },
    recensioni: {
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
    pranzo: [ // [nome, larghezza, altezza, descrizione, piatto, portata] — TESTO DI ESEMPIO DA CONFERMARE
      ['pranzo-1', 2560, 3200, 'Rigatoni con pomodorini e ricotta in padella', 'Rigatoni, pomodorini e ricotta', 'Primo'],
      ['pranzo-2', 2560, 3199, 'Gnocchi alla sorrentina in una ciotola di legno', 'Gnocchi alla sorrentina', 'Primo'],
      ['pranzo-3', 1920, 2400, 'Una porzione di lasagna al forno', 'Lasagna al forno', 'Primo'],
      ['pranzo-4', 2560, 3200, 'Polpette al sugo con pane tostato', 'Polpette al sugo', 'Secondo'],
      ['pranzo-5', 2560, 3200, 'Tagliata con verdure grigliate e rucola', 'Tagliata e verdure grigliate', 'Secondo'],
      ['pranzo-6', 2560, 3200, 'Pollo arrosto con fagiolini e patate', 'Pollo, fagiolini e patate', 'Secondo'],
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
