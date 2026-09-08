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
7. `robots.txt` is served at the site root, allows all crawlers, and references the sitemap's absolute URL.
8. `sitemap.xml` is served at the site root and lists every indexable route (8 pages × 2 locales = 16 URLs), each with its `hreflang` alternates, excluding the 404 page.
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

---

## Closed (filled during verify)

- Date: `<pending>`
- Commit: `<pending>`
- Notes: `<pending>`
