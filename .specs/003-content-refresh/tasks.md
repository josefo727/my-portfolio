# Tasks — 003-content-refresh

## Legend

- `T{NNN}` — task id, unique within feature, zero-padded.
- `[P]` — safe to execute in parallel with other `[P]` tasks (disjoint files, no shared mutable state).
- `R` — Red beat description.
- `G` — Green beat description.
- `F` — Refactor beat description.
- `status` — `open | in_progress | closed | skipped`.

---

## T001 [P] Skill logo assets

```
spec-ref:        Acceptance criterion 5 (8 new skills)
contract-ref:    n/a
constitution-ref:ADR 0002 (icon philosophy — no icon package dependency)
DoD:
  - public/assets/img/logos/{filament,livewire,postgresql,python,flutter,dart,typescript,tailwindcss}.svg exist, downloaded verbatim from Simple Icons
  - public/assets/img/logos/sdd-tdd.svg exists, hand-authored (no brand icon exists for a methodology)
R: a unit test asserting all 9 files exist fails because none of them do yet
G: download the 8 Simple Icons SVGs (research.md confirmed HTTP 200 for each) and hand-author sdd-tdd.svg
F: skipped — no smell detected
files:
  - public/assets/img/logos/filament.svg
  - public/assets/img/logos/livewire.svg
  - public/assets/img/logos/postgresql.svg
  - public/assets/img/logos/python.svg
  - public/assets/img/logos/flutter.svg
  - public/assets/img/logos/dart.svg
  - public/assets/img/logos/typescript.svg
  - public/assets/img/logos/tailwindcss.svg
  - public/assets/img/logos/sdd-tdd.svg
  - tests/unit/skill-logo-assets.spec.ts
status: closed
commits:
  red: e8f81d5
  green: 5f55777
  refactor: skipped — no smell detected
notes:
```

---

## T002 Research & draft: personal projects

```
spec-ref:        Acceptance criteria 1, 2, 4
contract-ref:    n/a
constitution-ref:Article V
DoD:
  - draft title/body(HTML)/tags for Sirocco (stating finished/production), Cauce (in development), Maná del Cielo (in development)
  - each draft grounded in the actual repo (README, package.json, git log) — no invented claims
  - drafts presented to the user for approval before any data file is touched
R: n/a — content-drafting task, no automated red (see spec.md Article V note)
G: read ~/Projects/{survey-system,cauce,manadelcielo,manadelcielo-content-forge}, draft the 3 entries, get user approval or revisions
F: n/a
files: (none — output is approved draft text, not yet written to a file)
status: closed
commits:
  red: n/a
  green: n/a — approved in chat, written to data in T005
  refactor: n/a
notes: |
  Approved drafts (2026-09-06), minor edits applied (no version numbers, no metrics parenthetical):

  **Sirocco** — tags: SDD/TDD, Laravel, PostgreSQL, TDD, Clean Code, PHP
  Diseñé y desarrollé Sirocco, un sistema de votación/encuestas anónimo, de voto único y a prueba de
  manipulaciones, con un log de auditoría encadenado criptográficamente (estilo blockchain) y exportación
  de resultados firmada con Ed25519. Implementé defensas anti-fraude con device fingerprinting,
  Proof-of-Work contra bots, y atribución geográfica vía GeoIP. Todo el desarrollo siguió mi propia
  metodología de Spec-Driven Development + TDD. Construido con Laravel, PHP, PostgreSQL y Pest,
  desplegado con Cloudflare al frente. Finalizado y en producción, disponible en encuestas.josefo.link.

  **Cauce** — tags: Laravel, Filament, Python, TypeScript, SDD/TDD, VueJS
  Estoy desarrollando Cauce, una plataforma B2B de trueque multilateral para Venezuela que permite a
  empresas intercambiar bienes y servicios sin efectivo mediante un algoritmo de emparejamiento cíclico
  (principio de "seis grados") y una unidad de crédito interna (Créditos Cauce). La arquitectura combina
  Laravel con Filament para el panel administrativo, un motor de emparejamiento en Python con FastAPI, y
  un frontend Quasar (Vue 3 + TypeScript) como SPA/PWA con soporte móvil vía Capacitor. Sigue mi propia
  metodología SDD+TDD, con invariantes del sistema respaldados por tests de propiedades. Actualmente en
  desarrollo activo (pre-MVP, fundamentos completos).

  **Maná del Cielo** — tags: Flutter, Dart, Python, SDD/TDD, Clean Code
  Estoy desarrollando Maná del Cielo, una app de lectura bíblica 100% offline, sin anuncios, sin rastreo
  y sin cuentas, con plan de lectura anual flexible y notificaciones condicionales. Construida en
  Flutter/Dart, con Riverpod, Drift (SQLite + FTS5), go_router e i18n completo. Las versiones bíblicas se
  distribuyen como paquetes firmados y verificados por integridad, producidos por un pipeline propio en
  Python (Content Forge) ya completo de extremo a extremo. Todo el desarrollo sigue mi metodología
  SDD+TDD. En desarrollo activo, con lanzamiento planeado primero en Android.
```

---

## T003 Research & draft: already-authorized client projects

```
spec-ref:        Acceptance criteria 1, 2
contract-ref:    n/a
constitution-ref:Article V
DoD:
  - draft title/body(HTML)/tags for Bajo la Lupa, Biogenesis, Somos URV
  - each draft grounded in the actual repo
  - drafts presented to the user for approval before any data file is touched
R: n/a — content-drafting task, no automated red
G: read ~/Projects/{bajo-la-lupa,bio-labs-dev/bio-labs,urv-web-site/somos-urv}, draft the 3 entries, get user approval or revisions
F: n/a
files: (none)
status: closed
commits:
  red: n/a
  green: n/a — approved in chat, written to data in T005
  refactor: n/a
notes: |
  Approved drafts (2026-09-06):

  **Bajo la Lupa** — tags: Laravel, Filament, Livewire, SDD/TDD, SEO
  Desarrollé Bajo la Lupa, una plataforma editorial que publica reseñas de libros, artículos y cursos,
  con gestión de autores, series y categorías. Construida en Laravel con Filament para el panel
  administrativo y Livewire para las interacciones dinámicas, incluye búsqueda con Meilisearch, gestión
  de medios con Spatie Media Library, SEO completo (sitemap, feed RSS, schema.org) y almacenamiento en
  S3. Sigue mi metodología SDD+TDD. Disponible en bajolalupa.net.

  **Biogenesis** — tags: Laravel, VueJS, Multi-tenancy, Clean Code, API Rest
  Desarrollé Biogenesis, un sistema de gestión para laboratorios clínicos con arquitectura multi-tenant,
  que administra pacientes, solicitudes de servicios, prefacturación y facturación. El backend usa
  Laravel con Horizon para colas, Sanctum para autenticación de API, y Spatie para permisos, auditoría y
  manejo de medios. El frontend en Vue 3 con Vuetify incluye dashboards con ApexCharts/Chart.js, un
  editor de texto enriquecido (TipTap) y autorización basada en habilidades con CASL.

  **Somos URV** — tags: Laravel, Filament, SDD/TDD, i18n
  Desarrollé Somos URV, el sitio institucional de la organización, con gestión de noticias, roster de
  liderazgo y contenido en varios idiomas. Construido en Laravel con Filament para el panel
  administrativo, búsqueda con Meilisearch, permisos y contenido multi-idioma vía Spatie, y generación
  de códigos QR. Sigue mi metodología SDD+TDD. Disponible en somos-urv.org.
```

---

## T004 Research & draft: massive-space projects

```
spec-ref:        Acceptance criteria 1, 2
contract-ref:    n/a
constitution-ref:Article V
DoD:
  - draft title/body(HTML)/tags for Qbano, Nequi/Gravity, CatalogFlip, Almacenes Brissa, massive-whatsapp-service
  - each draft builds on the specify-time survey findings, confirmed/extended with a closer look at each repo
  - drafts presented to the user for approval before any data file is touched
R: n/a — content-drafting task, no automated red
G: read the 5 ~/Projects/massive-space/* repos, draft the 5 entries, get user approval or revisions
F: n/a
files: (none)
status: closed
commits:
  red: n/a
  green: n/a — approved in chat, written to data in T005
  refactor: n/a
notes: |
  Approved drafts (2026-09-06), verified against the repos (corrected an initial wrong assumption:
  CatalogFlip has no TypeScript dependency — plain JS/JSX):

  **Qbano** — tags: VTEX, React, TypeScript, Node, API Rest
  Desarrollé para Qbano un checkout rápido con integración de datáfono físico y gift cards sobre VTEX
  IO, además de un microservicio independiente de encuestas y cupones que alimenta un sitio externo de
  encuestas al cliente. Trabajo full-stack con componentes React/TypeScript en el storefront y servicios
  backend en Node.

  **Nequi/Gravity** — tags: Laravel, TDD, SDD/TDD, API Rest, PHP
  Desarrollé el backend de integración entre Nequi y un flujo de pagos ('Gravity') con Credibanco DX4000
  para un cliente VTEX, incluyendo aprovisionamiento por comercio, superficies de pago en kiosco y
  notificaciones push de pago. Construido en Laravel con Sanctum, bajo un flujo estricto de TDD (tests
  rojo/verde por comando y contrato versionado).

  **CatalogFlip** — tags: React, Tailwind CSS, PostgreSQL, SaaS
  Desarrollé CatalogFlip, una plataforma propia para crear catálogos digitales interactivos a partir de
  PDFs, con hotspots (botones de compra, enlaces, video), analítica integrada con Google Analytics 4,
  catálogos embebibles vía iframe/JavaScript y colaboración en equipo con permisos por rol. Construida
  en React con Vite, Tailwind CSS y Supabase (PostgreSQL, autenticación y almacenamiento).

  **Almacenes Brissa** — tags: VTEX, React, TypeScript, Node, API Rest
  Desarrollé un conjunto de aplicaciones a medida para Almacenes Brissa sobre VTEX IO: apps de
  financiamiento y kits de producto, recogida en tienda con notificaciones por WhatsApp, sincronización
  de datos de clientes entre subcuentas, checkout rápido con datáfono, y temas de kiosco/tótem para
  tiendas y eventos. Trabajo full-stack en React/TypeScript y servicios backend en Node.

  **massive-whatsapp-service** — tags: Laravel, VTEX, Node, SDD/TDD, API Rest
  Desarrollé un servicio de notificaciones que escucha eventos de cambio de estado de pedidos en VTEX
  (vía "orders-broadcast") y los procesa con un middleware en Laravel, junto con un componente de
  administración en VTEX Admin para configurar qué estados notificar por WhatsApp. Desplegado en
  múltiples tiendas VTEX bajo un flujo spec-driven con journal de sesiones.
```

---

## T005 Write success stories to data

```
spec-ref:        Acceptance criteria 1, 2, 3, 4, 7
contract-ref:    n/a
constitution-ref:Article III (real data, no mocking)
DoD:
  - data/success-stories.ts has 19 entries: the 8 original (byte-for-byte unchanged) + the 11 approved in T002-T004
  - a unit test asserts the new length, that each of the 8 original titles is still present, and that all 11 new entries have non-empty title/body/tags
  - a unit test asserts Sirocco's body mentions production/finished, Cauce's and Maná del Cielo's each mention in-development
R: the length/content assertions fail because the 11 new entries don't exist in data/success-stories.ts yet
G: append the 11 approved entries (from T002-T004) to data/success-stories.ts
F: skipped unless a repeated pattern across entries suggests an extraction
files:
  - data/success-stories.ts
  - tests/unit/data-success-stories.spec.ts
status: closed
commits:
  red: 5b706fd
  green: e789d6d
  refactor: skipped — no smell detected
notes:
```

---

## T006 Write skills to data

```
spec-ref:        Acceptance criteria 5, 6
contract-ref:    n/a
constitution-ref:Article III
DoD:
  - data/skills.ts has 24 entries: the 16 original (unchanged) + 8 new (SDD/TDD, Filament, Livewire, PostgreSQL, Python, Flutter/Dart, TypeScript, Tailwind CSS), no duplicates
  - each new entry's `image` points to its logo asset from T001
  - a unit test asserts the new length, that each of the 16 original titles is still present, and that each new entry has a non-empty title/image
R: the length/content assertions fail because the 8 new entries don't exist in data/skills.ts yet
G: append the 8 new entries to data/skills.ts
F: skipped — no smell detected
files:
  - data/skills.ts
  - tests/unit/data-skills.spec.ts
status: closed
commits:
  red: 686fad3
  green: cdef193
  refactor: skipped — no smell detected
notes:
```

---

## T007 Accessibility regression check

```
spec-ref:        Acceptance criterion 8
contract-ref:    n/a
constitution-ref:Article VIII
DoD:
  - tests/nuxt/accessibility.nuxt.spec.ts still reports zero violations with the new content rendered
  - every new skill's <img> has a meaningful alt (its title, per AboutSkills.vue's existing pattern) — not empty
R: n/a — regression task, no new red test (mirrors 002's T014)
G: fix anything the accessibility suite surfaces
F: skipped unless a fix requires cleanup
files: (none expected)
status: open
commits:
  red: n/a
  green:
  refactor:
notes: last task — depends on T005, T006 (finished content to check).
```

---

## Amendments

| Date | Change | Reason |
|------|--------|--------|
|      |        |        |
