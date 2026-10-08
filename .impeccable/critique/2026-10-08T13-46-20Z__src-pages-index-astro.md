---
target: tutto il sito (dopo le correzioni)
total_score: 20
max_score: 28
na_heuristics: 7,9,10
p0_count: 0
p1_count: 3
target_identity: "file:C:\\git\\GianlucaZaccarelli.github.io\\src\\pages\\index.astro"
target_fingerprint: "sha256:ff2c95090530ed416e1799e6950d87efe2f16f2738551052e1ac32ded747b353"
target_path: "C:\\git\\GianlucaZaccarelli.github.io\\src\\pages\\index.astro"
timestamp: 2026-10-08T13-46-20Z
slug: src-pages-index-astro
---
Method: dual-agent (A: design review · B: detector + browser)

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | System status | 3 | Active section in tab bar and mobile menu; no position cue while scrolling mobile |
| 2 | Real world | 3 | "Body Rental" jargon; "Postilla"/"Altrove" literary |
| 3 | Control & freedom | 3 | Loader (~3s, once per session) not skippable |
| 4 | Consistency | 2 | Indigo-means-tech broken (concept icons indigo, SQL Server logo on "SQL"); mobile header gutter 48px right vs 24px left; core skills repeated in clusters |
| 5 | Error prevention | 3 | Little to go wrong |
| 6 | Recognition | 3 | Nav always reachable, numbered |
| 7 | Flexibility | n/a | Portfolio |
| 8 | Minimalism | 3 | Skills volume (60 chips) and mobile length |
| 9 | Error recovery | n/a | No forms; 404 exists |
| 10 | Help | n/a | CV |
| **Total** | | **20/28** | **Good (71%)** |

## Priority issues
- [P1] Mobile header turns translucent (.over-hero rgba .45 beats opaque rule by specificity, Header.astro:379) — hero text slides under Zakka/CV on first scroll. harden/polish.
- [P1] Mobile header gutter asymmetric: grid-cols-[auto_1fr_auto] with hidden middle (Header.astro:95) leaves an extra 24px gap on the right. layout.
- [P1] Copy doesn't prove "a senior who leads": About lead is self-praise (profile.ts:3-6), psychology is a "Postilla", projects lack role/decision/outcome. clarify.
- [P2] Skills heavy on mobile (1,798px): core chips one per line, core duplicated in clusters, weak first-6 ordering (Dart/Flutter before Accessibility), double rule on cluster headers. distill/adapt.
- [P2] TechBadge indigo whenever any icon exists: "Project Management" (Lucide concept) indigo; "SQL" shows SQL Server logo. polish.

## Detector
43 findings (was 88): 28 color, 10 font-size, 3 radius advisories; 2 warnings in LoadingScreen (dark-glow :162, radial-halo :90, transient). Browser: radial-spotlight on project cards, em-dash overuse (20), mobile menu numbers 0.68rem (<11px), tech badges 11.5px. No i18n leaks on /en/. No horizontal overflow. False positives: cv-button overflow (tooltip ::after), white-on-white (sr-only span), grain overlay.

## Minor
Mobile hero dead band ~80px and nose at right edge; menu doesn't move focus; "+N altre" lacks context in label; "Sett." vs "Set" month abbreviation; "Dev-Analyst" breaks at hyphen; brand link 69x35; footer duplicates contact socials; recruiter at-a-glance line (years · stack · lead) missing.
