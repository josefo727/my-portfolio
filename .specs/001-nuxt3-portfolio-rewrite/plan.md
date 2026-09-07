# Plan — 001-nuxt3-portfolio-rewrite

## Summary

Replace the Vue 2 + BootstrapMade "iPortfolio" SPA with a Nuxt 3 site rendered via `nuxi generate` (SSG, `ssr: true`), using Nuxt's file-based `pages/` routing in place of the current `vue-router` table. Content stays byte-for-byte equivalent (ported from `src/data/*.js` to typed `data/*.ts` modules), presentation is rebuilt from scratch with plain CSS custom properties and hand-authored SVG icons — no visual template, no icon package. A Vitest + `@nuxt/test-utils` harness (unit + Nuxt-environment component/accessibility tests) and a GitHub Actions CI pipeline are introduced from the first commit of this feature, closing Article II's "test-first, effective immediately" clause. Docker moves to a multi-stage build (Node ≥18 builder, nginx-only runtime) serving `.output/public/`.

## Stack decision

| Item | Choice | Rationale |
|------|--------|-----------|
| Language | TypeScript 5.x | User decision, 2026-09-06; matches `stacks/vue.md` default; catches errors at build time. |
| Framework | Nuxt 3.x, `ssr: true` + `nuxi generate` | ADR 0001; **not** `ssr: false`, which would produce a client-only shell and fail acceptance criterion 1 — see `research.md` §nuxt@3.x. |
| Test runner | Vitest 3.x + `@nuxt/test-utils` (workspace: `unit` + `nuxt` projects) | ADR 0001; shape confirmed in `research.md` §@nuxt/test-utils@3.x. |
| Accessibility checks | `axe-core`, run inside the `nuxt` Vitest project against rendered pages, tags `wcag2a,wcag2aa,wcag21a,wcag21aa` | Satisfies acceptance criterion 4 without adding a separate E2E runner — `research.md` §axe-core@4.x. |
| Linter | `@nuxt/eslint` (flat config) | Replaces the Vue-2-era `@vue/cli-plugin-eslint` + `eslint-plugin-vue@6`; Nuxt-3/TS-aware — `research.md` §@nuxt/eslint@1.x. |
| Type checker | `vue-tsc --noEmit` in CI | `stacks/vue.md` default; pairs with the TypeScript decision. |
| Styling | Plain CSS with custom properties (`assets/css/main.css` + per-component `<style scoped>`) | User decision, 2026-09-06: zero styling dependencies, closest reading of "original, minimalist design" and acceptance criterion 2. |
| Icons | Hand-authored inline SVGs, no icon package | User decision, 2026-09-06: replaces Boxicons/icofont without introducing a new third-party asset set. |
| State management | None (Nuxt auto-imported composables over typed `data/*.ts` modules) — **no Pinia** | All content is static and read-only in this feature (no mutation, no cross-page shared reactive state); introducing a store to wrap constant arrays would be pure ceremony. Flagged for reconsideration in feature 003 if the language switch needs shared reactive locale state. |
| Build tool | Nuxt CLI (`nuxi`), Vite under the hood | Ships with Nuxt 3; no separate build-tool decision needed. |
| Runtime target | Static files only, served by nginx (`.output/public/`) | ADR 0001; no Node process in production — see §Rollout. |

## Module layout

```
my-portfolio/
├─ nuxt.config.ts
├─ app.vue                       # <NuxtLayout><NuxtPage/></NuxtLayout>
├─ error.vue                     # minimal 404 / runtime-error page (new — none exists today)
├─ layouts/
│  └─ default.vue                # header/nav + footer, shared chrome
├─ pages/
│  ├─ index.vue                  # home/intro
│  ├─ about.vue
│  ├─ resume.vue                 # experience + education
│  ├─ services.vue               # minimal shell only — see note below
│  ├─ success-stories.vue
│  ├─ certifications.vue
│  ├─ libraries.vue
│  └─ contact.vue                # static contact info (see note below) — no submitting form
├─ components/
│  ├─ layout/                    # AppHeader, AppFooter, AppNav
│  ├─ ui/                        # generic presentational primitives (Card, SectionHeading, Icon wrappers)
│  └─ <page>/                    # one folder per page above, its section components
├─ composables/
│  └─ use-skills.ts, use-experience.ts, use-success-stories.ts, … # one per data module; pure read accessors
├─ data/
│  └─ skills.ts, experience.ts, success-stories.ts, certifications.ts,
│     education.ts, facts.ts, location.ts, personal.ts, contact.ts   # ported 1:1 from src/data/*.js, typed
├─ assets/css/main.css           # design tokens (custom properties) + resets
├─ public/                       # favicon and any static binary assets carried over
├─ tests/
│  ├─ unit/                      # environment: node/happy-dom — composables, content-shaping helpers (Article III)
│  └─ nuxt/                      # environment: nuxt — page/component + axe-core accessibility tests
├─ .github/workflows/ci.yml
├─ Dockerfile                    # multi-stage: node:20-alpine builder → nginx:alpine runtime
├─ docker-compose.yml            # unchanged shape (build context + port mapping)
└─ nginx_config/                 # unchanged (already serves a static SPA correctly)
```

Entry points:
- `nuxt.config.ts` — app-wide config (modules: `@nuxt/eslint`; `nitro.prerender` if any route needs explicit include/exclude).
- `app.vue` — root shell.
- `pages/*.vue` — one per route, file-based (replaces `src/router/index.js`).

Public interfaces:
- `composables/use-<name>.ts` — one per content category; returns the typed data array (and any pure derived view, e.g. grouping skills by category) — replaces the current `src/store/<name>.js` Vuex module 1:1 in role, without the Vuex machinery (see Stack decision → State management).

**Routes:** kept identical to the current path set (`/`, `/about`, `/resume`, `/portfolio`, `/services`, `/success-stories`, `/certifications`, `/libraries`, `/contact`) — the spec permits free renaming when justified (resolved 2026-09-05), but no renaming is justified by this feature's scope (presentation-only, no content/IA change). Renaming stays available for feature 002 if new content categories make it worthwhile.

**Contact page note:** the current form (`action="forms/contact.php"`) targets a PHP endpoint that cannot work on this Node-less, PHP-less static host — it is part of the BootstrapMade template's demo scaffolding, not a real feature (no evidence of a `forms/contact.php` file in the repo). The rewrite's `/contact` page shows contact info (email, phone, social links) as static content and a `mailto:` link — no submitting form, consistent with this spec's non-goal "any dynamic, server-processed feature."

**Portfolio/Services note (scope correction, 2026-09-06 — see `spec.md` "Resolved during tasks"):** `Portfolio/Index.vue` (Lorem Ipsum gallery, stock images) and `Services/Testimonials.vue` (fictitious named testimonials, stock photos) are BootstrapMade demo filler, not real content. `/portfolio` is dropped from this feature (it was already outside acceptance criterion 3's category list). `/services` stays reachable per criterion 3 but ships as a minimal shell — a heading and one real sentence, no fabricated service list, no testimonials section. The real service catalog is reserved for feature 002, same as other new content.

## Data model

Entities (ported as TypeScript interfaces in `data/*.ts`, one per current `src/data/*.js` file; fields unchanged — content changes are out of scope, non-goal):

- `Skill` — `experience.js`/`skills.js` shape: name, category, proficiency-ish descriptor. Invariant: no entity added/removed/reworded by this feature.
- `ExperienceEntry` — role, employer, period, description.
- `SuccessStory` — `title`, `body` (HTML string, rendered via `v-html` today — carried over as-is; sanitization is not a new concern since the content is authored by the site owner, not user input), `tags: string[]`.
- `Certification`, `EducationEntry`, `Fact`, `LocationInfo`, `PersonalInfo`, `ContactInfo` — direct ports of their `src/data/*.js` counterparts.

Relationships: none cross-entity beyond category tags on `Skill`/`SuccessStory` used for filtering/grouping in the UI (existing behavior).

Migrations required: none (no database). "Port" here means a 1:1 rewrite of each `src/data/*.js` module into `data/*.ts` with an explicit interface — a mechanical, reviewable diff per module, done under a test asserting shape/count parity with the source file during the port task.

## Boundaries

| Boundary | Adapter | Contract |
|----------|---------|----------|
| HTTP out | none | n/a — Article VII confirms no HTTP integration in this feature (contact form dropped, see above) |
| Database | none | n/a — content is static, sourced from `data/*.ts` |
| Queue | none | n/a |
| Filesystem | build-time only: Nuxt/Vite reading `data/*.ts` and `assets/` at `nuxi generate` time | n/a — no runtime filesystem access, per Article VII |
| Clock | none domain-relevant | n/a |
| Randomness | none | n/a |
| Third parties | Google Fonts stylesheet (load-time asset, not mockable) | n/a — unchanged from Article VII |

No boundary in this feature crosses a process/network edge, so `contracts/` stays a placeholder index (see `contracts/README.md`) — confirmed against Article VII; nothing here amends it.

## Error model

- **Unmatched route:** `error.vue` renders a minimal "page not found" message with a link back to `/`. New — no equivalent exists in the current `vue-router` table (no catch-all route today). `nuxi generate` uses this to emit a static `404.html` fallback.
- **No other error surfaces:** no forms, no HTTP calls, no async data fetching in this feature → no runtime exception types to enumerate beyond the router's own 404 handling.

## Observability

- None. A fully static site with no server runtime has nothing to instrument (no request logs, no metrics, no traces to emit or collect). If a future feature reintroduces a server-processed boundary (e.g., a real contact-form backend, per Article IV), its plan defines logging/metrics then.

## Security

- Authn/authz: none — public, static content only.
- Input validation: none — no forms accept input in this feature (see Contact page note above).
- Secrets handling: none introduced — no API keys, no `.env`-backed runtime config needed for a static build. `docker-compose.yml`'s existing `env_file: .env` line is unused by anything in this feature; left as-is (removing it is out of scope for a rewrite that changes presentation, not deployment plumbing beyond what SSG/Node-version require).
- ADRs touched: `0001-migrate-to-nuxt3.md` (framework/rendering/harness), `0002-nuxt3-implementation-stack.md` (this plan's language/styling/icons/lint/Docker decisions, drafted alongside this plan).

## Test strategy

- **Unit** (`tests/unit/`, Vitest `environment: node`/`happy-dom`): composables' pure logic (e.g., any grouping/sorting of skills or success-story tags), each ported data module's shape (count + required-field presence, guarding the "content carried over as-is" non-goal mechanically).
- **Component** (`tests/nuxt/`, Vitest `environment: nuxt`, `mountSuspended`/`renderSuspended`): one test per page component asserting its content renders (Article III — real collaborators, no mocking of content-shaping logic) and per shared layout component (`AppHeader`, `AppNav`, `AppFooter`).
- **Accessibility** (`tests/nuxt/`, same environment): one `axe-core` check per page, `runOnly` tags `wcag2a,wcag2aa,wcag21a,wcag21aa`, asserting zero violations — directly satisfies acceptance criterion 4.
- **Contract:** none required — no external boundary in this feature (see §Boundaries).
- **E2E:** none introduced in this feature — the acceptance criteria (content present in initial HTML, no template assets loaded, build is static, tests + CI exist) are all verifiable at the unit/component/build level without a browser-driven E2E layer. Revisit if feature 002/003 adds interactive behavior worth an end-to-end scenario (e.g., the language switch in 003).
- **CI gate** (acceptance criterion 7): `.github/workflows/ci.yml` runs, on every push: `npm run lint` (`@nuxt/eslint` + `vue-tsc --noEmit`) → `npm run test` (Vitest, both workspace projects) → `npm run generate` (`nuxi generate`, proving the static build succeeds). Any step failing fails the workflow.

## Rollout

- **Feature flag:** none — this is a full cutover in one feature (ADR 0001: "no incremental port"), not a gradual rollout.
- **Migration order (within this feature's tasks, detail in `tasks.md`):**
  1. Scaffold Nuxt 3 project (config, TS, ESLint, Vitest workspace) with a failing smoke test — first red/green pair per Article II.
  2. Port `data/*.ts` modules + their unit tests (shape parity).
  3. Build `layouts/default.vue` + shared `components/layout/*` with tests.
  4. Build each page + its section components + component/accessibility tests, one page at a time, in the current route order.
  5. Wire `error.vue`.
  6. Add `.github/workflows/ci.yml`.
  7. Update `Dockerfile` (multi-stage) + confirm `docker-compose.yml`/`nginx_config/` still serve `.output/public/` correctly.
- **Compatibility windows:** none — no external consumer depends on the current build artifact's shape; the deployed site is replaced wholesale on merge.
- **Rollback:** revert the merge commit (or redeploy the last pre-cutover image) — same rollback path already recorded in ADR 0001's Consequences.

## References

- Spec: `./spec.md`
- Research: `./research.md`
- Contracts: `./contracts/`
- ADRs: `../adr/0001-migrate-to-nuxt3.md`, `../adr/0002-nuxt3-implementation-stack.md`
