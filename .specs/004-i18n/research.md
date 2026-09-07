# Research — 004-i18n

## `@nuxtjs/i18n`

- **captured:** 2026-09-06
- **source:** context7 (`/websites/i18n_nuxtjs`)
- **why consulted:** first-time introduction of an i18n library for this project (new dependency, Article VI) — need the current API for path-based routing, hreflang, and the language switcher before committing to an architecture.

### Relevant API shape

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/i18n'],
  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'es',
    locales: [
      { code: 'es', language: 'es-ES' },
      { code: 'en', language: 'en-US' },
    ],
  },
})
```

- `strategy: 'prefix_except_default'` is exactly this spec's routing shape: default locale (`es`) unprefixed, every other locale (`en`) prefixed (`/en/...`).
- The module auto-generates a prefixed route per page per locale (confirmed: `about___en` at `/about`, `about___fr` at `/fr/about` in the docs' own example) — this is what makes `nuxi generate` pre-render a real static page per locale per route (criterion 3), with no extra per-route wiring needed.
- `useLocaleHead()` returns `htmlAttrs.lang` (criterion 6) and `link` entries with `hreflang` (criterion 7) — installed once in `app.vue`/the layout, not per page.
- `useSwitchLocalePath()` (or the `<SwitchLocalePathLink>` component) generates a link to the *same* page in another locale (criterion 4's "not just the home page" requirement) — this is the exact composable to avoid, as a naive implementation would, hardcoding a link to `/en` that loses the current path.

### Gotchas, rate limits, versioning

- Installed via `npx nuxi module add @nuxtjs/i18n` (same pattern already used for `@nuxt/eslint`).
- Powered by Vue I18n v11 internally — translation *message* files (`i18n/locales/*.json`) are the natural fit for short, static UI/page copy (nav labels, headings, fixed prose), not for large structured content arrays.
- An `experimental.prerenderMessages` option exists to serve message files as static assets — not needed at this scale (our message catalogs are small); default (bundled) behavior is fine.

### Gotcha found during T001 (2026-09-06)

`npm install @nuxtjs/i18n` resolved `@nuxtjs/i18n@10.6.0` with `vue-i18n@11.4.10` as its direct dependency (matches the docs), but a transitive sub-dependency (`@intlify/vue-i18n-extensions`, pulled in by `@intlify/unplugin-vue-i18n`) declares its own peer on the deprecated `vue-i18n@10.0.8`, producing an `npm warn deprecated` notice at install time. This is that sub-package's own unrelated dependency, not the version actually used at runtime (`npm ls` confirms the top-level `vue-i18n` is 11.4.10) — no action needed.

### Critical gotcha found during T006 (2026-09-06/07)

`dayjs`'s per-instance `.locale(x)` call (`dayjs().locale('en')`, documented as not mutating the global default) turned out **not safe under Nitro's concurrent SSG rendering**: `nuxi generate` prerenders many routes within one long-lived process, and the real output showed the Spanish `/about` page rendering an English month name and "years" instead of "años" — locale state leaking between routes. An isolated Node script calling `dayjs().locale('es')`/`.locale('en')` **sequentially** showed no leak, meaning the bug only manifests under whatever concurrency/interleaving Nitro's prerenderer actually uses — it was not caught by that quick manual check, only by inspecting the real `nuxi generate` output.

Ruled out `useI18n().locale.value` as the cause first (switched to deriving locale from `useRoute().path` directly — the bug persisted identically), which isolated the defect to dayjs itself, not `@nuxtjs/i18n`.

**Resolution:** dropped `dayjs` entirely for this project. Replaced with:
- Plain date arithmetic for a whole-years age calculation (no locale involved at all).
- The native `Intl.DateTimeFormat(locale, { month: 'long' })` API for localized month names — takes locale as an explicit per-call argument with no shared mutable state, by design.

Verified fixed in the real `nuxi generate` output for both locales.

### Decision impact

- Ties to `plan.md` §Stack decision: `@nuxtjs/i18n`, `strategy: 'prefix_except_default'`, `defaultLocale: 'es'`.
- Ties to `plan.md` §Module layout: **two parallel translation mechanisms**, chosen per content shape —
  1. `i18n/locales/{es,en}.json` (vue-i18n message catalogs) for static page copy and UI labels (nav, headings, fixed prose in `About`/`Services`/`Libraries`/`Contact`, etc.).
  2. Parallel `data/*.en.ts` files (same array shape as the existing `data/*.ts`) for the large structured content — success stories, skills, experience, education, certifications — which don't fit naturally into flat JSON message keys.
- Ties to `plan.md` §Test strategy: a "translation parity" test per mechanism — every `es.json` key exists in `en.json` and vice versa; every `data/*.en.ts` array has the same length/shape as its Spanish counterpart.
