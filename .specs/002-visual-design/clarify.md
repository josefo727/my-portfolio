# Clarify log — 002-visual-design

## Q1 — dark mode

- Marker: "dark mode — in scope for this feature, or explicitly deferred? The current token set (`assets/css/main.css`) only defines a light palette."
- Options presented:
  - Out of scope for now (default/easy path) — only the light palette is defined; dark mode revisited later if requested.
  - Include it now (rigorous path) — add a full dark palette (`--color-*` alternatives) and a switch, within this same feature.
- Decision: out of scope for now.
- Reason: keeps this feature focused on applying the existing token system to layout/spacing/interactive states; a dark palette plus a persistence/switch mechanism is enough independent surface area to warrant its own future feature if wanted.
- Date: 2026-09-06.
