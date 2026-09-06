# Test inventory — my-portfolio (at onboarding, v0)

## Coverage

Not applicable — **no test suite exists**. No coverage tool configured (`package.json` has no `test` script; no `jest`/`vitest`/`@vue/test-utils` in dependencies).

## Pyramid shape

| Layer | Count |
|---|---|
| Unit | 0 |
| Component | 0 |
| Integration | 0 |
| E2E | 0 |

## Slow tests / flaky tests

N/A — nothing to measure.

## Test smells

N/A — nothing to measure.

## Test-debt ranked list

1. **No harness at all.** Highest-priority item; addressed directly by this onboarding's first feature (Vitest + `@nuxt/test-utils`, user-confirmed) rather than deferred.
2. **No CI to run tests even once they exist.** Scheduled Aspirational; not blocking the first feature, but should follow immediately after (`.github/workflows/ci.yml`: lint + Vitest + build).
3. **No accessibility check.** Currently manual-only (Article VIII); automate once CI exists.

## Note

Per `workflows/brownfield.md` step 3 (Inventory tests) and the "no tests at all" stop-and-ask boundary in `spec-tdd-brownfield`: the user was asked explicitly whether the first feature should include a minimal harness. Answer: **yes** (2026-09-05) — recorded in `.specs/onboarding.md` → Decisions log.
