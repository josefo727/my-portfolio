# Plan — 006-massive-space-success-stories

## Summary

Extend `data/success-stories.ts` and `data/success-stories.en.ts` (+4 entries each) with the content selected in the 2026-09-08 `massive-space` triage. No new component, no new dependency, no visual change — `SuccessStoryCard.vue` and `useLocalizedData()` (from `004-i18n`) already render whatever the two data arrays contain, in both locales.

## Stack decision

| Item | Choice | Rationale |
|------|--------|-----------|
| Data format | Extend existing `data/success-stories.ts`/`data/success-stories.en.ts` arrays, same `SuccessStory` interface | No new content model — additive within the shape `001` defined and `004` already made bilingual. |
| Content sourcing | Research each source repo (already surveyed by an Explore agent during this session's triage — see `.specs/onboarding.md`), draft `title`/`body`/`tags` per locale, present to the user for approval before writing | Article V — factual content about real (client and internal-tool) work; never invented. |
| No new skill assets | None — spec's non-goals exclude new `data/skills.ts` entries this feature | Existing tags vocabulary (e.g. "Microservicios", "Event-Driven") already covers untagged-skill terms; no logo asset required. |

## Module layout

```
data/success-stories.ts       # +4 entries appended (order: keep the 19 existing first, unchanged)
data/success-stories.en.ts    # +4 matching English entries appended, same order
```

No component changes. No new files.

## Data model

Entity (unchanged interface from `001`, bilingual since `004`):

- `SuccessStory` — `title: string`, `body: string` (HTML), `tags: string[]`. 4 new entries appended to each of the two locale files.

Invariants: the 19 existing entries in both `success-stories.ts` and `success-stories.en.ts` are byte-for-byte unchanged (criterion 3). No migration — plain data literals, no database.

## Boundaries

Unchanged — no new boundary. See `contracts/README.md`.

## Error model / Observability / Security

N/A — no new error surface, no server runtime, no new input (unchanged from `001`/`004`).

## Test strategy

- **Unit** (`tests/unit/data-success-stories.spec.ts`, extended): assert the new length (23) in `success-stories.ts`, assert all 19 existing titles are still present unchanged, assert each of the 4 new entries has non-empty title/body/at-least-one-tag, assert Calzatodo's/CrediPink's bodies do not mention the excluded storefront scope (criteria 4-5, via a targeted string-absence check), assert MassiveSpace Pro's body names no specific client (criterion 6).
- **Unit, English parity** (extend the existing translation-parity test from `004`, or `tests/unit/data-success-stories.spec.ts` itself): assert `success-stories.en.ts` has the same length (23) and the same entry count/order as the Spanish file (criterion 7).
- **Regression** (`tests/nuxt/accessibility.nuxt.spec.ts`, unchanged): re-run after the content lands for both `es` and `en` routes; must stay at zero violations (criterion 9).
- **Contract / E2E:** none — no external boundary, no new interaction.

## Rollout

- **Feature flag:** none.
- **Order (detail in `tasks.md`):**
  1. Confirm/extend the per-project research already gathered during triage (source repos already identified and authorship-verified — see `.specs/onboarding.md`); draft `title`/`body`/`tags` in Spanish for the 4 entries.
  2. Present the 4 Spanish drafts to the user for approval (Article V) — not written until approved.
  3. Draft and present the 4 English translations, same content, same approval gate.
  4. Write the 4 approved entries into `data/success-stories.ts` and `data/success-stories.en.ts`.
  5. Extend the data-shape-parity/translation-parity tests; re-run the accessibility suite for both locales.
- **Compatibility windows:** none.
- **Rollback:** revert the merge commit; no schema/migration involved.

## References

- Spec: `./spec.md`
- Research: `./research.md`
- Contracts: `./contracts/`
- ADRs: none new.
