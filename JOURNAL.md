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

## 2026-09-06 — session 4 (plan → tasks → implement: 001-nuxt3-portfolio-rewrite, ALL 25 TASKS CLOSED)

### Context

Continuing the same day from session 3's clarify close. Ran `/sdd-plan`, `/sdd-tasks`, then `/sdd-implement` end to end for the entire feature, one task at a time, with the user confirming continuation after each.

### Done this session

- **Plan**: researched via context7 (nuxt@3.x, @nuxt/test-utils, axe-core, @nuxt/eslint); wrote `plan.md` (TypeScript, plain CSS tokens, hand-authored SVG icons, no Pinia, multi-stage Docker); `research.md`; `contracts/README.md` (no external boundaries this feature); ADR `0002-nuxt3-implementation-stack.md`. Approved by the user; committed.
- **Tasks**: wrote `tasks.md`, 25 tasks (T001-T025), R-G-F each. While drafting, discovered `Portfolio/Index.vue` and `Services/{Services,Testimonials}.vue` are BootstrapMade demo filler (Lorem Ipsum, fictitious testimonials) — stopped, surfaced to the user (Article V), resolved: `/portfolio` dropped from 001, `/services` scoped to a minimal honest shell. Amended `spec.md` (Amendments section) and `plan.md` accordingly, committed separately before tasks.md. Tasks approved; committed.
- **Implement**: ran all 25 tasks to closed, each its own R-G-F commit sequence (~90 commits total this session). Highlights:
  - **T001**: deleted the entire legacy Vue 2 tree (`src/`, old `package.json`, vue-cli configs) in a chore commit — explicit user confirmation obtained first; kept real content images (skill logos, certification badges, profile photo) that the vendor/template-asset deletion could otherwise have swept up. Scaffolded Nuxt 3.21 + Vitest 4.1 + `@nuxt/test-utils` 4.2 + TypeScript 5.x (pinned down from a `latest` that resolved to the incompatible TS7 rewrite).
  - **T003**: first red test (DOM `getComputedStyle` via `mountSuspended`) could never pass — `mountSuspended` doesn't inject `nuxt.config`'s global `css` array into the test DOM. Corrected to a unit test reading the CSS file's source text directly.
  - **T004-T008**: ported all 9 legacy `src/data/*.js` modules to typed `data/*.ts` (recovered from git history via `git show <chore-commit>^:path`); larger ones (certifications, experience, success-stories) generated programmatically from the original source to avoid transcription errors. Found/fixed one miscount (success-stories: 8 entries, not 9).
  - **T009**: shared layout — corrected mid-task that social links live in `AppHeader` (matching the original `NavBar.vue`), not `AppFooter` (copyright only, matching `Footer.vue`). Confirmed via the original nav markup that Portfolio/Services links were *already commented out* there — independent evidence supporting the tasks-phase scope correction.
  - **T011-T022**: built all 8 shipped pages (Home, About ×3 sections, Resume ×3 sections, Services shell, Success Stories, Certifications, Libraries, Contact). Libraries replaced Bootstrap's `nav-tabs` with native `<details>/<summary>`. Contact page has no `<form>` — the original's `forms/contact.php` target never worked on this Node-less static host. Discovered and applied project-wide: ESLint's `vue/no-multiple-template-root` requires a single wrapping `<div>` even though Vue 3 itself supports template fragments.
  - **T023**: accessibility suite (`axe-core`, WCAG 2.1 AA tags) — same "not attached to a live document" gap as T003's CSS finding; fixed with `mountSuspended(..., { attachTo: document.body })`. All 9 cases (8 pages + `error.vue`) passed with **zero production changes** — the pages built in T011-T022 were already accessible.
  - **T024**: `.github/workflows/ci.yml` (lint → typecheck → test → `nuxi generate`). Found `on:` parses as boolean `true` under YAML 1.1 — quoted as `"on":`.
  - **T025**: Docker multi-stage build (`node:20-alpine` builder → `nginx:alpine` runtime, no Node/npm in the shipped image, verified: 114MB, `which node npm` finds neither). Rewrote `nginx_config/default.conf` — the old SPA fallback would have silently served the homepage on any 404 instead of `error.vue`; verified manually with `docker build`/`run` and `docker compose up` (200s on real routes, 404 on unmatched ones).
- All 25 tasks closed in `tasks.md` with `red`/`green`/`refactor` SHAs (or `n/a` + rationale for the two infra tasks with no local TDD cycle, T024/T025).
- Full suite green throughout: ends this session at 37 Vitest tests across 22 files, `npm run lint` and `npm run typecheck` both clean.

### Open

- Run `/sdd-verify` for `001-nuxt3-portfolio-rewrite` — the `implement → verify` phase gate ("all tasks closed, all tests green") is satisfied.
- `spec.md`'s "Closed (filled during verify)" section still has `<pending>` placeholders — fill during verify.
- `.specs/index.md` "Modules under SDD+TDD" still empty — update once 001 closes (brownfield workflow follow-up, noted in onboarding).
- After 001 verifies and closes: start feature 002 (content refresh), then 003 (i18n).

### Blockers / open questions

- None open.

### Decisions recorded elsewhere

- `.specs/001-nuxt3-portfolio-rewrite/plan.md`, `research.md`, `contracts/README.md`.
- `.specs/adr/0002-nuxt3-implementation-stack.md`.
- `.specs/001-nuxt3-portfolio-rewrite/spec.md` → Amendments (portfolio/services scope correction).
- `.specs/001-nuxt3-portfolio-rewrite/tasks.md` → per-task `notes:` fields (several "reality differed from plan" corrections, listed above).

### Dead ends / discarded

- `/portfolio` page and the `/services` page's fabricated service list + Testimonials section: BootstrapMade demo filler, not real content — dropped (see spec.md Amendments, 2026-09-06).
- DOM-`getComputedStyle` test shape for global CSS (T003) and bare `axe.run(wrapper.element)` without `attachTo` (T023): both fail because `mountSuspended` doesn't attach to a live `document` by default.
- `typescript@latest` (resolved to TS7): incompatible with `vue-tsc`; pinned to `^5`.

### Resume from

Run `/sdd-verify` for `001-nuxt3-portfolio-rewrite`.

## 2026-09-06 — session 5 (verify: 001-nuxt3-portfolio-rewrite — CLOSED)

### Context

Ran `/sdd-verify` to close out the feature, same day as session 4's full implement.

### Done this session

- Full verify report, R1–R10 (see `spec.md`'s Closed footer for the complete report). No FAILs. Two real gaps found and fixed rather than glossed over:
  - **R9 (docs)**: `README.md` still documented vue-cli-era commands (`npm run serve`, a link to `cli.vuejs.org`) — refreshed to the actual Nuxt 3 scripts.
  - **R1/Article VII**: found the rewrite silently dropped Google Fonts (the original site's only third-party runtime asset) in favor of a system-font stack — nobody had explicitly decided this, and `plan.md`/the constitution still said "unchanged". Surfaced to the user (Article V); confirmed keep system-ui. Amended constitution Article VII + its Amendments table, corrected `plan.md`.
  - Also documented explicit acceptance-criteria evidence for criteria 1, 5, and 7 in `spec.md`'s Closed footer, since their most relevant commits (T001, T024, T025) hadn't cited the criterion number by name in their Refs lines — functionally covered, just under-traced.
- Updated `.specs/index.md` (brownfield follow-up owed since onboarding): "Modules under SDD+TDD" now lists the whole app; "Modules under legacy rules" is empty.
- Closing commit: `spec: 001 closed — verify green` (`b280071`).

### Open

- Feature 001 is closed. When the user checked the running site (`npm run dev`), it turned out to have no real visual design applied — only CSS tokens (T003), never used on components; default browser styling throughout (underlined blue links, bullet-list nav). A real gap between the constitution's "original, minimalist design" goal and how 001's tasks were broken down — none of them actually styled a component.
- Resequenced (`.specs/onboarding.md` → Decisions log, 2026-09-06): new **002 = visual design pass** (apply the existing tokens to real layout/spacing/typography); content refresh becomes **003**; i18n becomes **004**.
- Next: `/sdd-specify` for 002 (visual design pass).

### Blockers / open questions

- None open.

### Decisions recorded elsewhere

- `.specs/001-nuxt3-portfolio-rewrite/spec.md` → Closed footer (full verify report + acceptance-criteria evidence).
- `.specs/constitution.md` → Amendments (Article VII, Google Fonts dropped).

### Dead ends / discarded

- None this session — both gaps found were fixed, not discarded.

### Resume from

Run `/sdd-specify` for feature 002 (visual design pass — apply the existing CSS tokens to real component layout/spacing/typography).

## 2026-09-06 — session 6 (002-visual-design: specify → clarify → plan → tasks → implement → verify — CLOSED)

### Context

Same day, continuing directly from session 5's resequencing decision. Ran the entire feature lifecycle for 002 in one sitting, each phase gated by the user's approval as in prior sessions.

### Done this session

- **Specify**: 6 acceptance criteria (no default bullets; 768px sidebar/top-bar breakpoint; token-driven spacing; hover/focus on every interactive element; zero a11y regression; no horizontal scroll 320-1920px). Breakpoint (768px) resolved inline with the user during specify.
- **Clarify**: one marker (dark mode) resolved — out of scope for this feature, light palette only.
- **Plan**: no new dependency; CSS Grid layout, pure-CSS mobile reflow (no JS toggle). New **ADR 0003**: test approach is source-text assertions against `<style>` blocks (mirrors 001's T003 technique) instead of adding Playwright, which this spec's non-goals explicitly exclude. Criterion 6 (no horizontal scroll) explicitly left to CSS discipline + user manual review — no real browser available in this environment.
- **Tasks**: 14 tasks (T001-T014). T001-T013 all `[P]` (disjoint files, each just adds a `<style scoped>` block to an existing 001 component). T014 = accessibility regression + user's manual viewport review, sequential, last.
- **Implement**: all 14 tasks closed, full R-G-F trail. T011 (Certifications) reality differed from plan — certifications render as `<figure>` elements, not a list, so "reset bullets" didn't apply; substituted an equivalent CSS Grid DoD.
- **User's manual review (T014)** caught a real bug not visible to any automated check: the content column looked "narrow" on desktop — an uncentered `max-width: 65ch` left a large empty gutter beside the sidebar. Fixed in the same pass (`b7f73e1`): cap the whole layout at 1200px, centered, letting the content column fill its grid track; only `<p>` elements keep a 75ch reading-width cap. Confirmed by the user on both mobile and desktop afterward.
- **Verify**: full report, no FAILs (see `002-visual-design/spec.md`'s Closed footer). One acceptance-criterion citation gap (criterion 5, T014's own commit) documented as supplemental evidence rather than silently ignored — same pattern as 001's verify.
- Closing commit: `spec: 002 closed — verify green` (`5d62412`).
- Along the way: user asked to see the site locally; started `npm run dev` in the background (Chrome extension not connected in this environment, so the user viewed it in their own browser and reported back via screenshot/description rather than me driving a browser).

### Open

- Feature 002 is closed. Next: feature 003 (content refresh — Sirocco, Cauce, Maná del Cielo + forge, Bajo la Lupa, Biogenesis, Somos URV as success stories; new skills per the earlier `~/Projects` sweep). Run `/sdd-specify` for 003.
- Feature 004 (i18n: es default, `/en` path-based, visible switch) remains sequenced after 003.

### Blockers / open questions

- None open.

### Decisions recorded elsewhere

- `.specs/002-visual-design/spec.md` → Closed footer (verify report + acceptance-criteria evidence).
- `.specs/adr/0003-visual-design-test-approach.md`.

### Dead ends / discarded

- Dark mode: explicitly deferred (clarify), not discarded — revisit as its own future feature if wanted.

### Resume from

Run `/sdd-specify` for feature 003 (content refresh: new success stories + skills).
