import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const source = readFileSync(
  resolve(process.cwd(), 'components/success-stories/SuccessStoryCard.vue'),
  'utf-8',
)

describe('components/success-stories/SuccessStoryCard.vue — styling', () => {
  it('resets the tag list bullets and spaces the card with the spacing scale', () => {
    expect(source).toMatch(/list-style:\s*none/)
    expect(source).toMatch(/var\(--space-/)
  })
})
