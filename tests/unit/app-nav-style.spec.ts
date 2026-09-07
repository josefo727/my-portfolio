import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const source = readFileSync(resolve(process.cwd(), 'components/layout/AppNav.vue'), 'utf-8')

describe('components/layout/AppNav.vue — styling', () => {
  it('resets list bullets, spaces links with the spacing scale, and styles hover/focus/active states', () => {
    expect(source).toMatch(/list-style:\s*none/)
    expect(source).toMatch(/var\(--space-/)
    expect(source).toMatch(/:hover\s*{/)
    expect(source).toMatch(/:focus-visible\s*{/)
    expect(source).toMatch(/router-link-active/)
  })
})
