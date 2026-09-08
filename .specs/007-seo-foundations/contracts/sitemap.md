# contract: sitemap
# version: 1.1.0
# captured: 2026-09-08
# source: research.md §@nuxtjs/sitemap; spec.md Amendments (2026-09-08)

Static files served at the site root: `/sitemap_index.xml` (the real entry point — reference this one in `robots.txt` and anywhere else) plus one XML sitemap per locale (`/__sitemap__/es-ES.xml`, `/__sitemap__/en-US.xml`), auto-generated because `@nuxtjs/sitemap` switches to index mode once it detects 2+ `@nuxtjs/i18n` locales. `/sitemap.xml` itself is a static HTML meta-refresh page redirecting a browser to `/sitemap_index.xml` — not valid XML, not what a crawler should be pointed at.

## Shape

Standard sitemap XML (`urlset`, xmlns `http://www.sitemaps.org/schemas/sitemap/0.9`), one `<url>` per indexable route, each carrying `xhtml:link rel="alternate"` entries for its other-locale equivalent (auto-emitted by `@nuxtjs/sitemap`'s `@nuxtjs/i18n` integration).

```xml
<!-- /sitemap_index.xml -->
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>https://hv.jose-gutierrez.com/__sitemap__/es-ES.xml</loc></sitemap>
  <sitemap><loc>https://hv.jose-gutierrez.com/__sitemap__/en-US.xml</loc></sitemap>
</sitemapindex>

<!-- /__sitemap__/es-ES.xml, one <url> per page -->
<url>
  <loc>https://hv.jose-gutierrez.com/about</loc>
  <xhtml:link rel="alternate" hreflang="es-ES" href="https://hv.jose-gutierrez.com/about" />
  <xhtml:link rel="alternate" hreflang="en-US" href="https://hv.jose-gutierrez.com/en/about" />
  <xhtml:link rel="alternate" hreflang="x-default" href="https://hv.jose-gutierrez.com/about" />
</url>
```

## Invariants

- `sitemap_index.xml` lists exactly 2 sub-sitemaps (one per locale).
- Together, the 2 per-locale sitemaps list exactly 16 `<url>` entries: 8 pages × 2 locales (`es` unprefixed, `en` under `/en/*`).
- No entry for the 404/error page (it is not a routed page — see `research.md`).
- Every `<loc>` is an absolute URL under `https://hv.jose-gutierrez.com`.

## Verification

Provider-owned (this codebase generates it) — verified by running `nuxi generate` and inspecting `.output/public/sitemap.xml` directly, per `plan.md` §Test strategy's build-level check. No consumer contract test exists in this codebase since the consumer is an external crawler, not our own code.
