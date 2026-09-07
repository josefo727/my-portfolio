# Spec — 002-visual-design

## Summary

Apply a real, original visual design to the site built in `001-nuxt3-portfolio-rewrite` — that feature replaced the third-party template and defined design tokens (`assets/css/main.css`), but no component ever used them for layout, spacing, or interactive states. Today the site renders with default browser styling (bulleted nav, underlined links, no vertical rhythm). No new content, pages, or copy — presentation only.

## User story

As a visitor evaluating José R. Gutierrez's professional work, I want the site to look deliberately designed rather than like unstyled default browser HTML, so that the site itself supports the credibility its content claims.

As the site's maintainer, I want the design built from the existing token system (`assets/css/main.css`), so that future features (content refresh, i18n) inherit a consistent look without re-deriving it.

## Acceptance criteria

1. No page renders a default browser bullet marker on a navigation or social-link list — list styling is deliberately reset.
2. On viewports at or above 768px, the primary navigation renders as a fixed sidebar beside the page content; below that breakpoint, it renders as a top bar.
3. Every content section's vertical spacing (margins/padding between sections, headings, and paragraphs) is drawn from the spacing scale already defined in `assets/css/main.css` (`--space-*`), not unstyled browser defaults.
4. Every interactive element (nav link, social link, in-page link, `<details>` summary) has a visually distinct hover state and a visually distinct keyboard-focus state, both defined in CSS.
5. The existing automated accessibility suite (WCAG 2.1 AA, `tests/nuxt/accessibility.nuxt.spec.ts`) continues to report zero violations after this feature's changes.
6. The rendered page layout does not require horizontal scrolling at any viewport width from 320px to 1920px.

## Non-goals

- New content, new pages, new sections, or wording changes — content stays exactly as shipped in 001 (reserved for feature 003).
- Internationalization (feature 004).
- Custom illustration or photography — the existing profile photo and skill/certification logo images are reused as-is, unstyled beyond sizing/spacing.
- Dark mode — only the light palette is defined in this feature. Resolved with the user during clarify, 2026-09-06; see `clarify.md`.
- Complex animation or scroll-triggered effects — consistent with 001's non-goal on this; hover/focus state changes may use simple CSS transitions, nothing scroll-driven.
- Automated pixel-level visual regression testing (e.g., screenshot diffing) — out of scope for this feature; visual correctness is confirmed by structural/class-level tests plus the user's own review of the running site, per `plan.md`.

## Applicable constitution articles

- Article I — every acceptance criterion above traces to this spec.
- Article II — test-first still applies: structural/class-level assertions before implementation, per the existing harness.
- Article VII — no new external boundary; still no HTTP/DB/queue.
- Article VIII — accessibility must not regress (criterion 5 is a direct regression guard).

## Open questions

None outstanding — see "Resolved during specify" and "Resolved during clarify" below.

### Resolved during specify (inlined per Article V — explicit user dialog)

- Breakpoint (criterion 2): 768px. Resolved with the user, 2026-09-06.

### Resolved during clarify

- Dark mode: out of scope for this feature (see Non-goals). Only the light palette is defined. Resolved with the user, 2026-09-06 — see `clarify.md`.

## Glossary additions

- **Breakpoint** — the viewport width, in px, at which the navigation layout switches between sidebar (desktop, ≥768px) and top bar (mobile, <768px), per criterion 2.

---

## Closed (filled during verify)

- Date: 2026-09-06
- Commit: `spec: 002 closed — verify green` (this feature's closing commit)
- Notes: all 14 tasks closed; full suite green (59/59 Vitest tests, 35 files); lint/typecheck clean; `nuxi generate` succeeds. One real bug found during T014's manual review (desktop content column looked "narrow" — an uncentered 65ch cap left a large empty gutter) and fixed in the same pass (`b7f73e1`), then confirmed by the user on both mobile and desktop. See `tasks.md` for the complete per-task R-G-F trail.

### Acceptance criteria evidence

Criterion 5 has no commit whose Refs line cites "criterion 5" by name (T014, its primary owner, folded into a docs-only closing commit rather than a dedicated red/green pair — consistent with this task's own template: "no new red test"). Recorded here instead of treating it as a gap:

5. **Existing accessibility suite stays at zero violations** — `tests/nuxt/accessibility.nuxt.spec.ts` re-run after all of T001-T013's styling changes: still 9/9 passing, no regression introduced by any styling task.

Criteria 1-4 and 6 are each cited by name in at least one task's Red commit (T001-T013's "Refs:" lines); criterion 6 (no horizontal scroll) was additionally confirmed by the user's own manual review at mobile and desktop widths, per this spec's non-goal excluding automated visual-regression tooling (ADR 0003).
