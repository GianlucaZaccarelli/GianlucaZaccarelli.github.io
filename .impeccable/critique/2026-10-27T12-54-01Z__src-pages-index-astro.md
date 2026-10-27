---
target: suite completa sito (index.astro)
total_score: 25
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
target_identity: "file:C:\\git\\GianlucaZaccarelli.github.io\\src\\pages\\index.astro"
target_fingerprint: "sha256:275ae3f24980e20aa7a1ffeca59237b1ac327b2d654a970234ef143ef4840804"
target_path: "C:\\git\\GianlucaZaccarelli.github.io\\src\\pages\\index.astro"
timestamp: 2026-10-27T12-54-01Z
slug: src-pages-index-astro
closed: true
---
Method: dual-agent (A: design review · B: detector + browser), più audit tecnico separato. Browser: Puppeteer headless (profilo chrome-devtools MCP bloccato), nessun overlay [Human] visibile.

## Design Health Score — 25/32 (78%, Buono; 7 e 10 n/a)

| # | Euristica | Voto | Problema chiave |
|---|---|---|---|
| 1 | Visibilità stato | 4 | Tab pill, filo del folio, copy "stamp" con aria-live |
| 2 | Corrispondenza mondo reale | 3 | "Body Rental", "MMXXVI", "ENTJ" in copertina da decifrare |
| 3 | Controllo e libertà | 3 | Intro saltabile, ma ritarda la copertina al primo accesso |
| 4 | Coerenza | 3 | Galleria a colori + cornice 2px terracotta rompe il B/N editoriale; accento italic solo negli ultimi due titoli |
| 5 | Prevenzione errori | 3 | Poco da sbagliare |
| 6 | Riconoscimento | 3 | Su desktop il nome è solo nel marquee mobile e tagliato |
| 7 | Flessibilità | n/a | Superficie di lettura single-page |
| 8 | Estetica minimalista | 3 | Disciplina visiva, ma contenuti ripetuti e Skills sovraccarica (43 chip) |
| 9 | Recupero errori | 3 | 404 bilingue, solo mailto |
| 10 | Aiuto | n/a | Portfolio |

## Design Specificity
~70% autoriale (copertina B/N, marquee, anni giganti, folio, back cover, frase del "punto in corsa"), ~30% template: titoli e ordine da CV standard, bullet da Europass. Il posizionamento leader+psicologia non diventa struttura.
Detector: 33 finding (16 color, 11 font-size, 3 radius, 3 overused-font), ~11 reali minori (taglie italic fuori scala About:119/Personal:71, Contact:144, hero Header:639/681/1205/1226, menu Header:917/959, bordi chip rgba nero Skills:137/TechBadge:31, Header:817), ~22 falsi positivi documentati in DESIGN.md. Browser: em-dash 24, tab-indicator anima width/left, low-contrast 1:1 non localizzato (probabile span nascosto).

## Priority Issues
1. [P1] Copy e IA da CV generico; il posizionamento non è strutturale — clarify, typeset
2. [P1] Galleria "Fuori orario": foto a colori, cornice 2px terracotta, 1902px su mobile prima del Contact, `sizes` errato (480w stirata a 540px) — layout, optimize
3. [P1] Zoom testo 200% rompe l'hero mobile (H1 a -33px, colonne sovrapposte; WCAG 1.4.4) e su desktop spinge fuori i controlli header — adapt
4. [P2] Contrasto e nomi accessibili: accent-600 su testo piccolo 4.41:1 (About:93 ENTJ, 404:41-42, folio-num Header:445); theme toggle "Tema chiaro, premuto" in dark; brand link label-in-name; folio "CONTATTI" grigio sulla copertina — harden, colorize
5. [P2] Nome su desktop solo nel marquee in movimento (crop "anluca Zaccarelli —") — layout

## Persona Red Flags
- Recruiter: ruolo/seniority/stack/luogo/CV in ~2s; manca un nome statico su desktop.
- Tech lead: nessuna decisione, architettura o trade-off; progetti "interni, non pubblici"; leadership = un fatto ripetuto 3 volte.
- Casey (mobile): link aziende 28px, "Codice →" 20px, email 37px; sillabazione aggressiva in "Fuori orario".
- Riley: tooltip 10.4px tagliati al bordo 768–1100px; skip link focusabile mentre #main è inert; folio illeggibile sopra Contact.
- Jordan: intro "Ciao" in Inter 700 (fuori dalla Two Voices Rule), 1.3s di attesa.

## Minor Observations
- Skills: 43 chip aperte su desktop, concetti misti a prodotti, "Visual Studio" in Backend — distill.
- Lighthouse mobile Perf 92 (target 95): font 309 KiB su 385, preload Fraunces compete con LCP.
- Reflow forzato nel loop di scroll (Header:1310-1346), marquee e parallax attivi fuori schermo.
- Colore copertina Contact legge cacao/cuoio più che terracotta.
- DESIGN.md non documenta "Fuori orario"; Alternating Spread superata; Skills py-20 vs py-24.
- Dead code: .nav-link (global.css:278-298), classi home-active*.
- Manifest solo in italiano; title IT "Sviluppatore Full-Stack Senior" vs H1 "Senior Full-Stack Developer".
- Link lingua senza lang/hreflang; kicker capitoli Personal non sono h3; alt logo ridondanti.

## Questions to Consider
- Se psicologia + leadership è il gancio, perché nessuna sezione guarda una decisione o un team attraverso quella lente?
- E se tutto il sito parlasse con la voce di "Fuori orario" e il registro CV restasse solo nel PDF?
- La galleria serve a mostrare il suo occhio estetico o solo lui? Se è l'occhio, perché sono le immagini meno art-directed della pagina?
