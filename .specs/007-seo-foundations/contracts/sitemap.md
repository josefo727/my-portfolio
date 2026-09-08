# contract: sitemap
# version: 1.0.0
# captured: 2026-09-08
# source: research.md §@nuxtjs/sitemap

Static file served at the site root: `/sitemap.xml`.

## Shape

Standard sitemap XML (`urlset`, xmlns `http://www.sitemaps.org/schemas/sitemap/0.9`), one `<url>` per indexable route, each carrying `xhtml:link rel="alternate"` entries for its other-locale equivalent (auto-emitted by `@nuxtjs/sitemap`'s `@nuxtjs/i18n` integration).

```xml
<url>
  <loc>https://hv.jose-gutierrez.com/about</loc>
  <xhtml:link rel="alternate" hreflang="es" href="https://hv.jose-gutierrez.com/about" />
  <xhtml:link rel="alternate" hreflang="en" href="https://hv.jose-gutierrez.com/en/about" />
</url>
```

## Invariants

- Exactly 16 `<url>` entries: 8 pages × 2 locales (`es` unprefixed, `en` under `/en/*`).
- No entry for the 404/error page (it is not a routed page — see `research.md`).
- Every `<loc>` is an absolute URL under `https://hv.jose-gutierrez.com`.

## Verification

Provider-owned (this codebase generates it) — verified by running `nuxi generate` and inspecting `.output/public/sitemap.xml` directly, per `plan.md` §Test strategy's build-level check. No consumer contract test exists in this codebase since the consumer is an external crawler, not our own code.
