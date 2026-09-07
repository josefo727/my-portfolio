# Plan — 004-i18n

## Summary

Add `@nuxtjs/i18n` (ADR 0004) for routing/switcher/SEO, and two parallel translation mechanisms depending on content shape: vue-i18n message catalogs (`i18n/locales/{es,en}.json`) for static page copy, and parallel `data/*.en.ts` files (same shape as the existing `data/*.ts`) for structured content that doesn't fit a flat key-value catalog. This is the largest-surface-area feature so far — nearly every page and several data files are touched, though each change is mechanical (add a translation, wire a lookup) rather than architecturally novel.

## Stack decision

| Item | Choice | Rationale |
|------|--------|-----------|
| i18n routing/SEO | `@nuxtjs/i18n`, `strategy: 'prefix_except_default'`, `defaultLocale: 'es'`, locales `es`/`en` | ADR 0004 — exact fit for this spec's routing shape; ships the switcher and SEO primitives this spec needs, not just routing. |
| Static copy translation | vue-i18n message catalogs: `i18n/locales/es.json`, `i18n/locales/en.json` | Natural fit for short, fixed UI/page text (nav labels, headings, fixed prose) — `@nuxtjs/i18n` is built on Vue I18n, this is its native mechanism. |
| Structured content translation | Parallel `data/*.en.ts` files, same array shape as their `data/*.ts` counterpart | Success stories/skills/experience/etc. are prose-heavy arrays, not flat key-value strings — awkward to force into a JSON message catalog. A small composable picks the right array per current locale (see Module layout). |
| Content requiring no translation | `data/location.ts`, `data/contact.ts` unchanged, no `.en.ts` counterpart | Place names, emails, phone numbers, and URLs are locale-invariant. |

## Module layout

```
nuxt.config.ts                    # + modules: ['@nuxtjs/i18n'], i18n: { strategy, defaultLocale, locales }
i18n/
  locales/
    es.json                       # static copy: nav labels, About/Services/Libraries/Contact fixed prose, error.vue message
    en.json                       # same keys, English
composables/
  use-localized-data.ts           # useLocalizedData<T>(es: T, en: T): T — picks the array matching the current locale
data/
  personal.en.ts                  # activities[] translated; name/short_name unchanged (proper noun)
  facts.en.ts                     # title/sub_title translated; quantity/icon unchanged
  education.en.ts                 # abstract translated; institution/period unchanged (proper noun / already numeric)
  certifications.en.ts            # caption translated; image unchanged
  skills.en.ts                    # only "Motores SQL's"/"Motores NoSQL's" actually translate; rest identical (proper nouns: Laravel, Docker, etc.)
  experience.en.ts                # title/items translated; company/tenure/web_site unchanged
  success-stories.en.ts           # title/body translated; tags mostly already English words, unchanged
components/layout/
  LocaleSwitcher.vue               # new — uses useSwitchLocalePath(), placed in AppHeader
  AppHeader.vue, AppNav.vue        # nav labels move to $t() keys; LocaleSwitcher added
layouts/default.vue               # + useLocaleHead() wiring (lang attribute, hreflang) via app.vue's <Html>/<Head> per the module's SEO guide
```

Every page/component currently importing a `data/*.ts` array directly switches to `useLocalizedData(dataEs, dataEn)`. Every component with fixed Spanish prose (`AboutProfile`, `pages/services.vue`, `components/libraries/LibraryDoc.vue`'s three write-ups, `components/contact/ContactInfo.vue`'s heading, `error.vue`) moves that text to `$t('key')`, reading from `i18n/locales/*.json`.

## Data model

No new entities — `data/*.en.ts` files reuse the exact interfaces already defined in their `.ts` counterparts (`Skill`, `SuccessStory`, `ExperienceEntry`, etc., from `001-nuxt3-portfolio-rewrite`). Invariant: every `data/*.en.ts` array has the same length and entry order as its Spanish counterpart (translation-parity, enforced by test).

## Boundaries

Unchanged — no new boundary (ADR 0004 confirms `@nuxtjs/i18n` is build-time, not a runtime third party). See `contracts/README.md`.

## Error model / Observability / Security

N/A — no new error surface, no server runtime, no new input (unchanged from prior features).

## Test strategy

- **Routing** (`tests/unit/i18n-routes.spec.ts`): assert `nuxt.config.ts` declares the `@nuxtjs/i18n` module with `strategy: 'prefix_except_default'` and both locales.
- **Switcher** (`tests/nuxt/locale-switcher.nuxt.spec.ts`): mount `LocaleSwitcher.vue`, assert it links to the equivalent page in the other locale (not the home page) via `useSwitchLocalePath` — exercised with a non-home current route.
- **Translation parity — data** (`tests/unit/data-en-parity.spec.ts`): for each `data/*.en.ts`, assert the same length as its `.ts` counterpart, and that translated fields are non-empty and different from the Spanish text (catches an accidentally-untranslated copy-paste).
- **Translation parity — messages** (`tests/unit/i18n-messages-parity.spec.ts`): assert `i18n/locales/es.json` and `en.json` have exactly the same set of keys (no orphan key in either direction).
- **Regression** (`tests/nuxt/accessibility.nuxt.spec.ts`, extended): re-run against both the `es` and `en` route sets — must stay at zero violations for both (criterion 8).
- **Contract / E2E:** none — no external boundary.

## Rollout

- **Feature flag:** none.
- **Order (detail in `tasks.md`):**
  1. Install `@nuxtjs/i18n`, configure routing/locales; confirm `nuxi generate` produces both route sets.
  2. Wire `useLocaleHead()` (lang attribute + hreflang) and build `LocaleSwitcher.vue`.
  3. Scaffold `i18n/locales/{es,en}.json`; migrate nav labels first (`AppNav`/`AppHeader`) as the smallest slice, to prove the message-catalog mechanism end to end.
  4. Migrate + translate remaining static-copy components: `AboutProfile`, `pages/services.vue`, `LibraryDoc.vue` (3 write-ups), `ContactInfo.vue`, `error.vue`.
  5. Translate structured content, smallest to largest: `personal.en.ts`, `facts.en.ts`, `skills.en.ts`, `education.en.ts`, `certifications.en.ts`, `experience.en.ts`, then `success-stories.en.ts` last (largest, 19 entries) — each batch drafted and presented to the user for approval before writing (Article V), same pattern as `003`.
  6. Wire every consumer component to `useLocalizedData()`.
  7. Add the parity tests; re-run the accessibility suite for both locales.
- **Compatibility windows:** none.
- **Rollback:** revert the merge commit; no schema/migration involved.

## References

- Spec: `./spec.md`
- Research: `./research.md`
- Contracts: `./contracts/`
- ADRs: `../adr/0001-migrate-to-nuxt3.md` (SSG constraint that requires path-based locales), `../adr/0004-i18n-nuxtjs-module.md`
