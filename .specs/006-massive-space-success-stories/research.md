# Research — 006-massive-space-success-stories

No external library or service is touched by this feature — no `context7` queries needed (per `AGENTS.md` rule 3, reserved for code that touches an external library/framework/SDK; this feature only appends static data literals using an interface already established in `001`/`004`).

## Content research (success-story bodies)

Not a library/service research item — this is factual research into the user's own project repos under `~/Projects/massive-space/`, already conducted this session via an Explore agent dispatched for the 8 deferred candidates' triage (Calzatodo, Ficohsa/La Colonia, Pizzamania, Pepe Ganga, Juriscoop, Lilipink, Speedo, MassiveSpace Pro). Findings — per-repo authorship verified via `git log`, tech stack read from `composer.json`/`package.json`, scope boundaries identified — are recorded in full in `.specs/onboarding.md` (2026-09-08 entry). The 4 selected candidates and their source paths:

- **Calzatodo** — `massive-space/calzatodo/backend-services` (VTEX IO Node/TypeScript/Koa, 100% own commits).
- **Pizzamania — Auto Invoicer** — `massive-space/pizzamania/auto-invoicer` (VTEX IO app, 100% own commits, built with its own `.specs/001-marketplace-sweep/` SDD+TDD trail).
- **CrediPink** — `massive-space/lilipink/credi-pink` (Laravel + Filament, 100% own commits, live at `app.credipink.com`).
- **MassiveSpace Pro** — `massive-space/massivespace-pro` (Laravel + Filament, 100% own commits).

Draft `title`/`body`/`tags` copy (Spanish and English) is confirmed with the user during `implement`, per Article V, and is not invented here. See `plan.md` §Rollout for the process.
