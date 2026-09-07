# Research — 003-content-refresh

## Skill logo assets

- **captured:** 2026-09-06
- **source:** Simple Icons project (MIT-licensed brand-icon SVGs), `raw.githubusercontent.com/simple-icons/simple-icons`
- **why consulted:** `data/skills.ts`'s `Skill.image` field is required (matches every one of the 16 existing entries); the 8 new skills need a logo asset the same way.

### Findings

- Confirmed (HTTP 200) official SVG icons exist for 7 of the 8 new skills: `filament`, `livewire`, `postgresql`, `python`, `flutter`, `dart`, `typescript`, `tailwindcss`.
- **SDD/TDD has no brand icon** — it's a methodology, not a product/company. User decision (2026-09-06): hand-author a simple original SVG for it, consistent with ADR 0002's existing "hand-authored SVG icons, no icon package" direction, rather than leaving the field empty (which would require a template change to `AboutSkills.vue`, itself out of this feature's non-goals).

### Decision impact

- Ties to `plan.md` §Module layout: 7 SVGs downloaded verbatim from Simple Icons into `public/assets/img/logos/`; 1 (`sdd-tdd.svg`) hand-authored.
- No new npm dependency — these are static asset files, not an icon package/library.

## Content research (success-story bodies)

Not a library/service research item — this is factual research into the user's own project repos (`~/Projects/survey-system`, `cauce`, `manadelcielo(+forge)`, `bajo-la-lupa`, `bio-labs-dev/bio-labs`, `urv-web-site/somos-urv`, and 5 under `~/Projects/massive-space`) to draft accurate `title`/`body`/`tags` content, per Article V — confirmed with the user before being written into `data/success-stories.ts`. See `plan.md` §Rollout for the process; findings and the drafted copy are presented for approval during `implement`, not preserved as a separate research artifact here (the source is the user's own code, not third-party documentation).
