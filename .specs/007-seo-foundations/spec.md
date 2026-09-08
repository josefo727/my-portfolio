# Spec — 007-seo-foundations

## Summary

Close the on-page SEO gaps found in this session's audit: no `<title>` on any page, no meta description, no Open Graph or Twitter Card tags, no `robots.txt`, no `sitemap.xml`, no structured data. The existing SSG architecture and the hreflang/canonical tags already shipped by `004-i18n` are a solid technical base — this feature adds the on-page metadata layer that's currently entirely missing, comprehensively (per the user's explicit request), not as a minimal patch.

## User story

As a search engine crawler (Google, Bing) or a social platform generating a link preview (LinkedIn, WhatsApp, X), I want every page to expose a unique title, description, Open Graph/Twitter metadata, and structured data, and I want a `robots.txt` and `sitemap.xml` at the site root, so that I can index the site correctly and render an accurate, appealing preview when it's shared.

## Acceptance criteria

1. Every one of the 8 pages (home, about, resume, services, success-stories, certifications, libraries, contact), in both locales, renders a unique, non-empty `<title>` that names the page's topic and includes the site owner's name.
2. Every one of those 8 pages, in both locales, renders a unique, non-empty meta description of no more than 160 characters.
3. Every one of those 8 pages renders Open Graph tags (`og:title`, `og:description`, `og:image`, `og:type`, `og:site_name`) reflecting that page's own title/description, in addition to the `og:url`/`og:locale` tags `@nuxtjs/i18n` already emits.
4. Every one of those 8 pages renders a Twitter Card (`summary_large_image`) with title, description, and image, mirroring the Open Graph values.
5. The 404 error page renders a generic title/description and a `noindex` robots meta tag; it is not listed in `sitemap.xml`.
6. `og:image`/`twitter:image` on all indexable pages point to the existing profile photo (`public/assets/img/profile-img.jpeg`) served as an absolute URL — no new image asset is created for this feature.
7. `robots.txt` is served at the site root, allows all crawlers, and references the sitemap's absolute URL (`sitemap_index.xml`, per Amendment below).
8. A sitemap index (`sitemap_index.xml`) plus one XML sitemap per locale is served at the site root and, together, list every indexable route (8 pages × 2 locales = 16 URLs), each with its `hreflang` alternates, excluding the 404 page. `sitemap.xml` itself is a static HTML redirect page to `sitemap_index.xml` (see Amendment) — not the literal artifact crawlers are pointed at.
9. The homepage and the about page render JSON-LD structured data (`Person` schema) naming the site owner, his job title, and `sameAs` links to the social profiles already in `data/contact.ts`.
10. Automated tests confirm the presence and shape of title, meta description, Open Graph, Twitter Card, and JSON-LD on a representative sample of pages (not the homepage alone).
11. The existing accessibility suite (`tests/nuxt/accessibility.nuxt.spec.ts`) continues to report zero violations after these changes, for both locales.

## Non-goals

- Dynamically generated per-page OG images (e.g., rendered social cards) — every page reuses the same static profile photo as its `og:image`/`twitter:image` (criterion 6).
- Submitting the sitemap to Google Search Console / Bing Webmaster Tools, or any search-engine verification meta tag — that is a manual operational step for the user after deploy, not a codebase change.
- Core Web Vitals / performance-budget work — a separate concern, already explicitly deferred without a numeric target during `001`'s clarify phase.
- Analytics or tracking integration (e.g., Google Analytics).
- Per-entry SEO for individual success stories, certifications, etc. — these are list pages with a single page-level title/description/OG set (criteria 1-4 above), not one per entry.

## Applicable constitution articles

- Article I — every acceptance criterion above traces to this spec.
- Article III — the new content-shaping tests use real data (the actual title/description text), no mocking.
- Article V — the exact title/description copy per page is factual/marketing content; it is drafted and presented to the user for approval before being written, same discipline as `003`/`006`'s success-story bodies.
- Article VIII — criterion 11 is a direct accessibility regression guard.

## Open questions

None outstanding — the two genuine ambiguities (default OG image source, 404 page's SEO treatment) were resolved with the user via `AskUserQuestion` before this spec was drafted: reuse the existing profile photo (no new image asset), and give the 404 page a `noindex` meta tag and exclude it from the sitemap.

## Glossary additions

- **Default OG/Twitter image**: `public/assets/img/profile-img.jpeg`, served as an absolute URL (`https://hv.jose-gutierrez.com/assets/img/profile-img.jpeg`).
- **Indexable routes**: the 8 pages under `pages/` (`index`, `about`, `resume`, `services`, `success-stories`, `certifications`, `libraries`, `contact`), each in `es` (unprefixed) and `en` (`/en/*`) — 16 URLs total. `error.vue` (404) is excluded per criterion 5.

## Amendments

- **2026-09-08, during T001**: `@nuxtjs/sitemap`'s automatic `@nuxtjs/i18n` integration, once it detects 2+ locales, switches to a sitemap-index structure by design (`sitemap_index.xml` + one XML file per locale under `/__sitemap__/`) rather than a single flat `sitemap.xml`. Confirmed in the module's own docs: "use the primary `/sitemap.xml` file **or the `/sitemap_index.xml` if multiple sitemaps are in use**." On a fully static (no server) deployment, the module emits `/sitemap.xml` as a static HTML meta-refresh redirect to `/sitemap_index.xml` for browser convenience — but that HTML page is not something a real crawler's sitemap fetcher accepts (it expects XML at the exact URL it's given). Criteria 7 and 8 above were amended to point `robots.txt` and "the sitemap" at `sitemap_index.xml`, the actual valid-XML entry point, instead of the originally-assumed flat `sitemap.xml`. Verified directly in a real `nuxi generate` build before writing this amendment.

---

## Closed (filled during verify)

- Date: 2026-09-08
- Commit: `a5b1762` — `spec: 007 closed — verify green`
- Notes: all 11 tasks closed; full suite green (144/144 Vitest tests, 55 files); lint/typecheck clean; `nuxi generate` succeeds (41 routes) and was checked directly — robots.txt, sitemap_index.xml + 2 per-locale sitemaps (16 URLs total), and title/description/OG/Twitter/JSON-LD on home/about (es/en) all confirmed in the real build output, not just via Vitest. New dependency `@nuxtjs/sitemap` added per ADR 0006. One README update (R9) to document the new build output.

### Acceptance criteria evidence

All 11 criteria trace to a task with an explicit `spec-ref` (see `tasks.md`); no citation gaps this time — every closed task's `spec-ref` cites its criterion(s) by number.

### Amendments (see also `tasks.md`'s Amendments table)

- **2026-09-08, T001**: `@nuxtjs/sitemap`'s automatic `@nuxtjs/i18n` integration produces `sitemap_index.xml` + one sitemap per locale, not a flat `sitemap.xml` (a static HTML redirect page instead, not valid XML). Criteria 7-8 and `contracts/sitemap.md`/`robots.md` amended to reference `sitemap_index.xml` as the real crawlable artifact. Full writeup in the spec's own Amendments section above.
- **2026-09-08, T011**: confirmed `.output/public/404.html` is a client-only CSR shell with no title/meta in the raw file — this is pre-existing, documented behavior from `001`'s T010 ("standard for the SPA-fallback file, not a defect"), not a regression introduced here. `error.vue`'s `noindex` meta (criterion 5) applies once the shell hydrates client-side, same as the rest of that page's content.
