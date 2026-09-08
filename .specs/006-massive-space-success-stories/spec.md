# Spec — 006-massive-space-success-stories

## Summary

Add the 4 success stories selected from the final triage of deferred `massive-space` candidates (see `.specs/onboarding.md`, 2026-09-08): Calzatodo, Pizzamania (Auto Invoicer), CrediPink, and MassiveSpace Pro. Additive only — no existing content is removed, reordered, or reworded, and no visual/design change is in scope.

## User story

As a visitor evaluating José R. Gutierrez's current skills (recruiter, potential client, or technical peer), I want to see additional real, verifiably-authored work — including SDD+TDD practice on a client engagement and an internal platform he built and maintains — so that I form an accurate impression of the breadth of his e-commerce/VTEX integration work.

## Acceptance criteria

1. The success-stories page lists 4 new entries — Calzatodo, Pizzamania (Auto Invoicer), CrediPink, and MassiveSpace Pro — in addition to the 19 already there (23 total).
2. Each new entry has a title, a body describing the technical work (technologies, role, outcome), and at least one tag — the same shape as the 19 existing entries.
3. Every one of the 19 existing success-story entries is unchanged: same title, same body, same tags.
4. Calzatodo's entry describes only the `backend-services` microservice (gift-card issuance with retries/Slack alerts, monthly-bonus-limit validation, Master Data) — it makes no claim about the store's theme or frontend, which the user did not author.
5. CrediPink's entry describes the credit-at-checkout product itself — it does not claim authorship of the LiliPink storefront/theme, which the user did not author.
6. MassiveSpace Pro's entry describes it as the user's own internal tool for managing multiple agency clients — it does not name any specific client.
7. English translations of all 4 new entries exist in `data/success-stories.en.ts`, matching the i18n pattern established in `004-i18n`.
8. Automated tests confirm the new counts and shapes, extending the existing data-shape-parity pattern (`tests/unit/data-success-stories.spec.ts`).
9. The existing accessibility suite (`tests/nuxt/accessibility.nuxt.spec.ts`) continues to report zero violations after these content changes, for both locales.

## Non-goals

- Any visual or layout change — new entries reuse the existing card/list markup as-is.
- New skill entries in `data/skills.ts` — tags on the new stories (e.g. any VTEX IO/Koa/queue-specific terms) do not require a corresponding skill-logo entry, same as several existing tags today (e.g. "Microservicios", "Event-Driven").
- Removing, reordering, or rewording any of the 19 existing success stories.
- Naming Ficohsa/La Colonia or any other `massive-space` candidate not selected in the 2026-09-08 triage (Pepe Ganga, Juriscoop, Speedo — discarded for lack of attributable authorship or insufficient own commits; Ficohsa/La Colonia — not selected).

## Applicable constitution articles

- Article I — every acceptance criterion above traces to this spec.
- Article III — the new content-shaping tests use real data, no mocking.
- Article V — the exact wording of each new success-story body is factual content about real projects (client and internal-tool work); it is drafted from research into each source repo (already surveyed and confirmed with the user, see `.specs/onboarding.md`) and presented for approval before publishing.
- Article VIII — criterion 9 is a direct accessibility regression guard.

## Open questions

None outstanding — candidate selection, per-entry scope boundaries (criteria 4-6), and English-parity requirement were all resolved with the user before this spec was drafted (see `.specs/onboarding.md`, 2026-09-08 decisions).

## Glossary additions

- **The 4 new success stories, by source** (full triage evidence in `.specs/onboarding.md`):
  - **Calzatodo** (`massive-space/calzatodo/backend-services` — VTEX IO Node/TypeScript/Koa microservice, 100% own commits: gift-card issuance with retries + Slack alerts, monthly-bonus-limit validation, Master Data/OMS integration).
  - **Pizzamania — Auto Invoicer** (`massive-space/pizzamania/auto-invoicer` — VTEX IO app, 100% own commits, built with explicit SDD+TDD: spec/plan/contracts documented; closes marketplace orders stuck in "payment-approved" by invoicing the mirror order, idempotent pagination, historical backfill mode).
  - **CrediPink** (`massive-space/lilipink/credi-pink` — Laravel + Filament BNPL/credit-at-checkout backend, 100% own commits, live at `app.credipink.com`; promissory-note/invoice reconciliation, self-healing signature state, orphaned-order cancellation, real production incidents diagnosed and fixed).
  - **MassiveSpace Pro** (`massive-space/massivespace-pro` — Laravel + Filament internal agency platform, 100% own commits: WhatsApp notifications, abandoned-cart recovery, fast checkout, short URLs/QR, bulk invoicing with backfill; presented as the user's own tool, no client named).

---

## Closed (filled during verify)

- Date: 2026-09-08
- Commit: `8a9e7e5` — `spec: 006 closed — verify green`
- Notes: all 5 tasks closed; full suite green (120/120 Vitest tests, 48 files); lint/typecheck clean; `nuxi generate` succeeds (36 routes) and was checked directly — all 4 new entries render correctly on both `/success-stories` and `/en/success-stories` with the exact approved text. Content for all 4 entries was verified against the actual source repos (README, CLAUDE.md, composer.json/package.json, manifest.json, directory structure) before drafting, per Article V, and approved by the user in two batches (Spanish, then English) before being written to the data files.

### Acceptance criteria evidence

Criteria 7 and 9 have no commit whose Refs line cites them by name (T004's own green commit reused a pre-existing test from `004-i18n` rather than introducing a new one; T005 closed as a regression check with no production change needed — see `tasks.md` for both). Recorded here instead of treating it as a gap:

7. **English translations exist and match** — `data/success-stories.en.ts` has all 23 entries (19 existing + 4 new), verified by `tests/unit/data-en-parity.spec.ts`'s length-parity assertion and confirmed against the real `nuxi generate` build for `/en/success-stories`.
8. **Automated tests confirm counts/shapes** — `tests/unit/data-success-stories.spec.ts` (23 entries, 19 existing titles present, 4 new ones with valid shape, scope-boundary checks for Calzatodo/CrediPink/MassiveSpace Pro) — extended in T003.
9. **Existing accessibility suite stays at zero violations, both locales** — `tests/nuxt/accessibility.nuxt.spec.ts` re-run after T003/T004's content changes: still 18/18 passing.
