# Brownfield index — my-portfolio

## Modules under SDD+TDD

- The entire application (`pages/`, `layouts/`, `components/`, `data/`, `utils/`, `app.vue`, `error.vue`) — built under `001-nuxt3-portfolio-rewrite`, closed 2026-09-06. Every file traces to a task in [`001-nuxt3-portfolio-rewrite/tasks.md`](./001-nuxt3-portfolio-rewrite/spec.md) with an R-G-F commit trail.

## Modules under legacy rules

- None. The Vue 2 tree (`src/`) was deleted wholesale in `001-nuxt3-portfolio-rewrite` (chore commit `cfefc10`), per ADR [`adr/0001-migrate-to-nuxt3.md`](./adr/0001-migrate-to-nuxt3.md) — no touch-fixed legacy code remains.

## Boundaries

See constitution Article VII (source of truth; duplicated here per the standard brownfield index shape):

- HTTP out: none.
- Database: none — static content only, sourced from `data/*.ts`.
- Queue: none.
- Clock: none.
- Randomness: none.
- Filesystem: build-time only (`nuxi generate` reading `data/*.ts`/`assets/`).
- Third parties: none — Google Fonts dropped during `001-nuxt3-portfolio-rewrite` (found at verify, 2026-09-06; system-font stack used instead). See constitution Amendments.

## Content sources for future features (external to this repo)

Not code boundaries — reference material for feature 002's content-enrichment work. See `.specs/onboarding.md` → "Reference repos for content migration".
