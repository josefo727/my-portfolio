# Spec — 003-content-refresh

## Summary

Add the success stories and skills that are missing from the site because they postdate the content shipped in `001-nuxt3-portfolio-rewrite` (carried over as-is from the pre-rewrite site). Additive only — no existing content is removed, reordered, or reworded, and no visual/design change is in scope (that was `002-visual-design`).

## User story

As a visitor evaluating José R. Gutierrez's current skills (recruiter, potential client, or technical peer), I want to see his recent work and the technologies he actually uses today, so that I form an accurate, up-to-date impression rather than one based on older projects only.

## Acceptance criteria

1. The success-stories page lists 11 new entries — Sirocco, Cauce, Maná del Cielo, Bajo la Lupa, Biogenesis, Somos URV, Qbano, Nequi/Gravity, CatalogFlip, Almacenes Brissa, and massive-whatsapp-service — in addition to the 8 already there.
2. Each new success-story entry has a title, a body describing the technical work (technologies used, role, outcome), and at least one tag — the same shape as the 8 existing entries.
3. Every one of the 8 existing success-story entries is unchanged: same title, same body, same tags.
4. Sirocco's entry states it is finished and in production; Cauce's and Maná del Cielo's entries each state they are in active development — no entry claims a completion status that isn't accurate for that project.
5. The skills section lists 8 new entries — SDD/TDD, Filament, Livewire, PostgreSQL, Python, Flutter/Dart, TypeScript, Tailwind CSS — in addition to the 16 already there, with no duplicates.
6. Every one of the 16 existing skill entries is unchanged.
7. Automated tests confirm the new success-story and skill counts and shapes, extending the existing data-shape-parity pattern (`tests/unit/data-*.spec.ts`).
8. The existing accessibility suite (`tests/nuxt/accessibility.nuxt.spec.ts`) continues to report zero violations after these content changes.

## Non-goals

- Any visual or layout change — `002-visual-design` already covers presentation; new entries reuse the existing card/list markup as-is.
- Internationalization (feature 004).
- Removing, reordering, or rewording any of the 8 existing success stories or 16 existing skills.
- New content categories beyond success stories and skills (no new "portfolio" gallery, no new certifications, no new experience entries).
- Testimonials, ratings, or client quotes for the new success stories.
- Naming any client beyond the ones the user explicitly selected for this feature (Biogenesis, Somos URV — authorized 2026-09-05; Qbano, Almacenes Brissa — authorized 2026-09-06, selected from a `~/Projects/massive-space` survey). Any other client project found during that survey (e.g. Calzatodo, Ficohsa/La Colonia, Pizzamania, and others) is explicitly out of scope for this feature.

## Applicable constitution articles

- Article I — every acceptance criterion above traces to this spec.
- Article III — the new content-shaping tests use real data, no mocking.
- Article V — the exact wording of each new success-story body is factual content about real projects (some client work); it is drafted from research into each source repo and confirmed with the user before being published, not invented. This applies at plan/implement time, not as a spec-level marker, since the acceptance criteria above (shape, count, no removal) are already fully observable without knowing the exact prose yet.
- Article VIII — criterion 8 is a direct accessibility regression guard.

## Open questions

None outstanding.

## Glossary additions

- **The 11 new success stories, by source:**
  - Personal/in-progress: **Sirocco** (`~/Projects/survey-system`, finished, in production), **Cauce** (`~/Projects/cauce`, in development), **Maná del Cielo** (`~/Projects/manadelcielo` + `-content-forge`, in development).
  - Named client work, already authorized: **Bajo la Lupa** (`~/Projects/bajo-la-lupa`), **Biogenesis** (`~/Projects/bio-labs-dev/bio-labs`), **Somos URV** (`~/Projects/urv-web-site/somos-urv`).
  - From the `~/Projects/massive-space` survey (2026-09-06), authorized by the user (freelance/independent contractor, decides per-client): **Qbano** (`massive-space/qbano` — VTEX fast-checkout with card-terminal integration, standalone survey-coupon microservice), **Nequi/Gravity** (`massive-space/nequi-integration-be` — Laravel 13 + Pest, Credibanco DX4000 payment orchestration, TDD-heavy), **CatalogFlip** (`massive-space/catalog-flip` — own SaaS product, React/Redux Toolkit/Vite, non-VTEX), **Almacenes Brissa** (`massive-space/almacenes-brissa` — multiple custom VTEX apps authored by the user: financing, kits, store-pickup, kiosk themes), **massive-whatsapp-service** (`massive-space/massive-whatsapp-service` — Node/TS + VTEX admin-ui app, order-status WhatsApp notifications, multi-tenant rollout).

---

## Closed (filled during verify)

- Date: 2026-09-06
- Commit: `spec: 003 closed — verify green` (this feature's closing commit)
- Notes: all 7 tasks closed; full suite green (69/69 Vitest tests, 36 files); lint/typecheck clean; `nuxi generate` succeeds. All 11 success-story drafts and the skill-logo sourcing were verified against real project data before writing — two of my own draft mistakes were caught and corrected before publishing, not after: an assumed PostgreSQL DB for Biogenesis (no evidence, dropped) and an assumed TypeScript dependency for CatalogFlip (confirmed absent, corrected to plain JS). See `tasks.md` for the complete drafting/approval trail.

### Acceptance criteria evidence

Criteria 7 and 8 have no commit whose Refs line cites them by name (T007, their owner, closed as a docs-only commit with no production change needed — see its own notes). Recorded here instead of treating it as a gap:

7. **Automated tests confirm the new counts/shapes** — `tests/unit/data-success-stories.spec.ts` (19 entries, 8 original titles present, 11 new ones with valid shape, status wording checked) and `tests/unit/data-skills.spec.ts` (24 entries, 16 original titles present, 8 new ones with valid shape, no duplicate titles) — both extended in T005/T006.
8. **Existing accessibility suite stays at zero violations** — `tests/nuxt/accessibility.nuxt.spec.ts` re-run after T005/T006's content changes: still 9/9 passing.
