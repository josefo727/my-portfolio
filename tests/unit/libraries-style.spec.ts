import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const source = readFileSync(resolve(process.cwd(), 'components/libraries/LibraryDoc.vue'), 'utf-8')

describe('components/libraries/LibraryDoc.vue — styling', () => {
  it('styles the disclosure summary with hover/focus states and spaces its content', () => {
    expect(source).toMatch(/summary[^{]*:hover\s*{|:hover\s*{/)
    expect(source).toMatch(/:focus-visible\s*{/)
    expect(source).toMatch(/var\(--space-/)
  })
})
