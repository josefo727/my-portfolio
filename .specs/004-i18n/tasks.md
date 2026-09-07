# Tasks — 004-i18n

## Legend

- `T{NNN}` — task id, unique within feature, zero-padded.
- `[P]` — safe to execute in parallel with other `[P]` tasks (disjoint files, no shared mutable state).
- `R` — Red beat description.
- `G` — Green beat description.
- `F` — Refactor beat description.
- `status` — `open | in_progress | closed | skipped`.

---

## T001 Install & configure `@nuxtjs/i18n`

```
spec-ref:        Acceptance criteria 1, 2
contract-ref:    n/a
constitution-ref:Article VI (ADR 0004)
DoD:
  - @nuxtjs/i18n installed, registered in nuxt.config.ts modules
  - i18n: { strategy: 'prefix_except_default', defaultLocale: 'es', locales: [es, en] } configured
  - `npx nuxi generate` produces both `/about/index.html` and `/en/about/index.html`
R: a unit test reading nuxt.config.ts's source text fails because no i18n config exists yet
G: install the module, add the config block
F: skipped — no smell detected
files:
  - nuxt.config.ts
  - package.json
  - package-lock.json
  - tests/unit/i18n-routes.spec.ts
status: closed
commits:
  red: f6c80f0
  green: e4a4c40
  refactor: skipped — no smell detected
notes: confirmed nuxi generate produces 36 routes (18 pages x 2 locales) automatically, no manual route list needed. Harmless transitive vue-i18n@10.0.8 deprecation warning at install — noted in research.md, not the actual runtime version (11.4.10).
```

---

## T002 Wire `useLocaleHead()` (lang attribute + hreflang)

```
spec-ref:        Acceptance criteria 6, 7
contract-ref:    n/a
constitution-ref:Article VIII (correct lang attribute aids assistive tech)
DoD:
  - app.vue (or a dedicated layout) calls useLocaleHead() and applies htmlAttrs.lang + the hreflang link tags
  - a component test mounts the app shell at both an es and an en route and asserts the resulting lang differs accordingly
R: the test fails because no useLocaleHead()/Html lang wiring exists yet
G: add the wiring per the module's SEO guide (research.md)
F: skipped — no smell detected
files:
  - app.vue
  - nuxt.config.ts
  - tests/nuxt/locale-head.nuxt.spec.ts
status: closed
commits:
  red: 6a6f293
  green: cd181fc
  refactor: skipped — no smell detected
notes: needed i18n.baseUrl (https://hv.jose-gutierrez.com) for valid absolute hreflang URLs — the module warns without it. Verified in the actual nuxi generate output: correct x-default/es/es-ES/en/en-US hreflang links and lang="es-ES"/"en-US" per locale.
```

---

## T003 `LocaleSwitcher.vue` component

```
spec-ref:        Acceptance criterion 4 (same-page switch, not just home)
contract-ref:    n/a
constitution-ref:Article II
DoD:
  - LocaleSwitcher.vue uses useSwitchLocalePath() to link to the *current* page in the other locale
  - placed in AppHeader.vue, visible on every page (inherited from the shared layout)
  - a component test mounts it on a non-home route (e.g. /about) and asserts the link points to /en/about, not /en
R: the test fails because LocaleSwitcher.vue doesn't exist yet
G: create the component, wire it into AppHeader.vue
F: skipped — no smell detected
files:
  - components/layout/LocaleSwitcher.vue
  - components/layout/AppHeader.vue
  - tests/nuxt/locale-switcher.nuxt.spec.ts
status: open
commits:
  red:
  green:
  refactor:
notes:
```

---

## T004 Message catalogs + nav labels

```
spec-ref:        Acceptance criterion 5 (nav labels)
contract-ref:    n/a
constitution-ref:Article V (translation accuracy, approved per label)
DoD:
  - i18n/locales/es.json, i18n/locales/en.json exist with a nav.* key per AppNav link (7 labels)
  - AppNav.vue reads labels via $t('nav.*') instead of hardcoded Spanish text
  - a test asserts es.json and en.json have exactly the same key set, and that AppNav renders the translated label per locale
R: the test fails because the JSON files and $t() wiring don't exist yet
G: scaffold both JSON files with the 7 nav keys (translated, approved inline — short, low-risk labels), wire AppNav.vue
F: skipped — no smell detected
files:
  - i18n/locales/es.json
  - i18n/locales/en.json
  - components/layout/AppNav.vue
  - tests/unit/i18n-messages-parity.spec.ts
  - tests/nuxt/app-nav-i18n.nuxt.spec.ts
status: open
commits:
  red:
  green:
  refactor:
notes: nav labels (Inicio/Acerca de mí/etc.) are short enough to translate inline without a separate approval batch — flagged to the user at present-time, not silently assumed.
```

---

## T005 [P] `useLocalizedData()` composable

```
spec-ref:        Acceptance criterion 5 (structured content)
contract-ref:    n/a
constitution-ref:Article II
DoD:
  - composables/use-localized-data.ts exports useLocalizedData<T>(es: T, en: T): T
  - returns `es` when the current locale is 'es' (or anything but 'en'), `en` when it is 'en'
  - a unit test exercises both branches with a mocked/stubbed locale
R: the test fails because the composable doesn't exist yet
G: implement the composable
F: skipped — no smell detected
files:
  - composables/use-localized-data.ts
  - tests/unit/use-localized-data.spec.ts
status: open
commits:
  red:
  green:
  refactor:
notes:
```

---

## T006 Translate & migrate: About, Services, Contact static copy

```
spec-ref:        Acceptance criterion 5
contract-ref:    n/a
constitution-ref:Article V — draft presented for approval before writing
DoD:
  - AboutProfile.vue's fixed prose (intro paragraph, closing paragraph, field labels) moved to $t() keys
  - pages/services.vue's heading/sentence moved to $t() keys
  - components/contact/ContactInfo.vue's heading moved to $t() keys
  - es.json/en.json updated with the new keys; translated text approved by the user before this task's green commit
R: a test asserts the new keys exist in both JSON files and fails because they don't yet
G: draft + get approval, then add the keys and wire the three components
F: skipped — no smell detected
files:
  - components/about/AboutProfile.vue
  - pages/services.vue
  - components/contact/ContactInfo.vue
  - i18n/locales/es.json
  - i18n/locales/en.json
  - tests/unit/i18n-messages-parity.spec.ts
status: open
commits:
  red:
  green:
  refactor:
notes:
```

---

## T007 Translate & migrate: Libraries page write-ups

```
spec-ref:        Acceptance criterion 5
contract-ref:    n/a
constitution-ref:Article V — draft presented for approval before writing
DoD:
  - the three library write-ups (Vtex API PHP, Vtex API JS, GeneralSettings — headings, summaries, "¿Qué es Vtex?" sections) moved to $t() keys
  - es.json/en.json updated; translated text approved by the user before this task's green commit
R: a test asserts the new keys exist in both JSON files and fails because they don't yet
G: draft + get approval, then add the keys and wire pages/libraries.vue
F: skipped — no smell detected
files:
  - pages/libraries.vue
  - i18n/locales/es.json
  - i18n/locales/en.json
  - tests/unit/i18n-messages-parity.spec.ts
status: open
commits:
  red:
  green:
  refactor:
notes: the largest static-copy translation batch (3 full write-ups) — presented as its own task/approval batch, not folded into T006.
```

---

## T008 Translate & migrate: `error.vue`

```
spec-ref:        Acceptance criterion 5
contract-ref:    n/a
constitution-ref:Article V
DoD:
  - error.vue's message and home-link label moved to $t() keys
  - es.json/en.json updated
R: a test asserts the new keys exist in both JSON files and fails because they don't yet
G: add the keys, wire error.vue
F: skipped — no smell detected
files:
  - error.vue
  - i18n/locales/es.json
  - i18n/locales/en.json
  - tests/unit/i18n-messages-parity.spec.ts
status: open
commits:
  red:
  green:
  refactor:
notes: short enough to translate inline, like T004's nav labels.
```

---

## T009 Research & draft: small data translations (personal, facts, skills, education)

```
spec-ref:        Acceptance criterion 5
contract-ref:    n/a
constitution-ref:Article V
DoD:
  - draft English text for personal.activities, facts (title/sub_title), skills (only the 2 that need it — the rest are proper nouns, unchanged), education (abstract)
  - drafts presented to the user for approval before any data file is touched
R: n/a — content-drafting task, no automated red
G: draft the 4 files' worth of translations, get user approval or revisions
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

## T010 Research & draft: certifications.en.ts

```
spec-ref:        Acceptance criterion 5
contract-ref:    n/a
constitution-ref:Article V
DoD:
  - draft English captions for all 37 certification entries
  - drafts presented to the user for approval before any data file is touched
R: n/a — content-drafting task, no automated red
G: draft the 37 captions, get user approval or revisions
F: n/a
files: (none)
status: open
commits:
  red: n/a
  green:
  refactor: n/a
notes: its own task given the volume (37 entries), separate from T009's smaller batch.
```

---

## T011 Research & draft: experience.en.ts

```
spec-ref:        Acceptance criterion 5
contract-ref:    n/a
constitution-ref:Article V
DoD:
  - draft English title + items[] for all 6 experience entries
  - drafts presented to the user for approval before any data file is touched
R: n/a — content-drafting task, no automated red
G: draft the 6 entries, get user approval or revisions
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

## T012 Research & draft: success-stories.en.ts

```
spec-ref:        Acceptance criterion 5
contract-ref:    n/a
constitution-ref:Article V
DoD:
  - draft English title + body for all 19 success stories (the 8 from 001 + the 11 from 003)
  - drafts presented to the user for approval before any data file is touched, in sub-batches if the user prefers (19 is a lot at once)
R: n/a — content-drafting task, no automated red
G: draft the 19 entries, get user approval or revisions
F: n/a
files: (none)
status: open
commits:
  red: n/a
  green:
  refactor: n/a
notes: largest content-drafting task in this feature — deliberately last.
```

---

## T013 Write all `data/*.en.ts` files + wire consumers

```
spec-ref:        Acceptance criteria 1, 2, 3, 5
contract-ref:    n/a
constitution-ref:Article III (real data, no mocking)
DoD:
  - data/{personal,facts,skills,education,certifications,experience,success-stories}.en.ts exist, same shape/length as their .ts counterparts
  - every consumer component (Hero, AboutFacts, AboutSkills, ResumeEducation, ResumeExperience, CertificationCard usage, SuccessStoryCard usage) uses useLocalizedData() instead of a direct Spanish-only import
  - a parity test asserts each .en.ts array's length matches its .ts counterpart
R: the parity test fails because the .en.ts files don't exist yet
G: write the 7 files from T009-T012's approved drafts, wire every consumer
F: skipped unless a repeated wiring pattern suggests extracting a shared prop/composable beyond useLocalizedData itself
files:
  - data/personal.en.ts
  - data/facts.en.ts
  - data/skills.en.ts
  - data/education.en.ts
  - data/certifications.en.ts
  - data/experience.en.ts
  - data/success-stories.en.ts
  - components/home/Hero.vue
  - components/about/AboutFacts.vue
  - components/about/AboutSkills.vue
  - components/resume/ResumeEducation.vue
  - components/resume/ResumeExperience.vue
  - pages/certifications.vue
  - pages/success-stories.vue
  - tests/unit/data-en-parity.spec.ts
status: open
commits:
  red:
  green:
  refactor:
notes: files list exceeds the usual 5 — acceptable here since it's one mechanical wiring pass (same change shape) across every content consumer, not several different kinds of work; depends on T009-T012's approved drafts.
```

---

## T014 Accessibility regression, both locales

```
spec-ref:        Acceptance criterion 8
contract-ref:    n/a
constitution-ref:Article VIII
DoD:
  - tests/nuxt/accessibility.nuxt.spec.ts extended to check both the `es` and `en` route sets
  - zero violations on both
R: n/a — regression task, no new red test (mirrors 002's T014 / 003's T007)
G: fix anything the accessibility suite surfaces
F: skipped unless a fix requires cleanup
files:
  - tests/nuxt/accessibility.nuxt.spec.ts
status: open
commits:
  red: n/a
  green:
  refactor:
notes: last task — depends on all prior tasks (a finished, fully translated site to check).
```

---

## Amendments

| Date | Change | Reason |
|------|--------|--------|
|      |        |        |
