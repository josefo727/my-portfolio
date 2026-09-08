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
status: closed
commits:
  red: n/a
  green: n/a — drafting only, no data file touched
  refactor: n/a
notes: |
  Drafted under the same in-session deferred-approval authorization as T009/T010 — flagged for
  the user's review on return.

  Scope correction found while drafting (not silently expanded — documented here): this task's
  DoD only scoped title + items[], but criterion 5 requires "no untranslated Spanish text ... on
  an /en page", and `tenure` ("9 meses", "1 año y 3 meses", etc.) is visitor-facing text rendered
  as-is by ResumeExperience.vue. Widened this task's draft to include `tenure`. `company` and
  `web_site` stay untranslated (proper nouns/URLs, same precedent as education institutions in
  T009). Also found: ResumeExperience.vue hardcodes the label "Sitio Web" outside any data field —
  not a drafting task, but needs a $t() key wired in T013 alongside the data consumers.

  1. title: 'Full Stack Developer' / tenure: '9 months'
     items: ["Design and development of Globo, a comprehensive CRM for Global Link Studies built
     with Laravel, Livewire, VueJS, and MySQL. The system manages all of the company's
     administrative and sales traffic, streamlining processes and improving operational
     efficiency."]

  2. title: 'Freelance Full Stack Developer' / tenure: '2 years and 6 months'
     items:
       - "Back End development, Ocasa system integration with VTex ecommerce."
       - "Back End development, Intelisis system integration (Faces Costa Rica) with VTex
         ecommerce and Correos de Costa Rica's system."
       - 'Front End development for <a href="https://www.novarix.co/" target="_blank">No-Varix</a>
         on VTex Legacy ecommerce.'
       - 'Front End development for <a href="https://cr.faces.com/" target="_blank">Faces CR</a>
         on VTex Legacy ecommerce.'
       - "Back End development, SAP Decorcerámica system integration with VTex ecommerce."
       - "Full Stack development, payment method integration: Crédito Karibik - Kaiowa with VTex
         ecommerce."
       - "Full Stack development, OT&V - PMI integration with VTex ecommerce."

  3. title: 'Full Stack Developer' / tenure: '1 year and 3 months'
     items:
       - 'Full Stack development for <a href="https://www.suzuki.com.pe/" target="_blank">Suzuki
         Perú</a>.'
       - 'Front End development for <a href="https://www.citroen.com.pe/" target="_blank">Citroen
         Perú</a>.'
       - 'Front End development for <a href="https://www.changan.com.pe/" target="_blank">Changan
         Perú</a>.'
       - 'Front End development for <a href="https://www.greatwallmotors.pe/"
         target="_blank">Greatwall Perú</a>.'
       - 'Full Stack development for <a href="https://www.jac.pe/" target="_blank">Jac
         Perú</a>.'
       - 'Full Stack development for <a href="https://www.renault.pe/" target="_blank">Renault
         Perú</a>.'
       - 'Full Stack development for <a href="https://www.suzuki.com.bo/" target="_blank">Suzuki
         Bolivia</a>.'
       - 'Front End development for <a href="https://www.changan.com.bo/" target="_blank">Changan
         Bolivia</a>.'
       - 'Full Stack development for <a href="https://www.jac.com.bo/" target="_blank">Jac
         Bolivia</a>.'
       - 'Full Stack development for <a href="https://www.renault.com.bo/" target="_blank">Renault
         Bolivia</a>.'

  4. title: 'Front End Developer, VueJS' / tenure: '5 months'
     items:
       - "Front End development with VueJS and Buefy for the GolStats 2.0 project"
       - "Front End development with VueJS and Buefy for the GolStats B2C project"
       - "Front End development with VueJS and Nuxt for the " +
         '<a href="https://www.aspire.qa/Media/News/aspire-academy-and-golstats-enter-into-an-agreement-to-develop-new-football-software" target="_blank">' +
         "FDMS - Qatar" + "</a> project "

  5. title: 'Full Stack Developer, Laravel - VueJS' / tenure: '1 year and 3 months'
     items:
       - 'Full Stack development for the <a href="https://ecobpm.com/" target="_blank">ECOBPM</a>
         project'
       - 'Full Stack development for the <a href="https://www.aramark.es/" target="_blank">Aramark
         </a> project'
       - 'Full Stack development for the <a href="https://www.wortix.com/es/inicio/"
         target="_blank">Wortix</a> project'
       - 'Full Stack development for the <a href="https://www.gcstraining.co.uk/"
         target="_blank">GCS</a> project'

  6. title: 'Full Stack Developer, Laravel - JS' / tenure: '3 years and 4 months'
     items:
       - "Development of the Mayor's Office website CMS"
       - "Development of the Finance Department's Tax Collection System"
       - "Development of the IT Coordination's Ticketing and Case-Tracking System"
       - "Development of the Municipality's Civil Registry Records System"
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
status: closed
commits:
  red: n/a
  green: n/a — drafting only, no data file touched
  refactor: n/a
notes: |
  Largest content-drafting task in this feature — deliberately last. Drafted under the same
  in-session deferred-approval authorization as T009-T011 — flagged for the user's review on
  return. Project/client names, product names, and URLs kept as-is; only prose translated. HTML
  markup (<p>, <a href=...>) preserved verbatim, same href/target attributes.

  Scope correction found while drafting (documented, not silently expanded): tags[] is rendered
  as visible pill labels by SuccessStoryCard.vue, so criterion 5 ("no untranslated Spanish text")
  applies to it too, even though this task's DoD only named title+body. Of all 19 tags arrays,
  only two entries contain non-English words: "Microservicios" -> "Microservices" (entry 3) and
  "Patrón Adaptador" -> "Adapter Pattern" (entry 4). Every other tag is already an English/brand
  term (Laravel, TDD, Vtex, SDD/TDD, API Rest, etc.) and stays unchanged in both locales.

  Factual flag for the user's review (not corrected in the Spanish source, per this spec's own
  non-goal): entry 6's Spanish source spells the client "Phillips Morris Internacional" — the
  real company is "Philip Morris International". The English draft below uses the correct
  spelling; if the user prefers to mirror the (misspelled) Spanish source exactly instead, this
  is a one-line change before T013.

  1. title: 'Articles for Vultr'
     body: "<p>I've written several technical articles for Vultr, sharing my knowledge and
     experience across various technologies and development practices. I applied Clean Code,
     Docker, and Kubernetes to keep the articles clear, concise, and easy to follow, making them
     easier for other developers to put into practice. You can find my posts here:
     <a href='https://docs.vultr.com/author/josé-rafael-gutierrez' target='_blank'>
     https://docs.vultr.com/author/josé-rafael-gutierrez</a>. These articles cover a wide range of
     topics, from server configuration to application development and cloud best practices.</p>"

  2. title: 'Decorcerámica - SAP' (unchanged — client/project name)
     body: "<p>The project integrated the Vtex eCommerce system
     (<a href='https://www.decorceramica.com/' target='_blank'>https://www.decorceramica.com/</a>)
     with SAP to manage inventory, pricing, invoicing, and logistics. I used TDD to ensure
     functionality from the start and a REST API for efficient communication. The integration was
     built with PHP/Laravel, VueJS, and a PostgreSQL database.</p>"

  3. title: 'FacesCR - Intélisis' (unchanged)
     body: "<p>Integrated the Vtex store (<a href='https://cr.faces.com/' target='_blank'>
     https://cr.faces.com/</a>) with the Intélisis ERP to manage pricing, inventory, and
     invoicing, plus an integration with Correos de Costa Rica (<a href='https://correos.go.cr/'
     target='_blank'>https://correos.go.cr/</a>) for logistics management. Built with PHP/Laravel,
     VueJS, and a MySQL database for an efficient integration. I used TDD to ensure correct
     functionality and microservices for a scalable architecture.</p>"
     tags: ["Microservices", "TDD", "API Rest", "Laravel", "Vtex", "Intelisis", "MySQL"]

  4. title: 'SDK Vtex Api' (unchanged)
     body: "<p>This library/SDK enables versatile communication with Vtex's APIs and makes it
     easier to build integration systems. It's designed to be used with PHP, Laravel, Symfony, and
     other PHP-based frameworks. I implemented the Adapter design pattern to make the integration
     simpler. You can find it on my GitHub account: <a href='https://github.com/josefo727/vtex-api'
     target='_blank'>https://github.com/josefo727/vtex-api</a></p>"
     tags: ["Adapter Pattern", "Clean Code", "TDD", "Laravel", "Symfony", "PHP"]

  5. title: 'Crédito KBK' (unchanged)
     body: "<p>Integrated the Crédito Karibik payment method into a Vtex Legacy store, later
     migrated to Vtex IO (<a href='https://karibik.co/pages/credito-kbk' target='_blank'>
     https://karibik.co/pages/credito-kbk</a>). This payment system provides credit to Karibik's
     affiliated customers, and was built with an Integration Middleware (NodeJS/Express, MongoDB,
     and VueJS) to manage that credit. I used TDD and an Event-Driven approach to ensure
     reliability and process transactions in real time.</p>"

  6. title: 'OT&V de PMI' (unchanged)
     body: "<p>Built the Order Tracking and Visualization system for Philip Morris International,
     with a Vtex integration to inject orders from different sales channels and order types. I
     used an Event-Driven approach and the Hexagonal pattern to process orders in real time. The
     backend used Laravel with TDD to guarantee stability, while the frontend used Vtex IO and
     ReactJS for custom admin components.</p>"

  7. title: 'Kaiowa' (unchanged)
     body: "<p>Built and deployed a credit-payment-method operator for affiliated Vtex stores,
     enabling management of custom credit plans. On the backend I used PHP/Laravel, applying
     SOLID principles and an Event-Driven approach. For the Front End I built a widget for Vtex
     Legacy and Vtex IO, using Vanilla JS and ReactJS.</p>"

  8. title: 'Custom Blog The Bar Colombia' (unchanged)
     body: "<p>Built a custom blog for The Bar Colombia (<a href='https://co.thebar.com/blog'
     target='_blank'>https://co.thebar.com/blog</a>) with a NodeJS/Express and MongoDB backend.
     The admin interface was built in ReactJS for Vtex, with custom components integrated into the
     Vtex Admin. Clean Code and TDD were applied to ensure code quality and stability.</p>"

  9. title: 'Sirocco — Secure, Auditable Voting System'
     body: "<p>Designed and built Sirocco, an anonymous, one-vote, tamper-resistant voting/polling
     system, with a cryptographically chained audit log (blockchain-style) and Ed25519-signed
     result exports. I implemented anti-fraud defenses with device fingerprinting, Proof-of-Work
     against bots, and geographic attribution via GeoIP. The whole build followed my own
     Spec-Driven Development + TDD methodology. Built with Laravel, PHP, PostgreSQL, and Pest,
     deployed behind Cloudflare. Finished and in production, available at
     <a href='https://encuestas.josefo.link' target='_blank'>https://encuestas.josefo.link</a>.</p>"

  10. title: 'Cauce — B2B Multilateral Bartering Platform'
      body: "<p>I'm building Cauce, a B2B multilateral bartering platform for Venezuela that lets
      companies exchange goods and services without cash, through a cyclical matching algorithm
      (the \"six degrees\" principle) and an internal credit unit (Cauce Credits). The
      architecture combines Laravel with Filament for the admin panel, a Python matching engine
      with FastAPI, and a Quasar frontend (Vue 3 + TypeScript) as an SPA/PWA with mobile support
      via Capacitor. It follows my own SDD+TDD methodology, with system invariants backed by
      property-based tests. Currently in active development (pre-MVP, foundations complete).</p>"

  11. title: 'Maná del Cielo — Offline, Private Bible Reader'
      body: "<p>I'm building Maná del Cielo, a 100% offline Bible-reading app with no ads, no
      tracking, and no accounts, featuring a flexible annual reading plan and conditional
      notifications. Built in Flutter/Dart, with Riverpod, Drift (SQLite + FTS5), go_router, and
      full i18n. Bible versions are distributed as signed, integrity-verified packages, produced
      by my own Python pipeline (Content Forge), already complete end to end. The whole build
      follows my SDD+TDD methodology. In active development, with launch planned first on
      Android.</p>"

  12. title: 'Bajo la Lupa — Editorial and Review Platform'
      body: "<p>Built Bajo la Lupa, an editorial platform that publishes reviews of books,
      articles, and courses, with author, series, and category management. Built in Laravel with
      Filament for the admin panel and Livewire for dynamic interactions, it includes Meilisearch
      search, media management with Spatie Media Library, full SEO (sitemap, RSS feed,
      schema.org), and S3 storage. Follows my SDD+TDD methodology. Available at
      <a href='https://bajolalupa.net' target='_blank'>bajolalupa.net</a>.</p>"

  13. title: 'Biogenesis — Clinical Lab Management System'
      body: "<p>Built Biogenesis, a management system for clinical labs with a multi-tenant
      architecture, handling patients, service requests, pre-billing, and billing. The backend
      uses Laravel with Horizon for queues, Sanctum for API authentication, and Spatie for
      permissions, auditing, and media handling. The Vue 3 + Vuetify frontend includes dashboards
      with ApexCharts/Chart.js, a rich text editor (TipTap), and ability-based authorization with
      CASL.</p>"

  14. title: 'Somos URV — Institutional Website'
      body: "<p>Built Somos URV, the organization's institutional website, with news management, a
      leadership roster, and multi-language content. Built in Laravel with Filament for the admin
      panel, Meilisearch search, permissions and multi-language content via Spatie, and QR-code
      generation. Follows my SDD+TDD methodology. Available at
      <a href='https://somos-urv.org' target='_blank'>somos-urv.org</a>.</p>"

  15. title: 'Qbano — Fast Checkout and VTEX Coupon Integration'
      body: "<p>Built a fast checkout for Qbano with physical card-reader and gift-card
      integration on VTEX IO, plus an independent surveys-and-coupons microservice that feeds an
      external customer-survey site. Full-stack work with React/TypeScript components on the
      storefront and Node backend services.</p>"

  16. title: 'Nequi/Gravity Integration — Payment Orchestration'
      body: "<p>Built the backend integration between Nequi and a payment flow ('Gravity') with
      Credibanco DX4000 for a VTEX client, including per-merchant provisioning, kiosk payment
      surfaces, and payment push notifications. Built in Laravel with Sanctum, under a strict TDD
      flow (red/green tests per command, versioned contract).</p>"

  17. title: 'CatalogFlip — Interactive Digital Catalog Platform'
      body: "<p>Built CatalogFlip, my own platform for creating interactive digital catalogs from
      PDFs, with hotspots (buy buttons, links, video), Google Analytics 4 integration, embeddable
      catalogs via iframe/JavaScript, and team collaboration with role-based permissions. Built in
      React with Vite, Tailwind CSS, and Supabase (PostgreSQL, authentication, and storage).</p>"

  18. title: 'Almacenes Brissa — Custom VTEX App Ecosystem'
      body: "<p>Built a set of custom applications for Almacenes Brissa on VTEX IO: financing and
      product-kit apps, in-store pickup with WhatsApp notifications, customer-data sync across
      sub-accounts, fast checkout with a card reader, and kiosk/totem themes for stores and
      events. Full-stack work in React/TypeScript with Node backend services.</p>"

  19. title: 'Order-Status WhatsApp Notification Service'
      body: "<p>Built a notification service that listens for order-status change events in VTEX
      (via \"orders-broadcast\") and processes them with a Laravel middleware, along with a VTEX
      Admin component to configure which statuses trigger WhatsApp notifications. Deployed across
      multiple VTEX stores under a spec-driven flow with a session journal.</p>"

  Entries 1-8, 9 (Sirocco), 11 (Maná del Cielo), and 12-19 not listed above with an explicit
  tags[] line keep their existing Spanish-file tags unchanged (already English/brand terms).
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
  - components/resume/ResumeSummary.vue
  - pages/certifications.vue
  - pages/success-stories.vue
  - tests/unit/data-en-parity.spec.ts
  - i18n/locales/es.json
  - i18n/locales/en.json
status: closed
commits:
  red: ad237c4
  green: c32d8b0
  refactor: skipped — no smell detected (the repeated `useI18n()` + `useLocalizedData(xEs, xEn)` shape is already the intended abstraction; nothing further to extract)
notes: |
  Files list exceeds the usual 5 — acceptable here since it's one mechanical wiring pass (same
  change shape) across every content consumer, not several different kinds of work; depended on
  T009-T012's approved drafts.

  Widened beyond the original file list, documented (not silent):
  - components/resume/ResumeSummary.vue: not originally listed, but has the same defect (heading
    "Resúmen" + the 13-years-experience bio paragraph were never translated by any prior task) —
    fixed alongside the rest since it's the same class of gap.
  - i18n/locales/{es,en}.json: added keys for about.skills.*, about.facts.*, resume.summary.*,
    resume.education.heading, resume.experience.website, certifications.heading,
    successStories.heading — static headings/intros on these exact consumer files that no task
    (T004/T006/T007) had scoped, and that criterion 5 requires translated since they're
    visitor-facing. tags[] in success-stories.en.ts also widened per T012's note.

  Flagged, deliberately NOT touched: components/resume/ResumeExperience.vue's `<h3>Professional
  Experience</h3>` is hardcoded English on *both* locales (a pre-existing bug predating 004,
  unrelated to i18n — the Spanish page shows the wrong language). Leaving it alone preserves
  current behavior; "fixing" it would change what Spanish visitors see today, which is a content
  decision for the user, not something a translation task should decide unilaterally. No
  criterion-5 violation either way since the English page already shows English text there.

  Verified in a real `nuxi generate` build (36 routes, both locales) — not just Vitest — per this
  spec's precedent (T006's dayjs bug was only visible in a real build).
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
status: closed
commits:
  red: n/a
  green: 912f7f9
  refactor: skipped — no smell detected
notes: |
  Last task — depended on all prior tasks (a finished, fully translated site to check). Extended
  PAGES × LOCALES (es, en) into 18 mount cases (8 pages + error.vue, × 2 locales) via
  `mountSuspended(component, { route })`. Zero violations across the board — the pages built in
  T001-T013 were already accessible in both locales, same "no production changes needed" outcome
  as 001's T023.
```

---

## Amendments

| Date | Change | Reason |
|------|--------|--------|
|      |        |        |
