# Plan — 005-home-about-redesign

## Summary

Three independent, additive changes, no new dependency: (1) `AboutProfile.vue` gains a wrapping element around its photo + personal-details block so a `@media (min-width: 768px)` rule can lay them out side by side, reusing `002-visual-design`'s existing breakpoint; (2) `Hero.vue`'s activity list drops the middle-dot-separated single line for individually styled items (badges); (3) a new decorative grid (`HeatmapGrid.vue`), driven by a deterministic pattern-generator util (`utils/heatmap.ts`, ADR 0005), fills the Home page's empty space on the same ≥768px breakpoint, animated via CSS only. No external boundary, no new library — extends ADR 0002's plain-CSS approach for (1) and (2), and introduces the one small piece of real logic covered by ADR 0005 for (3).

## Stack decision

| Item | Choice | Rationale |
|------|--------|-----------|
| Styling | Plain CSS, `<style scoped>` per component | Continues ADR 0002; no new dependency. |
| Two-column mechanism | CSS Grid inside `AboutProfile.vue`, single `@media (min-width: 768px)` rule reusing the existing sidebar breakpoint | Matches criteria 1-2 exactly; no new breakpoint invented (spec's "Resolved during specify"). |
| Heatmap pattern | Pure TS function `generateHeatmapPattern(rows, cols)` in `utils/heatmap.ts`, fixed arithmetic (no seed/`Math.random`/`Date.now`) | ADR 0005 — deterministic, unit-testable, honors Article VII ("Randomness: none"). |
| Heatmap animation | CSS `@keyframes` + per-cell `animation-delay` (via an inline custom property, e.g. `style="--i: n"`) | No JS timers, no client-only state; stays inside the SSG/no-runtime-JS-required architecture (criterion 7 without a new boundary). |
| Test approach (CSS concerns) | Source-text assertions against `<style>` blocks, per ADR 0003 | Same technique as `002`, for the two-column breakpoint, the activity-list restyle, and the heatmap's `<style>` block. |
| Test approach (pattern logic) | Real classicist unit test on `generateHeatmapPattern` | ADR 0005 — this is genuine logic, not styling; source-text regex can't verify shape/range/determinism. |

## Module layout

```
utils/heatmap.ts                       # generateHeatmapPattern(rows: number, cols: number): number[]
                                        #   flat array, length rows*cols, values in [0, 4], pure/deterministic
components/home/
  HeatmapGrid.vue                      # renders generateHeatmapPattern(7, 14) as a <div> grid,
                                        #   aria-hidden="true", <style scoped>: grid layout + @keyframes pulse
  Hero.vue                             # <style scoped> reworked: activity list as individual badges
                                        #   (border/background/padding per item, no middle-dot ::after);
                                        #   wraps Hero's text column + <HeatmapGrid /> in a flex/grid row
                                        #   that only splits ≥768px (mirrors AboutProfile's approach)
components/about/
  AboutProfile.vue                     # template: photo and the personal-details block (tagline, intro,
                                        #   fields <ul>) wrapped in one new container div; heading/intro/
                                        #   closing paragraphs stay full-width outside it
                                        # <style scoped>: CSS Grid, 2 columns ≥768px / 1 column below
```

No new page, no new route, no new data file. `HeatmapGrid.vue` takes no props for v1 (fixed 7×14 grid) — sized to fill a "roughly Hero-height" panel; exact dimensions are a task-level DoD detail, not a plan-level lock-in.

## Data model

N/A — no data introduced or changed. `generateHeatmapPattern`'s output is derived, not persisted.

## Boundaries

Unchanged from `001`/`002`/`004`'s boundaries — no new boundary. See `contracts/README.md`.

## Error model

N/A — no new error surface. `generateHeatmapPattern` has no invalid-input path relevant to its only two call sites (fixed literals), so no validation branch is added.

## Observability

N/A — fully static site, no server runtime.

## Security

N/A — no new input, no new boundary, no user-supplied data reaches the heatmap.

## Test strategy

- **Unit, classicist** (`tests/unit/heatmap.spec.ts`, new): `generateHeatmapPattern(rows, cols)` returns an array of length `rows * cols`; every value is an integer in `[0, 4]`; two calls with the same arguments return deeply-equal arrays (determinism, criterion 6); different `rows`/`cols` change the output length. No mocks — pure function.
- **Unit, source-text** (ADR 0003 lineage): one assertion set per component's `<style>` block —
  - `AboutProfile.vue`: a `@media (min-width: 768px)` rule exists and sets `grid-template-columns` (or equivalent) on the new wrapper.
  - `Hero.vue`: the old `::after { content: '·' }` separator rule is gone; a badge-style rule (background/border/padding) exists per list item.
  - `HeatmapGrid.vue`: a `@keyframes` rule exists and at least one selector references `animation`.
- **Regression** (`tests/nuxt/accessibility.nuxt.spec.ts`, already exists): re-run unchanged after every task, both locales; must stay at zero violations (criterion 8). `HeatmapGrid.vue` renders `aria-hidden="true"` specifically so axe treats it as non-informative.
- **Not automated**: criterion 9 (no horizontal scroll 320-1920px) — no browser/viewport-rendering tool in this feature's scope, same as `002`'s ADR 0003 precedent. Satisfied by CSS discipline (existing global `img { max-width: 100% }`, `box-sizing: border-box`) and confirmed by the user's manual review of the running site before closing, same as `002`'s T014.
- **Contract:** none — no external boundary.
- **E2E:** none, per this spec's non-goals (no numeric performance budget, no interactivity to drive).

## Rollout

- **Feature flag:** none.
- **Order (detail in `tasks.md`):**
  1. `utils/heatmap.ts` + its unit test (red/green on the pure function, independent of any component).
  2. `HeatmapGrid.vue` (consumes the util, adds the `<style>` animation, `aria-hidden`).
  3. `Hero.vue` restyle (activity-list badges) + wiring `<HeatmapGrid />` into the Home layout's empty space, ≥768px only.
  4. `AboutProfile.vue` two-column wrapper + breakpoint styling.
  5. Final pass: accessibility suite re-run (both locales); user's manual viewport review (criterion 9), same close-out pattern as `002`'s T014.
- **Compatibility windows:** none — presentation-only, no external consumer of the current markup shape.
- **Rollback:** revert the merge commit; no data/schema involved.

## References

- Spec: `./spec.md`
- Research: `./research.md`
- Contracts: `./contracts/`
- ADRs: `../adr/0003-visual-design-test-approach.md`, `../adr/0005-heatmap-decoration-approach.md`
