# Brownfield index — my-portfolio

## Modules under SDD+TDD

- (empty; first feature pending: "Nuxt 3 rewrite + content enrichment")

## Modules under legacy rules

- `src/` (entire Vue 2 tree) — to be replaced wholesale by the first feature, not touch-fixed. See constitution "Current (de facto)" and ADR [`adr/0001-migrate-to-nuxt3.md`](./adr/0001-migrate-to-nuxt3.md).

## Boundaries

See constitution Article VII (source of truth; duplicated here per the standard brownfield index shape):

- HTTP out: none at v0.
- Database: none — static content only.
- Queue: none.
- Clock: none.
- Randomness: none.
- Filesystem: build-time only.
- Third parties: Google Fonts (asset load, not a mock boundary).

## Content sources for the first feature (external to this repo)

Not code boundaries — reference material for the content-enrichment half of the first feature. See `.specs/onboarding.md` → "Reference repos for content migration".
