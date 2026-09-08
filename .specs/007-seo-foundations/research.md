# Research — 007-seo-foundations

## `useSeoMeta` (Nuxt 3 core composable)

- **captured:** 2026-09-08
- **source:** context7, `/websites/nuxt_3_x`
- **why consulted:** criteria 1-6 (title, description, Open Graph, Twitter Card) need the right composable shape before drafting `plan.md`.

### Relevant API shape

```ts
useSeoMeta({
  title: 'My Amazing Site',
  ogTitle: 'My Amazing Site',
  description: 'This is my amazing site, let me tell you all about it.',
  ogDescription: 'This is my amazing site, let me tell you all about it.',
  ogImage: 'https://example.com/image.png', // must be absolute for OG/Twitter crawlers
  twitterCard: 'summary_large_image',
  robots: 'index, follow', // or 'noindex' for the error page
})
```

### Gotchas, rate limits, versioning

- No new dependency — `useSeoMeta` ships with Nuxt 3 core, already installed.
- `ogImage` should be an absolute URL per the Open Graph protocol; Nuxt's own example shows a relative `/og-image.png` working for `og:image` specifically in some setups, but social-platform crawlers (LinkedIn, WhatsApp) are inconsistent about resolving relative OG image URLs, so this feature always builds an absolute one from the known production origin.
- Static meta tags can be wrapped in `if (import.meta.server)` for a minor perf win; not needed at this project's scale (8 pages).

### Decision impact

- Ties to `plan.md` §Module layout: every page calls `useSeoMeta()` with values from new i18n keys (`seo.<page>.title`/`.description`), consistent with how existing pages already source copy from `i18n/locales/{es,en}.json`.

---

## `@nuxtjs/sitemap` (nuxt-modules/sitemap)

- **captured:** 2026-09-08
- **source:** context7, `/nuxt-modules/sitemap`
- **why consulted:** criterion 8 needs a `sitemap.xml` covering 16 URLs (8 pages × 2 locales) with correct hreflang alternates, kept in sync as pages change — a real stack decision, not a one-line static file (unlike `robots.txt`, see below).

### Relevant API shape

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  site: { url: 'https://hv.jose-gutierrez.com' }, // required — without it the sitemap defaults to localhost even in production
  modules: ['@nuxtjs/sitemap'],
  sitemap: {
    zeroRuntime: true, // generates static XML at build time, no sitemap code in the server bundle
  },
})
```

### Gotchas, rate limits, versioning

- **Requires an explicit Site URL** (`site.url`) — omitting it silently defaults to `localhost` even in production. This project already has the canonical origin in `i18n.baseUrl`; `site.url` is a separate, required config key from a different module family (`nuxt-site-config`, an implicit peer of `@nuxtjs/sitemap`).
- **Automatic `@nuxtjs/i18n` integration, no extra config** — the module detects the already-installed `@nuxtjs/i18n` and emits `xhtml:link` hreflang alternates per URL automatically (matches criterion 8's "each with its hreflang alternates").
- **`zeroRuntime: true`** generates the sitemap as a static XML file at `nuxi generate` time and strips sitemap logic from the server bundle — the right mode for this project, which ships a Node-less `nginx:alpine` runtime image (per `001`'s ADR/T025); the default (non-zero-runtime) mode expects a Nitro server process to answer `/sitemap.xml` on each request, which this deployment doesn't have.
- `error.vue`'s 404 page is not a routed page (no `/404` entry in `vue-router`; `nuxi generate` emits a static `404.html` fallback instead — see `001-nuxt3-portfolio-rewrite/plan.md` §Error model), so the module's page-scan naturally never discovers it — no explicit `exclude` config is needed for criterion 8's "excluding the 404 page".

### Decision impact

- Ties to `plan.md` §Stack decision and `adr/0006-sitemap-module.md`: new dependency, justified because the sitemap must track 16 URLs across 2 locales and stay correct as pages are added — a hand-maintained static file would silently drift, unlike `robots.txt`'s few lines of content that never change.

---

## `robots.txt`

Not a library/service research item — deliberately **not** using a module for this (e.g., no `@nuxtjs/robots`). The file's entire content is `User-agent: *\nAllow: /\nSitemap: <absolute sitemap URL>` — three lines that never change build-to-build. A hand-authored static file in `public/robots.txt` is simpler than a new dependency for content this small and stable, consistent with this project's established bias against adding a package where a static asset suffices (e.g. `002`'s CSS-only approach, `003`'s hand-authored SVG icons).

## JSON-LD structured data (`Person` schema)

Not a library/service research item — Nuxt's own `useHead({ script: [...] })` (core composable, already used in `app.vue` since `001`) accepts a `type: 'application/ld+json'` script entry directly; no schema-generation library (e.g. `nuxt-schema-org`) is warranted for a single, static `Person` object on 2 pages. Ties to `plan.md` §Module layout — `composables/use-person-schema.ts` builds the JSON-LD object from `data/personal.ts` and `data/contact.ts`, already-existing data with no new fields.
