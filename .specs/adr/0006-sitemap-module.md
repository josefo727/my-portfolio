# ADR 0006 — `@nuxtjs/sitemap` for `sitemap.xml` generation

## Status

Accepted — 2026-09-08

## Context

`007-seo-foundations` needs a `sitemap.xml` covering 16 URLs (8 pages × `es`/`en`) with correct `hreflang` alternates per URL (criterion 8), kept accurate as pages are added or removed. This is a build-time-only, fully static site (`nuxi generate`, `nginx:alpine` runtime with no Node — per `001`'s ADR/T025); any solution must not require a running server process.

## Options considered

### Option A — `@nuxtjs/sitemap` (`nuxt-modules/sitemap`)

- Pros: official Nuxt-ecosystem module; **automatic `@nuxtjs/i18n` integration with no extra config** — it detects the already-installed `@nuxtjs/i18n` and emits the right hreflang alternates per URL by scanning `pages/`, so it needs no hand-maintained URL list to stay correct as pages change; `zeroRuntime: true` generates the XML at `nuxi generate` time and strips sitemap logic from the server bundle entirely — the exact fit for this project's Node-less shipped image.
- Cons: a real new dependency; requires an explicit `site.url` config (a separate key from `@nuxtjs/i18n`'s own `baseUrl`) — silently defaults to `localhost` if omitted, a real footgun caught in `research.md` before writing any code.

### Option B — Hand-authored static `public/sitemap.xml`

- Pros: zero new dependency, fully custom, same philosophy as this feature's own `robots.txt` (hand-authored, no module).
- Cons: 16 URLs across 2 locales, each needing its own `hreflang` alternate block (the exact shape `@nuxtjs/i18n`'s `useLocaleHead()` already computes per-page for the `<head>` tags) — hand-authoring means a second, unenforced place this list must be kept in sync every time a page is added, removed, or renamed (as already happened three times across `001`/`003`/`005`). Unlike `robots.txt`'s 3 lines that never change, this file's content is proportional to the page count and *will* drift silently.

## Decision

`@nuxtjs/sitemap`, with `site.url` set explicitly to the production origin and `zeroRuntime: true`. `robots.txt` remains hand-authored (Option-B-equivalent reasoning applies there precisely because its content is small and stable — see `research.md`); the sitemap does not share that property, which is why the two get different answers.

## Consequences

- **Positive:** the sitemap can never silently drift out of sync with the actual page/locale set — it's derived from the same route table `@nuxtjs/i18n` already uses for hreflang tags, not a second hand-maintained list.
- **Negative:** one more `package.json` dependency and `nuxt.config.ts` key (`site.url`) to keep correct; mitigated by a build-level check in `plan.md` §Test strategy that inspects the real generated `sitemap.xml`.
- **Follow-ups:** none anticipated at this project's scale (8 pages, 2 locales, no blog/CMS content requiring dynamic URL sources).

## Constitution impact

None directly — no article is amended. Article VII's "Third parties: none" stays accurate: `@nuxtjs/sitemap` with `zeroRuntime: true` is a build-time dependency, not a third-party runtime service (nothing is fetched from or sent to an external host at request time).

## References

- Research entry: `research.md` §`@nuxtjs/sitemap`
- Prior ADR: `0001-migrate-to-nuxt3.md` (SSG decision), `0004-i18n-nuxtjs-module.md` (the `@nuxtjs/i18n` integration this module builds on)
- Spec: `007-seo-foundations/spec.md`, criterion 8
