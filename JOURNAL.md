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

## 2026-09-06 — session 7 (003-content-refresh: specify → clarify → plan → tasks → implement → verify — CLOSED)

### Context

Same day, continuing directly from session 6. Ran the full lifecycle for 003, but with a significant scope discovery mid-specify: the user pointed to `~/Projects/massive-space` as the main source of new success stories, which turned out to be a large agency-client codebase, not the small personal-project set originally scoped.

### Done this session

- **Specify**: initial draft assumed 6 new success stories (the original 3 personal + 3 already-authorized). A `massive-space` survey (dispatched as a background Explore agent, ~50+ directories) found ~13 strong client-engagement candidates (VTEX integrations for Calzatodo, Qbano, Almacenes Brissa, Lilipink, Speedo, Pizzamania, Pepe Ganga, Juriscoop, Ficohsa/La Colonia payment gateway, Nequi/Gravity payment orchestration, MassiveSpace Pro, massive-whatsapp-service, plus the non-VTEX CatalogFlip). Confirmed with the user: freelance/independent contractor (so authorization is the user's own per-client call, same as Biogenesis/Somos URV), and a user-curated subset of 5 (Qbano, Nequi/Gravity, CatalogFlip, Almacenes Brissa, massive-whatsapp-service) — explicitly not the other ~8 candidates, available for a future feature. Also corrected an assumption: Sirocco is finished/in production (not "in development" like Cauce and Maná del Cielo). Final: 11 new success stories (up from the originally-scoped 6), 8 new skills. Zero clarification markers.
- **Plan**: no new dependency; extend `data/success-stories.ts`/`data/skills.ts` (same interfaces). 8 new skill-logo SVGs — 7 downloaded from Simple Icons (MIT), 1 hand-authored (SDD/TDD has no brand icon; user chose an original SVG over a template change).
- **Tasks**: 7 tasks. T001 (logo assets) has a real red-green cycle (file-existence test). T002-T004 are content-drafting tasks with no automated red — research each repo, draft copy, present for approval (Article V) — split personal / already-authorized / massive-space, in that order. T005-T006 write the approved content with real red-green tests. T007 is the final accessibility regression check.
- **Implement**: researched all 11 projects directly (READMEs, composer.json/package.json, git log — no subagent needed at this stage, the projects are local and the survey agent's earlier findings covered the massive-space ones already). Presented all 11 drafts to the user in 3 batches (T002, T003, T004), each approved with minor edits (dropped version numbers "Laravel 13"→"Laravel"; dropped a dense metrics parenthetical from Sirocco's draft). Caught and corrected two of my own wrong assumptions before publishing, not after: an unfounded PostgreSQL claim for Biogenesis (its `.env.example` defaults to SQLite, no confirmed prod engine) and an unfounded TypeScript claim for CatalogFlip (confirmed no `typescript` dependency in its `package.json`).
- **Verify**: full report, no FAILs (see `003-content-refresh/spec.md`'s Closed footer). Criteria 7/8 citation gap documented as supplemental evidence, same pattern as 001/002's verify.
- Closing commit: `spec: 003 closed — verify green` (`c9f6bf5`).
- Site now has **19 success stories** (8 original + 11 new) and **24 skills** (16 original + 8 new).

### Open

- Feature 003 is closed. Next: feature 004 (i18n: es default, `/en` path-based, visible switch — per the resolution reached mid-specify of 001).
- Available for a future feature if wanted: the ~8 other strong `massive-space` candidates not selected this time (Calzatodo, Ficohsa/La Colonia, Pizzamania, Pepe Ganga, Juriscoop, Lilipink, Speedo, MassiveSpace Pro) — see `.specs/onboarding.md`.

### Blockers / open questions

- None open.

### Decisions recorded elsewhere

- `.specs/003-content-refresh/spec.md` → Closed footer (verify report + acceptance-criteria evidence); Non-goals (client-naming boundaries).
- `.specs/onboarding.md` → Decisions log + the massive-space sweep write-up.
- `.specs/003-content-refresh/tasks.md` → T002/T003/T004 notes carry the full approved draft text for all 11 success stories, verbatim.

### Dead ends / discarded

- None — the scope correction (6 → 11 stories) was a genuine expansion, not a dead end; the ~8 unselected massive-space candidates are deferred, not discarded.

### Resume from

Run `/sdd-specify` for feature 004 (i18n: es default, `/en` path-based, visible switch).

## 2026-09-06/07 — session 8 (004-i18n: specify → clarify → plan → tasks → implement T001-T007, PAUSED)

### Context

Same day (rolled past midnight into 2026-09-07), continuing from session 7. Ran specify through plan/tasks for 004, then implemented T001-T007 (half the task list). Paused mid-feature at the user's request — **not closed/verified**.

### Done this session

- **Specify**: 8 acceptance criteria (ES default unprefixed, `/en/*` equivalents, both pre-rendered SSG, visible same-page switch, full translation of 003's content, correct `lang`, hreflang tags, a11y regression guard for both locales). Resolved inline during specify: no browser-language auto-redirect (manual switch only); assistant drafts translations, user approves in batches; hreflang included now. Zero clarification markers — spec committed directly with 0 pending.
- **Plan**: `@nuxtjs/i18n` (new ADR `0004-i18n-nuxtjs-module.md`), `strategy: prefix_except_default`, `defaultLocale: 'es'`. Two translation mechanisms: vue-i18n message catalogs (`i18n/locales/{es,en}.json`) for static copy, parallel `data/*.en.ts` files for structured content (not yet written — later tasks). Test strategy: translation-parity tests for both mechanisms.
- **Tasks**: 14 tasks (T001-T014). T001-T005 infra (module config, lang/hreflang, switcher, `useLocalizedData()` composable). T006-T008 static-copy translation. T009-T012 content research/drafting (not started). T013 writes all `data/*.en.ts`. T014 final a11y regression.
- **Implement T001-T007** (all closed):
  - T001: `@nuxtjs/i18n` installed/configured. Confirmed `nuxi generate` auto-produces 36 routes (18 pages × 2 locales) with zero manual route-list wiring.
  - T002: `useLocaleHead()` wired in `app.vue` — needed `i18n.baseUrl` (`https://hv.jose-gutierrez.com`) for valid absolute hreflang URLs. Verified real hreflang/lang output in the generate build.
  - T003: `LocaleSwitcher.vue` (`useSwitchLocalePath()`), wired into `AppHeader`.
  - T004: `i18n/locales/{es,en}.json` scaffolded, `AppNav` translated. **Found and fixed a real bug twice**: plain `<NuxtLink to="/x">` is not locale-aware under `@nuxtjs/i18n` — needed `useLocalePath()` wrapping every href, in both `AppNav` and (once spotted) `AppHeader`'s site-name link too.
  - T005: `useLocalizedData()` composable (picks `es`/`en` value by current locale) — needed to live in `tests/nuxt/` (not `tests/unit/` as planned), since it calls `useI18n()` and needs Nuxt context.
  - T006: About/Services/Contact static copy translated. **Found and fixed a critical, subtle bug**: `dayjs`'s per-instance `.locale()` call leaks state across routes under Nitro's *concurrent* SSG rendering — the Spanish `/about` page was rendering an English month name and "years" instead of "años" in the real `nuxi generate` output, even though an isolated *sequential* Node script showed no leak. Ruled out `useI18n().locale.value` as the cause first. Fix: dropped `dayjs` entirely (removed from `package.json`); rewrote `utils/dates.ts` with plain date arithmetic (age, translated via `t()` interpolation) + native `Intl.DateTimeFormat` (month names) — neither touches shared mutable state. Verified fixed in the real build for both locales.
  - T007: Libraries page (3 write-ups) translated — the largest static-copy batch.
- **User-requested deviation (2026-09-07, outside any task's DoD)**: user noticed the pre-existing "Libería" → should-be-"Librería" typo (carried over since `001`) while reviewing T007's translation, and explicitly asked for it to be fixed now — a deliberate one-off exception to this spec's own non-goal ("no changes to Spanish source text"), not a silent reopening of it. Fixed in `i18n/locales/es.json` (3 occurrences) and the two tests asserting the old spelling. Documented as an explicit exception in `spec.md`'s Non-goals. The unrelated `precuparte` typo in the same section was left untouched (not what was asked).

### Open

- **Feature 004 is NOT closed** — 7/14 tasks done (T001-T007). Remaining: T008 (`error.vue` translation), T009-T012 (content research/drafting for personal/facts/skills/education, certifications, experience, success-stories — the bulk of the remaining work, ending with the 19 success stories), T013 (write all `data/*.en.ts` + wire consumers), T014 (final a11y regression, both locales).
- Resume with T008.

### Blockers / open questions

- None open.

### Decisions recorded elsewhere

- `.specs/004-i18n/spec.md`, `plan.md`, `research.md`, `tasks.md`.
- `.specs/adr/0004-i18n-nuxtjs-module.md`.
- `.specs/004-i18n/research.md` → the dayjs SSG-concurrency gotcha, full writeup.

### Dead ends / discarded

- `dayjs` for locale-aware date formatting: discarded mid-feature after discovering the concurrency leak (see T006 above) — replaced with plain arithmetic + native `Intl.DateTimeFormat`.
- Deriving date-locale from `useRoute().path` instead of `useI18n().locale`: tried as a diagnostic step to isolate the dayjs bug; didn't fix it (confirming the bug was in dayjs, not the route/i18n composable), kept anyway in `AboutProfile.vue` since it's simple and correct, just wasn't the actual fix.

### Resume from

Continue `/sdd-implement` for `004-i18n` at T008 (`error.vue` translation — small batch, present for approval same as T006/T007). After T008, the remaining content-heavy tasks (T009-T012) will need per-project/per-entry research similar to `003`'s pattern, ending with the 19 success stories (T012, deliberately last/largest).

## 2026-09-07 — session 9 (004-i18n: implement T008-T014 → verify, all tasks closed, CLOSURE PENDING USER APPROVAL)

### Context

Same day, continuing from session 8. The user asked to proceed with T008 and then explicitly authorized advancing the rest of the feature autonomously ("sigue en automático... adelanta trabajo") while stepping away, rather than the synchronous per-batch approval used in every prior session. This is a deliberate, explicit deviation from this spec's own Article V commitment ("translation text is drafted by the assistant and approved by the user in batches **before publishing**") — the user is the same authority that commitment protects, and they authorized deferring the review to session's end instead of skipping it. Flagged prominently below and in `tasks.md`; **treat 004 as implementation-complete but not yet formally closed** until the user reviews the drafted translations.

### Done this session

- **T008**: `error.vue` translated (R-G-F). Reused the existing `i18n-messages-parity.spec.ts` file for Red (a specific key-presence assertion) instead of a new nuxt-mount test, since the content is trivial.
- **T009-T012** (content-drafting tasks, no automated red per their own DoD): drafted English text for personal/facts/skills/education (T009), all 37 certification captions (T010), all 6 experience entries (T011), all 19 success stories (T012). Full verbatim drafts recorded in each task's `tasks.md` notes for the user's review — **not yet approved**, only wired into the codebase (see T013).
  - Two scope corrections found and documented while drafting (not silently expanded): T011 widened to translate `experience[].tenure` (criterion 5 requires no untranslated Spanish visitor-facing text, and tenure duration strings are visitor-facing); T012 widened to translate the 2 non-English `tags[]` entries (`Microservicios`, `Patrón Adaptador`) since tags render as visible pill labels.
  - One factual flag for the user: success story #6's Spanish source spells the client "Phillips Morris Internacional"; the real company is "Philip Morris International". The English draft uses the correct spelling — the Spanish source was **not** touched (this spec's non-goal), so if the user prefers to mirror the misspelling instead, it's a one-line change.
- **T013**: wrote all 7 `data/*.en.ts` files from the T009-T012 drafts; wired every consumer (`Hero`, `AboutFacts`, `AboutSkills`, `ResumeEducation`, `ResumeExperience`, `pages/certifications.vue`, `pages/success-stories.vue`) to `useLocalizedData()`. **Found a real gap while wiring, not scoped by any prior task**: several static headings/intros on these exact files (`about.skills`/`about.facts` heading+intro, `resume.education` heading, `resume.experience.website` label, `certifications`/`successStories` page `<h1>`s) had never been translated by T004/T006/T007 and would have shown Spanish text on `/en` pages — added the missing `i18n` keys and wired them. Also found and fixed the same defect in `components/resume/ResumeSummary.vue` ("Resúmen" heading + the 13-years-experience bio paragraph), even though that file wasn't in T013's original file list — same class of gap, fixed alongside the rest.
  - **Deliberately left untouched, flagged for the user**: `ResumeExperience.vue`'s `<h3>Professional Experience</h3>` is hardcoded English on **both** locales — a pre-existing bug that predates 004 and is unrelated to i18n (the Spanish page shows the wrong language). No criterion-5 violation either way (the English page already reads correctly), but "fixing" it would change what Spanish visitors see today, which needs the user's decision, not a translation task's.
  - Verified in a real `nuxi generate` build (36 routes, both locales) that every heading/label/content sample renders correctly — not just via Vitest, per this spec's own precedent (T006's dayjs bug was only visible in a real build).
- **T014**: extended the WCAG 2.1 AA accessibility suite to mount every page (+ `error.vue`) under both the default `es` route and its `/en` equivalent — 18 cases, zero violations (no production changes needed, same outcome as `001`'s T023 and `003`'s T007).
- **All 14 tasks of `004-i18n` now closed.** Full suite green (105/105 Vitest tests across 45 files), lint/typecheck clean.
- **Ran `/sdd-verify`**: R1 (spec coverage) PASS — all 8 criteria traced to a Red-commit `spec-ref`, except criterion 3 (SSG pre-render) which has no dedicated automated test but is functionally verified via the real `nuxi generate` build both this session and in T002 (documented as supplemental evidence, same pattern as 001/002/003's verify reports). R2 (task completeness) PASS — 14/14 closed, commit SHAs recorded. R3 (orphan tests) PASS — 0 orphans among the 13 test files added/changed this feature. R4 (contracts) N/A — no external boundary (per `contracts/README.md`, unchanged since plan). R5 (constitution) **WARN** — see below. R6 (research freshness) PASS — `research.md` captured 2026-09-06, 1 day old. R7 (observability) N/A — no article declares it. R8 (security) N/A — no auth/money/PII/external writes. R9 (docs) **WARN, fixed in-session** — `README.md` had no mention of the new `/en/*` route tree; added one line. R10 (changelog) N/A — project has no `CHANGELOG.md` (consistent with 001/002/003).
  - **R5 WARN, the one open item**: this spec's own Article V commitment is "the assistant drafts, the user approves in batches **before publishing**". T009-T012's drafts were wired into the live data files (T013) before that approval, under the user's own explicit in-session authorization to defer review to session's end rather than block on it. This is not a silent skip — it's recorded in every affected task's notes — but it means **the translated content is live in the working tree without the user's content-accuracy sign-off yet**. Nothing is pushed to `origin` (still 186 commits ahead, unpushed) and nothing is deployed.
- **Feature 004 was NOT closed** (no `## Closed` footer in `spec.md`, no `spec: 004 closed` commit) — left pending the user's review of the T009-T012 drafts, per R5's WARN. Once approved (as-is, or with edits), closing is a small final step: append the Closed footer + commit.

### Open

- **User action needed**: review the drafted English translations (verbatim in `tasks.md` T009-T012, spot-checked in the real build this session) and either approve as-is or request edits. Two items called out above for a specific decision: the "Phillips Morris" vs. "Philip Morris International" spelling, and whether to fix `ResumeExperience.vue`'s "Professional Experience" heading to actually be locale-aware (would change current Spanish-visible text).
- After approval: close `004-i18n` (append `## Closed` footer to `spec.md`, record the verify SHA in `tasks.md`, commit `spec: 004 closed — verify green`).
- After 004 closes: no further features are queued in `.specs/onboarding.md` beyond the deferred ~8 `massive-space` candidates noted in session 7 (available for a future feature if wanted).

### Blockers / open questions

- None blocking further work — the one open item (translation approval) blocks *closing* 004, not any further mechanical work.

### Decisions recorded elsewhere

- `.specs/004-i18n/tasks.md` — T009-T012 notes carry the full verbatim drafts; T011/T012/T013 notes carry the documented scope corrections; T013 notes carry the "Professional Experience" flag.

### Dead ends / discarded

- None this session.

### Resume from

Get the user's review/approval of the T009-T012 translation drafts (already wired in T013), resolve the two flagged decisions, then close `004-i18n` per R5's WARN.
