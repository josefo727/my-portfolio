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
status: closed
commits:
  red: c692ed9
  green: 3f0f820
  refactor: skipped — no smell detected
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
  - components/layout/AppHeader.vue
  - tests/unit/i18n-messages-parity.spec.ts
  - tests/nuxt/app-nav-i18n.nuxt.spec.ts
  - tests/nuxt/layout.nuxt.spec.ts
status: closed
commits:
  red: b29f631
  green: 68e4b6e, 1d6b40b
  refactor: skipped — no smell detected
notes: |
  Nav labels translated inline (short, low-risk), not a separate approval batch.
  Real bug found and fixed twice in this task: plain `<NuxtLink to="/x">` is not
  locale-aware under @nuxtjs/i18n — needs `useLocalePath()`. Fixed in AppNav (green
  commit) and, once spotted, also in AppHeader's site-name link (a second commit,
  same task) — both verified in the real `nuxi generate` output.
  Also needed empty `i18n/locales/{es,en}.json` placeholders before any red test
  could run at all — the module crashes Nuxt/Vitest startup (ENOENT) if a
  configured locale `file` doesn't exist on disk, not a graceful feature-absent
  failure.
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
  - tests/nuxt/use-localized-data.nuxt.spec.ts
status: closed
commits:
  red: e84bf50
  green: 7ce158f
  refactor: skipped — no smell detected
notes: test moved from tests/unit/ (per plan) to tests/nuxt/ — the composable calls useI18n(), which needs Nuxt context and doesn't work in the plain 'unit' Vitest project.
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
  - utils/dates.ts
  - package.json
  - package-lock.json
  - tests/nuxt/about-i18n.nuxt.spec.ts
  - tests/nuxt/about.nuxt.spec.ts
status: closed
commits:
  red: 08e66af
  green: 0793671
  refactor: skipped — no smell detected
notes: |
  Critical finding: dayjs's per-instance .locale() leaks state across routes
  under Nitro's concurrent SSG rendering (only visible in the real nuxi
  generate output, not in an isolated sequential Node check). Ruled out
  useI18n().locale.value as the cause (route-based detection didn't fix it
  either). Fix: dropped dayjs, rewrote utils/dates.ts with plain arithmetic
  (age) + native Intl.DateTimeFormat (month names) — no shared mutable
  state either way. See research.md for the full writeup. Also fixed a
  now-broken collateral test (tests/nuxt/about.nuxt.spec.ts from 001, which
  imported the old calculateAge signature).
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
  - tests/nuxt/libraries-i18n.nuxt.spec.ts
status: closed
commits:
  red: 90cc470
  green: 42d6cca
  refactor: skipped — no smell detected
notes: did not perpetuate the Spanish source's "Libería" typo into the English translation.
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
status: closed
commits:
  red: 865a5b0
  green: b95c6e8
  refactor: skipped — no smell detected
notes: short enough to translate inline, like T004's nav labels. Red reused the existing parity spec file (added a specific key-presence assertion) instead of a new nuxt-mount test, since error.vue's content is trivial.
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
status: closed
commits:
  red: n/a
  green: n/a — drafting only, no data file touched
  refactor: n/a
notes: |
  Drafted while the user stepped away, per their explicit instruction this session to advance
  automatically without a synchronous approval round (deviation from this task's normal Article V
  gate, authorized in-session — not a silent skip). Faithful translation of already-approved
  Spanish content, no new claims invented. Flagged for the user's review on return; T013 will wire
  these into data/*.en.ts, so nothing is live before that.

  personal.activities: ['Web Developer', 'UI/UX Designer', 'Mathematician', 'Freelancer']

  facts:
    1. title: 'Happy clients' / sub_title: 'and satisfied with the results.'
    2. title: 'Projects completed' / sub_title: 'and delivered successfully.'
    3. title: 'Support hours' / sub_title: 'before and after development.'
    4. title: 'Complex projects' / sub_title: 'demanding and hard work.'

  skills (only the 2 non-proper-noun titles; all others unchanged):
    "Motores SQL's" -> 'SQL Engines'
    "Motores NoSQL's" -> 'NoSQL Engines'

  education (abstract only — title/period/institution stay as in the Spanish source, per this
  task's own DoD scope):
    1. "During my studies in the Faculty of Science and Technology I was a teaching assistant for
       Calculus and Number Theory; I programmed in Pascal, Fortran, Maple, Matlab, Octave, and
       worked with document editing in LaTeX"
    2. "During my studies in the Faculty of Engineering I was a teaching assistant for Mathematical
       Analysis and Analytic Geometry"
    3. "During high school I was president of the student council, a teaching assistant for
       mathematics, and had outstanding participation in the 23rd Venezuelan Mathematics Olympiad"
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
status: closed
commits:
  red: n/a
  green: n/a — drafting only, no data file touched
  refactor: n/a
notes: |
  Its own task given the volume (37 entries), separate from T009's smaller batch. Drafted under
  the same in-session deferred-approval authorization as T009 — flagged for the user's review on
  return; nothing wired until T013. Technical/product names (Laravel, VueJS, Vuex, Sanctum, etc.)
  kept as-is; only the descriptive Spanish wording translated.

  1.  'JSON Web Tokens, Laravel 6 and VueJS'
  2.  'Preventing multiple simultaneous logins with Laravel'
  3.  'Introduction to working with queues in Laravel'
  4.  'REST API with Laravel 5 and tokens with Eloquent API Resource and Passport'
  5.  'Building admin panels with Laravel in record time'
  6.  "In Laravel, protect your customers' accounts"
  7.  'Building PWA applications with VueJS and Quasar Framework'
  8.  'Mobile development course with VueJS and Quasar: offline apps with LocalStorage'
  9.  'Deployment with Laravel Envoy and Amazon Web Services'
  10. 'Realtime with Laravel Echo, Socket.IO and Redis'
  11. 'Support chat with Laravel Echo and VueJS'
  12. 'Multi-language applications with Laravel'
  13. 'PHP 7'
  14. 'First steps with VueJS 3 and Vuex 4'
  15. 'VueJS 2 and Vuex from scratch with best practices'
  16. 'VueJS 2 and Vuex course with TypeScript'
  17. 'Authentication with Laravel Sanctum'
  18. 'React - The Complete Guide: Hooks, Context, Redux, MERN, +15 Apps'
  19. 'SQL Basic - Intermediate'
  20. 'Learn to build reusable packages for Laravel and PHP'
  21. 'Learn to build and document a REST API with Laravel'
  22. 'Architecture concepts in Laravel'
  23. 'Configuring multiple domains with Apache2 and Ubuntu on an Amazon EC2 instance'
  24. 'Docker for developers'
  25. 'Eloquent ORM from scratch'
  26. 'File management in Laravel with polymorphic relationships using the storage system'
  27. 'Laravel with Jetstream and Inertia'
  28. "What's new in Laravel 8 and Jetstream"
  29. 'Laravel 8 and VueJS 3 with Vuex 4, Vue Router and Composition API'
  30. 'Laravel 9'
  31. 'Laravel Multi-Tenancy: multi-tenant SaaS apps'
  32. 'Laravel Sanctum: authentication with cookies and API tokens in Laravel'
  33. 'React Native and Laravel Echo with Sanctum: realtime applications'
  34. 'SEO for Laravel developers, from scratch'
  35. 'Subscription system with Laravel and Stripe'
  36. 'Laravel Sanctum REST API testing'
  37. 'Tenancy for Laravel basics'
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
