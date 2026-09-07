# Plan — 003-content-refresh

## Summary

Extend `data/success-stories.ts` (+11 entries) and `data/skills.ts` (+8 entries) with real content, sourced and confirmed per Article V before being written. No new component, no new dependency, no visual change — the existing `SuccessStoryCard.vue` and `AboutSkills.vue` already render whatever the data arrays contain.

## Stack decision

| Item | Choice | Rationale |
|------|--------|-----------|
| Data format | Extend existing `data/success-stories.ts`/`data/skills.ts` TS arrays, same `SuccessStory`/`Skill` interfaces | No new content model needed — this feature is additive within the shape 001 already defined. |
| New skill-logo assets | 7 downloaded verbatim from Simple Icons (MIT), 1 (SDD/TDD) hand-authored SVG | `research.md`; matches the existing `data/skills.ts` convention (one real logo per skill) and ADR 0002 (no icon *package* dependency — these are static files, not a library). |
| Content sourcing | Research each source repo (agent-assisted where useful), draft `title`/`body`/`tags`, present to the user for approval before writing into the data file | Article V — this is factual content about real (and some client) work; never invented. |

## Module layout

```
data/success-stories.ts      # +11 entries appended (order: keep the 8 existing first, unchanged)
data/skills.ts                # +8 entries appended (order: keep the 16 existing first, unchanged)
public/assets/img/logos/
  filament.svg                # downloaded from Simple Icons
  livewire.svg                # downloaded from Simple Icons
  postgresql.svg               # downloaded from Simple Icons
  python.svg                   # downloaded from Simple Icons
  flutter.svg                  # downloaded from Simple Icons
  dart.svg                     # downloaded from Simple Icons
  typescript.svg                # downloaded from Simple Icons
  tailwindcss.svg               # downloaded from Simple Icons
  sdd-tdd.svg                   # hand-authored, original
```

No component changes. No new files beyond the two data files and the 9 logo assets.

## Data model

Entities (unchanged interfaces from 001, see `001-nuxt3-portfolio-rewrite/plan.md` §Data model):

- `SuccessStory` — `title: string`, `body: string` (HTML), `tags: string[]`. 11 new entries appended.
- `Skill` — `title: string`, `image: string`. 8 new entries appended.

Invariants: the 8 existing `SuccessStory` entries and 16 existing `Skill` entries are byte-for-byte unchanged (criteria 3, 6). No migration — plain data literals, no database.

## Boundaries

Unchanged — no new boundary. See `contracts/README.md`.

## Error model / Observability / Security

N/A — no new error surface, no server runtime, no new input (unchanged from 001/002).

## Test strategy

- **Unit** (`tests/unit/data-success-stories.spec.ts`, `tests/unit/data-skills.spec.ts` — extend the existing files from 001): assert the new lengths (19 and 24), assert each of the 8/16 existing entries is still present unchanged (regression), assert each new entry has the required fields non-empty, assert Sirocco/Cauce/Maná del Cielo's bodies mention their respective completion status (criterion 4).
- **Regression** (`tests/nuxt/accessibility.nuxt.spec.ts`, unchanged): re-run after the content lands; must stay at zero violations (criterion 8) — new `<img>` tags need real `alt` text (skill title), consistent with the existing pattern in `AboutSkills.vue`.
- **Contract / E2E:** none — no external boundary, no new interaction (unchanged from 001/002).

## Rollout

- **Feature flag:** none.
- **Order (detail in `tasks.md`):**
  1. Download the 7 Simple Icons SVGs + hand-author `sdd-tdd.svg`.
  2. Research + draft the 3 personal-project entries (Sirocco, Cauce, Maná del Cielo) — lower research cost, the user's own repos.
  3. Research + draft the 3 already-authorized client entries (Bajo la Lupa, Biogenesis, Somos URV).
  4. Research + draft the 5 `massive-space` entries (Qbano, Nequi/Gravity, CatalogFlip, Almacenes Brissa, massive-whatsapp-service) — deeper research already partly done during specify's survey; confirm/extend before drafting body copy.
  5. Present all 11 drafts (title/body/tags) to the user in one batch for approval (Article V) — not written to the data file until approved.
  6. Write the 8 new skills + 11 approved success stories into `data/skills.ts`/`data/success-stories.ts`.
  7. Extend the data-shape-parity tests; re-run the accessibility suite.
- **Compatibility windows:** none.
- **Rollback:** revert the merge commit; no schema/migration involved.

## References

- Spec: `./spec.md`
- Research: `./research.md`
- Contracts: `./contracts/`
- ADRs: none new — `../adr/0002-nuxt3-implementation-stack.md` (icon philosophy) still applies.
