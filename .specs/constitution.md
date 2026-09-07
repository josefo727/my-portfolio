# Project Constitution — my-portfolio

## Preamble

`my-portfolio` is the public professional portfolio of José R. Gutierrez (Full Stack developer), serving recruiters, clients, and technical peers who evaluate his work. Because the site itself is evidence of engineering discipline, the bar is not just "looks good" but "the code behind it reflects the same practices (SDD+TDD, Clean Code, modern stack) that its content claims." Onboarded brownfield at v0 of the repo (Vue 2 SPA, ~2.2 kLOC, no tests, no CI), immediately ahead of a full frontend rewrite to Nuxt 3.

## Articles

### Article I — Spec-anchored development

**Statement.** Every production change traces to a spec section under `.specs/<feature>/spec.md`. Spec and code are committed together when behavior changes.

**Rationale.** Prevents documented drift between what the portfolio claims about the author's practices and what its own repo does.

**Enforcement.** `verify` phase check R1; review gate.

---

### Article II — Test-first

**Statement.** No production code is merged without a prior failing test. Git history shows a `red` commit before the corresponding `green` commit within the same feature.

**Rationale.** The repo currently has zero tests; this is the article that changes that, starting now rather than as an aspiration with indefinite migration.

**Enforcement.** Commit history audit during `verify`.

**Note.** Marked `Current-to-replace` at v0 (no tests existed) → now in force from the Nuxt 3 rewrite feature onward. See `Aspirational` for the harness decision.

---

### Article III — Boundary-only mocks

**Statement.** Doubles are permitted only at declared boundaries (Article VII). Domain/content logic (data transformation, filtering, sorting of skills/success-stories/experience) is tested with real collaborators.

**Rationale.** The site's "domain" is almost entirely content shaping, not I/O — mocking it would produce tautology tests.

**Enforcement.** Review gate.

---

### Article IV — Contract-first integration

**Statement.** Any new integration with an external system (e.g., a contact-form submission endpoint, an email service, analytics) requires a contract file in `contracts/` before consumer code exists.

**Rationale.** Keeps the door open for future non-static features (contact form) without letting them sneak in unversioned.

**Enforcement.** `tasks.md` scheduling rule; `verify` R4. Currently **inactive by absence** — the site has no external integrations at v0.

---

### Article V — No silent clarification

**Statement.** `[NEEDS CLARIFICATION: …]` markers are resolved only through explicit user dialog captured in `clarify.md`.

**Rationale.** Preserves José's actual intent about design direction and content accuracy (e.g., whether a client project can be named publicly) — this must never be guessed by the agent.

**Enforcement.** `clarify` phase; `verify` orphan-marker check.

---

### Article VI — ADR for non-local decisions

**Statement.** Decisions affecting more than one task, introducing a new dependency/runtime, or amending an article require an ADR in `.specs/adr/`.

**Rationale.** The Vue2→Nuxt3 rewrite, the SSG rendering choice, and the test-harness introduction are exactly this kind of decision.

**Enforcement.** Review gate; ADR template linkage. First instance: [`adr/0001-migrate-to-nuxt3.md`](./adr/0001-migrate-to-nuxt3.md).

---

### Article VII — Boundaries

**Statement.** Declared boundaries of this project. Mocks/doubles are permitted here and only here:

- **HTTP out:** none at v0. If a contact-form endpoint is added, its client must be named here via an ADR before use.
- **Database:** none — fully static content, sourced from versioned data files (`src/data/*.js` today; Nuxt content/data layer post-rewrite).
- **Queue:** none.
- **Clock:** none domain-relevant (no scheduling logic).
- **Randomness:** none.
- **Filesystem:** build-time only (bundler reading data/content files); no runtime filesystem access.
- **Third parties:** none. Google Fonts (Open Sans/Raleway/Poppins) was the only third-party runtime asset at v0; the 001 rewrite replaced it with a system-font stack (`system-ui` etc.) — found during verify (2026-09-06) to have happened without an explicit decision, confirmed with the user then: no external font request, better performance/privacy, consistent with the rewrite's "no third-party dependency" spirit. See Amendments.

**Rationale.** Uniform isolation policy. Given the site is currently 100% static content, most boundaries are intentionally "none" — this list is the reference point for the plan phase to update honestly if the rewrite adds a contact form or similar.

**Enforcement.** Review gate; plan must map every new external interaction to this article via ADR.

---

### Article VIII — Accessibility

**Statement.** WCAG 2.1 AA for every public-facing page.

**Rationale.** A portfolio that fails basic accessibility undercuts its own credibility, especially given the author's other project (Bajo la Lupa) already documents this bar for its own content.

**Enforcement.** Manual `axe`/Lighthouse check per `verify`, until a CI check is set up (see Aspirational).

---

## Current (de facto) — state of the repo at onboarding (v0, pre-rewrite)

- **Component-per-view SPA.** Each Vue Router route maps to one view in `src/views/*.vue`, which renders a single top-level `Index.vue`/section component. Evidence: `src/router/index.js`, `src/views/Home.vue` → `src/components/Home/Hero.vue`.
- **Content-as-data.** User-facing content lives in plain JS arrays/objects under `src/data/*.js`, not hardcoded in templates. Evidence: `src/data/skills.js`, `src/data/success-stories.js`, `src/data/experience.js`.
- **Vuex store mirrors data modules 1:1.** Each `src/data/X.js` has a matching `src/store/X.js` module wrapping it. Evidence: `src/store/index.js`.
- **Styling driven entirely by a third-party template.** Bootstrap, AOS, Boxicons, jQuery, Owl Carousel, Isotope, CounterUp, Venobox loaded globally via `<link>`/`<script>` tags in `public/index.html`; components consume global CSS classes, not scoped styles. Evidence: `public/index.html`.
- **No test suite.** No `tests/`/`__tests__/` directory; `package.json` has no test script. Evidence: `package.json`.
- **No CI.** No `.github/workflows/`.
- **Static-only deployment.** `Dockerfile` runs `npm run build` then serves the resulting `dist/` via a bare nginx container (no Node runtime in production). Evidence: `Dockerfile`, `nginx_config/default.conf`, `docker-compose.yml`.
- **Known defect at onboarding time.** `public/index.html` references `public/assets/vendor/*` (Bootstrap, AOS, Boxicons, etc.), but those files are deleted from the working tree (`git status` shows them as `D`, uncommitted). The local build is currently broken. Moot once the Nuxt 3 rewrite replaces this markup wholesale, but recorded here as evidence of repo state at v0.

## Aspirational — where this project is going

- **Test-first, effective immediately.** `applies_from`: the Nuxt 3 rewrite feature (first kit-managed feature). `migration`: N/A as touch-fix — the Vue 2 tree is being replaced wholesale by this feature, not incrementally, so there is no legacy code to carry forward once cutover completes. Harness: Vitest + `@nuxt/test-utils` (user-confirmed decision, 2026-09-05).
- **Framework modernization.** `applies_from`: same feature. `migration`: full replacement, tracked by ADR 0001, not touch-fix (see Article VI).
- **CI.** `applies_from`: TBD in plan phase of the first feature (not yet scheduled as of onboarding). `migration`: add `.github/workflows/ci.yml` running lint + Vitest + build once the harness exists.
- **Accessibility enforcement in CI.** `applies_from`: after CI exists. `migration`: add `axe`/`pa11y` step; until then, manual check per `verify`.
- **Dependency hygiene.** `applies_from`: this onboarding. `migration`: all new runtime deps pinned to exact versions in `package.json`; no beta/rc versions without an ADR.

## Amendments

| Date | Article | Change | ADR |
|------|---------|--------|-----|
| 2026-09-06 | VII — Boundaries | Third parties: Google Fonts dropped, replaced by a system-font stack (found during `001-nuxt3-portfolio-rewrite`'s verify, confirmed with the user) | n/a — user-confirmed at verify, not multi-task-impact; see `001-nuxt3-portfolio-rewrite/spec.md` Closed footer |
