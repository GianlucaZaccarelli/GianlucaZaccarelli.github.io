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
- **Font**: Fontsource variable (Inter, Fraunces, JetBrains Mono) importati in `global.css`
- **Animazioni native**: Web Animations API (WAAPI) per il marquee dell'hero, CSS keyframes / transition per il loading screen. Nessuna libreria di animazione (no GSAP, no Motion).
- **Sitemap**: `@astrojs/sitemap` genera `sitemap-index.xml` in build (esclude `/cv-print`)

### Internazionalizzazione
- **Locale supportati**: `it` (default, `/`) e `en` (`/en/`)
- Tipo `Locale` in `src/data/types.ts`; tutti i componenti accettano la prop `locale`
- `getProfile(locale)` in `src/data/profile.ts` restituisce il profilo con override per lingua
- Negli altri file dati ogni campo traducibile è `Localized<T>` (`'valore'` oppure `{ it, en }`), risolto con `tr()` di `src/data/localize.ts`: le traduzioni stanno accanto alla voce, niente override per indice
- Le pagine `src/pages/index.astro` (it) e `src/pages/en.astro` (en) sono identiche tranne per il `locale` passato ai componenti
- Tutte le label UI sono inline nei componenti (oggetto `labels` switchato per `locale`)
- Per SEO: `<html lang={locale}>`, `<link rel="alternate" hreflang>` e `og:locale` gestiti in `BaseLayout.astro`

### Deployment
- **GitHub Pages** — via GitHub Actions (workflow `.github/workflows/deploy.yml`)
- Output: cartella `dist/` generata da `astro build`
- `site` impostato in `astro.config.mjs`. La repo è `username.github.io`, quindi `base` non è necessario

### Qualità del Codice
- **ESLint** (flat config, `eslint.config.mjs`) + **Prettier** (con `prettier-plugin-astro`)
- **Astro Check** — controllo tipi nei file `.astro` (`npm run check`)
- **Playwright** — test e2e + visual regression (`npm run test:e2e`). Disattivati in CI: gli snapshot sono generati su Windows e vanno rigenerati su Linux prima di riattivarli

### Generazione PDF del CV
- Script `scripts/generate-pdf.mjs` avvia un server statico su `dist/` e usa Puppeteer per stampare `/cv-print` in `public/cv.pdf` e `/cv-print-en` in `public/cv-en.pdf`
- Entrambe le pagine renderizzano `src/components/CvDocument.astro` con il `locale` corrispondente; `profile.cvPath` punta al PDF della lingua
- Invocato in CI dal workflow di deploy dopo `astro build`

---

## Struttura del Progetto

```
GianlucaZaccarelli.github.io/
├── .github/workflows/deploy.yml  # GitHub Actions → GitHub Pages
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   ├── icons/                    # SVG devicons v2.16.0 copiati in locale
│   └── cv.pdf, cv-en.pdf         # Generati in build, non committati
├── scripts/
│   └── generate-pdf.mjs          # Server statico + Puppeteer → public/cv*.pdf
├── src/
│   ├── components/
│   │   ├── Header.astro          # Navbar + hero fullscreen
│   │   ├── LoadingScreen.astro   # Intro animata (CSS + WAAPI)
│   │   ├── CvDocument.astro      # CV A4 stampabile, usato da cv-print(-en)
│   │   ├── FlagIcon.astro        # Bandierine SVG per lingua
│   │   ├── About.astro
│   │   ├── Experience.astro
│   │   ├── Education.astro
│   │   ├── Skills.astro
│   │   ├── Projects.astro
│   │   ├── Contact.astro
│   │   ├── Footer.astro
│   │   └── SocialIcon.astro      # SVG inline per linkedin/github/instagram/mail
│   ├── assets/                   # MainImage.jpg (hero), og-image.jpg (1200×630), cv_image.jpg, logos/*.webp
│   ├── data/
│   │   ├── types.ts              # Interfacce condivise
│   │   ├── localize.ts           # Localized<T> + tr()
│   │   ├── icons.ts              # Mappa tecnologia → icona in public/icons
│   │   ├── profile.ts            # Info personali + socialLinks
│   │   ├── experience.ts
│   │   ├── education.ts
│   │   ├── skills.ts
│   │   └── projects.ts
│   ├── layouts/
│   │   └── BaseLayout.astro      # <head> SEO/OG + LoadingScreen + slot
│   ├── pages/
│   │   ├── index.astro           # Single-page CV (locale: it)
│   │   ├── en.astro              # Versione inglese (/en/)
│   │   ├── cv-print.astro        # CV stampabile IT per Puppeteer
│   │   ├── cv-print-en.astro     # CV stampabile EN per Puppeteer
│   │   └── 404.astro             # Pagina 404 standalone bilingue
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
- **Single Page Application**: tutto il CV in `index.astro` (it) / `en.astro` (en), sezioni con anchor link (`#about`, `#experience`, ...). Le pagine `cv-print*.astro` sono dedicate alla generazione PDF e non vanno linkate dalla navigazione.
- **No dipendenze superflue**: aggiungere un pacchetto solo se strettamente necessario
- **Dati separati dalla UI**: tutti i contenuti (esperienze, skill, ecc.) vivono in `src/data/` come TypeScript con tipi espliciti in `types.ts`
- **Nessun framework UI runtime** (no React, no Vue) e **nessuna libreria di animazione**: solo componenti Astro + piccoli script vanilla. Le animazioni complesse usano CSS, Web Animations API e `requestAnimationFrame`
- **Accessibilità**: tag semantici HTML5 (`<section>`, `<article>`, `<nav>`, `<main id="main">`), attributi `aria-label` dove necessario, contrasto WCAG AA, rispetto di `prefers-reduced-motion` per le animazioni decorative, skip link verso `#main`

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
- `<title>`, `<meta name="description">`, Open Graph e Twitter Card in `BaseLayout.astro` differenziati per `locale`
- `lang={locale}` sul tag `<html>`, `og:locale` coerente (`it_IT` / `en_US`)
- `<link rel="alternate" hreflang="it|en|x-default">` per ogni pagina
- JSON-LD `Person` schema con `knowsAbout`, `sameAs` (social), `subjectOf` (CV PDF)
- Immagini con `loading="lazy" decoding="async"` (ad eccezione dell'immagine hero, che usa `loading="eager"` per LCP)
- Link a GitHub, LinkedIn, Instagram, email nella sezione Contact e nel footer (tramite `socialLinks` in `profile.ts`)
- Immagine Open Graph dedicata `src/assets/og-image.jpg` (1200×630): se cambia la foto va rigenerata
- `robots.txt` in `public/` con riferimento alla sitemap

### Immagini e Asset statici
- Foto e loghi vivono in `src/assets/` e si rendono con `<Image>` di Astro (ottimizzazione + srcset)
- Asset serviti da `public/` (icone) restano `<img>` HTML standard
- Indicare sempre `width`/`height` e attributi `loading`/`decoding` per prevenire CLS
- Icone: SVG copiati in `public/icons/` e mappati in `src/data/icons.ts` — devicons v2.16.0 per prodotti reali, Lucide v1.47.0 (`lucide-*.svg`, stroke ricolorato `#d97757`) per i concetti. Mai il logo di un prodotto su un concetto. Icona decorativa accanto al nome → `alt=""`

### Performance
- Target Lighthouse: Performance ≥ 95, Accessibility ≥ 95, Best Practices = 100, SEO = 100
- Ascolto scroll: usare un unico listener con `requestAnimationFrame` invece di più listener indipendenti
- Font Fontsource con `font-display: swap`; Fraunces usa le varianti `full` (assi `opsz`/`SOFT`) + `full-italic`; Fraunces e Inter latin in `preload` in `BaseLayout.astro`

---

## GitHub Actions — Deploy

File `.github/workflows/deploy.yml`: checkout → setup-node 22 → `npm ci` → `npm run lint` → `npm run check` → `npm run build` → `node scripts/generate-pdf.mjs` → copia `public/cv.pdf` e `public/cv-en.pdf` in `dist/` → `upload-pages-artifact` → `deploy-pages`.

---

## Comandi Utili

```bash
npm install              # Installazione dipendenze
npm run dev              # Dev server locale (http://localhost:4321)
npm run build            # Build produzione → dist/
npm run preview          # Preview della build locale
npm run check            # Type-check file .astro
npm run generate:cv      # Genera public/cv.pdf + cv-en.pdf (richiede build previa)
npm run lint             # ESLint
npm run format           # Prettier --write
npm run format:check     # Prettier --check
npm run test:e2e         # Playwright e2e + visual regression
npm run test:e2e:ui      # Playwright in modalità UI interattiva
```

---

## Sezioni del CV

1. **Hero / Header** — logo, nav (tab bar da `lg:`, menu hamburger sotto), lingua, theme toggle, bottone CV; hero fullscreen con parallax e marquee animato
2. **About** — bio, posizione, lingue, MBTI, disponibilità
3. **Experience** — timeline con logo, ruolo, azienda, periodo, bullet point
4. **Education** — card con logo, titolo, istituto, anno, descrizione
5. **Skills** — cluster per categoria con chip; logo devicons per prodotti/tecnologie reali, icona generica Lucide per le competenze concettuali
6. **Projects** — griglia card con stack badge e link opzionali
7. **Contact** — CTA email + social

---

## Note Finali

- Mantenere il codice **semplice e leggibile**
- Per modificare i contenuti aggiornare solo `src/data/` senza toccare i componenti
- Testare su mobile prima di ogni commit
- Verificare il deploy su GitHub Pages dopo ogni push su `main`
