# ADR 0004 — `@nuxtjs/i18n` for path-based Spanish/English routing

## Status

Accepted — 2026-09-06

## Context

`004-i18n` needs Spanish at the current unprefixed routes and English at `/en/*`, both pre-rendered as static HTML (path-based locales are the only option compatible with the SSG decision in ADR 0001 — a query string can't change already-generated static HTML). This is the project's first i18n requirement; no library decision has been made yet.

## Options considered

### Option A — `@nuxtjs/i18n`

- Pros: official Nuxt ecosystem module (`nuxi module add` support, same install pattern as `@nuxt/eslint`); `strategy: 'prefix_except_default'` maps exactly onto this spec's routing shape; auto-generates a real prerenderable route per page per locale, so `nuxi generate` needs no extra per-route wiring; ships `useLocaleHead()` (lang attribute + hreflang, criteria 6-7) and `useSwitchLocalePath()` (same-page locale switching, criterion 4) out of the box — the exact primitives this spec needs, not just routing.
- Cons: a real new runtime dependency (Vue I18n v11 under the hood); message-catalog-first design doesn't natively fit this project's large structured content arrays (success stories, skills), requiring a second, parallel mechanism (see Decision).

### Option B — Hand-rolled path-based routing (no library)

- Pros: zero new dependency, fully custom.
- Cons: would require reimplementing route generation for two locales per page (Nuxt's file-based `pages/` router has no built-in per-locale route duplication), hreflang tag generation, and locale-aware `<html lang>` — all solved, tested, maintained problems that `@nuxtjs/i18n` already handles. Reinventing this is effort with no benefit for a two-locale site; also contradicts the constitution's "no library usage decision without a research entry" only in the sense that *not* using a well-fit library here would itself need strong justification, which doesn't exist.

## Decision

`@nuxtjs/i18n`, with `strategy: 'prefix_except_default'` and `defaultLocale: 'es'`. Used only for **routing, the switcher, and SEO tags** (lang attribute, hreflang) — not as the sole translation-content mechanism. Large structured content (success stories, skills, experience, etc.) is translated via parallel `data/*.en.ts` files, not vue-i18n message keys, because that content doesn't fit a flat key-value catalog shape (see `research.md`, `plan.md` §Module layout).

## Consequences

- **Positive:** routing/SEO correctness (hreflang, lang attribute, per-locale static pages) comes from a maintained module instead of hand-rolled logic; the switcher composable (`useSwitchLocalePath`) avoids the common bug of language switches dropping the visitor back to the home page.
- **Negative:** two parallel content mechanisms (message catalogs + parallel data files) to keep in sync — mitigated by a translation-parity test for each (`plan.md` §Test strategy).
- **Follow-ups:** none anticipated — two locales is the stated non-goal ceiling for this feature; revisit via a new ADR if a third locale is ever requested (different i18n modules trade off differently at 3+ locales).

## Constitution impact

None directly — no article is amended. Article VII's "Third parties: none" (constitution, amended 2026-09-06 during `002`'s verify) stays accurate: `@nuxtjs/i18n` is a build-time/bundled module, not a third-party runtime service.

## References

- Research entries: `research.md` §@nuxtjs/i18n
- Prior ADR: `0001-migrate-to-nuxt3.md` (SSG decision that makes path-based locales mandatory)
- Spec: `004-i18n/spec.md`
