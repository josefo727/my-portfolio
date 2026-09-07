import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const source = readFileSync(resolve(process.cwd(), 'components/contact/ContactInfo.vue'), 'utf-8')

describe('components/contact/ContactInfo.vue — styling', () => {
  it('resets both lists, spaces them with the scale, and styles link hover/focus', () => {
    expect(source).toMatch(/list-style:\s*none/)
    expect(source).toMatch(/var\(--space-/)
    expect(source).toMatch(/:hover\s*{/)
    expect(source).toMatch(/:focus-visible\s*{/)
  })
})
