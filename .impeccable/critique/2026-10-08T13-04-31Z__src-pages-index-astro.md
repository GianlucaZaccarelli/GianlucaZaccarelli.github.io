---
target: tutto il sito (mobile focus)
total_score: 22
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
target_identity: "file:C:\\git\\GianlucaZaccarelli.github.io\\src\\pages\\index.astro"
target_fingerprint: "sha256:ff2c95090530ed416e1799e6950d87efe2f16f2738551052e1ac32ded747b353"
target_path: "C:\\git\\GianlucaZaccarelli.github.io\\src\\pages\\index.astro"
timestamp: 2026-10-08T13-04-31Z
slug: src-pages-index-astro
---
Method: dual-agent (A: design review · B: detector + browser)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Desktop tab bar tracks section; mobile menu has no active state |
| 2 | Match System / Real World | 3 | Footer clock says "Roma" (Footer.astro:25) though he lives in San Secondo Parmense; "Studi accademici" includes high-school diploma |
| 3 | User Control and Freedom | 3 | Back-to-top, menu, toggles fine |
| 4 | Consistency and Standards | 2 | Section number vs entry number collide; mobile title hang breaks; footer off the 72rem grid; ~50 off-token colors in Header |
| 5 | Error Prevention | 3 | Little to prevent; "Microservizi" badge untranslated on /en/ projects |
| 6 | Recognition Rather Than Recall | 3 | Language toggle is flags only, 38x27px |
| 7 | Flexibility and Efficiency | n/a | Single-read portfolio |
| 8 | Aesthetic and Minimalist Design | 2 | 52 equal-weight skill chips; 5 controls in mobile header; featured project is the site itself |
| 9 | Error Recovery | 3 | 404 exists |
| 10 | Help and Documentation | n/a | Not applicable to a CV |
| **Total** | | **22/32** | **Acceptable (69%)** |

## Priority Issues
- [P1] Mobile hero: kickers 9.9px white on light-grey backdrop (low contrast), headline 18px, name only as a cropped marquee — never fully readable. Fix: dark scrim/relocate top-left text, kickers >=11px, headline ~1.6rem, static full name on mobile. adapt + typeset.
- [P1] Projects feature the wrong story: "Portfolio Personale v2" is the featured card with a self-link; the leadership proof (GDPR app, lead of 3 interns) is a small card. Fix: feature GDPR/HR project with role line, demote portfolio. clarify + layout.
- [P1] Mobile length ~9,984px (~12 screens): ~300px year block before each role, Skills ~1,934px. Fix: inline year with role on mobile, smaller numeral, cap chips per cluster with disclosure. distill + layout.
- [P2] Tap targets under 44px: flags 38x27, theme/menu 36x36, CV 73x38, footer socials 32x32, email/company links ~20px tall; 5 controls in mobile header. Fix: move language/theme into the mobile menu, enlarge hit areas. adapt + harden.
- [P2] Skills is a flat wall burying leadership: 52 chips, mono 11.5px, tech badges 10.4px; soft skills last. Fix: core row of 6-8 daily tools, leadership near About, collapse long tail. distill + typeset.

## Detector
88 findings: 75 design-system-color (mostly hex/rgba tints vs OKLCH tokens, 52 in Header.astro), 8 font-size, 3 radius, 2 warnings in LoadingScreen (dark-glow :162, radial-halo :90, hidden after intro, low weight). Browser: undersized text (95 elements <12px on mobile), gradient-text on "Zakka", radial-spotlight on project cards, em-dash overuse (21), "Microservizi" untranslated on /en/. No horizontal overflow on mobile. False positives: low-contrast white-on-white (hidden loader/closed menu), cv-button text-overflow.

## Minor
Footer "Roma" clock; "Votazione finale: 70/100" self-inflicted; Education bullets generic; About asserts traits; duplicate socials in Contact + footer; desktop "SCROLL" hint overlapped by marquee; mobile header ghosting; menu lacks CV/email shortcut.
