# Tasks — 006-massive-space-success-stories

## Legend

- `T{NNN}` — task id, unique within feature, zero-padded.
- `[P]` — safe to execute in parallel with other `[P]` tasks (disjoint files, no shared mutable state).
- `R` — Red beat description.
- `G` — Green beat description.
- `F` — Refactor beat description.
- `status` — `open | in_progress | closed | skipped`.

---

## T001 Research & draft (Spanish)

```
spec-ref:        Acceptance criteria 1, 2, 4, 5, 6
contract-ref:    n/a
constitution-ref:Article V
DoD:
  - draft title/body(HTML)/tags in Spanish for Calzatodo, Pizzamania (Auto Invoicer), CrediPink, MassiveSpace Pro
  - each draft grounded in the actual repo (already surveyed this session — README, package.json/composer.json, git log — see research.md)
  - Calzatodo's draft scoped to backend-services only; CrediPink's scoped to the credit product only; MassiveSpace Pro's names no specific client
  - drafts presented to the user for approval before any data file is touched
R: n/a — content-drafting task, no automated red (see spec.md Article V note, same pattern as 003's T002-T004)
G: read massive-space/{calzatodo/backend-services,pizzamania/auto-invoicer,lilipink/credi-pink,massivespace-pro}, confirm/extend the triage findings, draft the 4 entries, get user approval or revisions
F: n/a
files: (none — output is approved draft text, not yet written to a file)
status: closed
commits:
  red: n/a
  green: n/a — approved in chat, written to data in T003
  refactor: n/a
notes: |
  Approved drafts (2026-09-08), verified directly against each repo (README, CLAUDE.md,
  composer.json/package.json, manifest.json, app/node directory structure) before drafting:

  **Calzatodo — Tarjetas de Regalo VTEX IO** — tags: VTEX, Node, TypeScript, Microservicios
  Desarrollé para Calzatodo un microservicio VTEX IO (Node.js/TypeScript con KoaJS) que gestiona de
  forma segura la emisión de tarjetas de regalo sobre Master Data, con reintentos automáticos y
  alertas a Slack ante fallos, validación de límites mensuales de canje por cliente, y una capa de
  integración con el OMS para procesar eventos de pago aprobado y facturación. Autoescalado de 2 a 4
  réplicas según demanda.

  **Pizzamania — Auto Invoicer con SDD+TDD** — tags: VTEX, Node, SDD/TDD, Automatización
  Diseñé y desarrollé Auto Invoicer, una app VTEX IO para Pizzamania que cierra automáticamente
  pedidos de marketplace atascados en estado "pago aprobado", facturando la orden espejo en la
  cuenta franquicia (seller) correspondiente para que VTEX propague el estado de facturado de vuelta
  al marketplace. Apliqué mi propia metodología SDD+TDD, con especificación, plan y contratos
  documentados; el barrido es idempotente y paginado por cursor, con un modo de recuperación
  histórica (backfill) capaz de reanudarse tras una interrupción.

  **CrediPink — Crédito en Checkout VTEX** — tags: Laravel, Filament, PHP, VTEX, PHPUnit
  Desarrollé CrediPink, el backend del producto de compra a crédito propio de la marca LiliPink,
  integrado al checkout de su tienda VTEX y construido en PHP/Laravel con panel administrativo en
  Filament. Implementé la validación de identidad y cupo del cliente, la generación de pagarés y
  confirmación de venta contra la API de crédito, sincronización con el order form del checkout,
  cancelación automática de pedidos huérfanos y monitoreo del estado del gate de pago en producción.
  Utilicé PHPUnit para pruebas unitarias y de integración.

  **MassiveSpace Pro — Plataforma Interna Multi-cliente** — tags: Laravel, Filament, PHP, Redis, RBAC, Clean Architecture
  Diseñé y desarrollé MassiveSpace Pro, una plataforma propia en Laravel/Filament para centralizar la
  gestión de múltiples clientes de comercio electrónico integrados con VTEX: notificaciones por
  WhatsApp, recuperación de carritos abandonados, checkout rápido, generación de URLs cortas con
  códigos QR y facturación masiva de pedidos con reintentos y recuperación histórica (backfill).
  Apliqué Clean Architecture (controladores de una sola acción, Services, Actions, Repositories sobre
  Redis, DTOs) con control de roles y permisos (RBAC) vía Spatie, y cobertura de pruebas con PHPUnit
  para cada dominio de negocio.
```

---

## T002 Research & draft (English)

```
spec-ref:        Acceptance criterion 7
contract-ref:    n/a
constitution-ref:Article V
DoD:
  - translate the 4 approved Spanish drafts (T001) to English, same structure/tags as their Spanish counterpart
  - drafts presented to the user for approval before any data file is touched
R: n/a — content-drafting task, no automated red
G: translate the 4 approved entries, get user approval or revisions
F: n/a
files: (none — output is approved draft text, not yet written to a file)
status: closed
commits:
  red: n/a
  green: n/a — approved in chat, written to data in T004
  refactor: n/a
notes: |
  Approved English translations (2026-09-08), same structure/tags as their Spanish counterpart
  (T001), tags translated where they weren't already English proper nouns (Microservicios →
  Microservices, Automatización → Automation):

  **Calzatodo — VTEX IO Gift Cards** — tags: VTEX, Node, TypeScript, Microservices
  I built a VTEX IO microservice (Node.js/TypeScript with KoaJS) for Calzatodo that securely manages
  gift-card issuance on top of Master Data, with automatic retries and Slack alerts on failure,
  per-customer monthly redemption-limit validation, and an OMS integration layer to process
  payment-approved and invoicing events. Auto-scales from 2 to 4 replicas based on demand.

  **Pizzamania — Auto Invoicer with SDD+TDD** — tags: VTEX, Node, SDD/TDD, Automation
  I designed and built Auto Invoicer, a VTEX IO app for Pizzamania that automatically closes
  marketplace orders stuck in "payment-approved" status by invoicing the mirror order on the
  corresponding franchise (seller) account, so VTEX propagates the invoiced status back to the
  marketplace. Applied my own SDD+TDD methodology, with a documented spec, plan, and contracts; the
  sweep is idempotent and cursor-paginated, with a resumable historical backfill mode.

  **CrediPink — Credit at VTEX Checkout** — tags: Laravel, Filament, PHP, VTEX, PHPUnit
  I built CrediPink, the backend of the LiliPink brand's own credit-purchase product, integrated into
  its VTEX storefront checkout and built in PHP/Laravel with a Filament admin panel. Implemented
  customer identity/quota validation, promissory-note generation and sale confirmation against the
  credit API, order-form synchronization with the checkout, automatic cancellation of orphaned
  orders, and production monitoring of the payment gate's status. Used PHPUnit for unit and
  integration testing.

  **MassiveSpace Pro — Internal Multi-Client Platform** — tags: Laravel, Filament, PHP, Redis, RBAC, Clean Architecture
  I designed and built MassiveSpace Pro, my own Laravel/Filament platform for centralizing the
  management of multiple e-commerce clients integrated with VTEX: WhatsApp notifications,
  abandoned-cart recovery, fast checkout, short URL generation with QR codes, and bulk order
  invoicing with retries and historical backfill recovery. Applied Clean Architecture (single-action
  controllers, Services, Actions, Redis-backed Repositories, DTOs) with role-based access control
  (RBAC) via Spatie, and PHPUnit test coverage for each business domain.
```

---

## T003 Write success stories (Spanish) to data

```
spec-ref:        Acceptance criteria 1, 2, 3, 4, 5, 6, 8
contract-ref:    n/a
constitution-ref:Article III (real data, no mocking)
DoD:
  - data/success-stories.ts has 23 entries: the 19 existing (byte-for-byte unchanged) + the 4 approved in T001
  - a unit test asserts the new length, that each of the 19 existing titles is still present, and that all 4 new entries have non-empty title/body/tags
  - a unit test asserts Calzatodo's body does not claim the store theme/frontend, CrediPink's body does not claim the LiliPink storefront, and MassiveSpace Pro's body names no specific client
R: the length/content assertions fail because the 4 new entries don't exist in data/success-stories.ts yet
G: append the 4 approved entries (from T001) to data/success-stories.ts
F: skipped unless a repeated pattern across entries suggests an extraction
files:
  - data/success-stories.ts
  - tests/unit/data-success-stories.spec.ts
status: open
commits:
  red:
  green:
  refactor:
notes:
```

---

## T004 Write success stories (English) to data

```
spec-ref:        Acceptance criterion 7
contract-ref:    n/a
constitution-ref:Article III
DoD:
  - data/success-stories.en.ts has 23 entries: the 19 existing (unchanged) + the 4 approved English translations from T002, same order as success-stories.ts
  - the existing parity test (tests/unit/data-en-parity.spec.ts) still asserts equal length between the two files
R: the parity-length assertion fails (23 vs. 19) because success-stories.en.ts doesn't have the 4 new entries yet
G: append the 4 approved English entries (from T002) to data/success-stories.en.ts, same order as success-stories.ts
F: skipped — no smell detected
files:
  - data/success-stories.en.ts
  - tests/unit/data-en-parity.spec.ts
status: open
commits:
  red:
  green:
  refactor:
notes:
```

---

## T005 Accessibility regression check

```
spec-ref:        Acceptance criterion 9
contract-ref:    n/a
constitution-ref:Article VIII
DoD:
  - tests/nuxt/accessibility.nuxt.spec.ts still reports zero violations with the new content rendered, for both es and en routes
R: n/a — regression task, no new red test (mirrors 003's T007, 004's T014)
G: fix anything the accessibility suite surfaces
F: skipped unless a fix requires cleanup
files: (none expected)
status: open
commits:
  red: n/a
  green: n/a
  refactor: n/a
notes:
```

---

## Amendments

| Date | Change | Reason |
|------|--------|--------|
|      |        |        |
