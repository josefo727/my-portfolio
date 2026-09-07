import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const source = readFileSync(resolve(process.cwd(), 'components/layout/AppHeader.vue'), 'utf-8')

describe('components/layout/AppHeader.vue — styling', () => {
  it('resets the social-link list bullets, spaces the profile block, and styles hover/focus', () => {
    expect(source).toMatch(/list-style:\s*none/)
    expect(source).toMatch(/var\(--space-/)
    expect(source).toMatch(/:hover\s*{/)
    expect(source).toMatch(/:focus-visible\s*{/)
  })
})
