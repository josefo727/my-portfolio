# Research — 002-visual-design

## Notes

No new library or service is introduced by this feature. Styling stays plain CSS (custom properties + native CSS Grid/media queries), per ADR 0002's existing decision — no new stack choice to research via context7.

The one open technical question this feature resolves is a **testing-approach** decision (how to verify CSS behavior — hover/focus states, media-query breakpoints, list resets — without a browser-driven E2E tool), not a library choice. See `adr/0003-visual-design-test-approach.md` and `plan.md` §Test strategy.
