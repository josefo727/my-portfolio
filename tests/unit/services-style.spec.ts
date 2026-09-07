import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const source = readFileSync(resolve(process.cwd(), 'pages/services.vue'), 'utf-8')

describe('pages/services.vue — styling', () => {
  it('uses the spacing and type scale', () => {
    expect(source).toMatch(/var\(--space-/)
    expect(source).toMatch(/var\(--font-size-/)
  })
})
