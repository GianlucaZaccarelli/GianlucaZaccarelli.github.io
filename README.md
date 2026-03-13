# Gianluca Zaccarelli — Portfolio CV

Sito web personale / curriculum vitae di **Gianluca Zaccarelli**, Senior Full-Stack Developer.

Live: [gianlucazaccarelli.github.io](https://gianlucazaccarelli.github.io)

## Stack

- [Astro](https://astro.build) — framework statico, zero JS di default
- [Tailwind CSS v4](https://tailwindcss.com) — utility-first CSS
- [TypeScript](https://www.typescriptlang.org) — tipizzazione strict
- [Puppeteer](https://pptr.dev) — generazione automatica del PDF del CV
- [GitHub Actions](https://docs.github.com/en/actions) — deploy su GitHub Pages

## Struttura

```
src/
├── components/     # Header, About, Experience, Education, Skills, Projects, Contact, Footer
├── data/           # Contenuti tipizzati (experience, education, skills, projects, profile)
├── layouts/        # BaseLayout.astro con SEO
├── pages/
│   ├── index.astro     # Single-page CV
│   └── cv-print.astro  # Pagina ottimizzata per la generazione PDF
└── styles/
    └── global.css

scripts/
└── generate-pdf.mjs    # Genera public/cv.pdf via Puppeteer

public/
├── assets/profile.jpg
├── logos/              # Loghi aziende ed enti
└── cv.pdf              # Generato automaticamente nel CI
```

## Comandi

| Comando                | Azione                                          |
| :--------------------- | :---------------------------------------------- |
| `npm install`          | Installa le dipendenze                          |
| `npm run dev`          | Dev server locale su `localhost:4321`           |
| `npm run build`        | Build di produzione in `dist/`                  |
| `npm run generate:cv`  | Genera `public/cv.pdf` (richiede build prec.)   |
| `npm run preview`      | Preview della build locale                      |

## Deploy

Il deploy avviene automaticamente su **GitHub Pages** a ogni push su `main` tramite GitHub Actions (`.github/workflows/deploy.yml`). Il workflow:

1. Builda il sito con Astro
2. Genera `cv.pdf` tramite Puppeteer dalla pagina `/cv-print`
3. Pubblica `dist/` su GitHub Pages
