# Brownfield onboarding — my-portfolio

Date: 2026-09-05

## Intake

- **Primary language/framework (current, pre-rewrite):** JavaScript, Vue 2.6.11, `@vue/cli-service` ~4.5 (Vue 2 reached EOL Dec 2023; `vue-cli` is deprecated in favor of Vite).
- **Primary language/framework (target, this feature):** Nuxt 3 (Vue 3), rendering mode **SSG** (`nuxi generate`) — user decision, 2026-09-05: keeps the current nginx-only static deployment with minimal infra change, appropriate since the site has no per-request personalization.
- **Package manager:** npm (`package-lock.json` present).
- **Test runner / test command:** none at v0. Target: **Vitest + `@nuxt/test-utils`** — user decision, 2026-09-05, to add a minimal harness alongside the rewrite rather than deferring tests.
- **Where tests live:** N/A at v0. Target: colocated `*.spec.ts` next to components/composables, per Nuxt/Vitest convention — to be confirmed in `plan.md` of the first feature.
- **CI provider:** none. No `.github/workflows/`. Scheduled as Aspirational (see constitution), not blocking this feature.
- **Deployment target:** Docker container (`node:16.20.2-alpine3.18` + nginx) building via `npm run build` and serving `dist/` statically; orchestrated by `~/www/nginx-proxy/docker-compose.yml` on `vps_josefo_01` (container `hv-container`), exposed at `https://hv.jose-gutierrez.com/`. SSG output keeps this shape (`.output/public/` in place of `dist/`); the Node base image and build step in `Dockerfile` will need updating for Nuxt 3's toolchain (Node ≥ 18) but the "build once, serve static via nginx" pattern is preserved.
- **Size:** ~2,203 LOC in `src/`. 9 route-level views (Home, About, Resume, Portfolio, Services, SuccessStories, Certifications, Libraries, Contact), each backed by a `src/data/*.js` module surfaced through a matching Vuex store module.
- **Pain points that motivated adopting SDD+TDD now:**
  1. Visual design is a generic, dated third-party template (BootstrapMade's "iPortfolio"), not a distinctive design — noticed by the user as "me he quedado atrás" in design.
  2. Content (skills, success stories) lags behind the user's actual recent work — several personal projects using modern stacks and formal SDD+TDD practice (via `spec-tdd-kit`, the user's own methodology) are not reflected.
  3. Zero tests, zero CI — no safety net for either the rewrite or future content changes.
  4. Stack contradiction: the portfolio markets Vue3/Nuxt/React/NestJS skills while running on Vue 2 EOL itself.

## Discovery

Performed inline (file reads + `git log`/`find`), not via a separate `Explore` subagent dispatch — justified by repo size (~2.2 kLOC, single SPA, no services) per the brownfield workflow's "quick-path for tiny repos" variant.

- **Top-level structure:** `src/{components,views,data,store,router,helpers,plugins}`, `public/assets/*` (third-party template assets, partially deleted — see constitution "Known defect"), `nginx_config/`, `Dockerfile`, `docker-compose.yml`.
- **Entry points:** `src/main.js` → `App.vue` → `vue-router` → one view per route → one top-level section component per view.
- **External services:** none. No API calls, no database, no queue, no auth found in `src/`.
- **Notable dependencies (current):** `vue-router`, `vuex`, `dayjs`, `countup.js`/`vue-countup-v2` (animated counters), `vue-flux` (image slider), `vue-typed-js` (typewriter effect), `vue-check-view` (scroll-triggered animations) — all template-driven visual flourishes, not domain logic.
- **Git history:** 12 commits total, all content/infra additions (certifications, experience, Docker setup, contact info) — no prior refactors, no prior test attempts.

### Reference repos for content migration (not part of this codebase)

Sourced from a separate sweep of `~/Projects` (git log + README inspection across ~15 candidate repos), used to decide what new success-stories/skills entries this feature will add. Full findings already reviewed with the user; repos confirmed as content sources for the first feature:

- `~/Projects/survey-system` (product: **Sirocco**, secure voting/survey system, live at `https://encuestas.josefo.link`)
- `~/Projects/cauce` (B2B multilateral barter platform, pre-MVP, no public URL)
- `~/Projects/manadelcielo` + `~/Projects/manadelcielo-content-forge` (offline Bible reading app, Flutter/Dart + Python)
- `~/Projects/bajo-la-lupa` (content/blog site, live at `https://bajolalupa.net`)
- `~/Projects/bio-labs-dev/bio-labs` (product: **Biogenesis**, clinical-lab management system, client work — user confirmed authorization to name it, 2026-09-05)
- `~/Projects/urv-web-site/somos-urv` (product: **Somos URV**, institutional site, live at `https://somos-urv.org` — user confirmed authorization to name it, 2026-09-05)
- `~/Projects/spec-tdd-kit` — not a project entry; to be woven in as the shared methodology narrative across the above ("designed and applies his own SDD+TDD framework"), per user-approved recommendation.

A second sweep, of `~/Projects/massive-space` (2026-09-06, during `003-content-refresh`'s specify phase — user pointed to this directory as the main source of new success stories), found dozens of VTEX e-commerce client engagements plus agency-owned products. Full findings reviewed with the user (Explore agent report); user selected these as authorized, named additions:

- `massive-space/qbano` (product: **Qbano**, VTEX fast-checkout with card-terminal integration + standalone survey-coupon microservice)
- `massive-space/nequi-integration-be` (product: **Nequi/Gravity**, Laravel 13 + Pest, Credibanco DX4000 payment orchestration, TDD-heavy)
- `massive-space/catalog-flip` (product: **CatalogFlip**, own SaaS, React/Redux Toolkit/Vite, non-VTEX)
- `massive-space/almacenes-brissa` (product: **Almacenes Brissa**, multiple custom VTEX apps authored by the user — financing, kits, store-pickup, kiosk themes)
- `massive-space/massive-whatsapp-service` (product: **massive-whatsapp-service**, Node/TS + VTEX admin-ui app, order-status WhatsApp notifications, multi-tenant rollout)

Other strong candidates found in the same sweep (Calzatodo, Ficohsa/La Colonia, Pizzamania, Pepe Ganga, Juriscoop, Lilipink, Speedo, MassiveSpace Pro, and others) were explicitly left out of `003-content-refresh`'s scope by user choice — available for a future feature if wanted.

A third pass (2026-09-08, session 10), triaging those 8 deferred candidates via an Explore agent that verified real authorship per-repo through `git log` (not folder names — several "client" repos turned out to be majority-authored by other agency developers, e.g. Leonardo Parra/DevMassiveSpace on Calzatodo's/Ficohsa's/Lilipink's theme repos). Findings:

- **Discarded, zero attributable commits**: `pepe-ganga` (all 442 commits belong to agency Titamedia), `juriscoop-xtrategik-tema` (all 505 commits belong to another team, Ubuntec/Xtrategik).
- **Discarded, insufficient own authorship**: `speedo` (only 10 commits across two minor utility repos; the theme/main apps are majority another developer's).
- **Strong candidates found, 5 total** — user selected 4:
  - `massive-space/calzatodo/backend-services` (**Calzatodo**, VTEX IO Node/TS/Koa microservice, 100% own commits — gift cards with retries + Slack alerts, monthly-bonus-limit validation, Master Data; narrative scoped to this repo only, not the theme/apps which are majority another dev's) — **selected**
  - `massive-space/pizzamania/auto-invoicer` (**Pizzamania**, VTEX IO app, 100% own commits, built with explicit SDD+TDD — spec/plan/contracts documented — closes stuck marketplace orders, idempotent, historical backfill) — **selected**
  - `massive-space/lilipink/credi-pink` (**CrediPink**, Laravel+Filament BNPL/credit-at-checkout backend, 100% own commits, real production incidents diagnosed and fixed, live at `app.credipink.com`; narrative scoped to CrediPink specifically, not the LiliPink theme/store which is majority another dev's) — **selected**
  - `massive-space/massivespace-pro` (**MassiveSpace Pro**, Laravel+Filament internal agency platform — WhatsApp notifications, abandoned-cart recovery, fast checkout, short URLs/QR, bulk invoicing — 100% own commits; presented as the assistant's own internal tool, no specific client named, since it's agency-owned infrastructure, not a client engagement) — **selected**
  - `massive-space/ficohsa-la-colonia` (**Ficohsa/La Colonia**, Laravel+PixelPay credit-at-checkout for a bank-backed integration, 72-100% own commits depending on repo) — **not selected**; flagged risk of narrative overlap with CrediPink (both are "credit at VTEX checkout") was moot once this one was left out.

## Decisions log (this onboarding session)

| Decision | Answer | Date |
|---|---|---|
| Redesign scope | Full rewrite to Nuxt 3, own minimalist design (not a reskin of the Vue 2 app) | 2026-09-05 |
| Named client case studies | Include Biogenesis and Somos URV with name (user confirmed authorization) | 2026-09-05 |
| Rendering mode | SSG (`nuxi generate`) over SSR | 2026-09-05 |
| Test harness | Add Vitest + `@nuxt/test-utils` as part of this feature, not deferred | 2026-09-05 |
| Feature slicing | Three features: 001 rewrite (structure/design/tests/CI, current content as-is), 002 content refresh (new success stories/skills), 003 i18n (es default, `/en` path-based, after 002's content is final) | 2026-09-05 |
| URL renaming (001) | Routes may be renamed freely when justified; no requirement to preserve exact current paths | 2026-09-05 |
| Feature resequencing | 001 shipped functionally complete but with no real visual design applied (only CSS tokens, never used on components) — a gap between the constitution's "original, minimalist design" goal and what got task-broken-down. New feature inserted as **002 (visual design pass)**; content refresh becomes **003**, i18n becomes **004** | 2026-09-06 |
| 003 success-story selection | 11 new entries: Sirocco (finished/production), Cauce (in dev), Maná del Cielo (in dev), Bajo la Lupa, Biogenesis, Somos URV (already authorized), plus Qbano, Nequi/Gravity, CatalogFlip, Almacenes Brissa, massive-whatsapp-service (from the `massive-space` sweep, user-curated selection out of ~13 strong candidates) | 2026-09-06 |
| Deferred massive-space candidates, final triage | 4 new entries selected: Calzatodo (backend-services only), Pizzamania (auto-invoicer), CrediPink, MassiveSpace Pro (as own internal tool, no client named). Not selected: Ficohsa/La Colonia. Discarded (no attributable authorship or insufficient own commits): Pepe Ganga, Juriscoop, Speedo | 2026-09-08 |

## Deviation from kit default

`workflows/brownfield.md` step 6 recommends committing `.claude/settings.json` as a shared permission boundary. This repo (like all of the user's other projects, per `~/.global-gitignore`) has `.claude/` under a **global** gitignore rule. Kept `.claude/settings.json` as a local-only, uncommitted file rather than force-adding it against a standing cross-project convention — flagged here instead of silently overriding it.

## Next step

Run `/sdd-specify` for the first kit-managed feature: "Nuxt 3 rewrite with original minimalist design + content enrichment (skills/success-stories)".
