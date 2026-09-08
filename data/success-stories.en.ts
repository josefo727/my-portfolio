import type { SuccessStory } from './success-stories'

const successStories: SuccessStory[] = [
  {
    title: "Articles for Vultr",
    body: "<p>I've written several technical articles for Vultr, sharing my knowledge and experience across various technologies and development practices. I applied Clean Code, Docker, and Kubernetes to keep the articles clear, concise, and easy to follow, making them easier for other developers to put into practice. You can find my posts here: <a href='https://docs.vultr.com/author/josé-rafael-gutierrez' target='_blank'>https://docs.vultr.com/author/josé-rafael-gutierrez</a>. These articles cover a wide range of topics, from server configuration to application development and cloud best practices.</p>",
    tags: ["Clean Code", "Docker", "Kubernetes", "DevOPS", "Linux"],
  },
  {
    title: "Decorcerámica - SAP",
    body: "<p>The project integrated the Vtex eCommerce system (<a href='https://www.decorceramica.com/' target='_blank'>https://www.decorceramica.com/</a>) with SAP to manage inventory, pricing, invoicing, and logistics. I used TDD to ensure functionality from the start and a REST API for efficient communication. The integration was built with PHP/Laravel, VueJS, and a PostgreSQL database.</p>",
    tags: ["TDD", "API Rest", "Laravel", "VueJS", "Vtex", "SAP", "PostgreSQL"],
  },
  {
    title: "FacesCR - Intélisis",
    body: "<p>Integrated the Vtex store (<a href='https://cr.faces.com/' target='_blank'>https://cr.faces.com/</a>) with the Intélisis ERP to manage pricing, inventory, and invoicing, plus an integration with Correos de Costa Rica (<a href='https://correos.go.cr/' target='_blank'>https://correos.go.cr/</a>) for logistics management. Built with PHP/Laravel, VueJS, and a MySQL database for an efficient integration. I used TDD to ensure correct functionality and microservices for a scalable architecture.</p>",
    tags: [
      "Microservices",
      "TDD",
      "API Rest",
      "Laravel",
      "Vtex",
      "Intelisis",
      "MySQL",
    ],
  },
  {
    title: "SDK Vtex Api",
    body: "<p>This library/SDK enables versatile communication with Vtex's APIs and makes it easier to build integration systems. It's designed to be used with PHP, Laravel, Symfony, and other PHP-based frameworks. I implemented the Adapter design pattern to make the integration simpler. You can find it on my GitHub account: <a href='https://github.com/josefo727/vtex-api' target='_blank'>https://github.com/josefo727/vtex-api</a></p>",
    tags: [
      "Adapter Pattern",
      "Clean Code",
      "TDD",
      "Laravel",
      "Symfony",
      "PHP",
    ],
  },
  {
    title: "Crédito KBK",
    body: "<p>Integrated the Crédito Karibik payment method into a Vtex Legacy store, later migrated to Vtex IO (<a href='https://karibik.co/pages/credito-kbk' target='_blank'>https://karibik.co/pages/credito-kbk</a>). This payment system provides credit to Karibik's affiliated customers, and was built with an Integration Middleware (NodeJS/Express, MongoDB, and VueJS) to manage that credit. I used TDD and an Event-Driven approach to ensure reliability and process transactions in real time.</p>",
    tags: [
      "Event-Driven",
      "TDD",
      "Laravel",
      "ReactJS",
      "Vtex",
      "MongoDB",
      "NodeJS",
      "Express",
    ],
  },
  {
    title: "OT&V de PMI",
    body: "<p>Built the Order Tracking and Visualization system for Philip Morris International, with a Vtex integration to inject orders from different sales channels and order types. I used an Event-Driven approach and the Hexagonal pattern to process orders in real time. The backend used Laravel with TDD to guarantee stability, while the frontend used Vtex IO and ReactJS for custom admin components.</p>",
    tags: [
      "Clean Code",
      "Event-Driven",
      "TDD",
      "Hexagonal",
      "Laravel",
      "ReactJS",
      "Vtex",
    ],
  },
  {
    title: "Kaiowa",
    body: "<p>Built and deployed a credit-payment-method operator for affiliated Vtex stores, enabling management of custom credit plans. On the backend I used PHP/Laravel, applying SOLID principles and an Event-Driven approach. For the Front End I built a widget for Vtex Legacy and Vtex IO, using Vanilla JS and ReactJS.</p>",
    tags: [
      "Clean Code",
      "Event-Driven",
      "TDD",
      "SOLID",
      "Laravel",
      "ReactJS",
      "Vtex",
    ],
  },
  {
    title: "Custom Blog The Bar Colombia",
    body: "<p>Built a custom blog for The Bar Colombia (<a href='https://co.thebar.com/blog' target='_blank'>https://co.thebar.com/blog</a>) with a NodeJS/Express and MongoDB backend. The admin interface was built in ReactJS for Vtex, with custom components integrated into the Vtex Admin. Clean Code and TDD were applied to ensure code quality and stability.</p>",
    tags: [
      "Clean Code",
      "TDD",
      "SOLID",
      "KoaJS",
      "ReactJS",
      "NodeJS",
      "MongoDB",
      "Vtex",
    ],
  },
  {
    title: "Sirocco — Secure, Auditable Voting System",
    body: "<p>Designed and built Sirocco, an anonymous, one-vote, tamper-resistant voting/polling system, with a cryptographically chained audit log (blockchain-style) and Ed25519-signed result exports. I implemented anti-fraud defenses with device fingerprinting, Proof-of-Work against bots, and geographic attribution via GeoIP. The whole build followed my own Spec-Driven Development + TDD methodology. Built with Laravel, PHP, PostgreSQL, and Pest, deployed behind Cloudflare. Finished and in production, available at <a href='https://encuestas.josefo.link' target='_blank'>https://encuestas.josefo.link</a>.</p>",
    tags: ["SDD/TDD", "Laravel", "PostgreSQL", "TDD", "Clean Code", "PHP"],
  },
  {
    title: "Cauce — B2B Multilateral Bartering Platform",
    body: "<p>I'm building Cauce, a B2B multilateral bartering platform for Venezuela that lets companies exchange goods and services without cash, through a cyclical matching algorithm (the \"six degrees\" principle) and an internal credit unit (Cauce Credits). The architecture combines Laravel with Filament for the admin panel, a Python matching engine with FastAPI, and a Quasar frontend (Vue 3 + TypeScript) as an SPA/PWA with mobile support via Capacitor. It follows my own SDD+TDD methodology, with system invariants backed by property-based tests. Currently in active development (pre-MVP, foundations complete).</p>",
    tags: ["Laravel", "Filament", "Python", "TypeScript", "SDD/TDD", "VueJS"],
  },
  {
    title: "Maná del Cielo — Offline, Private Bible Reader",
    body: "<p>I'm building Maná del Cielo, a 100% offline Bible-reading app with no ads, no tracking, and no accounts, featuring a flexible annual reading plan and conditional notifications. Built in Flutter/Dart, with Riverpod, Drift (SQLite + FTS5), go_router, and full i18n. Bible versions are distributed as signed, integrity-verified packages, produced by my own Python pipeline (Content Forge), already complete end to end. The whole build follows my SDD+TDD methodology. In active development, with launch planned first on Android.</p>",
    tags: ["Flutter", "Dart", "Python", "SDD/TDD", "Clean Code"],
  },
  {
    title: "Bajo la Lupa — Editorial and Review Platform",
    body: "<p>Built Bajo la Lupa, an editorial platform that publishes reviews of books, articles, and courses, with author, series, and category management. Built in Laravel with Filament for the admin panel and Livewire for dynamic interactions, it includes Meilisearch search, media management with Spatie Media Library, full SEO (sitemap, RSS feed, schema.org), and S3 storage. Follows my SDD+TDD methodology. Available at <a href='https://bajolalupa.net' target='_blank'>bajolalupa.net</a>.</p>",
    tags: ["Laravel", "Filament", "Livewire", "SDD/TDD", "SEO"],
  },
  {
    title: "Biogenesis — Clinical Lab Management System",
    body: "<p>Built Biogenesis, a management system for clinical labs with a multi-tenant architecture, handling patients, service requests, pre-billing, and billing. The backend uses Laravel with Horizon for queues, Sanctum for API authentication, and Spatie for permissions, auditing, and media handling. The Vue 3 + Vuetify frontend includes dashboards with ApexCharts/Chart.js, a rich text editor (TipTap), and ability-based authorization with CASL.</p>",
    tags: ["Laravel", "VueJS", "Multi-tenancy", "Clean Code", "API Rest"],
  },
  {
    title: "Somos URV — Institutional Website",
    body: "<p>Built Somos URV, the organization's institutional website, with news management, a leadership roster, and multi-language content. Built in Laravel with Filament for the admin panel, Meilisearch search, permissions and multi-language content via Spatie, and QR-code generation. Follows my SDD+TDD methodology. Available at <a href='https://somos-urv.org' target='_blank'>somos-urv.org</a>.</p>",
    tags: ["Laravel", "Filament", "SDD/TDD", "i18n"],
  },
  {
    title: "Qbano — Fast Checkout and VTEX Coupon Integration",
    body: "<p>Built a fast checkout for Qbano with physical card-reader and gift-card integration on VTEX IO, plus an independent surveys-and-coupons microservice that feeds an external customer-survey site. Full-stack work with React/TypeScript components on the storefront and Node backend services.</p>",
    tags: ["VTEX", "React", "TypeScript", "Node", "API Rest"],
  },
  {
    title: "Nequi/Gravity Integration — Payment Orchestration",
    body: "<p>Built the backend integration between Nequi and a payment flow ('Gravity') with Credibanco DX4000 for a VTEX client, including per-merchant provisioning, kiosk payment surfaces, and payment push notifications. Built in Laravel with Sanctum, under a strict TDD flow (red/green tests per command, versioned contract).</p>",
    tags: ["Laravel", "TDD", "SDD/TDD", "API Rest", "PHP"],
  },
  {
    title: "CatalogFlip — Interactive Digital Catalog Platform",
    body: "<p>Built CatalogFlip, my own platform for creating interactive digital catalogs from PDFs, with hotspots (buy buttons, links, video), Google Analytics 4 integration, embeddable catalogs via iframe/JavaScript, and team collaboration with role-based permissions. Built in React with Vite, Tailwind CSS, and Supabase (PostgreSQL, authentication, and storage).</p>",
    tags: ["React", "Tailwind CSS", "PostgreSQL", "SaaS"],
  },
  {
    title: "Almacenes Brissa — Custom VTEX App Ecosystem",
    body: "<p>Built a set of custom applications for Almacenes Brissa on VTEX IO: financing and product-kit apps, in-store pickup with WhatsApp notifications, customer-data sync across sub-accounts, fast checkout with a card reader, and kiosk/totem themes for stores and events. Full-stack work in React/TypeScript with Node backend services.</p>",
    tags: ["VTEX", "React", "TypeScript", "Node", "API Rest"],
  },
  {
    title: "Order-Status WhatsApp Notification Service",
    body: "<p>Built a notification service that listens for order-status change events in VTEX (via \"orders-broadcast\") and processes them with a Laravel middleware, along with a VTEX Admin component to configure which statuses trigger WhatsApp notifications. Deployed across multiple VTEX stores under a spec-driven flow with a session journal.</p>",
    tags: ["Laravel", "VTEX", "Node", "SDD/TDD", "API Rest"],
  },
  {
    title: "Calzatodo — VTEX IO Gift Cards",
    body: "<p>I built a VTEX IO microservice (Node.js/TypeScript with KoaJS) for Calzatodo that securely manages gift-card issuance on top of Master Data, with automatic retries and Slack alerts on failure, per-customer monthly redemption-limit validation, and an OMS integration layer to process payment-approved and invoicing events. Auto-scales from 2 to 4 replicas based on demand.</p>",
    tags: ["VTEX", "Node", "TypeScript", "Microservices"],
  },
  {
    title: "Pizzamania — Auto Invoicer with SDD+TDD",
    body: "<p>I designed and built Auto Invoicer, a VTEX IO app for Pizzamania that automatically closes marketplace orders stuck in \"payment-approved\" status by invoicing the mirror order on the corresponding franchise (seller) account, so VTEX propagates the invoiced status back to the marketplace. Applied my own SDD+TDD methodology, with a documented spec, plan, and contracts; the sweep is idempotent and cursor-paginated, with a resumable historical backfill mode.</p>",
    tags: ["VTEX", "Node", "SDD/TDD", "Automation"],
  },
  {
    title: "CrediPink — Credit at VTEX Checkout",
    body: "<p>I built CrediPink, the backend of the LiliPink brand's own credit-purchase product, integrated into its VTEX storefront checkout and built in PHP/Laravel with a Filament admin panel. Implemented customer identity/quota validation, promissory-note generation and sale confirmation against the credit API, order-form synchronization with the checkout, automatic cancellation of orphaned orders, and production monitoring of the payment gate's status. Used PHPUnit for unit and integration testing.</p>",
    tags: ["Laravel", "Filament", "PHP", "VTEX", "PHPUnit"],
  },
  {
    title: "MassiveSpace Pro — Internal Multi-Client Platform",
    body: "<p>I designed and built MassiveSpace Pro, my own Laravel/Filament platform for centralizing the management of multiple e-commerce clients integrated with VTEX: WhatsApp notifications, abandoned-cart recovery, fast checkout, short URL generation with QR codes, and bulk order invoicing with retries and historical backfill recovery. Applied Clean Architecture (single-action controllers, Services, Actions, Redis-backed Repositories, DTOs) with role-based access control (RBAC) via Spatie, and PHPUnit test coverage for each business domain.</p>",
    tags: ["Laravel", "Filament", "PHP", "Redis", "RBAC", "Clean Architecture"],
  },
]

export default successStories
