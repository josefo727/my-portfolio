import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const source = readFileSync(resolve(process.cwd(), 'components/layout/AppFooter.vue'), 'utf-8')

describe('components/layout/AppFooter.vue — styling', () => {
  it('spaces the footer using the spacing scale', () => {
    expect(source).toMatch(/var\(--space-/)
  })
})
