# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Recruiter / HR**: screen many profiles quickly; need role, seniority, stack, location and the PDF CV within seconds.
- **Tech lead / hiring manager**: judge technical depth and responsibility: projects, domains, stacks, leadership scope.
- **Consulting clients**: companies evaluating a developer for a project or body-rental engagement.
- **Personal network**: colleagues and LinkedIn contacts using the site as a professional business card.

Visitors arrive in Italian (`/`) or English (`/en/`), on desktop and mobile.

## Product Purpose

Personal CV / portfolio of Gianluca Zaccarelli ("Zakka"), Senior Full-Stack Developer based in San Secondo Parmense (PR), Italy.
Primary success: personal brand. A curated, memorable professional presence that leaves visitors with a clear picture of who Gianluca is; there is no single conversion to optimize for. Contact (email / LinkedIn) about a role, consulting enquiries and CV downloads are welcome secondary outcomes.

## Positioning

A senior developer who leads: technical solidity combined with leadership and people understanding.

- Leadership and management: project lead experience (e.g. GDPR visitor app led with a team of 3 interns), strategic planning, clear direct communication.
- Technology + psychology: currently studying for a Degree in Psychological Sciences to understand people and teams beyond code.

## Operating Context

- Single-page CV with anchored sections (About, Experience, Education, Skills, Projects, Contact) plus a downloadable A4 PDF CV per language, generated from the same data.
- Recruiters often compare the site against the PDF and LinkedIn profile.

## Capabilities and Constraints

- Static Astro site on GitHub Pages; bilingual it/en; content lives in typed data files under `src/data/`.
- No runtime UI framework, no animation library (see CLAUDE.md).
- Light/dark theme toggle persisted locally.
- Lighthouse targets: Performance ≥ 95, Accessibility ≥ 95, Best Practices 100, SEO 100.

## Brand Commitments

- Name: Gianluca Zaccarelli; nickname "Zakka".
- Voice: confident, clear, direct; MBTI ENTJ is shown on the site.
- Assets: hero photo `src/assets/MainImage.jpg`, OG image `src/assets/og-image.jpg`, CV photo `src/assets/cv_image.jpg`, employer/school logos in `src/assets/logos/`.

## Evidence on Hand

- Real work history (Code It Digital Solutions, Raffaele Caruso S.p.A., SiGrade S.p.A.), education (UniPR, ITIS), projects and skills in `src/data/`.
- No testimonials, client logos used as endorsements, metrics or case-study numbers exist: do not fabricate them.

## Product Principles

1. Brand first: every section should strengthen a coherent, recognizable professional identity; reaching out stays easy but is never pushed.
2. Scannable first, deep second: recruiters get the essentials at a glance, tech leads can dig into detail.
3. Show leadership and people sense, not just a stack list.
4. Truthful and specific: only real roles, projects and facts from `src/data/`.
5. Site and PDF CV tell the same story in both languages.

## Accessibility & Inclusion

WCAG AA contrast, semantic landmarks, skip link to `#main`, `prefers-reduced-motion` respected for decorative animation.
