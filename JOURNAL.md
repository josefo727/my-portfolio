# Journal — my-portfolio

## 2026-09-05 09:00 — session 1 (brownfield onboarding)

### Context

User asked for a preliminary review of the portfolio (design + content vs. actual recent work), a proposal, and to run whatever gets decided through `spec-tdd-kit`. Onboarding the kit onto this existing repo (brownfield), immediately ahead of the first kit-managed feature.

### Done this session

- Diagnosed the current site: Vue 2.6 (EOL) SPA wrapping a third-party template (BootstrapMade "iPortfolio"); local build currently broken (`public/index.html` references `public/assets/vendor/*`, deleted from disk per `git status`).
- Swept `~/Projects` (separate agent) for personal work not yet reflected in the portfolio's `skills.js`/`success-stories.js`/`experience.js`; got a ranked, evidence-based shortlist.
- Presented proposals to the user; decisions made:
  - Full rewrite to **Nuxt 3**, SSG, own minimalist design (not a Vue 2 reskin).
  - Include **Biogenesis** (bio-labs) and **Somos URV** as named case studies (user confirmed authorization).
  - Add a minimal **Vitest + `@nuxt/test-utils`** harness as part of the rewrite, not deferred.
- Ran brownfield onboarding: `.specs/constitution.md` (v1, Current + Aspirational), `.specs/onboarding.md`, `.specs/test-inventory.md`, `.specs/index.md`, `.specs/adr/0001-migrate-to-nuxt3.md`.

### Open

- Run `/sdd-specify` for the first feature: "Nuxt 3 rewrite with original minimalist design + content enrichment".
- Update `Dockerfile`/`docker-compose.yml` for Nuxt 3 (Node ≥ 18, `.output/public/` instead of `dist/`) — scheduled as part of that feature's plan, not before.

### Blockers / open questions

- None open — all onboarding-time ambiguities were resolved with the user (see `.specs/onboarding.md` → Decisions log).

### Decisions recorded elsewhere

- `.specs/adr/0001-migrate-to-nuxt3.md`
- `.specs/onboarding.md` → Decisions log

### Dead ends / discarded

- Considered a conservative Vue 2 reskin and a Vue 3 + Vite SPA (no SSG) as lighter alternatives to the Nuxt 3 rewrite; both rejected by explicit user choice (see ADR 0001, "Alternatives considered").

### Resume from

Run `/sdd-specify` to draft `spec.md` for the "Nuxt 3 rewrite + content enrichment" feature.
