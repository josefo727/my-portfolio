# contract: robots
# version: 1.0.0
# captured: 2026-09-08
# source: internal origin (hand-authored, no library)

Static file served at the site root: `/robots.txt`.

## Shape

```
User-agent: *
Allow: /

Sitemap: https://hv.jose-gutierrez.com/sitemap_index.xml
```

## Invariants

- Allows all crawlers, all paths.
- References the sitemap **index's** absolute URL, `sitemap_index.xml` — not `sitemap.xml` (a static HTML redirect page in this multi-locale setup, not valid XML — see `sitemap.md`'s contract and `spec.md`'s Amendments).
- Content never changes as pages are added/removed — this is why it stays a hand-authored static file rather than a generated one (see `research.md`, ADR 0006).

## Verification

Provider-owned — verified by running `nuxi generate` and inspecting `.output/public/robots.txt` directly, per `plan.md` §Test strategy's build-level check.
