# Journal — my-portfolio

## 2026-09-05 09:00 — session 1 (brownfield onboarding)

### Context

User asked for a preliminary review of the portfolio (design + content vs. actual recent work), a proposal, and to run whatever gets decided through `spec-tdd-kit`. Onboarding the kit onto this existing repo (brownfield), immediately ahead of the first kit-managed feature.

### Done this session

- Diagnosed the current site: Vue 2.6 (EOL) SPA wrapping a third-party template (BootstrapMade "iPortfolio"); local build currently broken (`public/index.html` references `public/assets/vendor/*`, deleted from disk per `git status`).
- Swept `~/Projects` (separate agent) for personal work not yet reflected in the portfolio's `skills.js`/`success-stories.js`/`experience.js`; got a ranked, evidence-based shortlist.
- Presented proposals to the user; decisions made:
  - Full rewrite to **Nuxt 3**, SSG, own minimalist design (not a Vue 2 reskin).
  - Include **Biogenesis** (bio-labs) and **Somos URV** as named case studies (user confirmed authorization).
  - Add a minimal **Vitest + `@nuxt/test-utils`** harness as part of the rewrite, not deferred.
- Ran brownfield onboarding: `.specs/constitution.md` (v1, Current + Aspirational), `.specs/onboarding.md`, `.specs/test-inventory.md`, `.specs/index.md`, `.specs/adr/0001-migrate-to-nuxt3.md`.

### Open

- Run `/sdd-specify` for the first feature: "Nuxt 3 rewrite with original minimalist design + content enrichment".
- Update `Dockerfile`/`docker-compose.yml` for Nuxt 3 (Node ≥ 18, `.output/public/` instead of `dist/`) — scheduled as part of that feature's plan, not before.

### Blockers / open questions

- None open — all onboarding-time ambiguities were resolved with the user (see `.specs/onboarding.md` → Decisions log).

### Decisions recorded elsewhere

- `.specs/adr/0001-migrate-to-nuxt3.md`
- `.specs/onboarding.md` → Decisions log

### Dead ends / discarded

- Considered a conservative Vue 2 reskin and a Vue 3 + Vite SPA (no SSG) as lighter alternatives to the Nuxt 3 rewrite; both rejected by explicit user choice (see ADR 0001, "Alternatives considered").

### Resume from

Run `/sdd-specify` to draft `spec.md` for the "Nuxt 3 rewrite + content enrichment" feature.

## 2026-09-05 — session 2 (specify: 001-nuxt3-portfolio-rewrite)

### Context

`/sdd-specify` for the first kit-managed feature, continuing from session 1's onboarding.

### Done this session

- Sliced the work into three features (agreed with the user): **001** rewrite (structure/design/tests/CI, current content as-is), **002** content refresh (new success stories/skills), **003** i18n (es default, `/en`, after 002's content is final).
- Created `.specs/001-nuxt3-portfolio-rewrite/spec.md` (draft): 7 acceptance criteria, non-goals, applicable constitution articles (I, II, VI, VII, VIII).
- Resolved two clarifications inline, per Article V, and recorded them in the spec's own "Resolved during specify" section:
  - URLs may be renamed freely from the current ones when justified by content/IA.
  - i18n must be path-based (`/en`), not `?lang=en` — a query string can't change statically pre-rendered HTML, which would violate acceptance criterion 1 (full content in the initial HTML) given the SSG decision in ADR 0001.
- One clarification remains open in `spec.md`: whether a numeric performance budget (e.g. a Lighthouse score threshold) is required.
- Updated `.specs/onboarding.md` → Decisions log with the feature-slicing and URL-renaming decisions.

### Open

- `.specs/001-nuxt3-portfolio-rewrite/spec.md` is drafted but **not yet approved or committed** — session paused before the user answered the approval question. It currently sits as an untracked file (`git status` confirms only `.specs/onboarding.md` is modified and `.specs/001-nuxt3-portfolio-rewrite/` is untracked; nothing from this session is committed yet).
- Next concrete action: get the user's approval (or edits) on `spec.md`, commit `spec: 001 initial spec with 1 clarification pending`, then run `/sdd-clarify` to resolve the performance-budget marker.
- After 001 closes (clarify → plan → tasks → implement → verify), start 002, then 003.

### Blockers / open questions

- Performance budget: no numeric target defined yet. Needs the user's input in `/sdd-clarify`.

### Decisions recorded elsewhere

- `.specs/onboarding.md` → Decisions log (feature slicing, URL renaming).
- `.specs/001-nuxt3-portfolio-rewrite/spec.md` → "Resolved during specify" section (URL renaming, i18n sequencing).

### Dead ends / discarded

- `?lang=en` query-string i18n: incompatible with SSG (ADR 0001); path-based `/en` is required instead.

### Resume from

Open `.specs/001-nuxt3-portfolio-rewrite/spec.md`, get explicit approval or edits from the user, then commit it and run `/sdd-clarify`.

## 2026-09-06 — session 3 (clarify: 001-nuxt3-portfolio-rewrite)

### Context

Resuming from session 2's pending item: spec approval + one open `[NEEDS CLARIFICATION]` marker (performance budget).

### Done this session

- Got explicit user approval of `spec.md` as drafted, no edits requested.
- Resolved the one open marker via `AskUserQuestion` (per Article V / phase 02-clarify procedure): no numeric performance budget for this feature; SSG + dropping the third-party template's weight is the de facto improvement. A numeric threshold (e.g. Lighthouse ≥ 90) can be added later, deliberately, once there's a baseline to compare against.
- Recorded the decision in `.specs/001-nuxt3-portfolio-rewrite/clarify.md` (Q1) and inlined the resolution into `spec.md`'s "Resolved during clarify" section; added an "Approval" section to `spec.md`.
- `spec.md` now has zero open `[NEEDS CLARIFICATION]` markers.

### Open

- Run `/sdd-plan` for 001 next (references ADR 0001; must define Vitest/@nuxt/test-utils test layout, CI pipeline shape, Dockerfile/docker-compose changes for Node ≥18 and `.output/public/`).

### Blockers / open questions

- None open.

### Decisions recorded elsewhere

- `.specs/001-nuxt3-portfolio-rewrite/clarify.md` (Q1 — performance budget).
- `.specs/001-nuxt3-portfolio-rewrite/spec.md` → "Resolved during clarify", "Approval".

### Dead ends / discarded

- None this session.

### Resume from

Run `/sdd-plan` for `001-nuxt3-portfolio-rewrite` to produce `plan.md` (framework/rendering already decided per ADR 0001; plan must cover test layout, CI, and Docker/nginx deployment updates).
