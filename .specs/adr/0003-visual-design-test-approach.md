# ADR 0003 — Test approach for CSS/layout behavior in 002-visual-design

## Status

Accepted — 2026-09-06

## Context

`001-nuxt3-portfolio-rewrite` found (T003, `research.md`) that `mountSuspended` does not inject `nuxt.config`'s global CSS into the Vitest/happy-dom test DOM, and that `getComputedStyle` in that environment can't observe real cascade/media-query behavior. `002-visual-design`'s acceptance criteria are almost entirely CSS behavior: no bullet markers, a sidebar/top-bar breakpoint at 768px, hover/focus states, token-driven spacing, no horizontal scroll. None of this is reliably observable through `getComputedStyle` in the current harness, and the spec's own non-goals explicitly exclude adding a browser-driven visual-regression tool (Playwright + screenshot diffing) for this feature.

A decision was needed on how to keep this feature test-first (Article II) without either sinking effort into a new E2E toolchain or writing tests that assert nothing meaningful.

## Options considered

### Option A — Source-text assertions (read `<style>` blocks / `assets/css/*.css` as text)

- Pros: works today with the existing harness (matches T003's own fix — reading `main.css`'s text directly rather than relying on injected/computed styles); fast; genuinely fails if a rule is removed or renamed; no new dependency.
- Cons: doesn't prove the CSS actually renders correctly in a real browser (a typo in a selector that still "exists as text" wouldn't be caught); coupled to the exact CSS authored, more like a characterization test than a behavior test.

### Option B — Add Playwright for real browser rendering + viewport assertions

- Pros: tests what actually renders — real computed styles, real breakpoint behavior, real hover/focus.
- Cons: new dependency, new CI runtime cost, explicitly excluded by this spec's non-goals ("automated pixel-diff visual regression testing... out of scope"); the spec's own criteria don't require screenshot comparison, just structural/behavioral facts that Option A already covers well enough.

### Option C — No automated tests for this feature; manual-only sign-off

- Pros: zero test-authoring cost.
- Cons: violates Article II (test-first) outright; no regression guard for future features that touch these files.

## Decision

Option A: source-text assertions against component `<style>` blocks and `assets/css/main.css`, colocated per component (e.g. asserting `list-style: none` appears in `AppNav.vue`'s style block, `@media (min-width: 768px)` appears in `layouts/default.vue`'s). The existing accessibility suite (`tests/nuxt/accessibility.nuxt.spec.ts`) remains the regression guard for criterion 5. Criterion 6 (no horizontal scroll 320–1920px) is not automated — it is satisfied by CSS authoring discipline already in place since T003 (`box-sizing: border-box` globally, `img { max-width: 100% }` to be added) and confirmed by the user's own review of the running site at multiple widths, consistent with this spec's non-goal excluding automated visual regression tooling.

## Consequences

- **Positive:** zero new dependencies; tests run in the existing fast `unit`/`nuxt` Vitest projects; every criterion except 6 has an automated regression guard.
- **Negative:** source-text assertions can pass while a real rendering bug exists (e.g., a CSS specificity conflict elsewhere overriding the asserted rule) — mitigated by the user's manual review of the running site before this feature closes.
- **Follow-ups:** if a future feature needs real cross-browser/viewport verification (e.g., before a public relaunch), revisit Option B via a new ADR — Playwright is a reasonable next step then, not now.

## Constitution impact

None. Article II is honored via Option A's tests; no boundary or dependency is added.

## References

- `research.md` (this feature)
- `001-nuxt3-portfolio-rewrite/research.md` §nuxt@3.x (T003 gotcha: global CSS not injected under `mountSuspended`)
- Plan: `plan.md` §Test strategy
