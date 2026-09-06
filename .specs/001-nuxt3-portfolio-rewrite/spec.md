# Spec — 001-nuxt3-portfolio-rewrite

## Summary

Rewrite the portfolio site's frontend with an original, minimalist design, replacing the current third-party visual template, and put it under an automated test suite and CI from its first commit. Existing content (skills, experience, success stories, etc.) is carried over as-is, in wording and category, with no new content added — content changes belong to a separate feature (002).

## User story

As a visitor evaluating José R. Gutierrez's professional work (recruiter, potential client, or technical peer), I want to see a distinctive, current-looking site that loads its real content immediately, so that I form an accurate impression of his technical skill without being distracted by a generic, dated visual template.

As the site's maintainer, I want the rewrite backed by an automated test suite that runs locally and in CI, so that future content and design changes have a safety net that does not exist today.

## Acceptance criteria

1. Every page's initial HTML response contains the page's full text content, before any client-side JavaScript executes.
2. No script or stylesheet asset belonging to the previous third-party template package (Bootstrap, AOS, Boxicons, jQuery, Owl Carousel, Isotope, CounterUp, Venobox) is requested by the browser on any page.
3. Each of the current site's content categories — home/intro, about, skills, experience, success stories, certifications, libraries, services, contact — remains reachable after the rewrite, at a URL that may be renamed from the current one when the new name better reflects the content (resolved with the user, 2026-09-05: free renaming allowed, not required to preserve exact current paths).
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

## Glossary additions

- **Third-party template package** — the BootstrapMade "iPortfolio" asset bundle currently loaded via `public/index.html` (Bootstrap, AOS, Boxicons, jQuery, Owl Carousel, Isotope, CounterUp, Venobox) and its Vue wrapper components.

---

## Approval

- Approved as drafted (no edits requested), 2026-09-06.

## Closed (filled during verify)

- Date: `<pending>`
- Commit: `<pending>`
- Notes: `<pending>`
