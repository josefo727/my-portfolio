# Plan — 002-visual-design

## Summary

Apply the token system from `001-nuxt3-portfolio-rewrite` (`assets/css/main.css`) to the actual layout: a fixed sidebar (`AppHeader` + `AppNav`) beside page content on viewports ≥768px, collapsing to a top bar below that; token-driven spacing throughout; explicit hover/focus states on every interactive element; no default list bullets. No new dependency, no new stack decision — extends ADR 0002's plain-CSS approach. Testing approach (source-text assertions instead of a new browser-driven tool) is recorded in ADR 0003.

## Stack decision

| Item | Choice | Rationale |
|------|--------|-----------|
| Styling | Plain CSS, extended `assets/css/main.css` (global resets/link states) + per-component `<style scoped>` (layout/spacing specific to that component) | Continues ADR 0002; no new dependency. |
| Layout mechanism | CSS Grid (two-column: sidebar + content) in `layouts/default.vue`, single `@media (min-width: 768px)` breakpoint | Native, zero-dependency, matches spec criterion 2's exact breakpoint. |
| Mobile nav | Pure CSS reflow (sidebar becomes a top-of-document block) — no JS toggle/hamburger state | Spec doesn't require a collapsible menu, only "renders as a top bar" below 768px; avoids new interactive state to test, consistent with the non-goal on complex interaction/animation. |
| Test approach | Source-text assertions against `<style>` blocks / `main.css`, per ADR 0003 | `mountSuspended` doesn't inject global CSS or expose real cascade behavior (001's T003 finding) — reading the authored CSS as text is the only reliable automated check available without adding Playwright (excluded by this spec's non-goals). |

## Module layout

```
assets/css/main.css              # + link default-state override, list-style resets shared by every list,
                                  #   focus-visible outline default, img { max-width: 100% } (helps criterion 6)
layouts/default.vue              # <style scoped>: CSS Grid — sidebar column (fixed width) + content column
                                  #   ≥768px; single column, sidebar-on-top, <768px
components/layout/
  AppHeader.vue                  # <style scoped>: profile block spacing, social-link list reset + hover/focus
  AppNav.vue                     # <style scoped>: nav list reset, link spacing, hover/focus, active-route style
  AppFooter.vue                  # <style scoped>: spacing only
components/<page>/*.vue          # <style scoped> per component: spacing between sub-sections using --space-*
pages/*.vue                      # no container styling added here — `layouts/default.vue`'s <main> owns the
                                  #   shared max-width/reading-width treatment, so it isn't duplicated per page
```

No new components, no new composables, no new data. Every file touched already exists from 001.

## Data model

N/A — no data introduced or changed.

## Boundaries

Unchanged from `001-nuxt3-portfolio-rewrite`'s `plan.md` §Boundaries — no new boundary. See `contracts/README.md`.

## Error model

N/A — no new error surface.

## Observability

N/A — fully static site, no server runtime (unchanged from 001).

## Security

N/A — no new input, no new boundary.

## Test strategy

- **Unit** (`tests/unit/`): one test per styled component reading its `<style>` block (or `main.css`) as source text, asserting the specific rules each acceptance criterion requires exist (e.g., `list-style:\s*none` in `AppNav.vue`'s style block; `@media \(min-width:\s*768px\)` in `layouts/default.vue`'s; a `:hover` and a `:focus-visible` selector for every interactive component). Mirrors T003's proven `design-tokens.spec.ts` technique — see ADR 0003.
- **Regression** (`tests/nuxt/accessibility.nuxt.spec.ts`, already exists): re-run unchanged after every task; must stay at zero violations (criterion 5). No new accessibility test needed unless a task's DoD says otherwise.
- **Not automated**: criterion 6 (no horizontal scroll 320–1920px) — no browser/viewport-rendering tool in this feature's scope (ADR 0003). Satisfied by CSS discipline (`box-sizing: border-box` already global since T003; `img { max-width: 100% }` added here) and confirmed by the user's manual review of the running site before closing.
- **Contract:** none — no external boundary (see §Boundaries).
- **E2E:** none, per this spec's own non-goal.

## Rollout

- **Feature flag:** none.
- **Order (detail in `tasks.md`):**
  1. Extend `assets/css/main.css` (link/list/focus-visible defaults, `img { max-width: 100% }`).
  2. `layouts/default.vue`'s sidebar/content grid + 768px breakpoint.
  3. `AppHeader.vue` + `AppNav.vue` styling (list reset, spacing, hover/focus, active-route indicator).
  4. `AppFooter.vue` styling.
  5. Per-page-component spacing pass (About/Resume/Services/Success Stories/Certifications/Libraries/Contact/Home), reusing the same spacing-scale pattern task by task.
  6. Final pass: confirm `tests/nuxt/accessibility.nuxt.spec.ts` still green; user reviews the running site (`npm run dev`) across a few viewport widths for criterion 6.
- **Compatibility windows:** none — presentation-only, no external consumer of the current markup shape.
- **Rollback:** revert the merge commit; no data/schema involved.

## References

- Spec: `./spec.md`
- Research: `./research.md`
- Contracts: `./contracts/`
- ADRs: `../adr/0002-nuxt3-implementation-stack.md`, `../adr/0003-visual-design-test-approach.md`
