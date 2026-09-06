# Clarify log — 001-nuxt3-portfolio-rewrite

## Q1 — performance budget

- Marker: "does this feature require a specific performance budget (e.g., a minimum Lighthouse performance score), or is 'static generation with no third-party template bloat' considered sufficient without a numeric target for now?"
- Options presented:
  - No numeric target for now (default/easy path) — rely on SSG + dropping the third-party template's weight (acceptance criteria 1, 2, 5) as the de facto performance improvement.
  - Fix a numeric threshold now (rigorous path) — e.g., Lighthouse performance ≥ 90 as an additional acceptance criterion.
  - Other (free text).
- Decision: no numeric target for now.
- Reason: the rewrite already removes the generic third-party template (Bootstrap/AOS/Boxicons/jQuery/Owl Carousel/Isotope/CounterUp/Venobox) and moves to SSG, which are the dominant performance levers here; a numeric budget can be added later, deliberately, once there's a baseline Lighthouse run to compare against instead of a number picked without data.
- Date: 2026-09-06.
