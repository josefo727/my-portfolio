# Contracts — Index — 001-nuxt3-portfolio-rewrite

## Purpose

Machine-readable shape of every boundary this feature touches. See `plan.md` §Boundaries.

## Status: no contracts in this feature

Article VII of `.specs/constitution.md` declares this project's boundaries, and `plan.md` §Boundaries confirms none of them gain a process/network edge in this feature:

- No HTTP consumer or provider (the pre-existing `forms/contact.php` target is dropped, not replaced — see `plan.md`'s "Contact page note").
- No database, no queue.
- Filesystem access is build-time only (Nuxt/Vite reading `data/*.ts`), not a runtime boundary.
- Google Fonts remains a load-time asset dependency, explicitly called out in Article VII as "not a mockable boundary" — no contract applies to it.

This directory is kept (with this index) so that feature 002 or 003 — if either introduces a real external boundary (e.g., a working contact-form endpoint, an i18n content service) — has a place to add `contracts/<name>.*` following `templates/contracts.md`'s conventions, gated by Article IV (contract-first integration) before any consumer code exists.
