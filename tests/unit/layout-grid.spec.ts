import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const source = readFileSync(resolve(process.cwd(), 'layouts/default.vue'), 'utf-8')

describe('layouts/default.vue — sidebar/content grid', () => {
  it('defines a 768px breakpoint switching to a two-column grid', () => {
    expect(source).toMatch(/@media\s*\(min-width:\s*768px\)/)
    expect(source).toMatch(/grid-template-columns:/)
  })
})
