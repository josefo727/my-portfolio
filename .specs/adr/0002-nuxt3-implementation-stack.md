# ADR 0002 — Implementation stack for the Nuxt 3 rewrite (language, styling, icons, lint, Docker build)

## Status

Accepted — 2026-09-06

## Context

ADR 0001 decided the framework (Nuxt 3), rendering mode (SSG via `ssr: true` + `nuxi generate`) and test harness (Vitest + `@nuxt/test-utils`) for `001-nuxt3-portfolio-rewrite`. Five further stack decisions were needed to draft `plan.md`, each affecting most or all of the feature's tasks:

1. Source language (JavaScript vs. TypeScript).
2. Styling approach for the "original, minimalist design" required by the spec, replacing Bootstrap/AOS/etc.
3. Icon strategy, replacing Boxicons/icofont.
4. Docker build shape, given Nuxt 3 requires Node ≥ 18 (current image: `node:16.20.2-alpine3.18`) and the build step changes to `nuxi generate`.
5. Lint tooling, given the current `@vue/cli-plugin-eslint` + `eslint-plugin-vue@6` predates both flat config and Nuxt 3.

## Options considered

### 1. Language — TypeScript vs. JavaScript

- **TypeScript 5.x** — Pros: catches type errors at build time; `stacks/vue.md`'s default for this kit; consistent with the "modern stack" the portfolio's own content markets. Cons: adds authoring overhead (interfaces per data module) for a small static site.
- **JavaScript** — Pros: zero migration friction from the current codebase. Cons: no compile-time type safety; departs from the kit's stack default without a compelling reason.

### 2. Styling — plain CSS vs. Tailwind vs. SCSS

- **Plain CSS + custom properties** — Pros: zero styling dependencies, closest possible reading of "original design, no third-party template"; full control over the design tokens. Cons: no utility-class productivity aids; scale/spacing consistency is a manual discipline, not enforced by tooling.
- **Tailwind CSS** — Pros: fast to build a consistent spacing/type scale; well documented. Cons: adds a build dependency; a utility framework still carries its own authorial "look" via defaults unless heavily configured.
- **SCSS with own tokens** — Pros: preprocessor conveniences (nesting, variables) without a runtime framework. Cons: adds a build dependency for a feature set plain CSS custom properties now cover natively.

### 3. Icons — hand-authored SVG vs. icon package

- **Hand-authored inline SVGs** — Pros: zero dependencies; only the icons actually used are shipped; consistent with "original design." Cons: more manual work per icon; no built-in consistency guarantees across icons from different sources.
- **Icon package (e.g. `lucide-vue-next`)** — Pros: large, consistent, tree-shakeable set; low authoring effort. Cons: a new third-party visual asset, in tension with the spirit (if not the letter) of acceptance criterion 2.

### 4. Docker build — multi-stage vs. single-stage

- **Multi-stage** (`node:20-alpine` builder → `nginx:alpine` runtime) — Pros: production image ships no Node/npm/build tooling, smaller image, cleanly matches acceptance criterion 5 ("static files servable without a persistent server process"). Cons: slightly larger `Dockerfile`, one more stage to reason about.
- **Single-stage** (current pattern: install + build inside the final image) — Pros: minimal diff from the existing `Dockerfile`. Cons: ships an entire Node toolchain in the production image for no runtime benefit; perpetuates the exact shape ADR 0001 is otherwise moving away from.

### 5. Lint tooling

- **`@nuxt/eslint` (flat config)** — Pros: Nuxt-3/TypeScript-aware out of the box, actively maintained, matches the framework decision. Cons: replaces the existing ESLint setup outright (no incremental migration path, but none is needed — full rewrite).
- **Keep `@vue/cli-plugin-eslint` + `eslint-plugin-vue@6`** — Pros: none beyond "already there." Cons: targets Vue 2/webpack tooling that no longer exists after this rewrite; not flat-config; not Nuxt-aware.

## Decision

TypeScript 5.x; plain CSS with custom properties; hand-authored inline SVG icons; a multi-stage Docker build (Node ≥18 builder, nginx-only runtime); `@nuxt/eslint` in flat-config form. All five choices favor minimizing new third-party surface area and matching this feature's explicit "original, minimalist, no template" mandate, at the cost of somewhat more manual authoring work (styling, icons) that a framework/package would have shortcut. User-confirmed, 2026-09-06 (language/styling/icons/Docker) and drafted alongside `plan.md` (lint tooling, uncontested).

## Consequences

- **Positive:** production Docker image carries no Node runtime; zero new runtime styling/icon dependencies; type-checked codebase; lint config is Nuxt-3-native.
- **Negative:** more manual effort per new icon and per design-token addition than a package/utility framework would require; no compile-time enforcement of design-token consistency (relies on review discipline).
- **Follow-ups:** if feature 003 (i18n) or a future design iteration needs shared reactive state (e.g., current locale) beyond what plain composables comfortably express, revisit the "no Pinia" call in `plan.md` §Stack decision via a new ADR rather than silently introducing it.

## Constitution impact

None. All five decisions operate within Article VII's existing boundary list (no new HTTP/DB/queue/third-party runtime service is introduced) and Article VI's ADR requirement is satisfied by this document itself.

## References

- Research entries: `research.md` §nuxt@3.x, §@nuxt/eslint@1.x
- Plan: `plan.md` §Stack decision
- Prior ADR: `0001-migrate-to-nuxt3.md`
