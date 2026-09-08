# Research — 005-home-about-redesign

## Notes

No new library or service is introduced by this feature. Article VII already declares "Randomness: none" and "Third parties: none" as this project's boundaries, and the spec's non-goals explicitly reject a live/API-backed GitHub graph — so there is no external library to research via context7 for the decorative heatmap, and no candidate was evaluated for it.

The two-column About layout and the Home activity-list restyling are plain CSS on already-existing markup, extending `002-visual-design`'s ADR 0002 (plain CSS, no dependency) — nothing new to research there either.

The one open technical question this feature resolves is **how the decorative heatmap's cell pattern is produced deterministically** (not a library choice, an internal algorithm decision) and **how that changes the test approach** established by `002-visual-design`'s ADR 0003 (pure source-text CSS assertions) — since a pattern-generating function is real logic, not styling. See `adr/0005-heatmap-decoration-approach.md` and `plan.md` §Test strategy.
