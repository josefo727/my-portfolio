# Spec — 001-nuxt3-portfolio-rewrite

## Summary

Rewrite the portfolio site's frontend with an original, minimalist design, replacing the current third-party visual template, and put it under an automated test suite and CI from its first commit. Existing content (skills, experience, success stories, etc.) is carried over as-is, in wording and category, with no new content added — content changes belong to a separate feature (002).

## User story

As a visitor evaluating José R. Gutierrez's professional work (recruiter, potential client, or technical peer), I want to see a distinctive, current-looking site that loads its real content immediately, so that I form an accurate impression of his technical skill without being distracted by a generic, dated visual template.

As the site's maintainer, I want the rewrite backed by an automated test suite that runs locally and in CI, so that future content and design changes have a safety net that does not exist today.

## Acceptance criteria

1. Every page's initial HTML response contains the page's full text content, before any client-side JavaScript executes.
2. No script or stylesheet asset belonging to the previous third-party template package (Bootstrap, AOS, Boxicons, jQuery, Owl Carousel, Isotope, CounterUp, Venobox) is requested by the browser on any page.
3. Each of the current site's content categories — home/intro, about, skills, experience, success stories, certifications, libraries, services, contact — remains reachable after the rewrite, at a URL that may be renamed from the current one when the new name better reflects the content (resolved with the user, 2026-09-05: free renaming allowed, not required to preserve exact current paths). For **services**, "reachable" is satisfied by a minimal real shell (a heading and one honest sentence) rather than the current fabricated catalog — see "Resolved during tasks" below.
4. Automated accessibility checks report zero WCAG 2.1 AA critical violations on every page.
5. The production build produces static files servable without a persistent server process at runtime.
6. Running the project's test command locally executes the automated test suite and exits with a non-zero status if any test fails.
7. A CI pipeline runs lint, the automated test suite, and the production build on every push, and reports failure if any step fails.

## Non-goals

- Adding new success-stories/skills content (Sirocco, Cauce, Maná del Cielo, Bajo la Lupa, Biogenesis, Somos URV) — reserved for feature 002.
- Any dynamic, server-processed feature (e.g., a contact form that submits to a backend).
- Retaining the current animated counters, typewriter effect, or scroll-triggered animations — the new design starts without them (user decision, 2026-09-05); a future design iteration may reintroduce a specific effect deliberately.
- Rewriting or improving existing wording/copy of skills, experience, or success stories — that is content work, reserved for feature 002. This feature only changes presentation.
- Internationalization (Spanish default, English at `/en`, visible language switch) — reserved for feature 003, sequenced after 002 so translation happens once, against the final content. This feature's route naming must not preclude adding a locale prefix later (e.g., no page is named literally `en`).
- The `/portfolio` route: discovered during tasks decomposition to be 100% BootstrapMade demo filler (Lorem Ipsum copy, stock images) — not real content, and not part of this criterion's category list to begin with. Not carried into this feature; a real projects gallery, if wanted, is content work for a future feature. Resolved with the user, 2026-09-06.
- The current `/services` page's icon-box service list and its entire "Testimonials" section: also discovered to be demo filler (fabricated service descriptions; testimonials attributed to fictitious named people with stock photos, e.g. "Saul Goodman"). Neither is real content to "carry over as-is" — both are dropped. The real service catalog is content work reserved for feature 002.

## Applicable constitution articles

- Article I — every acceptance criterion above traces to this spec; code and spec commit together.
- Article II — this feature is where "test-first" starts applying in practice; no page ships without a prior failing test.
- Article VI — the framework/rendering/harness choices are already recorded in ADR `0001-migrate-to-nuxt3.md`; this spec stays stack-free per kit convention, `plan.md` will reference that ADR.
- Article VII — no new external boundary is introduced by this feature (still no HTTP/DB/queue integrations); confirmed at plan time.
- Article VIII — accessibility criterion (4) enforces this directly.

## Open questions

None outstanding — see "Resolved during specify" below and `clarify.md` for the performance-budget decision.

### Resolved during specify (inlined per Article V — explicit user dialog)

- URL renaming: routes may be renamed freely from the current ones when justified by content/IA, not required to preserve exact current paths. Resolved with the user, 2026-09-05.
- Internationalization: raised by the user mid-specify (es default, `/en`, visible switch). Confirmed it requires path-based locales, not a query string, to stay compatible with the SSG decision in ADR 0001 (a query param can't change statically pre-rendered HTML). Sequencing agreed: deferred to feature 003, after 002's content is final, so translation happens once. Resolved with the user, 2026-09-05.

### Resolved during clarify

- Performance budget: no numeric target (e.g., Lighthouse score) is required for this feature. Sufficient for now: static generation with the third-party template's weight removed (acceptance criteria 1, 2, 5). A numeric threshold can be introduced later, in its own iteration, if warranted. Resolved with the user, 2026-09-06 — see `clarify.md`.

### Resolved during tasks (scope correction — Article V)

Reading `Portfolio/Index.vue` and `Services/{Services,Testimonials}.vue` closely while drafting `tasks.md` (2026-09-06) surfaced that both are template demo filler, not real content:

- `/portfolio`: dropped from this feature entirely (see Non-goals). Not a regression — it was already absent from acceptance criterion 3's category list.
- `/services`: kept as a required category (criterion 3), but shipped this feature as a minimal honest shell (heading + one real sentence, no fabricated service list). The Testimonials section (fictitious named people, stock photos) is removed outright — never real content, same class of artifact as the third-party template assets already being dropped.
- Both choices confirmed with the user, 2026-09-06, rather than assumed.

## Amendments

| Date | Section | Change | Reason |
|------|---------|--------|--------|
| 2026-09-06 | Acceptance criterion 3, Non-goals | `/portfolio` excluded; `/services` scoped to a minimal shell, Testimonials dropped | Both were BootstrapMade demo filler (Lorem Ipsum / fictitious testimonials), discovered while drafting `tasks.md`; not real content to preserve. See "Resolved during tasks" above. |

## Glossary additions

- **Third-party template package** — the BootstrapMade "iPortfolio" asset bundle currently loaded via `public/index.html` (Bootstrap, AOS, Boxicons, jQuery, Owl Carousel, Isotope, CounterUp, Venobox) and its Vue wrapper components.

---

## Approval

- Approved as drafted (no edits requested), 2026-09-06.

## Closed (filled during verify)

- Date: 2026-09-06
- Commit: see `spec: 001 closed — verify green` (this feature's closing commit)
- Notes: all 25 tasks closed; full suite green (37/37 Vitest tests, 22 files); lint and typecheck clean; `nuxi generate` succeeds; Docker image builds and serves correctly (manually verified). See "Acceptance criteria evidence" below and `tasks.md` for the complete per-task R-G-F trail.

### Acceptance criteria evidence

R1 (spec coverage) found that criteria 1, 5, and 7 were under-cited in their most relevant commit messages — functionally covered, but not literally traceable by grepping "criterion N" the way criteria 2–4 are. Recorded here to close that gap:

1. **Full text content in initial HTML before JS executes** — mechanism: `ssr: true` + `nuxi generate` (ADR 0001, `research.md` §nuxt@3.x). Evidence: `git show 8a3e009` (T001 green) manually confirmed `.output/public/index.html` contains the `app.vue` marker; re-confirmed at verify time for `/about`, `/certifications`, `/success-stories` (real page headings present in the prerendered HTML, not just injected by client JS). Every page-component test (`tests/nuxt/{home,about,resume,services,success-stories,certifications,libraries,contact}.nuxt.spec.ts`) asserts on synchronously rendered text, consistent with this criterion, though their Red commits cite criterion 3 (their primary ref) rather than criterion 1.
2. **No third-party template asset requested** — `tests/unit/design-tokens.spec.ts` (T003, commits `b9dc4aa`/`8e235f0`) plus a verify-time grep of `.output/public/**/*.html` for `bootstrap|aos|boxicons|jquery|owl.carousel|isotope|counterup|venobox|icofont`: zero matches.
3. **Every category reachable** — `tests/nuxt/layout.nuxt.spec.ts` (T009, `9a1b9d2`/`50e0558`) plus one page test per category (T011-T022).
4. **Zero WCAG 2.1 AA critical violations** — `tests/nuxt/accessibility.nuxt.spec.ts` (T023, `48d333b`/`ac60cfd`), 9/9 cases (8 pages + `error.vue`) passing.
5. **Static files, no persistent server process** — mechanism proven at T001 (`8a3e009`) and operationalized at T025 (Dockerfile, `7e112a6`): multi-stage build, runtime image confirmed to contain no Node/npm binaries; `docker compose up` serves the site. T025's own commit doesn't cite "criterion 5" by name — noted here instead of rewriting history.
6. **Test command exits non-zero on failure** — `npm run test` runs `vitest run`, whose non-zero-exit-on-failure is Vitest's documented default behavior; exercised implicitly on every Red beat of every task in this feature (each Red commit's "Observed failure" is exactly that non-zero exit surfaced).
7. **CI pipeline: lint, tests, build on every push** — `.github/workflows/ci.yml` (T024, `817478c`). Not run against an actual push in this environment (no `act` available, no push performed); verified by running the same four commands locally in the same order (`npm run lint && npm run typecheck && npm run test && npx nuxi generate`), all green. T024's own commit doesn't cite "criterion 7" by name — noted here instead of rewriting history.
