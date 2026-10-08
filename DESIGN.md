---
name: Gianluca Zaccarelli — Portfolio CV
description: A personal magazine for a senior developer who leads; editorial serif, warm paper, terracotta ink.
colors:
  terracotta: "oklch(65% 0.16 45)"
  terracotta-deep: "oklch(58% 0.17 45)"
  terracotta-ink: "oklch(50% 0.15 45)"
  terracotta-glow: "oklch(70% 0.14 45)"
  terracotta-wash: "oklch(96% 0.02 45)"
  terracotta-cover: "oklch(52% 0.08 45)"
  indigo: "oklch(54% 0.22 264)"
  indigo-deep: "oklch(48% 0.22 264)"
  ink: "oklch(18% 0.01 264)"
  ink-soft: "oklch(35% 0.008 264)"
  ink-muted: "oklch(55% 0.006 264)"
  ink-rule: "oklch(78% 0.005 264)"
  paper: "oklch(98.5% 0.004 70)"
  paper-alt: "oklch(96% 0.006 70)"
  white: "#FFFFFF"
  night: "#1C1D20"
  night-deep: "#141517"
  night-card: "#25262A"
  hero-black: "#0F1012"
typography:
  display:
    fontFamily: "Fraunces Variable, Fraunces, Times New Roman, Georgia, serif"
    fontSize: "clamp(2.5rem, 6vw, 4.75rem)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-0.035em"
    fontVariation: "'opsz' 96, 'SOFT' 100"
  numeral:
    fontFamily: "Fraunces Variable, Fraunces, Georgia, serif"
    fontSize: "4.5rem"
    fontWeight: 300
    lineHeight: 1
    letterSpacing: "-0.025em"
    fontVariation: "'opsz' 144, 'SOFT' 100"
  headline:
    fontFamily: "Fraunces Variable, Fraunces, Georgia, serif"
    fontSize: "1.875rem"
    fontWeight: 500
    lineHeight: 1.25
    fontVariation: "'opsz' 48, 'SOFT' 100"
  lead:
    fontFamily: "Fraunces Variable, Fraunces, Georgia, serif"
    fontSize: "clamp(1.25rem, 1.8vw, 1.6rem)"
    fontWeight: 400
    lineHeight: 1.35
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Inter Variable, Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
    fontFeature: "'ss01', 'cv11', 'calt'"
  label:
    fontFamily: "Inter Variable, Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 500
    lineHeight: 1.4
  mono:
    fontFamily: "JetBrains Mono Variable, JetBrains Mono, ui-monospace, Menlo, monospace"
    fontSize: "0.72rem"
    fontWeight: 500
    letterSpacing: "0.02em"
  kicker:
    fontFamily: "JetBrains Mono Variable, JetBrains Mono, ui-monospace, Menlo, monospace"
    fontSize: "0.62rem"
    fontWeight: 400
    letterSpacing: "0.18em"
rounded:
  hairline: "4px"
  tile: "14px"
  card: "16px"
  pill: "999px"
spacing:
  gutter: "24px"
  card-pad: "32px"
  section-y: "128px"
  section-y-mobile: "96px"
  container: "72rem"
components:
  button-cv:
    backgroundColor: "{colors.terracotta-wash}"
    textColor: "{colors.terracotta-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
  card-project:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "{spacing.card-pad}"
  card-project-dark:
    backgroundColor: "{colors.night-card}"
    textColor: "{colors.white}"
    rounded: "{rounded.card}"
    padding: "{spacing.card-pad}"
  chip-skill:
    textColor: "{colors.ink-soft}"
    typography: "{typography.mono}"
    rounded: "{rounded.pill}"
    padding: "7px 14px"
  chip-skill-hover:
    textColor: "{colors.terracotta-ink}"
  badge-tech:
    textColor: "{colors.indigo-deep}"
    typography: "{typography.mono}"
    rounded: "{rounded.pill}"
    padding: "3px 9px"
  nav-tab:
    textColor: "{colors.ink-muted}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "6px 14px"
  logo-tile:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.tile}"
    size: "112px"
    padding: "16px"
---

# Design System: Gianluca Zaccarelli — Portfolio CV

## Overview

**Creative North Star: "La Rivista Personale"**

The site is laid out like a personal magazine issue about one person. Every section opens with a large, soft Fraunces headline and a small mono section number hanging in the margin ("01", "02"…), the way a magazine numbers its features. Running text alternates between a serif lead paragraph and plain Inter body copy; metadata (dates, places, counts) is set in JetBrains Mono so facts read as facts. The hero is the cover: a full-bleed portrait on near-black, a rolling serif name along the bottom edge, small mono kickers in the corners ("N° 00 / Portfolio", the year in Roman numerals).

The tone is confident and authoritative but never loud. Authority comes from scale contrast (huge display serif against tiny mono labels), generous section padding and a disciplined two-voice palette: warm paper and ink for the page, terracotta as the editor's red pen. Indigo exists as a cold technical counter-voice and stays rare.

Components are tactile and sure of themselves: cards lift on hover with a warm terracotta-tinted shadow, chips nudge up a pixel, the CV button sits as a filled pill. Motion is there to make objects feel physical, not to entertain.

**Key Characteristics:**

- Magazine hierarchy: oversized Fraunces display, mono section numbers, serif lead + sans body.
- Warm paper (light) and graphite night (dark) surfaces, alternating per section.
- Terracotta as the single warm accent; indigo only for technology signals.
- Pill-shaped controls and chips; softly rounded cards; white logo tiles.
- Tactile hover: lift + warm shadow, never glow.
- Full light/dark parity; the hero is always dark.

## Colors

A warm editorial palette: off-white paper and cool ink, with terracotta as the one accent and indigo as a quiet technical counterpoint. `src/styles/global.css` `@theme` is the source of truth (OKLCH).

### Primary

- **Terracotta** (`accent-500`): the editor's pen. Bullet dashes in timelines, focus rings, the availability dot, hover borders on cards and chips.
- **Terracotta Deep** (`accent-600`): accent text on paper: section numbers, italic `<em>` in titles, company names, MBTI.
- **Terracotta Ink** (`accent-700`): darkest accent for small text that must pass AA on paper (featured tag, chip hover text, CV button text).
- **Terracotta Glow** (`accent-400`): the accent on dark surfaces: em in titles, hero subtitle, marquee dash, all dark-mode accent text.
- **Terracotta Wash** (`accent-50`): tinted fill behind accent controls (CV button, theme toggle in light mode).
- **Terracotta Cover** (`--color-copertina`, oklch 52% 0.08 45, a dusty terracotta): the back cover. Fills the Contact section in both themes, softer against Paper than a deep rust. Paper text (5.4:1), section number in Paper, labels at 92%, Terracotta Light (`accent-200`) only for the large italic accent (3.5:1).
- **Terracotta Deep** (`accent-800`, oklch 42% 0.13 42): the darkest accent text on paper (brand hover).

### Secondary

- **Signal Indigo** (`brand-600`) / **Indigo Deep** (`brand-700`): technology only. Tech badges that carry a real product icon, the dark-mode theme toggle, the loading screen's cold orb. Never on headlines or body text.

### Neutral

- **Ink** (`ink-900`): headlines and primary text on paper; tooltip and skip-link fill.
- **Ink Soft** (`ink-700`): body copy, bullets, chip text.
- **Ink Muted** (`ink-500`): metadata, dates, locations, inactive nav tabs.
- **Ink Rule** (`ink-300`): hairlines and borders, always used at 40–60% opacity.
- **Paper** / **Paper Alt**: the warm off-white page and its slightly greyer alternate.
- **White**: alternate light section background, card and logo-tile fill.
- **Night** (`surface`), **Night Deep** (`surface-alt`), **Night Card** (`surface-card`): dark-mode page, alternate sections and cards. Dark text is `#E8E8EA` / white at 55–80% opacity for hierarchy.
- **Hero Black** (`#0F1012`): the cover's backdrop and vignette.

### Named Rules

**The Red Pen Rule.** Terracotta marks; it never fills large areas. It appears as text, hairlines, dots, tints at ≤ 20% and hover states, never as a section background or solid button slab.

**The Back Cover Exception.** Exactly one region may be filled with terracotta: the Contact section, set as the magazine's back cover (Terracotta Cover, Paper type, identical in light and dark). It is the end of the reading, the peak-end moment and the call to write. No other section, card or button gets a terracotta fill. Everything inside follows: headline and number Paper, italic `accent-200`, lead Paper, hairlines Paper 25%, focus ring Paper; the copy button stamps into solid Paper; the folio switches to Paper while over it.

**The Indigo Means Tech Rule.** Indigo appears only where a real technology is named or in the night-mode controls. If an element isn't about tech, it isn't indigo.

**The Alternating Spread Rule.** Sections alternate background like magazine spreads: paper / white in light mode, night-deep / night in dark mode (About paper, Experience white, Education paper, Skills white, Projects paper, Contact white).

## Typography

**Display Font:** Fraunces Variable (with Times New Roman, Georgia)
**Body Font:** Inter Variable (with ui-sans-serif, system-ui)
**Label/Mono Font:** JetBrains Mono Variable (with ui-monospace, SF Mono, Menlo)

**Character:** Fraunces, soft and high-contrast at large optical sizes (`SOFT 100`, `opsz` 48–144), gives the editorial voice and the italic accent; Inter carries plain reading; JetBrains Mono turns dates, counts and kickers into precise, tabular facts.

### Hierarchy

- **Display**: section titles. Regular weight, tight leading, negative tracking; italic `<em>` words in Terracotta Deep / Glow. The hero marquee name uses the same voice at `max(3.25rem, 5.5vw)`.
- **Numeral**: the giant start year of each timeline entry; Fraunces light italic, 3.75rem mobile → 4.5rem desktop.
- **Headline**: role, degree and project titles; Fraunces medium, 1.5rem → 1.875rem (project cards 1.25–1.875rem by size).
- **Lead**: the first paragraph of About and Contact; serif, magazine standfirst, max ~42rem wide.
- **Body**: Inter 1rem (0.95rem on mobile timelines), relaxed leading, `ss01`/`cv11` stylistic sets; max ~42rem.
- **Label**: Inter medium 0.8rem for `<dt>`s and meta labels; tab bar 0.82rem.
- **Mono**: chips and badges (0.72–0.875rem), dates, counters, tabular numbers.
- **Kicker**: hero corner labels: mono 0.7–0.72rem, uppercase, 0.18–0.2em tracking.

### Named Rules

**The Two Voices Rule.** Serif speaks (titles, leads, the name); sans explains (body); mono certifies (dates, numbers, tech). Don't mix roles.

**The Margin Number Rule.** Every section title carries its nav-order number in mono terracotta; from 768px it hangs in the left margin so the title aligns with the text column. Below 768px it sits on its own line above the title, so a two-line title never wraps under it.

**The Measure Rule.** Running text stays between 45 and 75 characters per line: bullet lists are capped at `58ch` (Inter's `ch` is wider than its average glyph, so 58ch ≈ 64 characters), body paragraphs at `max-w-2xl`. Headings use `text-wrap: balance`, paragraphs and list items `text-wrap: pretty`; below 640px body text hyphenates (`hyphens: auto`, driven by `<html lang>`). In dark mode body text gains `0.006em` tracking to offset the halo of light-on-dark.

**The Italic Is The Accent Rule.** Emphasis in display type is Fraunces italic in terracotta, never bold or underline.

## Layout

Single column of full-width sections, each with a centered 72rem container and 24px gutters. Vertical rhythm is generous: 96px section padding on mobile, 128px from `md` (Contact up to 144px); titles sit 48px above content.

Content uses a 12-column grid from `md`. About and Contact split 8 + 4 with a hairline-ruled sidebar on the right; Experience and Education split 3 + 9, with the year column `sticky` at `top: 7rem` and a hairline rule separating it from the content. Projects use a 3-column bento where the featured and every fourth card span two columns with equal row heights. Skills sit in a 2-column cluster grid.

The hero is `100svh` (min 600px): portrait centered and masked at the sides, text in absolute side columns; under 720px the text moves to the top-left and bottom-right to keep the face clear. The header is fixed, so anchored sections use `scroll-margin-top: 4.5rem`. The tab bar appears from `lg`; below it a full-screen menu shows numbered serif links.

## Elevation & Depth

A layered-but-mostly-flat system: surfaces rest flat and separate through background alternation and hairlines (`ink-300` at 40%, white at 10% in dark). Depth appears as a response to touch, which is what makes the components feel tactile.

### Shadow Vocabulary

- **Logo Plate** (`0 8px 24px rgba(0,0,0,0.06)`): the only resting shadow, under white logo tiles so they read as physical plates.
- **Warm Lift** (`0 20px 40px -20px rgba(217,119,87,0.15)`, 0.25 in dark): project card hover, paired with `translateY(-4px)` and a terracotta border.
- **Button Press** (`0 6px 16px -6px rgba(192,97,26,0.35)`): CV button and theme toggle hover, with `translateY(-1px)`.
- **Brand Plate** (`0 1px 0 rgba(255,255,255,0.75) inset, 0 8px 24px rgba(15,16,18,0.08)`): the "Zakka" brand pill in the header.

### Named Rules

**The Earned Shadow Rule.** Shadows appear on hover/focus, not at rest (logo tiles excepted). Shadows are warm (terracotta-tinted) or neutral, never colored glows.

**The Glass Only Over The Cover Rule.** Backdrop blur is reserved for the fixed header and the controls floating over the hero; content surfaces stay opaque.

## Shapes

Three shape families: **pills** (999px) for every control (tab bar, language toggle, theme toggle, CV button, chips, badges, MBTI tag); **soft cards** (16px) for project cards; **tiles** (14px mobile / 16px desktop) for logos. Tooltips, the skip link and focus rings use a 4px hairline radius. Lines are 1px hairlines; the timeline bullets are serif em dashes in terracotta instead of dots.

## Components

### Buttons

Confident filled pills.

- **Shape:** full pill (999px).
- **CV button (primary):** terracotta wash fill with a 45% terracotta border, Terracotta Ink text, 0.82rem semibold, 8px 16px, download icon that nudges down on hover.
- **Hover / Focus:** lifts 1px, fill deepens to 22%, Button Press shadow. Focus is the global 2px terracotta outline, 2px offset.
- **Theme toggle:** 36px round icon button; terracotta in light, indigo in dark, sun/moon cross-rotate.
- **Over the hero:** controls switch to a light variant (white 12% fill, peach `#FFC08A` text) to sit on the dark photo.

### Chips

- **Core chip:** the "Ogni giorno / Every day" row above the skill clusters: 44px pill on paper (Night Card in dark), mono 0.875rem, 22px product icon, warm lift on hover. Reserved for the 6–8 tools used daily.
- **Skill chip:** transparent pill, 1px border (black 12% / white 15%), mono 0.75rem; on mobile each cluster shows 6 chips and a dashed "+N" pill opens the rest, optional 16px icon. Hover: terracotta border, 8% terracotta tint, Terracotta Ink text, 1px lift.
- **Tech badge:** smaller mono pill (0.72rem). With a real product icon (devicons) it turns indigo (indigo 30% border, Indigo Deep text); concepts (Lucide icon or none) stay neutral ink, their icon in terracotta.

### Cards / Containers

- **Corner Style:** 16px.
- **Background:** white / Night Card, with two barely-there radial washes (terracotta top-right, indigo bottom-left at 3–8%).
- **Shadow Strategy:** flat at rest, Warm Lift on hover (see Elevation).
- **Border:** 1px Ink Rule at 40% → terracotta on hover.
- **Internal Padding:** 24px mobile, 32px desktop; stack badges and links pinned to the bottom above a hairline.
- **Featured card:** spans two columns, carries an outlined terracotta "In evidenza / Featured" pill and stronger washes.

### Navigation

- **Header:** fixed, 80% white with 12px blur (opaque on mobile); a terracotta hairline gradient underlines it, hidden over the hero where the bar turns into dark glass.
- **Brand mark:** the ZG. logo (`src/components/LogoMark.astro`, generated from `docs/design/logo-zg`), 28 px tall, ink body + terracotta dot, inside a plate-like pill with "Senior Full-Stack Dev" from xl. Over the hero the plate turns to dark glass and the logo to paper (Glow dot). On hover the dot re-runs its arrival.
- **Tab bar (lg+):** pill container, Ink Muted labels 0.82rem; the active section gets a sliding pill indicator tracked on scroll.
- **Language toggle:** segmented pill with flag icons, inactive at 55% opacity (lg and up only).
- **Mobile:** the header keeps only brand, CV and a 44px two-bar menu toggle. The full-screen paper overlay lists numbered Fraunces links (2rem, active section in terracotta italic) and, below, 44px pill tools: Italiano / English with flags, theme switch, email.

### Intro

A once-per-session sequence of four greetings (first in the page language, 200 ms each, about 1.3 s before the curtain lifts) on Night Deep with a terracotta progress line. It exits with a transform-only curtain (no layout shift), any key, tap or wheel skips it, and the page underneath is `inert` while it runs. No blur blobs or glows. Skipped under reduced motion.

### State Motion

Supporting motion only explains a change; the authored moment remains Ink on Scroll.

- **Theme switch:** the new theme spreads from the pressed button as an ink blot (View Transitions, `clip-path: circle()` on `::view-transition-new(root)`, 600ms, `cubic-bezier(0.16, 1, 0.3, 1)`). Instant without support or under reduced motion.
- **Tab bar:** a single indicator pill slides under the active section (transform + width, 450ms, same curve); it appears in place the first time, never sliding in from the left.
- **Mobile menu:** links enter in sequence (`--i × 40ms`, max 200ms), tools follow at 260ms; closing has no delay. Visibility switches on immediately at open so focus can move into the menu.
- **Skills "+N":** revealed chips enter in sequence (35ms each, capped at 210ms, 320ms each).

### Editor's Touches (delight)

Small, useful details in the magazine's voice, never decoration:

- **Copy address** (Contact): a 44px mono pill under the email, shown only when the Clipboard API exists. On copy it "stamps": terracotta border and tint, a short scale + tilt (420ms, skipped under reduced motion), label "Copiato — a presto" announced via `aria-live`, reset after 2.4s.
- **Colophon** (footer): one mono line with true facts only (typefaces, Astro, GitHub Pages).
- **Console note**: a single styled `console.log` for developers who open DevTools, with the email.

### About standfirsts

About opens with two standfirsts: the factual lead in Fraunces (ink), then the psychology paragraph, the profile's hook, in Fraunces italic set in Terracotta Ink (Glow in dark). Body copy follows in Inter.

### Ink on Scroll (signature motion)

The page "prints" as it scrolls (CSS scroll-driven animations, `src/styles/global.css`):

- **Section titles** enter thin and sharp (Fraunces `wght` 100, `SOFT` 0, `opsz` 144; opacity never changes, so the margin number stays AA) and settle into their final voice (`wght` 400, `SOFT` 100, `opsz` 96) between `entry 10%` and `cover 40%`; an italic `<em>` is revealed left to right like a pen stroke.
- **Timeline years** spread like an ink drop (`wght` 100 → 560 → 300) as they cross the viewport.
- **Folio** (xl and up): a vertical spine in the left margin, mono number + section name, with a 1px terracotta thread that fills with page progress.

Only under `@supports (animation-timeline: view())` and `prefers-reduced-motion: no-preference`; everywhere else the final static state is shown. Sections use `overflow: clip`, never `overflow: hidden`, which would turn them into scroll containers and freeze the view timelines.

### Timeline Entry (signature)

The Experience/Education unit: mono index + giant italic Fraunces year + mono period in a sticky left column; a hairline rule; then logo tile + Fraunces role + terracotta company link, em-dash bullets in Ink Soft, and tech badges.

### Hero Cover (signature)

Full-bleed portrait on Hero Black, slight grayscale, side mask, grain overlay and vignette; mono kickers in the corners (≥ 11px); title "Senior *Full-Stack Developer*" in serif on the right, then a mono facts line (years · stack · role) and the hook in Fraunces italic ("Scrivo codice e studio le persone che lo scrivono."); the name rolling in a WAAPI marquee along the bottom; an animated scroll line above the marquee. Parallax on scroll; decorative motion stops under `prefers-reduced-motion`.

Under 720px the cover recomposes instead of shrinking: the portrait fills the top 82% (whole head, profile centered) and fades into a black band; a top scrim keeps the location kickers legible; the full name is set statically in Fraunces (~3rem) at the bottom left with role and availability beneath it; marquee and scroll hint are dropped.

## Do's and Don'ts

### Do:

- **Do** open every section with the Display serif title and its mono margin number.
- **Do** put dates, counts, periods and technologies in JetBrains Mono with tabular numbers.
- **Do** use terracotta as text, hairline, dot or ≤ 20% tint; use `accent-700` for small accent text on paper and `accent-400` on dark.
- **Do** make interactive objects tactile: 1–4px lift plus a warm or neutral shadow on hover.
- **Do** keep every control pill-shaped and every card at 16px.
- **Do** design both themes together; the hero stays dark in both.
- **Do** respect `prefers-reduced-motion` for marquee, parallax, scroll line and pulses.

### Don't:

- **Don't** fill large areas or primary buttons with solid terracotta or indigo.
- **Don't** use indigo for anything that isn't technology or a night-mode control.
- **Don't** bold or underline display type for emphasis; use Fraunces italic in terracotta.
- **Don't** add resting drop shadows or colored glows to cards and text.
- **Don't** introduce a fourth typeface or set body text in the serif.
- **Don't** set visible text below 11px, or make a touch target smaller than 44px.
- **Don't** use a product logo for a concept: devicons for real products, Lucide (stroke `#d97757`) for concepts.
