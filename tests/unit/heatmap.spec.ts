import { describe, expect, it } from 'vitest'
import { generateHeatmapPattern } from '../../utils/heatmap'

describe('utils/heatmap — generateHeatmapPattern', () => {
  it('returns a flat array of length rows*cols', () => {
    const pattern = generateHeatmapPattern(7, 14)

    expect(pattern).toHaveLength(7 * 14)
  })

  it('every value is an integer in [0, 4]', () => {
    const pattern = generateHeatmapPattern(7, 14)

    for (const value of pattern) {
      expect(Number.isInteger(value)).toBe(true)
      expect(value).toBeGreaterThanOrEqual(0)
      expect(value).toBeLessThanOrEqual(4)
    }
  })

  it('is deterministic — the same dimensions always produce the same pattern', () => {
    const first = generateHeatmapPattern(7, 14)
    const second = generateHeatmapPattern(7, 14)

    expect(second).toEqual(first)
  })

  it('different dimensions change the output length', () => {
    const small = generateHeatmapPattern(3, 4)
    const large = generateHeatmapPattern(7, 14)

    expect(small).toHaveLength(12)
    expect(large).toHaveLength(98)
  })
})
