# Spec — 004-i18n

## Summary

Make the site available in English at `/en/*`, alongside the default Spanish at the current unprefixed routes, with a visible manual switch. Path-based locales (not a query string) are required by the SSG decision in ADR `0001-migrate-to-nuxt3.md` — a query parameter cannot change already-generated static HTML. This feature translates the content shipped through `003-content-refresh`; it does not add or change what is said.

## User story

As an English-speaking visitor (recruiter, potential client, or technical peer) evaluating José R. Gutierrez's work, I want to read the site in English, so that a language barrier doesn't stand between me and an accurate impression of his work.

As a Spanish-speaking visitor, I want the site to stay in Spanish by default with no surprise redirects, so that my experience is unaffected by this feature.

## Acceptance criteria

1. The site is served in Spanish by default at its current unprefixed routes (`/`, `/about`, `/resume`, `/services`, `/success-stories`, `/certifications`, `/libraries`, `/contact`).
2. Every one of those routes has an English equivalent at the same path prefixed with `/en` (e.g. `/en/about`).
3. Both locales are pre-rendered as static HTML at build time — visiting any `/en/*` route returns the full English text content in the initial HTML response, before any client-side JavaScript executes (same guarantee as criterion 1 of `001-nuxt3-portfolio-rewrite/spec.md`, extended to the English routes).
4. A visible language switch appears on every page, moving the visitor to the equivalent page in the other locale (not just to that locale's home page).
5. Every piece of visitor-facing text — success stories, skill labels, experience, education, certifications, static page copy, and navigation labels — has a real English translation under `/en`; no untranslated Spanish text and no placeholder text appears on an `/en` page.
6. The `<html lang="...">` attribute matches the current locale (`es` or `en`).
7. Each page emits `hreflang` alternate-language link tags pointing to its Spanish and English equivalents.
8. The existing accessibility suite reports zero violations for both locales.

## Non-goals

- Auto-detecting the visitor's browser language or redirecting on first visit — Spanish is always the default at the unprefixed routes; moving to English is always an explicit, manual action via the switch (resolved with the user, 2026-09-06).
- Locales beyond Spanish and English.
- Locale-specific content changes beyond translation — no different case studies, pricing, or region logic per locale.
- New or reworded Spanish content — this feature translates what `003-content-refresh` shipped; any change to the Spanish source text is out of scope. **Deliberate exceptions**, each a one-off correction requested explicitly by the user, not a reopening of this non-goal:
  - **2026-09-07:** a pre-existing typo ("Libería" → "Librería", carried over since `001`), noticed while reviewing T007's translation.
  - **2026-09-07:** success story #6's client name ("Phillips Morris Internacional" → "Philip Morris International", the real company name), noticed while reviewing the drafted English translation.
- Automated translation-quality checks (e.g., back-translation verification) — accuracy is ensured by the user reviewing and approving each translated batch before it is published (Article V), not by an automated test.

## Applicable constitution articles

- Article I — every acceptance criterion above traces to this spec.
- Article II — test-first: route existence, `lang` attribute, switch presence, and hreflang tags are all testable before implementation.
- Article V — translation text is drafted by the assistant and approved by the user in batches before publishing (resolved with the user, 2026-09-06), not invented or auto-translated without review.
- Article VI — the path-based (not query-string) locale architecture is already decided in `001-nuxt3-portfolio-rewrite/spec.md`'s "Resolved during specify" section and ADR `0001-migrate-to-nuxt3.md`; this feature implements it, not re-decides it.
- Article VIII — criterion 8 is a direct accessibility regression guard, for both locales.

## Open questions

None outstanding — see "Resolved during specify" below.

### Resolved during specify (inlined per Article V — explicit user dialog)

- No auto-detection/redirect: Spanish is always the default; English is reached only via the manual switch. Resolved with the user, 2026-09-06.
- Translation authorship: the assistant drafts each translation, the user approves in batches before publishing — same pattern used for `003-content-refresh`'s new Spanish content. Resolved with the user, 2026-09-06.
- `hreflang` tags are in scope for this feature (not deferred), given the `/en` routes already exist once this feature ships. Resolved with the user, 2026-09-06.

## Glossary additions

- **Locale switch** — the visible UI control (per criterion 4) that moves the visitor between `/path` (Spanish) and `/en/path` (English) for the *same* page, not to that locale's home page.

---

## Closed (filled during verify)

- Date: 2026-09-07
- Commit: `<pending>` — `spec: 004 closed — verify green`
- Notes: all 14 tasks closed; full suite green (106/106 Vitest tests, 45 files); lint/typecheck clean; `nuxi generate` succeeds (36 routes, both locales). Two items flagged during the user's local review were resolved and fixed before closing (see "Acceptance criteria evidence" and Non-goals): the "Phillips Morris" → "Philip Morris International" client-name correction, and `resume.experience.heading` made locale-aware ("Experiencia Profesional" / "Professional Experience"), fixing a pre-existing bug that predated this feature.

### Verify report

- R1 Spec coverage: PASS (8/8 criteria traced to a Red-commit `spec-ref`, except criterion 3 which needed supplemental evidence — see below)
- R2 Task completeness: PASS (14/14 tasks closed, each with commit SHAs or documented rationale — content-drafting tasks T009-T012 have no automated red by design, gated on user approval instead)
- R3 Orphan tests: PASS (0 orphans among the 13 test files added/changed this feature)
- R4 Contracts: PASS/N/A (no external boundary — `@nuxtjs/i18n` is build-time only, per ADR 0004)
- R5 Constitution: PASS. One process deviation is recorded, not glossed over: T009-T012's translation drafts were wired into the codebase (T013) before the user's synchronous approval, under the user's own explicit in-session authorization (2026-09-07) to defer that review to session's end rather than block on it. The review did happen before closing — the user's local walkthrough surfaced two real corrections (see Notes above), both resolved before this commit.
- R6 Research freshness: PASS (`research.md` captured 2026-09-06, 1 day old)
- R7 Observability: N/A (no article declares it; fully static site)
- R8 Security: N/A (no auth/money/PII/external writes)
- R9 Docs: PASS (fixed during verify — `README.md` had no mention of the new `/en/*` route tree; added one line)
- R10 Changelog: N/A (no `CHANGELOG.md` convention exists in this repo, consistent with 001/002/003)

No FAILs.

### Acceptance criteria evidence

Criterion 3 (both locales pre-rendered as static HTML at build time) has no commit whose Refs line cites it by a dedicated automated test — it's verified by direct inspection of the `nuxi generate` output instead (same technique used for 001's criterion 1). Recorded here as supplemental evidence:

3. **Both locales pre-rendered as static HTML** — a real `nuxi generate` build (verified twice this session) produces 36 prerendered routes; `grep` against the generated `.html` files directly (not through Vitest) confirms full English/Spanish text is present in each locale's static markup, e.g. `.output/public/en/about/index.html` contains "Skills & Abilities"/"Facts" and `.output/public/about/index.html` contains "Habilidades y Destrezas"/"Hechos", with no client-side JavaScript required.
