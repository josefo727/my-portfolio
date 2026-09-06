# ADR 0001 — Replace the Vue 2 + third-party template frontend with a Nuxt 3 (SSG) rewrite

## Status

Accepted — 2026-09-05

## Context

`my-portfolio` runs on Vue 2.6 (`@vue/cli-service` ~4.5), both EOL/deprecated upstream, with its entire visual design coming from a third-party free template (BootstrapMade's "iPortfolio": Bootstrap, jQuery, AOS, Boxicons, Owl Carousel, Isotope, CounterUp, Venobox). This creates two problems:

1. The design is generic and dated — instantly recognizable as a stock template, not a distinctive presentation of the author's work.
2. The stack itself contradicts the portfolio's own content: it markets Vue 3, Nuxt, React and NestJS as skills while running on a Vue 2 codebase past end-of-life.

Additionally, the repo has zero tests and zero CI, and `public/index.html` currently references `public/assets/vendor/*` files that are deleted from the working tree (broken local build) — recorded as a defect at onboarding time, not something worth fixing on the outgoing codebase.

## Decision

Replace the frontend wholesale with a new Nuxt 3 application, statically generated (`nuxi generate` / SSG), with an original minimalist design (no third-party visual template). This is a full rewrite, not an incremental migration: the existing Vue 2 tree is not touch-fixed or partially ported — the new app is built fresh under SDD+TDD from its first line, consuming the same categories of content (skills, experience, success stories) but restructured as needed for Nuxt 3 conventions.

Rendering mode: **SSG over SSR**, because:
- The current deployment is fully static (nginx serving pre-built files, no Node runtime in production) — SSG preserves this shape with minimal infrastructure change.
- The portfolio has no per-request personalization or dynamic server-side logic that would justify running a persistent Node server.

Test harness: **Vitest + `@nuxt/test-utils`**, added as part of this same feature rather than deferred, so the constitution's Article II (Test-first) applies from the rewrite's first commit.

## Consequences

- `Dockerfile` and `docker-compose.yml` need updating: newer Node base image (Nuxt 3 requires Node ≥ 18, current image is `node:16.20.2-alpine3.18`), build step becomes `nuxi generate`, and the served output directory changes from `dist/` to `.output/public/`. The "build once, serve static via nginx" deployment pattern on `vps_josefo_01` / `hv-container` is otherwise unchanged.
- All template dependencies (Bootstrap, jQuery, AOS, Boxicons, Owl Carousel, Isotope, CounterUp, Venobox, `vue-flux`, `vue-typed-js`, `vue-check-view`, `vue-countup-v2`) are dropped; any equivalent visual behavior (animations, counters) is re-implemented deliberately as part of the new design, only where the design calls for it — not carried over by default.
- Content modules (`src/data/*.js`) are the one thing conceptually preserved across the rewrite (the "content-as-data" pattern from the outgoing constitution's Current section) — their shape may change to fit Nuxt 3 conventions, but the practice of keeping content out of templates continues.
- No rollback path other than reverting to the last Vue 2 commit — acceptable given this is a personal portfolio with no other consumers of its current markup/API.

## Alternatives considered

- **Conservative reskin on Vue 2** (own CSS/design, same `vue-cli` base): lower effort, resolves the visual problem, but leaves the stack contradiction (Vue 2 EOL vs. marketed Vue 3/Nuxt skills) unresolved. Rejected by user choice.
- **Vue 3 + Vite SPA** (modern stack, still client-only): resolves the stack contradiction but not the SEO/SSG opportunity, and doesn't itself become "a thing built in Nuxt" as an additional, minor showcase point. Rejected by user choice in favor of the more ambitious option.
- **SSR with a persistent Node server**: more flexible for future dynamic features (e.g. a server-processed contact form), but changes the deployment shape (Node process instead of bare nginx) for no current benefit, since the site has no dynamic per-request content today. Deferred — can be revisited via a new ADR if a future feature needs it.
