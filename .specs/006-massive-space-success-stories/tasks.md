# Tasks — 006-massive-space-success-stories

## Legend

- `T{NNN}` — task id, unique within feature, zero-padded.
- `[P]` — safe to execute in parallel with other `[P]` tasks (disjoint files, no shared mutable state).
- `R` — Red beat description.
- `G` — Green beat description.
- `F` — Refactor beat description.
- `status` — `open | in_progress | closed | skipped`.

---

## T001 Research & draft (Spanish)

```
spec-ref:        Acceptance criteria 1, 2, 4, 5, 6
contract-ref:    n/a
constitution-ref:Article V
DoD:
  - draft title/body(HTML)/tags in Spanish for Calzatodo, Pizzamania (Auto Invoicer), CrediPink, MassiveSpace Pro
  - each draft grounded in the actual repo (already surveyed this session — README, package.json/composer.json, git log — see research.md)
  - Calzatodo's draft scoped to backend-services only; CrediPink's scoped to the credit product only; MassiveSpace Pro's names no specific client
  - drafts presented to the user for approval before any data file is touched
R: n/a — content-drafting task, no automated red (see spec.md Article V note, same pattern as 003's T002-T004)
G: read massive-space/{calzatodo/backend-services,pizzamania/auto-invoicer,lilipink/credi-pink,massivespace-pro}, confirm/extend the triage findings, draft the 4 entries, get user approval or revisions
F: n/a
files: (none — output is approved draft text, not yet written to a file)
status: open
commits:
  red: n/a
  green: n/a — approved in chat, written to data in T003
  refactor: n/a
notes:
```

---

## T002 Research & draft (English)

```
spec-ref:        Acceptance criterion 7
contract-ref:    n/a
constitution-ref:Article V
DoD:
  - translate the 4 approved Spanish drafts (T001) to English, same structure/tags as their Spanish counterpart
  - drafts presented to the user for approval before any data file is touched
R: n/a — content-drafting task, no automated red
G: translate the 4 approved entries, get user approval or revisions
F: n/a
files: (none — output is approved draft text, not yet written to a file)
status: open
commits:
  red: n/a
  green: n/a — approved in chat, written to data in T004
  refactor: n/a
notes:
```

---

## T003 Write success stories (Spanish) to data

```
spec-ref:        Acceptance criteria 1, 2, 3, 4, 5, 6, 8
contract-ref:    n/a
constitution-ref:Article III (real data, no mocking)
DoD:
  - data/success-stories.ts has 23 entries: the 19 existing (byte-for-byte unchanged) + the 4 approved in T001
  - a unit test asserts the new length, that each of the 19 existing titles is still present, and that all 4 new entries have non-empty title/body/tags
  - a unit test asserts Calzatodo's body does not claim the store theme/frontend, CrediPink's body does not claim the LiliPink storefront, and MassiveSpace Pro's body names no specific client
R: the length/content assertions fail because the 4 new entries don't exist in data/success-stories.ts yet
G: append the 4 approved entries (from T001) to data/success-stories.ts
F: skipped unless a repeated pattern across entries suggests an extraction
files:
  - data/success-stories.ts
  - tests/unit/data-success-stories.spec.ts
status: open
commits:
  red:
  green:
  refactor:
notes:
```

---

## T004 Write success stories (English) to data

```
spec-ref:        Acceptance criterion 7
contract-ref:    n/a
constitution-ref:Article III
DoD:
  - data/success-stories.en.ts has 23 entries: the 19 existing (unchanged) + the 4 approved English translations from T002, same order as success-stories.ts
  - the existing parity test (tests/unit/data-en-parity.spec.ts) still asserts equal length between the two files
R: the parity-length assertion fails (23 vs. 19) because success-stories.en.ts doesn't have the 4 new entries yet
G: append the 4 approved English entries (from T002) to data/success-stories.en.ts, same order as success-stories.ts
F: skipped — no smell detected
files:
  - data/success-stories.en.ts
  - tests/unit/data-en-parity.spec.ts
status: open
commits:
  red:
  green:
  refactor:
notes:
```

---

## T005 Accessibility regression check

```
spec-ref:        Acceptance criterion 9
contract-ref:    n/a
constitution-ref:Article VIII
DoD:
  - tests/nuxt/accessibility.nuxt.spec.ts still reports zero violations with the new content rendered, for both es and en routes
R: n/a — regression task, no new red test (mirrors 003's T007, 004's T014)
G: fix anything the accessibility suite surfaces
F: skipped unless a fix requires cleanup
files: (none expected)
status: open
commits:
  red: n/a
  green: n/a
  refactor: n/a
notes:
```

---

## Amendments

| Date | Change | Reason |
|------|--------|--------|
|      |        |        |
