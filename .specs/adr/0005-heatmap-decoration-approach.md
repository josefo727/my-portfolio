# ADR 0005 — Decorative heatmap: deterministic generator + hybrid test approach

- **Status:** accepted
- **Date:** 2026-09-07
- **Deciders:** José R. Gutierrez, assistant (this session)
- **Context links:** `.specs/005-home-about-redesign/spec.md` (criteria 4-7), `.specs/adr/0003-visual-design-test-approach.md`

## Context

`005-home-about-redesign` adds a decorative, GitHub-contribution-heatmap-styled grid to the Home page's empty space. The spec (resolved with the user, 2026-09-07) already excludes real/live GitHub data — Article VII declares "Randomness: none" and "Third parties: none" — so the grid's cell pattern must be produced without any network call and without `Math.random()`/`Date.now()`-seeded values, and must render identically on every page load (criterion 6).

Unlike `002-visual-design`'s tasks — which only added `<style>` blocks to markup that already existed — this element needs **new markup** (a grid of cells) and **a pattern to fill it**. Hand-authoring every cell's intensity in the template does not scale past a handful of cells and isn't meaningfully testable. This ADR decides how the pattern is produced and how it's tested.

## Options considered

### Option A — Hand-authored fixed grid, CSS only

- Pros: Zero new logic; fits ADR 0003's testing approach unchanged (source-text assertions only).
- Cons: A grid large enough to read as a "heatmap" (dozens of cells) means hand-writing dozens of near-identical template lines; any resize means re-authoring by hand; no unit-testable behavior beyond "the markup exists".
- Effort / risk: Low effort, but low quality/maintainability for something meant to look organic.

### Option B — Deterministic generator function + component

- A pure utility function (e.g. `generateHeatmapPattern(rows, cols)`) computes each cell's intensity from its coordinates via fixed arithmetic (no seed, no external input) and returns a plain array; a component renders it with `v-for` and CSS handles the animation (staggered `animation-delay` per cell index).
- Pros: Scales to any grid size with one function; the function is a pure, classicist-testable unit (same input → same output, real assertions on shape/range/determinism — not just regex-on-CSS-text); markup stays a simple `v-for` loop.
- Cons: Introduces the first piece of non-trivial *logic* this project has needed since `001`'s date-arithmetic utils — needs its own unit test file, not just a CSS-text assertion, which is new territory for a "visual design" feature.
- Effort / risk: Low-medium effort; risk is low (pure function, no I/O, no shared state — same category `utils/dates.ts` already established safely).

### Option C — CSS-only pseudo-random via `nth-child`/`:nth-of-type` selector tricks

- Pros: No JS/TS logic at all, still scales via CSS selectors (e.g. `:nth-child(3n) { --level: 2; }`) instead of hand-authoring each cell's class.
- Cons: The "pattern" is dictated by CSS selector arithmetic, which is harder to read/reason about than a named function, and still requires as many template cells (`<div>`s) as Option B — it only avoids the *value-generation* logic, not the markup. Testing it is back to source-text regex against `<style>`, which can assert a rule exists but not that the resulting visual pattern is sensible.
- Effort / risk: Low effort, but couples presentation and pattern-generation in CSS in a way that's harder to evolve (e.g. changing grid size means re-deriving the selector math).

## Decision

**Option B.** A small deterministic utility (`utils/heatmap.ts`) generates the cell-intensity pattern from grid dimensions alone — no randomness, no external data, no network call, same output on every call (verified by a real unit test, classicist style, per the constitution's Article VII boundaries). A new component (`components/home/HeatmapGrid.vue`) renders the generated pattern as a grid of elements, `aria-hidden="true"` (purely decorative, criterion 8), with the "animate" requirement (criterion 7) implemented as CSS `@keyframes` with a per-cell `animation-delay` for a staggered effect — no JavaScript timers, no client-only state.

## Consequences

- **Positive:** the pattern-generation logic is genuinely unit-tested (shape, value range, determinism across calls) instead of only visually inspected; the grid size is a one-line change (`generateHeatmapPattern(rows, cols)`), not a re-authoring exercise; no new dependency, no new boundary.
- **Negative:** this feature's test suite is no longer 100% "source-text-against-`<style>`" like `002`'s — it adds one real classicist unit-test file for `utils/heatmap.ts`. Recorded here explicitly so `verify`'s R5 doesn't read this as an unplanned deviation from ADR 0003; ADR 0003's technique remains the approach for every purely-CSS concern in this feature (the two-column breakpoint, the activity-list restyle, the animation's `<style>` block).
- **Follow-ups:** none — this ADR is self-contained to `005`.

## Constitution impact

None — Article VII's existing "Randomness: none" / "Third parties: none" boundaries are honored, not amended; this ADR documents how, not a change to the rule.

## References

- Spec: `.specs/005-home-about-redesign/spec.md` (criteria 4-7, Non-goals)
- Prior ADR: `.specs/adr/0003-visual-design-test-approach.md`
- Constitution: Article VII (Boundaries)
