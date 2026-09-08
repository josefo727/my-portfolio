# contract: robots
# version: 1.0.0
# captured: 2026-09-08
# source: internal origin (hand-authored, no library)

Static file served at the site root: `/robots.txt`.

## Shape

```
User-agent: *
Allow: /

Sitemap: https://hv.jose-gutierrez.com/sitemap.xml
```

## Invariants

- Allows all crawlers, all paths.
- References the sitemap's absolute URL (matches `sitemap.md`'s contract).
- Content never changes as pages are added/removed — this is why it stays a hand-authored static file rather than a generated one (see `research.md`, ADR 0006).

## Verification

Provider-owned — verified by running `nuxi generate` and inspecting `.output/public/robots.txt` directly, per `plan.md` §Test strategy's build-level check.
