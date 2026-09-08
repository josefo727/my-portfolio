import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const source = readFileSync(resolve(process.cwd(), 'components/home/Hero.vue'), 'utf-8')

describe('components/home/Hero.vue — styling', () => {
  it('resets the activities list bullets and spaces/sizes text with the design scales', () => {
    expect(source).toMatch(/list-style:\s*none/)
    expect(source).toMatch(/var\(--space-/)
    expect(source).toMatch(/var\(--font-size-/)
  })

  it('renders the activity list as individual badges, not a middle-dot separated line', () => {
    expect(source).not.toMatch(/content:\s*['"]·['"]/)
    expect(source).toMatch(/border-radius:\s*999px/)
  })

  it('only shows the decorative heatmap on viewports >=768px', () => {
    expect(source).toMatch(/@media\s*\(min-width:\s*768px\)/)
  })

  it('wraps HeatmapGrid in its own element instead of styling its root directly', () => {
    // Regression guard: a class applied straight on <HeatmapGrid> lands on the same root
    // element as HeatmapGrid's own `display: grid` rule. Two same-specificity `display`
    // declarations targeting one element race on stylesheet load order — server-rendered
    // HTML and post-hydration CSS injection can disagree on which wins, collapsing the grid's
    // empty cells to zero height with no console error. Found live 2026-09-07 (rendered for
    // ~1s, then collapsed). A dedicated wrapper keeps the two components' styles disjoint.
    expect(source).not.toMatch(/<HeatmapGrid[^>]*\sclass=/)
  })
})
