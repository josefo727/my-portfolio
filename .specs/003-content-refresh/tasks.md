# Tasks — 003-content-refresh

## Legend

- `T{NNN}` — task id, unique within feature, zero-padded.
- `[P]` — safe to execute in parallel with other `[P]` tasks (disjoint files, no shared mutable state).
- `R` — Red beat description.
- `G` — Green beat description.
- `F` — Refactor beat description.
- `status` — `open | in_progress | closed | skipped`.

---

## T001 [P] Skill logo assets

```
spec-ref:        Acceptance criterion 5 (8 new skills)
contract-ref:    n/a
constitution-ref:ADR 0002 (icon philosophy — no icon package dependency)
DoD:
  - public/assets/img/logos/{filament,livewire,postgresql,python,flutter,dart,typescript,tailwindcss}.svg exist, downloaded verbatim from Simple Icons
  - public/assets/img/logos/sdd-tdd.svg exists, hand-authored (no brand icon exists for a methodology)
R: a unit test asserting all 9 files exist fails because none of them do yet
G: download the 8 Simple Icons SVGs (research.md confirmed HTTP 200 for each) and hand-author sdd-tdd.svg
F: skipped — no smell detected
files:
  - public/assets/img/logos/filament.svg
  - public/assets/img/logos/livewire.svg
  - public/assets/img/logos/postgresql.svg
  - public/assets/img/logos/python.svg
  - public/assets/img/logos/flutter.svg
  - public/assets/img/logos/dart.svg
  - public/assets/img/logos/typescript.svg
  - public/assets/img/logos/tailwindcss.svg
  - public/assets/img/logos/sdd-tdd.svg
  - tests/unit/skill-logo-assets.spec.ts
status: closed
commits:
  red: e8f81d5
  green: 5f55777
  refactor: skipped — no smell detected
notes:
```

---

## T002 Research & draft: personal projects

```
spec-ref:        Acceptance criteria 1, 2, 4
contract-ref:    n/a
constitution-ref:Article V
DoD:
  - draft title/body(HTML)/tags for Sirocco (stating finished/production), Cauce (in development), Maná del Cielo (in development)
  - each draft grounded in the actual repo (README, package.json, git log) — no invented claims
  - drafts presented to the user for approval before any data file is touched
R: n/a — content-drafting task, no automated red (see spec.md Article V note)
G: read ~/Projects/{survey-system,cauce,manadelcielo,manadelcielo-content-forge}, draft the 3 entries, get user approval or revisions
F: n/a
files: (none — output is approved draft text, not yet written to a file)
status: open
commits:
  red: n/a
  green:
  refactor: n/a
notes:
```

---

## T003 Research & draft: already-authorized client projects

```
spec-ref:        Acceptance criteria 1, 2
contract-ref:    n/a
constitution-ref:Article V
DoD:
  - draft title/body(HTML)/tags for Bajo la Lupa, Biogenesis, Somos URV
  - each draft grounded in the actual repo
  - drafts presented to the user for approval before any data file is touched
R: n/a — content-drafting task, no automated red
G: read ~/Projects/{bajo-la-lupa,bio-labs-dev/bio-labs,urv-web-site/somos-urv}, draft the 3 entries, get user approval or revisions
F: n/a
files: (none)
status: open
commits:
  red: n/a
  green:
  refactor: n/a
notes:
```

---

## T004 Research & draft: massive-space projects

```
spec-ref:        Acceptance criteria 1, 2
contract-ref:    n/a
constitution-ref:Article V
DoD:
  - draft title/body(HTML)/tags for Qbano, Nequi/Gravity, CatalogFlip, Almacenes Brissa, massive-whatsapp-service
  - each draft builds on the specify-time survey findings, confirmed/extended with a closer look at each repo
  - drafts presented to the user for approval before any data file is touched
R: n/a — content-drafting task, no automated red
G: read the 5 ~/Projects/massive-space/* repos, draft the 5 entries, get user approval or revisions
F: n/a
files: (none)
status: open
commits:
  red: n/a
  green:
  refactor: n/a
notes:
```

---

## T005 Write success stories to data

```
spec-ref:        Acceptance criteria 1, 2, 3, 4, 7
contract-ref:    n/a
constitution-ref:Article III (real data, no mocking)
DoD:
  - data/success-stories.ts has 19 entries: the 8 original (byte-for-byte unchanged) + the 11 approved in T002-T004
  - a unit test asserts the new length, that each of the 8 original titles is still present, and that all 11 new entries have non-empty title/body/tags
  - a unit test asserts Sirocco's body mentions production/finished, Cauce's and Maná del Cielo's each mention in-development
R: the length/content assertions fail because the 11 new entries don't exist in data/success-stories.ts yet
G: append the 11 approved entries (from T002-T004) to data/success-stories.ts
F: skipped unless a repeated pattern across entries suggests an extraction
files:
  - data/success-stories.ts
  - tests/unit/data-success-stories.spec.ts
status: open
commits:
  red:
  green:
  refactor:
notes: depends on T002, T003, T004 (approved drafts).
```

---

## T006 Write skills to data

```
spec-ref:        Acceptance criteria 5, 6
contract-ref:    n/a
constitution-ref:Article III
DoD:
  - data/skills.ts has 24 entries: the 16 original (unchanged) + 8 new (SDD/TDD, Filament, Livewire, PostgreSQL, Python, Flutter/Dart, TypeScript, Tailwind CSS), no duplicates
  - each new entry's `image` points to its logo asset from T001
  - a unit test asserts the new length, that each of the 16 original titles is still present, and that each new entry has a non-empty title/image
R: the length/content assertions fail because the 8 new entries don't exist in data/skills.ts yet
G: append the 8 new entries to data/skills.ts
F: skipped — no smell detected
files:
  - data/skills.ts
  - tests/unit/data-skills.spec.ts
status: open
commits:
  red:
  green:
  refactor:
notes: depends on T001 (logo assets).
```

---

## T007 Accessibility regression check

```
spec-ref:        Acceptance criterion 8
contract-ref:    n/a
constitution-ref:Article VIII
DoD:
  - tests/nuxt/accessibility.nuxt.spec.ts still reports zero violations with the new content rendered
  - every new skill's <img> has a meaningful alt (its title, per AboutSkills.vue's existing pattern) — not empty
R: n/a — regression task, no new red test (mirrors 002's T014)
G: fix anything the accessibility suite surfaces
F: skipped unless a fix requires cleanup
files: (none expected)
status: open
commits:
  red: n/a
  green:
  refactor:
notes: last task — depends on T005, T006 (finished content to check).
```

---

## Amendments

| Date | Change | Reason |
|------|--------|--------|
|      |        |        |
