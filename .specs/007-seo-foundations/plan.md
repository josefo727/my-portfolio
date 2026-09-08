# Plan — 007-seo-foundations

## Summary

Add the missing on-page SEO layer identified in this session's audit: per-page `<title>`/description/Open Graph/Twitter Card via Nuxt's native `useSeoMeta`, a build-time `sitemap.xml` via the new `@nuxtjs/sitemap` dependency, a hand-authored static `robots.txt`, and hand-authored JSON-LD `Person` structured data on home/about via the existing `useHead` composable. No rendering-framework change, no new page, no new route.

## Stack decision

| Item | Choice | Rationale |
|------|--------|-----------|
| Title / description / OG / Twitter | `useSeoMeta()`, Nuxt 3 core composable, called per page | `research.md` — no new dependency; already how `app.vue` sets `htmlAttrs`/hreflang since `004-i18n`. |
| Copy source | New i18n keys (`seo.<page>.title`/`.description`), same catalogs used since `004-i18n` | Keeps title/description bilingual and versioned the same way every other page string already is. |
| Sitemap | New dependency: `@nuxtjs/sitemap` (`nuxt-modules/sitemap`), `zeroRuntime: true`, `site.url` set explicitly | `research.md` — justified new dependency (see ADR 0006): 16 URLs across 2 locales must stay in sync as pages change; `zeroRuntime` fits the Node-less `nginx:alpine` runtime image shipped since `001`'s T025. |
| Robots file | Hand-authored static `public/robots.txt`, no dependency | `research.md` — 3 lines of content that never change; a module would be overkill for this project's scale (same bias as `003`'s hand-authored SVGs over an icon package). |
| Structured data | Hand-authored JSON-LD via `useHead({ script: [...] })`, Nuxt 3 core composable | `research.md` — a single static `Person` object on 2 pages doesn't warrant a schema-generation library. |
| Default OG/Twitter image | `public/assets/img/profile-img.jpeg`, resolved to an absolute URL at render time | User decision (this session) — reuse the existing asset, no new image work in this feature. |

## Module layout

```
nuxt.config.ts                         # + site: { url }, + modules: ['@nuxtjs/sitemap'], + sitemap: { zeroRuntime: true }
composables/
  use-page-seo.ts                      # useSeoMeta() wrapper: takes an i18n key prefix, resolves title/description/og*/twitter* + absolute ogImage
  use-person-schema.ts                 # builds the Person JSON-LD object from data/personal.ts + data/contact.ts
i18n/locales/
  es.json                              # + "seo": { "<page>": { "title", "description" } } for all 8 pages + a generic 404 entry
  en.json                              # same keys, English
pages/
  index.vue, about.vue, resume.vue, services.vue,
  success-stories.vue, certifications.vue, libraries.vue, contact.vue
                                        # each calls useSeoPage('<page>') in <script setup>
  (root) error.vue                     # calls useSeoMeta({ ...generic 404 copy, robots: 'noindex' })
app.vue                                # + usePersonSchema() wired only when route is / or /about (or /en equivalents)
public/
  robots.txt                           # hand-authored: User-agent: *, Allow: /, Sitemap: <absolute sitemap URL>
```

Entry points:
- `composables/use-page-seo.ts` — every routed page calls this once in `<script setup>`.
- `composables/use-person-schema.ts` — called from `app.vue`, gated to home/about routes.

Public interfaces:
- `usePageSeo(pageKey: string): void` — reads `seo.<pageKey>.title`/`.description` from the active i18n catalog, calls `useSeoMeta` with title/ogTitle/description/ogDescription/ogImage/twitterCard/ogType/ogSiteName.
- `usePersonSchema(): void` — calls `useHead` with a single `application/ld+json` script tag.

## Data model

No new persisted entity — this feature only adds i18n string keys (`seo.*`) to the existing `i18n/locales/{es,en}.json` catalogs, following the exact shape already used for every other page string since `004-i18n`. No migration.

## Boundaries

| Boundary | Adapter | Contract |
|----------|---------|----------|
| Sitemap XML output | `@nuxtjs/sitemap` module (`zeroRuntime`) | `contracts/sitemap.md` |
| robots.txt output | static file, no adapter | `contracts/robots.md` |

No HTTP client boundary, no queue, no clock/randomness dependency — everything here is build-time static output, consistent with `001`'s "Boundaries: none" baseline (see `.specs/index.md`).

## Error model

- No new runtime error surface — `useSeoMeta`/`useHead` calls are pure, synchronous, and cannot throw on the data this project already validates via existing tests (`data/personal.ts`, `data/contact.ts`).
- If a `seo.<page>.title`/`.description` i18n key is missing, `vue-i18n` returns the key itself as a visible fallback string (existing, unchanged behavior) rather than throwing — a test (criterion 10) catches this before it ships.

## Observability

N/A — no article declares it for this feature; consistent with `001`-`006`.

## Security

- No auth, no money, no PII collection, no external write. `sameAs` links in the `Person` schema and `og`/`twitter` tags only surface data already public on the site (`data/contact.ts`'s social profile URLs). No security review needed (R8 will be N/A at verify, same as prior features).

## Test strategy

- **Unit** (`tests/unit/seo-i18n.spec.ts`, new): for a representative sample of pages (not just home), assert both `es.json` and `en.json` have a non-empty `seo.<page>.title` and `seo.<page>.description` of ≤160 characters, and that the two locales' values differ (catches a copy-paste that forgot to translate).
- **Component/page** (`tests/nuxt/seo.nuxt.spec.ts`, new): mount a representative sample of pages (home, about, one list page, contact — not all 8, to keep the suite fast, per criterion 10's own wording) via `mountSuspended` and assert the rendered `<head>` contains a non-empty `<title>`, `meta[name=description]`, `meta[property=og:title]`, `meta[property=og:image]` (absolute URL), and `meta[name=twitter:card]`. Also mounts `error.vue` and asserts `meta[name=robots][content=noindex]`.
- **Structured data** (`tests/unit/person-schema.spec.ts`, new): asserts `usePersonSchema()`'s output is valid JSON, has `@type: "Person"`, and its `sameAs` array matches every social URL in `data/contact.ts` (facebook, x, github, linkedin, instagram — not email/web_site/mobil, which aren't profile URLs).
- **Build-level** (manual, same pattern as `003`-`006`'s verify): run `nuxi generate` and inspect `.output/public/sitemap.xml` and `.output/public/robots.txt` directly for the expected 16 URLs / 3 lines — the sitemap module's own internals aren't unit-testable the way hand-written code is, so this is checked the same way `004`'s hreflang output was checked in a real build.
- **Regression** (`tests/nuxt/accessibility.nuxt.spec.ts`, unchanged): re-run after all pages gain the new composable calls; must stay at zero violations (criterion 11) — `useSeoMeta`/`useHead`/JSON-LD touch only `<head>`, never the accessibility tree, so no regression is expected, but this is verified, not assumed.

## Rollout

- **Feature flag:** none.
- **Order (detail in `tasks.md`):**
  1. Add `@nuxtjs/sitemap`, configure `site.url` + `zeroRuntime`; confirm a real `nuxi generate` produces `sitemap.xml` with all 16 URLs before writing any per-page copy.
  2. Hand-author `public/robots.txt`.
  3. Draft `seo.<page>.title`/`.description` copy for all 8 pages, both locales — present to the user for approval (Article V) before writing.
  4. Build `usePageSeo()`, wire it into all 8 pages.
  5. Wire `error.vue`'s `noindex` meta.
  6. Build `usePersonSchema()`, wire into home/about.
  7. Write the three new test files; re-run the accessibility suite.
- **Compatibility windows:** none.
- **Rollback:** revert the merge commit; `@nuxtjs/sitemap` is removable via a single `package.json`/`nuxt.config.ts` revert, no data migration involved.

## References

- Spec: `./spec.md`
- Research: `./research.md`
- Contracts: `./contracts/`
- ADRs: `../adr/0006-sitemap-module.md` (new)
