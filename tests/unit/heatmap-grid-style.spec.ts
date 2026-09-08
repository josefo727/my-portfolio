import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const source = readFileSync(resolve(process.cwd(), 'components/home/HeatmapGrid.vue'), 'utf-8')

describe('components/home/HeatmapGrid.vue — styling', () => {
  it('declares a @keyframes rule and animates each cell with a staggered delay', () => {
    expect(source).toMatch(/@keyframes\s+[\w-]+/)
    expect(source).toMatch(/animation:/)
    expect(source).toMatch(/animation-delay:\s*calc\(var\(--i\)/)
  })
})
