# ZakkaSite — Sito Personale / Portfolio CV

## Obiettivo del Progetto

Sito web personale in stile curriculum vitae, pubblicato su GitHub Pages come `gianlucazaccarelli.github.io`.
Deve essere professionale, veloce, accessibile e moderno.

---

## Stack Tecnologico

### Framework e Build
- **Astro 6** — framework statico, zero JS di default
- **TypeScript** — tipizzazione su tutti i file `.ts` e `.astro` (`astro/tsconfigs/strict`)
- **Tailwind CSS v4** — utility-first, plugin Vite `@tailwindcss/vite`; configurazione tramite `@theme` in `src/styles/global.css` (nessun `tailwind.config.ts`)
- **GSAP** — animazioni hero marquee e loading screen (bundle locale, non CDN)

### Deployment
- **GitHub Pages** — via GitHub Actions (workflow `.github/workflows/deploy.yml`)
- Output: cartella `dist/` generata da `astro build`
- `site` impostato in `astro.config.mjs`. La repo è `username.github.io`, quindi `base` non è necessario

### Qualità del Codice
- **ESLint** (flat config, `eslint.config.mjs`) + **Prettier** (con `prettier-plugin-astro`)
- **Astro Check** — controllo tipi nei file `.astro` (`npm run check`)

### Generazione PDF del CV
- Script `scripts/generate-pdf.mjs` avvia un server statico su `dist/` e usa Puppeteer per stampare `/cv-print` in `public/cv.pdf`
- Invocato in CI dal workflow di deploy dopo `astro build`

---

## Struttura del Progetto

```
ZakkaSite/
├── .github/workflows/deploy.yml  # GitHub Actions → GitHub Pages
├── public/
│   ├── favicon.svg
│   ├── cv.pdf                    # Generato in build, non committato normalmente
│   ├── assets/                   # Foto, font custom (NeueMontreal)
│   └── logos/                    # Loghi di aziende/istituti
├── scripts/
│   └── generate-pdf.mjs          # Server statico + Puppeteer → public/cv.pdf
├── src/
│   ├── components/
│   │   ├── Header.astro          # Navbar + hero fullscreen
│   │   ├── LoadingScreen.astro   # Intro animata GSAP
│   │   ├── About.astro
│   │   ├── Experience.astro
│   │   ├── Education.astro
│   │   ├── Skills.astro
│   │   ├── Projects.astro
│   │   ├── Contact.astro
│   │   ├── Footer.astro
│   │   └── SocialIcon.astro      # SVG inline per linkedin/github/instagram/mail
│   ├── data/
│   │   ├── types.ts              # Interfacce condivise
│   │   ├── profile.ts            # Info personali + socialLinks
│   │   ├── experience.ts
│   │   ├── education.ts
│   │   ├── skills.ts
│   │   └── projects.ts
│   ├── layouts/
│   │   └── BaseLayout.astro      # <head> SEO/OG + LoadingScreen + slot
│   ├── pages/
│   │   ├── index.astro           # Single-page CV
│   │   └── cv-print.astro        # Versione stampabile A4 per Puppeteer
│   └── styles/
│       └── global.css            # @import tailwindcss + @theme design tokens
├── astro.config.mjs
├── tsconfig.json
├── eslint.config.mjs
├── .prettierrc.json
├── package.json
└── CLAUDE.md
```

---

## Regole di Sviluppo

### Generale
- **Single Page Application**: tutto il CV in `index.astro`, sezioni con anchor link (`#about`, `#experience`, ...). La pagina `cv-print.astro` è dedicata alla generazione PDF e non va linkata dalla navigazione.
- **No dipendenze superflue**: aggiungere un pacchetto solo se strettamente necessario
- **Dati separati dalla UI**: tutti i contenuti (esperienze, skill, ecc.) vivono in `src/data/` come TypeScript con tipi espliciti in `types.ts`
- **Nessun framework UI runtime** (no React, no Vue): solo componenti Astro + piccoli script. GSAP è ammesso per animazioni complesse ed è importato come modulo (`import gsap from 'gsap'`), mai da CDN
- **Accessibilità**: tag semantici HTML5 (`<section>`, `<article>`, `<nav>`, `<main>`), attributi `aria-label` dove necessario, contrasto WCAG AA, rispetto di `prefers-reduced-motion` per le animazioni decorative

### TypeScript
- `strict: true` (ereditato da `astro/tsconfigs/strict`)
- Definire interfacce per i dati in `src/data/types.ts`
- Nessun `any` implicito; evitare anche `any` esplicito

### CSS / Tailwind
- Usare Tailwind utility classes direttamente negli attributi `class`
- CSS custom in blocchi `<style>` scoped dei componenti è ammesso per animazioni complesse (hero, marquee, loading screen)
- Design tokens (brand, surface, font) definiti via `@theme` in `src/styles/global.css`
- Dark mode class-based: `@variant dark (&:where(.dark, .dark *))`; lo switch è gestito da `Header.astro` e persiste in `localStorage`
- Design responsive mobile-first: `sm:`, `md:`, `lg:` breakpoints

### Contenuto e SEO
- `<title>`, `<meta name="description">`, Open Graph e Twitter Card in `BaseLayout.astro`
- `lang="it"` sul tag `<html>`
- Immagini con `loading="lazy" decoding="async"` (ad eccezione dell'immagine hero, che usa `loading="eager"` per LCP)
- Link a GitHub, LinkedIn, Instagram, email sia nell'header che nel footer (tramite `socialLinks` in `profile.ts`)

### Immagini e Asset statici
- Asset serviti da `public/` restano `<img>` HTML standard (il componente `<Image>` di Astro richiede import da `src/` e in questo progetto foto/loghi vivono in `public/`)
- Indicare sempre `width`/`height` e attributi `loading`/`decoding` per prevenire CLS
- Icone tecnologiche caricate da devicons via jsDelivr: **pinnare la versione** (es. `@v2.16.0`), mai `@latest`

### Performance
- Target Lighthouse: Performance ≥ 95, Accessibility ≥ 95, Best Practices = 100, SEO = 100
- Ascolto scroll: usare un unico listener con `requestAnimationFrame` invece di più listener indipendenti
- Font custom caricato con `font-display: swap` + `preload`

---

## GitHub Actions — Deploy

File `.github/workflows/deploy.yml`: checkout → setup-node 22 → `npm ci` → `npm run build` → `node scripts/generate-pdf.mjs` → copia `public/cv.pdf` in `dist/` → `upload-pages-artifact` → `deploy-pages`.

---

## Comandi Utili

```bash
npm install              # Installazione dipendenze
npm run dev              # Dev server locale (http://localhost:4321)
npm run build            # Build produzione → dist/
npm run preview          # Preview della build locale
npm run check            # Type-check file .astro
npm run generate:cv      # Genera public/cv.pdf (richiede build previa)
npm run lint             # ESLint
npm run format           # Prettier --write
npm run format:check     # Prettier --check
```

---

## Sezioni del CV

1. **Hero / Header** — logo, nav, social, theme toggle, bottone CV; hero fullscreen con parallax e marquee animato
2. **About** — bio, posizione, lingue, MBTI, disponibilità
3. **Experience** — timeline con logo, ruolo, azienda, periodo, bullet point
4. **Education** — card con logo, titolo, istituto, anno, descrizione
5. **Skills** — marquee bidirezionale con chip icone devicons
6. **Projects** — griglia card con stack badge e link opzionali
7. **Contact** — CTA email + social

---

## Note Finali

- Mantenere il codice **semplice e leggibile**
- Per modificare i contenuti aggiornare solo `src/data/` senza toccare i componenti
- Testare su mobile prima di ogni commit
- Verificare il deploy su GitHub Pages dopo ogni push su `main`
