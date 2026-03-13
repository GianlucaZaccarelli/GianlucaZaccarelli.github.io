# ZakkaSite — Sito Personale / Portfolio CV

## Obiettivo del Progetto

Sito web personale in stile curriculum vitae, pubblicabile su GitHub Pages (`username.github.io`).
Deve essere professionale, veloce, accessibile e moderno.

---

## Stack Tecnologico

### Framework e Build
- **Astro** — framework statico moderno, zero JS di default, ottimo per siti di contenuto
- **TypeScript** — tipizzazione su tutti i file `.ts` e `.astro`
- **Tailwind CSS v4** — utility-first CSS, nessun CSS custom se non strettamente necessario

### Deployment
- **GitHub Pages** — via GitHub Actions (workflow `.github/workflows/deploy.yml`)
- Output: cartella `dist/` generata da `astro build`
- Base URL configurata in `astro.config.ts` → `base: '/nome-repo'` se repo non è `username.github.io`

### Qualità del Codice
- **ESLint** + **Prettier** — linting e formattazione consistente
- **Astro Check** — controllo tipi nei file `.astro`

---

## Struttura del Progetto

```
ZakkaSite/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions → GitHub Pages
├── public/
│   ├── favicon.svg
│   └── cv.pdf                  # PDF scaricabile del CV
├── src/
│   ├── components/
│   │   ├── Header.astro        # Nome + titolo professionale
│   │   ├── About.astro         # Breve bio
│   │   ├── Experience.astro    # Esperienze lavorative
│   │   ├── Education.astro     # Formazione
│   │   ├── Skills.astro        # Competenze tecniche e soft
│   │   ├── Projects.astro      # Progetti personali/open source
│   │   ├── Contact.astro       # Email, LinkedIn, GitHub
│   │   └── Footer.astro
│   ├── data/
│   │   ├── experience.ts       # Dati esperienze (array tipizzato)
│   │   ├── education.ts
│   │   ├── skills.ts
│   │   └── projects.ts
│   ├── layouts/
│   │   └── BaseLayout.astro    # Layout principale con <head> SEO
│   ├── pages/
│   │   └── index.astro         # Single-page CV
│   └── styles/
│       └── global.css          # Solo @tailwind directives
├── astro.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── CLAUDE.md
```

---

## Regole di Sviluppo

### Generale
- **Single Page Application**: tutto il CV in `index.astro`, sezioni con anchor link (`#about`, `#experience`, ecc.)
- **No dipendenze superflue**: aggiungere un pacchetto solo se strettamente necessario
- **Dati separati dalla UI**: tutti i contenuti (esperienze, skill, ecc.) vivono in `src/data/` come TypeScript con tipi espliciti
- **Nessun framework JS runtime** (no React, no Vue): usare solo Astro components e vanilla JS dove indispensabile
- **Accessibilità**: usare tag semantici HTML5 (`<section>`, `<article>`, `<nav>`, `<main>`), attributi `aria-label` dove necessario, contrasto WCAG AA

### TypeScript
- `strict: true` in `tsconfig.json`
- Definire interfacce per tutti i dati in `src/data/`
- Nessun `any` implicito

### CSS / Tailwind
- Usare Tailwind utility classes direttamente negli attributi `class`
- Evitare classi CSS custom — usare `@apply` solo come ultima risorsa
- Design responsive mobile-first: `sm:`, `md:`, `lg:` breakpoints
- Palette colori definita in `tailwind.config.ts` come design token

### Contenuto e SEO
- `<title>`, `<meta name="description">`, Open Graph tags in `BaseLayout.astro`
- `lang="it"` (o la lingua appropriata) nel tag `<html>`
- Immagine profilo ottimizzata con `<img loading="lazy" decoding="async">`
- Link a GitHub, LinkedIn, email nel header e nel footer

### Performance
- Target Lighthouse: Performance ≥ 95, Accessibility ≥ 95, Best Practices = 100, SEO = 100
- Nessuna immagine non ottimizzata: usare il componente `<Image>` di Astro
- Font da Google Fonts caricati con `font-display: swap` e preload

---

## GitHub Actions — Deploy

File `.github/workflows/deploy.yml` standard per Astro su GitHub Pages:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist/
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

---

## Comandi Utili

```bash
npm create astro@latest          # Inizializzazione progetto
npm install                      # Installazione dipendenze
npm run dev                      # Dev server locale (http://localhost:4321)
npm run build                    # Build produzione → dist/
npm run preview                  # Preview della build locale
npm run astro check              # Type-check file .astro
npx prettier --write .           # Formattazione
npx eslint .                     # Linting
```

---

## Sezioni del CV da Implementare

1. **Hero / Header** — nome, titolo, foto, link social, pulsante "Scarica CV"
2. **About** — paragrafo bio (3-5 righe), localizzazione, disponibilità
3. **Experience** — timeline lavorativa con azienda, ruolo, periodo, bullet point attività
4. **Education** — titoli di studio, università/istituto, anno
5. **Skills** — griglia di competenze con livello (es. badge o barra progress)
6. **Projects** — card con titolo, descrizione, stack usato, link GitHub/demo
7. **Contact** — form (opzionale: Formspree o Netlify Forms) + link diretti

---

## Note Finali

- Mantenere il codice **semplice e leggibile**: un sito CV non ha bisogno di over-engineering
- Aggiornare `src/data/` per modificare i contenuti senza toccare i componenti
- Testare su mobile prima di ogni commit
- Verificare il deploy su GitHub Pages dopo ogni push su `main`
