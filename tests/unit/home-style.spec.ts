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
})
