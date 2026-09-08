# Spec — 005-home-about-redesign

## Summary

Reworks the Home and About pages' layout to reduce vertical scroll and empty space on wide viewports, based on the user's local review of `004-i18n`'s finished site: a two-column About layout, a clearer treatment for the Home page's role/activity list, and a decorative animated element (visually inspired by a GitHub contribution heatmap, no real data) filling the Home page's empty space.

## User story

As a visitor evaluating José R. Gutierrez's portfolio on a desktop-sized viewport, I want the About and Home pages to use the available width well, so that I scroll less and the pages don't look unfinished or empty.

## Acceptance criteria

1. On viewport widths ≥768px, the About page's profile photo and personal-details block (the tagline, the "some personal details" intro, and the fields list) render side by side instead of stacked, shortening the page's vertical scroll length versus the current one-column layout.
2. Below 768px, the About page's photo and personal-details block keep stacking in their current reading order — no mobile regression.
3. On the Home page, the role/activity list (e.g. "Web Developer", "UI/UX Designer") renders as visually distinct individual items, not a single line of text separated by a middle-dot character.
4. On viewport widths ≥768px, the Home page's currently empty space beside the name and role list is filled with a decorative visual element.
5. The decorative element visually evokes a GitHub-style contribution heatmap (a grid of colored cells) without displaying or fetching any real contribution data, from GitHub or any other external service.
6. The decorative element's cell pattern is identical on every page load — no client-side fetch, no per-visit randomization — per this project's declared "no randomness, no new third parties" boundaries.
7. The decorative element animates (e.g. a color or opacity transition across its cells) without requiring the visitor to interact with it.
8. The existing accessibility suite reports zero WCAG 2.1 AA violations on the Home and About pages, in both locales, with the decorative element present.
9. No horizontal scroll appears on the Home or About pages at any viewport width from 320px to 1920px.

## Non-goals

- Real or live GitHub contribution data — the heatmap is purely decorative (resolved with the user, 2026-09-07: a live/API-backed version was considered and explicitly rejected to avoid introducing an external runtime boundary into a static, backend-less site).
- Dark mode — still deferred from `002-visual-design`'s clarify phase; not reopened here.
- Any change to page text or translated content (headings, copy, data) — this feature is layout/visual only.
- Any page other than Home and About.
- Making the decorative element interactive or clickable.
- A numeric performance budget — consistent with `001`'s resolved clarification (no baseline exists yet to compare against).

## Applicable constitution articles

- Article I — every acceptance criterion above traces to this spec.
- Article II — test-first: the two-column breakpoint, the activity-list markup, and the decorative element's presence/determinism are all testable before implementation.
- Article VI — ADR required if the decorative element's implementation technique departs from `002-visual-design`'s source-text-assertion approach (ADR 0003) — to be resolved in `plan.md`.
- Article VII — the decorative element must not add a new external/third-party boundary or introduce randomness; both are declared "none" in this project's boundaries list.
- Article VIII — criterion 8 is a direct accessibility regression guard.

## Open questions

None outstanding — see "Resolved during specify" below.

### Resolved during specify (inlined per Article V)

- Decorative-vs-live GitHub graph: resolved with the user via `AskUserQuestion` earlier this session (2026-09-07) — decorative/animated, no real data, full design control. Recorded here as the spec's criteria 5-7.
- Determinism (no per-visit randomization): follows directly from Article VII's existing "Randomness: none" / "Third parties: none" boundaries — not re-litigated as a new decision.
- Two-column breakpoint: reuses the existing 768px sidebar breakpoint from `002-visual-design`, not a new one.

## Glossary additions

- **Decorative heatmap** — the GitHub-contribution-style grid of colored cells on the Home page (criteria 5-7); ornamental only, carries no real data and no navigational or informational function.

---

## Closed (filled during verify)

- Date: 2026-09-07
- Commit: `bc2cdea` — `spec: 005 closed — verify green`
- Notes: all 5 tasks closed; full suite green (119/119 Vitest tests, 48 files); lint/typecheck clean; `nuxi generate` succeeds. T005's manual review (this session had Chrome browser tooling available, unlike `002`'s T014) found and fixed two real bugs before closing: the heatmap's cramped 2-column layout (`35a4052`) and a CSS class-collision bug that collapsed the heatmap to zero height after client-side hydration (`e8d8ca0`), root-caused via direct `getBoundingClientRect()` inspection in a live browser rather than guesswork — a permanent regression test was added (`2b2bd7a`). Criterion 9 (no horizontal scroll) was verified programmatically this session (`scrollWidth` checks at ~318px/768px/1920px on `/`, `/about`, `/en/about`) instead of left entirely to the user.

### Verify report

- R1 Spec coverage: PASS (9/9 criteria covered — criteria 1-8 each traced to a Red-commit `spec-ref`; criterion 9 has no dedicated automated test by design (no viewport/browser tool assumed available), verified as supplemental evidence instead — see Notes above)
- R2 Task completeness: PASS (5/5 tasks closed, each with commit SHAs or documented rationale)
- R3 Orphan tests: PASS (0 true orphans; a few test files were also touched by out-of-band chores unrelated to 005's spec — the contact-info update (X/GitHub/Skype) and the dynamic years-of-experience fix — both fully documented in their own commits, not silent)
- R4 Contracts: PASS/N/A (no external boundary, per `contracts/README.md`)
- R5 Constitution: PASS (Article II: proper R-G-F on T001-T004; Article VII: `utils/heatmap.ts` confirmed free of `Math.random`/`Date.now`/`fetch`, per ADR 0005; Article VIII: 18 accessibility cases still zero violations, `HeatmapGrid` is `aria-hidden`; no `console.log`/`debugger` leftovers)
- R6 Research freshness: PASS (`research.md` captured 2026-09-07, same day)
- R7 Observability: N/A (fully static site, no article declares it)
- R8 Security: N/A (no auth/money/PII/external writes)
- R9 Docs: PASS (no user-facing behavior change needing a README update — visual/layout only)
- R10 Changelog: N/A (no `CHANGELOG.md` convention in this repo, consistent with 001-004)

No FAILs.
