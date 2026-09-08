# Tasks — 005-home-about-redesign

## Legend

- `T{NNN}` — task id, unique within feature, zero-padded.
- `[P]` — safe to execute in parallel with other `[P]` tasks (disjoint files, no shared mutable state).
- `R` — Red beat description.
- `G` — Green beat description.
- `F` — Refactor beat description.
- `status` — `open | in_progress | closed | skipped`.

---

## T001 [P] Deterministic heatmap-pattern generator

```
spec-ref:        Acceptance criteria 5, 6
contract-ref:    n/a
constitution-ref:Article VII
DoD:
  - generateHeatmapPattern(rows, cols) returns a flat array of length rows*cols
  - every value is an integer in [0, 4]
  - two calls with the same (rows, cols) return deeply-equal arrays (determinism, criterion 6)
  - different (rows, cols) change the output length
R: a test importing generateHeatmapPattern fails because utils/heatmap.ts does not exist yet
G: implement the function with fixed coordinate arithmetic — no Math.random, no Date.now, no external input, no seed parameter (Article VII)
F: skipped unless the arithmetic formula needs a clearer name/extraction
files:
  - utils/heatmap.ts
  - tests/unit/heatmap.spec.ts
status: closed
commits:
  red: 2331be8
  green: 358a718
  refactor: skipped — no smell detected
notes: fully independent of T002-T004's files — first task, no dependency.
```

---

## T002 Decorative heatmap component

```
spec-ref:        Acceptance criteria 4, 5, 7, 8
contract-ref:    n/a
constitution-ref:Article VII, Article VIII
DoD:
  - renders a 7x14 grid of cells from generateHeatmapPattern(7, 14)
  - each cell's intensity (0-4) maps to a distinct visual style (e.g. background color/opacity step)
  - root element carries aria-hidden="true" (purely decorative, criterion 8)
  - a <style> block declares a @keyframes rule and a per-cell animation-delay (staggered pulse, criterion 7)
R: a test mounting HeatmapGrid.vue fails because the component does not exist yet
G: minimal template (v-for over generateHeatmapPattern(7, 14)) + <style scoped> with the keyframes/animation-delay
F: skipped unless the per-cell inline style computation needs extracting into a computed/helper
files:
  - components/home/HeatmapGrid.vue
  - tests/nuxt/heatmap-grid.nuxt.spec.ts
  - tests/unit/heatmap-grid-style.spec.ts
status: closed
commits:
  red: f6553f0
  green: a9ee548
  refactor: skipped — no smell detected
notes: |
  Depends on T001 (imports generateHeatmapPattern) — sequential after it, not [P]. Added
  tests/unit/heatmap-grid-style.spec.ts (not in the original file list) for the CSS-specific
  assertions (@keyframes, animation-delay), per ADR 0003's source-text convention, separate from
  the nuxt-mount test's DOM/behavior assertions (cell count, aria-hidden).
```

---

## T003 Home: activity-list badges + wire the heatmap in

```
spec-ref:        Acceptance criteria 3, 4
contract-ref:    n/a
constitution-ref:Article II, Article VIII
DoD:
  - activity-list items render as individually styled badges (border/background/padding) — the middle-dot ::after separator rule is removed
  - <HeatmapGrid /> is placed in the Home layout, visible only on viewports >=768px, filling the previously empty space beside the name/activity list
  - tests/nuxt/accessibility.nuxt.spec.ts still passes for "/" and "/en" after this change
R: tests/unit/home-style.spec.ts (extended) fails — the ::after separator rule is still present, no badge rule exists yet; tests/nuxt/home.nuxt.spec.ts (extended) fails — HeatmapGrid isn't rendered inside the Home page yet
G: rewrite Hero.vue's <style> block for badges; import and place <HeatmapGrid /> in a >=768px-only container
F: skipped unless the badge styling duplicates a pattern already generalized in assets/css/main.css
files:
  - components/home/Hero.vue
  - tests/unit/home-style.spec.ts
  - tests/nuxt/home.nuxt.spec.ts
status: closed
commits:
  red: 7d702ab
  green: e61779d
  refactor: skipped — no smell detected
notes: |
  Depends on T002 (imports HeatmapGrid.vue) — sequential after it. Reused the existing
  pill/badge visual pattern already used by SuccessStoryCard's tags (border-radius:999px,
  --color-background-alt, --color-border) instead of inventing a new style. Heatmap hidden below
  768px — criterion 4 only requires filling the empty space on wide viewports, and mobile has no
  such empty space to fill. Verified live via the dev server (HMR).
```

---

## T004 [P] About: two-column layout >=768px

```
spec-ref:        Acceptance criteria 1, 2
contract-ref:    n/a
constitution-ref:Article II
DoD:
  - the profile photo and the personal-details block (tagline, "some personal details" intro, fields list) share one new wrapping container; heading/intro/closing paragraphs stay outside it, full-width
  - a @media (min-width: 768px) rule lays that container out as two columns
  - below 768px the container keeps the current stacked reading order (no mobile regression, criterion 2)
R: tests/unit/about-style.spec.ts (extended) fails — no two-column breakpoint rule exists yet for AboutProfile
G: add the wrapping div in AboutProfile.vue's template; add the CSS Grid two-column rule under the existing 768px breakpoint
F: skipped unless the new wrapper duplicates a layout pattern already generalized elsewhere
files:
  - components/about/AboutProfile.vue
  - tests/unit/about-style.spec.ts
status: closed
commits:
  red: 3b4666a
  green: 721da39
  refactor: skipped — no smell detected
notes: fully independent of T001-T003's files (Home vs. About) — ran sequentially anyway, same as every other [P]-marked task this project. Verified live via the dev server.
```

---

## T005 Accessibility regression + manual viewport review

```
spec-ref:        Acceptance criteria 8, 9
contract-ref:    n/a
constitution-ref:Article VIII
DoD:
  - tests/nuxt/accessibility.nuxt.spec.ts reports zero violations for Home and About, both locales, with all of T001-T004 in place
  - user manually reviews the running site at a few viewport widths between 320px and 1920px for horizontal scroll (criterion 9 — no automated tool for this in this environment, same as 002's T014)
R: n/a — regression task, no new red test (mirrors 002's T014 / 004's T014)
G: fix anything the accessibility suite or the manual review surfaces
F: skipped unless a fix requires cleanup
files:
  - tests/nuxt/accessibility.nuxt.spec.ts (only if a fix is needed)
status: in_progress
commits:
  red: n/a
  green: n/a — zero violations found, no fix needed
  refactor: n/a
notes: |
  Automated half done: tests/nuxt/accessibility.nuxt.spec.ts re-run with all of T001-T004 in
  place — 18/18 passing, zero violations (HeatmapGrid's aria-hidden="true" keeps it out of the
  accessibility tree as intended). Full suite green (118/118), lint/typecheck clean, real
  `nuxi generate` build succeeds (36 routes).

  Manual review (2026-09-07) caught two real bugs before the horizontal-scroll question was even
  reached:

  1. Layout: the heatmap sat squeezed into a slim top-right column (the `.hero` 2-column grid gave
     it only a `1fr` track beside the name). Fixed (`35a4052`): removed the 2-column grid — Hero
     now stacks normally, heatmap renders full width below the intro block; grid grown from 7x14
     to 7x36 (252 cells) to actually read as filling space.

  2. The real "appears for ~1s then disappears, no console error" bug — reported again after fix
     #1, so this session got Chrome browser tooling loaded and inspected it live instead of
     guessing further. Root cause, confirmed via `getBoundingClientRect()` on the actual page:
     `<HeatmapGrid class="hero__heatmap" />` put Hero.vue's `display: block` class directly on
     HeatmapGrid's own root element, which already carries its own scoped `.heatmap` class with
     `display: grid`. Equal-specificity, same element — whichever scoped stylesheet the bundler
     ordered last won, and that order differed between the server-rendered HTML and the
     client-hydrated one, collapsing the grid to `height: 0` (empty `<span>` cells with no
     `display` of their own) with zero JS errors, since it's a pure CSS cascade outcome. Fixed
     (`e8d8ca0`): wrap `<HeatmapGrid />` in Hero's own plain wrapper div instead of overloading a
     class onto the child's root. Confirmed live: height went from exactly 0 to 164px, stable
     after a 3-second wait. Added a permanent regression test (`2b2bd7a`) asserting no component
     ever gets a `class=` attribute applied directly in Hero.vue's template.

  Re-verified after both fixes: full suite green (119/119), lint/typecheck clean, confirmed live
  via Chrome (not just curl/build output) that the heatmap renders and stays rendered.

  Remaining: the user's viewport-width review for criterion 9 (no horizontal scroll, 320-1920px)
  — no automated tool for that specific check, same as 002's T014. Task stays open until that
  review comes back clean.
```

---

## Amendments

| Date | Change | Reason |
|------|--------|--------|
|      |        |        |
