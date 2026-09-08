# Tasks — 007-seo-foundations

## Legend

- `T{NNN}` — task id, unique within feature, zero-padded.
- `[P]` — safe to execute in parallel with other `[P]` tasks (disjoint files, no shared mutable state).
- `R` — Red beat description.
- `G` — Green beat description.
- `F` — Refactor beat description.
- `status` — `open | in_progress | closed | skipped`.

---

## T001 Add sitemap module and site URL config

```
spec-ref:        Acceptance criterion 8
contract-ref:    contracts/sitemap.md
constitution-ref:n/a (infra task)
DoD:
  - @nuxtjs/sitemap installed, added to nuxt.config.ts modules
  - site.url set to https://hv.jose-gutierrez.com (not left to default to localhost)
  - sitemap.zeroRuntime set to true
  - a real `nuxi generate` produces .output/public/sitemap_index.xml (2 sub-sitemaps) + .output/public/__sitemap__/{es-ES,en-US}.xml with 16 <url> entries total (8 pages x 2 locales), each with xhtml:link hreflang alternates, no entry for the 404 page — see spec.md Amendments (2026-09-08) for why sitemap_index.xml, not the flat sitemap.xml, is the real artifact
R: n/a — infra/dependency task, no local TDD cycle (mirrors 001's T024/T025); verified via a real nuxi generate build instead
G: install the dependency, add the config, run nuxi generate and inspect the output
F: skipped — no smell detected
files:
  - nuxt.config.ts
  - package.json
  - package-lock.json
status: closed
commits:
  red: n/a
  green: 6327c4b
  refactor: n/a
notes: |
  Reality differed from plan: @nuxtjs/sitemap's automatic @nuxtjs/i18n integration produces
  sitemap_index.xml + one sitemap per locale (16 URLs total, confirmed: 8+8), not a single flat
  sitemap.xml — see spec.md Amendments (2026-09-08) and the updated contracts/sitemap.md. Verified
  directly in a real `nuxi generate` build before amending anything.
```

---

## T002 [P] robots.txt

```
spec-ref:        Acceptance criterion 7
contract-ref:    contracts/robots.md
constitution-ref:Article III (real content, no mocking)
DoD:
  - public/robots.txt exists with "User-agent: *", "Allow: /", and a Sitemap line pointing to the absolute sitemap URL
  - a unit test asserts the file exists and contains those three pieces of content
R: a unit test reading public/robots.txt fails because the file doesn't exist yet
G: hand-author public/robots.txt
F: skipped — no smell detected
files:
  - public/robots.txt
  - tests/unit/robots.spec.ts
status: closed
commits:
  red: c9e3d67
  green: 96ec64a
  refactor: skipped — no smell detected
notes:
```

---

## T003 Draft SEO copy (Spanish)

```
spec-ref:        Acceptance criteria 1, 2
contract-ref:    n/a
constitution-ref:Article V
DoD:
  - draft a unique <title> and a <=160-character meta description in Spanish for all 8 pages (home, about, resume, services, success-stories, certifications, libraries, contact) plus a generic 404 title/description
  - each title includes the site owner's name; each description is grounded in that page's real content
  - drafts presented to the user for approval before any i18n file is touched
R: n/a — content-drafting task, no automated red (same pattern as 003's T002-T004, 006's T001)
G: draft the 9 title/description pairs (8 pages + 404), get user approval or revisions
F: n/a
files: (none — output is approved draft text, not yet written to a file)
status: open
commits:
  red: n/a
  green: n/a — approved in chat, written to data in T005
  refactor: n/a
notes:
```

---

## T004 Draft SEO copy (English)

```
spec-ref:        Acceptance criteria 1, 2
contract-ref:    n/a
constitution-ref:Article V
DoD:
  - translate the 9 approved Spanish title/description pairs (T003) to English
  - drafts presented to the user for approval before any i18n file is touched
R: n/a — content-drafting task, no automated red
G: translate the 9 approved pairs, get user approval or revisions
F: n/a
files: (none — output is approved draft text, not yet written to a file)
status: open
commits:
  red: n/a
  green: n/a — approved in chat, written to data in T005
  refactor: n/a
notes:
```

---

## T005 Write seo.* i18n keys

```
spec-ref:        Acceptance criteria 1, 2, 10
contract-ref:    n/a
constitution-ref:Article III
DoD:
  - i18n/locales/es.json and en.json each gain a "seo" object with a "<page>": { "title", "description" } entry for all 8 pages plus "notFound"
  - a unit test asserts every seo.<page>.title/.description is non-empty, <=160 chars for description, and differs between es.json and en.json
R: the unit test fails because the seo.* keys don't exist yet
G: write the approved T003/T004 copy into both i18n catalogs
F: skipped — no smell detected
files:
  - i18n/locales/es.json
  - i18n/locales/en.json
  - tests/unit/seo-i18n.spec.ts
status: open
commits:
  red:
  green:
  refactor:
notes:
```

---

## T006 Build usePageSeo() composable

```
spec-ref:        Acceptance criteria 1, 2, 3, 4, 6
contract-ref:    n/a
constitution-ref:n/a
DoD:
  - composables/use-page-seo.ts exports usePageSeo(pageKey: string) calling useSeoMeta with title/ogTitle/description/ogDescription/ogImage/ogType/ogSiteName/twitterCard, sourced from seo.<pageKey> i18n keys
  - ogImage/twitterImage resolve to an absolute URL for public/assets/img/profile-img.jpeg (criterion 6)
  - a nuxt test mounting a minimal host component calls usePageSeo('home') and asserts the resulting head tags are correct and absolute
R: the test fails because usePageSeo doesn't exist yet
G: implement the composable
F: skipped unless duplication with use-person-schema.ts's absolute-URL logic suggests an extraction
files:
  - composables/use-page-seo.ts
  - tests/nuxt/use-page-seo.nuxt.spec.ts
status: open
commits:
  red:
  green:
  refactor:
notes:
```

---

## T007 Wire usePageSeo() into Home/About/Resume/Services

```
spec-ref:        Acceptance criteria 1, 2, 3, 4, 10
contract-ref:    n/a
constitution-ref:n/a
DoD:
  - pages/index.vue, about.vue, resume.vue, services.vue each call usePageSeo('<page>') in <script setup>
  - tests/nuxt/seo.nuxt.spec.ts mounts each of these 4 pages (both locales for at least one of them) and asserts a non-empty <title>, meta[name=description], meta[property=og:title], meta[property=og:image] (absolute), meta[name=twitter:card]
R: the new test file's assertions fail because these pages don't call usePageSeo yet
G: add the usePageSeo('<page>') call to each of the 4 pages
F: skipped — no smell detected
files:
  - pages/index.vue
  - pages/about.vue
  - pages/resume.vue
  - pages/services.vue
  - tests/nuxt/seo.nuxt.spec.ts
status: open
commits:
  red:
  green:
  refactor:
notes:
```

---

## T008 Wire usePageSeo() into Success Stories/Certifications/Libraries/Contact

```
spec-ref:        Acceptance criteria 1, 2, 3, 4, 10
contract-ref:    n/a
constitution-ref:n/a
DoD:
  - pages/success-stories.vue, certifications.vue, libraries.vue, contact.vue each call usePageSeo('<page>') in <script setup>
  - tests/nuxt/seo.nuxt.spec.ts extended to cover at least one of these 4 pages the same way T007 covered the first 4
R: the extended test's assertions fail because these pages don't call usePageSeo yet
G: add the usePageSeo('<page>') call to each of the 4 pages
F: skipped — no smell detected
files:
  - pages/success-stories.vue
  - pages/certifications.vue
  - pages/libraries.vue
  - pages/contact.vue
  - tests/nuxt/seo.nuxt.spec.ts
status: open
commits:
  red:
  green:
  refactor:
notes:
```

---

## T009 Wire error.vue's noindex meta

```
spec-ref:        Acceptance criterion 5
contract-ref:    n/a
constitution-ref:n/a
DoD:
  - error.vue calls useSeoMeta with the generic 404 title/description (from T003/T004/T005's "notFound" keys) and robots: 'noindex'
  - tests/nuxt/seo.nuxt.spec.ts extended: mounting error.vue asserts meta[name=robots][content=noindex]
R: the extended test fails because error.vue has no robots meta tag yet
G: add the useSeoMeta call to error.vue
F: skipped — no smell detected
files:
  - error.vue
  - tests/nuxt/seo.nuxt.spec.ts
status: open
commits:
  red:
  green:
  refactor:
notes:
```

---

## T010 Build usePersonSchema() and wire into Home/About

```
spec-ref:        Acceptance criterion 9
contract-ref:    n/a
constitution-ref:Article III
DoD:
  - composables/use-person-schema.ts exports usePersonSchema(), building a Person JSON-LD object (name, jobTitle from personal.activities[0], sameAs from contact.ts's facebook/x/github/linkedin/instagram) and calling useHead with an application/ld+json script
  - wired into app.vue, gated to the home and about routes (both locales)
  - a unit test asserts the JSON-LD object is valid JSON, has @type "Person", and its sameAs array matches exactly the 5 social URLs in data/contact.ts
R: the test fails because usePersonSchema doesn't exist yet
G: implement the composable, wire it into app.vue
F: skipped unless duplication with use-page-seo.ts's absolute-URL logic suggests an extraction
files:
  - composables/use-person-schema.ts
  - app.vue
  - tests/unit/person-schema.spec.ts
status: open
commits:
  red:
  green:
  refactor:
notes:
```

---

## T011 Accessibility regression and full build verification

```
spec-ref:        Acceptance criterion 11
contract-ref:    contracts/sitemap.md, contracts/robots.md
constitution-ref:Article VIII
DoD:
  - tests/nuxt/accessibility.nuxt.spec.ts still reports zero violations with the new head tags/JSON-LD present, both locales
  - a real `nuxi generate` build is inspected directly: sitemap_index.xml + the two per-locale sitemaps have the expected 16 URLs total, robots.txt has the expected content (pointing at sitemap_index.xml), and a spot-check of the real HTML for a few pages (both locales) shows correct title/description/OG/Twitter/JSON-LD
R: n/a — regression/verification task, no new red test (mirrors 003's T007, 005's T005, 006's T005)
G: fix anything the accessibility suite or the build inspection surfaces
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
| 2026-09-08 | T001: `@nuxtjs/sitemap`'s i18n integration produces `sitemap_index.xml` + per-locale sitemaps, not a flat `sitemap.xml` (which is a static HTML redirect page). T001/T002/T011's DoD and `spec.md`/`contracts/sitemap.md`/`contracts/robots.md` updated to reference `sitemap_index.xml` as the real crawlable artifact. | Discovered in a real `nuxi generate` build; confirmed against the module's own docs before amending — see `spec.md` Amendments. |
