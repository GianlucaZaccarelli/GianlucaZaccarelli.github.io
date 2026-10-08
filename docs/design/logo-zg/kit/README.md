# Gianluca Zaccarelli — kit del marchio «ZG. punto in corsa»

Il marchio sono le iniziali Z e G scritte in un solo movimento: la base della Z scorre nella G,
la G passa sotto la diagonale della Z, tutto in corsivo di 12°. Il punto terracotta chiude la
sigla e arriva in corsa, con una breve scia.

Tutto è generato da `../src/kit.mjs` (`node docs/design/logo-zg/src/kit.mjs` dalla radice del
repo). La prima volta: `python docs/design/logo-zg/src/istanze-font.py` crea le istanze
statiche dei font del sito in `src/font/` (serve `pip install fonttools brotli`). fontkit si
legge da un progetto vicino (`FONTKIT_FROM` per indicarne un altro).

In radice: `segno-sorgente.svg` (costruzione descritta nel commento), `segno-sorgente-piccolo.svg`
(taglio piccolo per 16–40 px) e `segno-animato.svg` (il punto che arriva in corsa).

## Indice

| Cartella | Contenuto |
| --- | --- |
| `app/` | `logo-icon.svg`, `-mono`, `-small` (taglio piccolo), `-tile` (inchiostro), `-tile-chiaro`, `-tile-copertina`, `logo-wordmark.svg`, `-dark` (+ PNG), `favicon.svg`, `favicon.ico` (16 + 32 + 48), `favicon-16x16/32x32/48x48/64x64.png`, `favicon-512.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `site.webmanifest` |
| `lockup/` | `orizzontale`, `verticale`, `wordmark`, `icona` × `colore`, `nero`, `bianco`, `scuro` (SVG + PNG trasparente) |
| `social/` | profilo, copertine LinkedIn / X / Facebook, Open Graph, post quadrato e verticale, storia |
| `email/` | header 600 px @2x chiaro e scuro, firma 300 px @2x, icona 96 e 192 su chiaro e scuro — solo PNG |
| `stampa/` | PDF vettoriali in tracciati: logo orizzontale / verticale / icona in CMYK, Pantone (tinta piatta) e nero; biglietto fronte/retro, carta intestata A4; `colori.md` |
| `documenti/` | copertina documento (HTML, PDF, PNG), template slide 16:9 titolo/contenuto/chiusura (HTML, PDF, PNG), watermark |
| `pattern/` | trama di punti in corsa in tile ripetibili 480×240 (chiara, scura, colore) e campioni 2400×1200 |
| `mockup/` | header del sito, tab del browser, icona sulla home del telefono, biglietto |
| `linee-guida/` | `linee-guida.html` e `.pdf`: concetto, costruzione, area di rispetto, dimensioni minime, palette, tipografia, usi corretti e vietati, movimento, social |

## Misure

| File | Misura | Note |
| --- | --- | --- |
| `favicon-16x16 / 32x32.png` | 16, 32 | taglio piccolo su tessera inchiostro |
| `favicon-48x48 / 64x64.png` | 48, 64 | taglio piccolo, più margine |
| `favicon.ico` | 16 + 32 + 48 | PNG incorporati |
| `favicon-512.png`, `logo-icon-tile*` | 512 | tessera arrotondata |
| `apple-touch-icon.png` | 180×180 | al vivo, iOS arrotonda da sé |
| `icon-192 / icon-512.png` | 192, 512 | PWA |
| `icon-maskable-512.png` | 512 | segno dentro il cerchio sicuro |
| `social/profilo-1080.png` | 1080×1080 | regge il ritaglio circolare |
| `social/copertina-linkedin` | 1584×396 | contenuto a destra (a sinistra la foto) |
| `social/copertina-x` | 1500×500 | |
| `social/copertina-facebook` | 1640×624 | |
| `social/open-graph` | 1200×630 | anteprima dei link al sito |
| `social/post` | 1080×1080, 1080×1350 | |
| `social/storia` | 1080×1920 | |
| `email/header-600-*@2x.png` | 1200×240 | da mostrare a 600×120 |
| `email/firma-300@2x.png` | 600 di larghezza | da mostrare a 300 |
| `stampa/biglietto-*` | 85×55 mm + 3 mm | |
| `stampa/carta-intestata-a4` | 210×297 mm | |

## Da sapere

- **Font**: Fraunces, Inter e JetBrains Mono, gli stessi del sito (open source). Nei loghi e nei
  PDF di stampa le lettere sono tracciati; nelle pagine HTML il font è incorporato.
- **CMYK e Pantone** sono valori di partenza: vanno validati dalla tipografia (vedi `stampa/colori.md`).
- Sotto i 40 px si usa il **taglio piccolo**, non il segno ridotto.
- Il marchio non è stato sottoposto a ricerca di anteriorità: prima di un uso commerciale serve
  una verifica sui registri dei marchi e una ricerca per immagini.
