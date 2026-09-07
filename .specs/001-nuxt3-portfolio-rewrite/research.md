# Research — 001-nuxt3-portfolio-rewrite

## `nuxt@3.x`

- **captured:** 2026-09-06
- **source:** context7 (`/websites/nuxt_3_x`)
- **why consulted:** confirm the exact mechanics of SSG (ADR 0001) before locking `plan.md`'s rendering setup.

### Relevant API shape

```
npx nuxt generate   # pre-renders every route to static HTML, triggers `nuxt build` with prerender=true
```

- Static hosting has two distinct modes: `ssr: true` (default) + `nuxi generate` → full pre-rendered HTML per route; `ssr: false` → static SPA shell, content injected client-side only.
- File-based routing: `pages/about.vue` → `/about`, `pages/posts/[id].vue` → `/posts/:id`. Matches the current `vue-router` route table 1:1 in shape.
- Layouts live in `layouts/`, selectable per-route via `definePageMeta({ layout: '...' })` or `routeRules` in `nuxt.config.ts`.
- The legacy top-level `generate` config key is deprecated; per-route prerender include/exclude now lives under `nitro.prerender` in `nuxt.config.ts`.
- Build output: `.output/public/` (fully static, servable by any web server) plus `.output/server/` (a Nitro server, unused when we only ever run `nuxi generate` and serve `.output/public/` via nginx).

### Gotchas, rate limits, versioning

- **Must not set `ssr: false`.** That mode produces an empty `<div id="__nuxt">` shell with content injected by client JS — it would fail acceptance criterion 1 (full text content in the initial HTML). SSG requires the default `ssr: true` combined with the `generate` command.
- `.output` must be gitignored (confirms current repo convention of ignoring build dirs; `dist/` is replaced by `.output/`).

### Decision impact

- Ties to `plan.md` §Stack decision / §Rollout: rendering mode is `ssr: true` (default) + `nuxi generate`, **not** `ssr: false`. This is the concrete mechanism behind ADR 0001's "SSG" choice and must be stated explicitly — "SSG" alone is ambiguous between these two Nuxt modes.
- Ties to `plan.md` §Module layout: adopt `pages/<name>.vue` file-based routing in place of the current `src/router/index.js` route table.

---

## `@nuxt/test-utils@3.x`

- **captured:** 2026-09-06
- **source:** context7 (`/nuxt/test-utils`)
- **why consulted:** confirm the Vitest integration shape decided in ADR 0001 (harness: Vitest + `@nuxt/test-utils`).

### Relevant API shape

```typescript
// vitest.config.ts
import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: { environment: 'nuxt', environmentOptions: { nuxt: { domEnvironment: 'happy-dom' } } },
})
```

```typescript
import { mountSuspended, renderSuspended, registerEndpoint } from '@nuxt/test-utils/runtime'
```

- A single Vitest config can define a **workspace** splitting Nuxt-aware component tests (`environment: 'nuxt'`, slower, real Nuxt context) from plain unit tests (`environment: 'node'`, fast, no Nuxt bootstrap) — recommended when both kinds of tests exist in the same project.
- `mountSuspended`/`renderSuspended` mount components inside a Nuxt context (auto-imports, composables, router all resolve); `registerEndpoint` stubs a server route for tests that need one (not needed here — no HTTP boundary).

### Gotchas, rate limits, versioning

- `environment: 'nuxt'` tests are meaningfully slower to boot than plain `node`/`happy-dom` tests — reserve them for components that actually depend on Nuxt context (composables, auto-imports, router-aware components); pure presentational components and content-shaping logic (Article III) can run as plain Vitest unit tests.

### Decision impact

- Ties to `plan.md` §Test strategy: use a Vitest workspace with two projects — `unit` (plain `happy-dom`/`node`, content-transform logic) and `nuxt` (component tests needing Nuxt context).

---

## `axe-core@4.x`

- **captured:** 2026-09-06
- **source:** context7 (`/dequelabs/axe-core`)
- **why consulted:** acceptance criterion 4 requires automated WCAG 2.1 AA checks; need a mechanism that runs inside the chosen harness (Vitest + `@nuxt/test-utils`, `happy-dom`) without adding an E2E runner.

### Relevant API shape

```javascript
axe.run().then(results => {
  if (results.violations.length) throw new Error('Accessibility issues found')
})
```

- `axe.run()` accepts a root node/document and runs its full ruleset against it; results expose `.violations` with `id`/`impact`/`nodes` per rule.
- Rule sets can be scoped by WCAG tag (`wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`) via the `runOnly`/tags option (seen used through `AxeBuilder.withTags(...)` in Playwright/Selenium wrappers; the same tag filtering is available directly on `axe.run(context, { runOnly: { type: 'tag', values: [...] } })` per axe-core's own config API).

### Gotchas, rate limits, versioning

- axe-core needs a DOM to run against. It is commonly driven through jsdom in Node test runners (seen via `jsdom-global` in the Mocha example) — `@nuxt/test-utils`'s `happy-dom` environment fulfils the same role for a rendered component's output.
- Filtering to `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa` tags is what maps axe's ruleset to "WCAG 2.1 AA" as named in the constitution (Article VIII) and this spec's acceptance criterion 4.

### Decision impact

- Ties to `plan.md` §Test strategy: one accessibility check per page component, rendered via `renderSuspended`, asserting `axe.run(container, { runOnly: { type: 'tag', values: ['wcag2a','wcag2aa','wcag21a','wcag21aa'] } })` returns zero violations. Runs inside the existing Vitest harness — no separate E2E tool needed for this feature.

---

## `@nuxt/eslint@1.x`

- **captured:** 2026-09-06
- **source:** context7 (`/nuxt/eslint`)
- **why consulted:** acceptance criterion 7 requires a CI lint step; need the current (flat-config) Nuxt-aware ESLint setup, since the existing repo's ESLint config predates flat config and Nuxt 3.

### Relevant API shape

```bash
npx nuxi module add eslint
```

```typescript
// nuxt.config.ts
export default defineNuxtConfig({ modules: ['@nuxt/eslint'] })
```

```javascript
// eslint.config.mjs
import withNuxt from './.nuxt/eslint.config.mjs'
export default withNuxt(/* project overrides */)
```

### Gotchas, rate limits, versioning

- Requires `eslint` and `typescript` as explicit devDependencies alongside the module.
- Generates `.nuxt/eslint.config.mjs` at dev/build time; the project's own `eslint.config.mjs` wraps it with `withNuxt(...)`, not a plain flat-config array — replaces the old `.eslintrc.js` + `@vue/cli-plugin-eslint` approach entirely.

### Decision impact

- Ties to `plan.md` §Stack decision and §Test strategy (CI lint step): adopt `@nuxt/eslint` (flat config) in place of the current `@vue/cli-plugin-eslint` + `eslint-plugin-vue@6`, matching the Nuxt 3 / TypeScript stack decided for this feature.

---

## Notes

- No library research entry was needed for the styling approach (plain CSS + custom properties) or the icon approach (hand-authored inline SVGs) — both decisions (2026-09-06) deliberately avoid adding a runtime library, so there is no API surface to research.
- `dayjs` (currently used for date formatting in `experience.js`/`certifications.js`) is carried over as-is; no version bump or API change is planned for this feature, so no new research entry was opened for it.
- Docker/nginx are infrastructure, not libraries — covered directly in `plan.md` §Rollout instead of here.
