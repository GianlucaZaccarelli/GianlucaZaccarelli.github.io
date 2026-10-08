---
target: suite completa dopo il logo
total_score: 20
max_score: 28
na_heuristics: 7,9,10
p0_count: 0
p1_count: 2
target_identity: "file:C:\\git\\GianlucaZaccarelli.github.io\\src\\pages\\index.astro"
target_fingerprint: "sha256:ff2c95090530ed416e1799e6950d87efe2f16f2738551052e1ac32ded747b353"
target_path: "C:\\git\\GianlucaZaccarelli.github.io\\src\\pages\\index.astro"
timestamp: 2026-10-08T15-10-23Z
slug: src-pages-index-astro
---
Method: dual-agent (A: design review · B: detector + browser) + technical audit

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | System status | 3 | Tab indicator lags on Experience; folio + live region good |
| 2 | Real world | 3 | "N° 00", "MMXXVI", "Body Rental" are decorative jargon |
| 3 | Control | 3 | Intro had no skip (fixed: key/tap/wheel skip) |
| 4 | Consistency | 2 | Brand plate white over hero in light mode (fixed); "Full-Stack Dev" vs Senior (fixed); socials twice |
| 5 | Error prevention | 3 | Copy button gated on Clipboard API |
| 6 | Recognition | 3 | Numbered sections, folio |
| 7 | Flexibility | n/a | Static reading |
| 8 | Minimalism | 3 | Skills wall, footer redundancy |
| 9 | Error recovery | n/a | No forms |
| 10 | Help | n/a | CV |
| **Total** | | **20/28** | **Good (71%)** |

## Priority issues
- [P1] Intro ~3.2s, generic, CLS 1.0 from animating top/height. Fixed technically (transform exit, skippable, page inert, flat styling, locale-first greeting); duration kept as user-chosen.
- [P1] Brand plate inconsistent over hero; 24px mark smudgy. Fixed (dark glass over hero, 28px mark, "Senior Full-Stack Dev").
- [P2] Mobile hyphenation on serif/mono; "Full-/Stack". Fixed (hyphenation only on Inter body, U+2011 in roles).
- [P2] Projects show no decisions/outcomes. Open: needs real facts from the owner.
- [P3] Footer redundant/heavy; folio invisible over footer. Fixed folio (position-based) and ghost back-to-top; social duplication open.

## Audit (technical) 14/20 → fixes
Lighthouse mobile 59 → 83, desktop 73 → 99, CLS 1.0 → 0, A11y 96 → 100, BP 100, SEO 100.
Fixed: intro transform exit, menu inert, accent-700 on paper, ink start opacity, reduced-motion smooth scroll, hero region label, brand label-in-name, localized "Language"/"Scroll", hero sizes, will-change only with parallax, inline CSS, dead var fallbacks, card hover lift, 28px company links.
Open: mobile LCP 3.8s is the intro duration (first visit only).
