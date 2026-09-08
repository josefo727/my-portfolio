export interface SuccessStory {
  title: string
  body: string
  tags: string[]
}

const successStories: SuccessStory[] = [
  {
    title: "Artículos para Vultr",
    body: "<p>He escrito varios artículos técnicos para Vultr, compartiendo mis conocimientos y experiencia en diversas tecnologías y prácticas de desarrollo. Implementé Clean Code, Docker y Kubernetes para asegurar que los artículos sean claros, concisos y fáciles de entender, facilitando su aplicación por otros desarrolladores. Puedes ver mis publicaciones en el siguiente enlace: <a href='https://docs.vultr.com/author/josé-rafael-gutierrez' target='_blank'>https://docs.vultr.com/author/josé-rafael-gutierrez</a>. Estos artículos cubren una amplia gama de temas, desde la configuración de servidores hasta el desarrollo de aplicaciones y la implementación de mejores prácticas en la nube.</p>",
    tags: ["Clean Code", "Docker", "Kubernetes", "DevOPS", "Linux"],
  },
  {
    title: "Decorcerámica - SAP",
    body: "<p>El desarrollo consistió en integrar el sistema de eCommerce Vtex (<a href='https://www.decorceramica.com/' target='_blank'>https://www.decorceramica.com/</a>) con SAP para gestionar el inventario, los precios, la facturación y la logística. Utilicé TDD para asegurar la funcionalidad desde el inicio y API Rest para una comunicación eficiente. La integración se llevó a cabo utilizando PHP/Laravel, VueJS y una base de datos PostgreSQL.</p>",
    tags: ["TDD", "API Rest", "Laravel", "VueJS", "Vtex", "SAP", "PostgreSQL"],
  },
  {
    title: "FacesCR - Intélisis",
    body: "<p>Se realizó la integración de tienda Vtex (<a href='https://cr.faces.com/' target='_blank'>https://cr.faces.com/</a>) con el ERP Intélisis para gestionar precios, inventario y facturación, además de integrarse con Correos de Costa Rica (<a href='https://correos.go.cr/' target='_blank'>https://correos.go.cr/</a>) para la gestión logística. Se emplearon tecnologías como PHP/Laravel, VueJS y una base de datos MySQL para llevar a cabo esta integración de manera eficiente. Utilicé TDD para asegurar la correcta funcionalidad y microservicios para una arquitectura escalable.</p>",
    tags: [
      "Microservicios",
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
    body: "<p>Ésta librería o SDK facilita la comunicación versátil con las API's de Vtex y permite el desarrollo de sistemas de integración con mayor facilidad. Está diseñada para ser utilizada con PHP, Laravel, Symfony y otros frameworks basados en PHP. Se implementó el patrón de diseño Adaptador para lograr la integración de manera más sencilla. Puedes encontrarla en mi cuenta de GitHub: <a href='https://github.com/josefo727/vtex-api' target='_blank'>https://github.com/josefo727/vtex-api</a></p>",
    tags: [
      "Patrón Adaptador",
      "Clean Code",
      "TDD",
      "Laravel",
      "Symfony",
      "PHP",
    ],
  },
  {
    title: "Crédito KBK",
    body: "<p>Se realizó la integración del medio de pago Crédito Karibik en tienda Vtex Legacy, y posteriormente se migró a Vtex IO (<a href='https://karibik.co/pages/credito-kbk' target='_blank'>https://karibik.co/pages/credito-kbk</a>). Este sistema de pago se enfoca en brindar créditos a los clientes afiliados a Karibik, y fue configurado con un Middleware de Integración (NodeJS/Express, MongoDB y VueJS) para la gestión de dichos créditos. Utilicé TDD y un enfoque Event-Driven para asegurar la fiabilidad y procesar transacciones en tiempo real.</p>",
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
    body: "<p>Se desarrolló el sistema Order Tracking and Visualization para Philip Morris International con una integración a Vtex para inyectar órdenes de diferentes medios de ventas y tipos. Utilicé un enfoque Event-Driven y el patrón Hexagonal para procesar órdenes en tiempo real. En el backend se utilizó Laravel con TDD para garantizar estabilidad, mientras que en el frontend se empleó Vtex IO y ReactJS para componentes administrativos customizados.</p>",
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
    body: "<p>Se desarrolló e implementó un operador de medios de crédito para tiendas Vtex afiliadas, permitiendo la gestión de planes de crédito personalizados. En el backend utilicé PHP/Laravel, aplicando principios SOLID y un enfoque Event-Driven. Para el FrontEnd se creó un Widget para Vtex Legacy y Vtex IO, utilizando Vanilla JS y ReactJS.</p>",
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
    body: "<p>Se creó para The Bar Colombia un custom blog (<a href='https://co.thebar.com/blog' target='_blank'>https://co.thebar.com/blog</a>) con backend en NodeJS/Express y MongoDB. La interfaz administrativa fue creada en ReactJS para Vtex con componentes customizados e integrados al Admin de Vtex. Clean Code y TDD se aplicaron para asegurar la calidad del código y su estabilidad.</p>",
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
    title: "Sirocco — Sistema de Votación Segura y Auditable",
    body: "<p>Diseñé y desarrollé Sirocco, un sistema de votación/encuestas anónimo, de voto único y a prueba de manipulaciones, con un log de auditoría encadenado criptográficamente (estilo blockchain) y exportación de resultados firmada con Ed25519. Implementé defensas anti-fraude con device fingerprinting, Proof-of-Work contra bots, y atribución geográfica vía GeoIP. Todo el desarrollo siguió mi propia metodología de Spec-Driven Development + TDD. Construido con Laravel, PHP, PostgreSQL y Pest, desplegado con Cloudflare al frente. Finalizado y en producción, disponible en <a href='https://encuestas.josefo.link' target='_blank'>https://encuestas.josefo.link</a>.</p>",
    tags: ["SDD/TDD", "Laravel", "PostgreSQL", "TDD", "Clean Code", "PHP"],
  },
  {
    title: "Cauce — Plataforma B2B de Trueque Multilateral",
    body: "<p>Estoy desarrollando Cauce, una plataforma B2B de trueque multilateral para Venezuela que permite a empresas intercambiar bienes y servicios sin efectivo mediante un algoritmo de emparejamiento cíclico (principio de \"seis grados\") y una unidad de crédito interna (Créditos Cauce). La arquitectura combina Laravel con Filament para el panel administrativo, un motor de emparejamiento en Python con FastAPI, y un frontend Quasar (Vue 3 + TypeScript) como SPA/PWA con soporte móvil vía Capacitor. Sigue mi propia metodología SDD+TDD, con invariantes del sistema respaldados por tests de propiedades. Actualmente en desarrollo activo (pre-MVP, fundamentos completos).</p>",
    tags: ["Laravel", "Filament", "Python", "TypeScript", "SDD/TDD", "VueJS"],
  },
  {
    title: "Maná del Cielo — Lector Bíblico Offline y Privado",
    body: "<p>Estoy desarrollando Maná del Cielo, una app de lectura bíblica 100% offline, sin anuncios, sin rastreo y sin cuentas, con plan de lectura anual flexible y notificaciones condicionales. Construida en Flutter/Dart, con Riverpod, Drift (SQLite + FTS5), go_router e i18n completo. Las versiones bíblicas se distribuyen como paquetes firmados y verificados por integridad, producidos por un pipeline propio en Python (Content Forge) ya completo de extremo a extremo. Todo el desarrollo sigue mi metodología SDD+TDD. En desarrollo activo, con lanzamiento planeado primero en Android.</p>",
    tags: ["Flutter", "Dart", "Python", "SDD/TDD", "Clean Code"],
  },
  {
    title: "Bajo la Lupa — Plataforma Editorial y de Reseñas",
    body: "<p>Desarrollé Bajo la Lupa, una plataforma editorial que publica reseñas de libros, artículos y cursos, con gestión de autores, series y categorías. Construida en Laravel con Filament para el panel administrativo y Livewire para las interacciones dinámicas, incluye búsqueda con Meilisearch, gestión de medios con Spatie Media Library, SEO completo (sitemap, feed RSS, schema.org) y almacenamiento en S3. Sigue mi metodología SDD+TDD. Disponible en <a href='https://bajolalupa.net' target='_blank'>bajolalupa.net</a>.</p>",
    tags: ["Laravel", "Filament", "Livewire", "SDD/TDD", "SEO"],
  },
  {
    title: "Biogenesis — Sistema de Gestión para Laboratorios Clínicos",
    body: "<p>Desarrollé Biogenesis, un sistema de gestión para laboratorios clínicos con arquitectura multi-tenant, que administra pacientes, solicitudes de servicios, prefacturación y facturación. El backend usa Laravel con Horizon para colas, Sanctum para autenticación de API, y Spatie para permisos, auditoría y manejo de medios. El frontend en Vue 3 con Vuetify incluye dashboards con ApexCharts/Chart.js, un editor de texto enriquecido (TipTap) y autorización basada en habilidades con CASL.</p>",
    tags: ["Laravel", "VueJS", "Multi-tenancy", "Clean Code", "API Rest"],
  },
  {
    title: "Somos URV — Sitio Institucional",
    body: "<p>Desarrollé Somos URV, el sitio institucional de la organización, con gestión de noticias, roster de liderazgo y contenido en varios idiomas. Construido en Laravel con Filament para el panel administrativo, búsqueda con Meilisearch, permisos y contenido multi-idioma vía Spatie, y generación de códigos QR. Sigue mi metodología SDD+TDD. Disponible en <a href='https://somos-urv.org' target='_blank'>somos-urv.org</a>.</p>",
    tags: ["Laravel", "Filament", "SDD/TDD", "i18n"],
  },
  {
    title: "Qbano — Checkout Rápido e Integración de Cupones VTEX",
    body: "<p>Desarrollé para Qbano un checkout rápido con integración de datáfono físico y gift cards sobre VTEX IO, además de un microservicio independiente de encuestas y cupones que alimenta un sitio externo de encuestas al cliente. Trabajo full-stack con componentes React/TypeScript en el storefront y servicios backend en Node.</p>",
    tags: ["VTEX", "React", "TypeScript", "Node", "API Rest"],
  },
  {
    title: "Integración Nequi/Gravity — Orquestación de Pagos",
    body: "<p>Desarrollé el backend de integración entre Nequi y un flujo de pagos ('Gravity') con Credibanco DX4000 para un cliente VTEX, incluyendo aprovisionamiento por comercio, superficies de pago en kiosco y notificaciones push de pago. Construido en Laravel con Sanctum, bajo un flujo estricto de TDD (tests rojo/verde por comando y contrato versionado).</p>",
    tags: ["Laravel", "TDD", "SDD/TDD", "API Rest", "PHP"],
  },
  {
    title: "CatalogFlip — Plataforma de Catálogos Digitales Interactivos",
    body: "<p>Desarrollé CatalogFlip, una plataforma propia para crear catálogos digitales interactivos a partir de PDFs, con hotspots (botones de compra, enlaces, video), analítica integrada con Google Analytics 4, catálogos embebibles vía iframe/JavaScript y colaboración en equipo con permisos por rol. Construida en React con Vite, Tailwind CSS y Supabase (PostgreSQL, autenticación y almacenamiento).</p>",
    tags: ["React", "Tailwind CSS", "PostgreSQL", "SaaS"],
  },
  {
    title: "Almacenes Brissa — Ecosistema de Apps Custom VTEX",
    body: "<p>Desarrollé un conjunto de aplicaciones a medida para Almacenes Brissa sobre VTEX IO: apps de financiamiento y kits de producto, recogida en tienda con notificaciones por WhatsApp, sincronización de datos de clientes entre subcuentas, checkout rápido con datáfono, y temas de kiosco/tótem para tiendas y eventos. Trabajo full-stack en React/TypeScript y servicios backend en Node.</p>",
    tags: ["VTEX", "React", "TypeScript", "Node", "API Rest"],
  },
  {
    title: "Servicio de Notificaciones WhatsApp por Estado de Pedido",
    body: "<p>Desarrollé un servicio de notificaciones que escucha eventos de cambio de estado de pedidos en VTEX (vía \"orders-broadcast\") y los procesa con un middleware en Laravel, junto con un componente de administración en VTEX Admin para configurar qué estados notificar por WhatsApp. Desplegado en múltiples tiendas VTEX bajo un flujo spec-driven con journal de sesiones.</p>",
    tags: ["Laravel", "VTEX", "Node", "SDD/TDD", "API Rest"],
  },
  {
    title: "Calzatodo — Tarjetas de Regalo VTEX IO",
    body: "<p>Desarrollé para Calzatodo un microservicio VTEX IO (Node.js/TypeScript con KoaJS) que gestiona de forma segura la emisión de tarjetas de regalo sobre Master Data, con reintentos automáticos y alertas a Slack ante fallos, validación de límites mensuales de canje por cliente, y una capa de integración con el OMS para procesar eventos de pago aprobado y facturación. Autoescalado de 2 a 4 réplicas según demanda.</p>",
    tags: ["VTEX", "Node", "TypeScript", "Microservicios"],
  },
  {
    title: "Pizzamania — Auto Invoicer con SDD+TDD",
    body: "<p>Diseñé y desarrollé Auto Invoicer, una app VTEX IO para Pizzamania que cierra automáticamente pedidos de marketplace atascados en estado \"pago aprobado\", facturando la orden espejo en la cuenta franquicia (seller) correspondiente para que VTEX propague el estado de facturado de vuelta al marketplace. Apliqué mi propia metodología SDD+TDD, con especificación, plan y contratos documentados; el barrido es idempotente y paginado por cursor, con un modo de recuperación histórica (backfill) capaz de reanudarse tras una interrupción.</p>",
    tags: ["VTEX", "Node", "SDD/TDD", "Automatización"],
  },
  {
    title: "CrediPink — Crédito en Checkout VTEX",
    body: "<p>Desarrollé CrediPink, el backend del producto de compra a crédito propio de la marca LiliPink, integrado al checkout de su tienda VTEX y construido en PHP/Laravel con panel administrativo en Filament. Implementé la validación de identidad y cupo del cliente, la generación de pagarés y confirmación de venta contra la API de crédito, sincronización con el order form del checkout, cancelación automática de pedidos huérfanos y monitoreo del estado del gate de pago en producción. Utilicé PHPUnit para pruebas unitarias y de integración.</p>",
    tags: ["Laravel", "Filament", "PHP", "VTEX", "PHPUnit"],
  },
  {
    title: "MassiveSpace Pro — Plataforma Interna Multi-cliente",
    body: "<p>Diseñé y desarrollé MassiveSpace Pro, una plataforma propia en Laravel/Filament para centralizar la gestión de múltiples clientes de comercio electrónico integrados con VTEX: notificaciones por WhatsApp, recuperación de carritos abandonados, checkout rápido, generación de URLs cortas con códigos QR y facturación masiva de pedidos con reintentos y recuperación histórica (backfill). Apliqué Clean Architecture (controladores de una sola acción, Services, Actions, Repositories sobre Redis, DTOs) con control de roles y permisos (RBAC) vía Spatie, y cobertura de pruebas con PHPUnit para cada dominio de negocio.</p>",
    tags: ["Laravel", "Filament", "PHP", "Redis", "RBAC", "Clean Architecture"],
  },
]

export default successStories
