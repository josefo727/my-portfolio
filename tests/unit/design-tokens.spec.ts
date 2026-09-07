import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const cssPath = resolve(process.cwd(), 'assets/css/main.css')

describe('design tokens (assets/css/main.css)', () => {
  const css = readFileSync(cssPath, 'utf-8')

  it('defines the color, spacing, and type-scale custom properties on :root', () => {
    expect(css).toMatch(/--color-text\s*:/)
    expect(css).toMatch(/--color-background\s*:/)
    expect(css).toMatch(/--space-md\s*:/)
    expect(css).toMatch(/--font-size-base\s*:/)
  })

  it('resets box-sizing without importing any third-party stylesheet', () => {
    expect(css).toMatch(/box-sizing:\s*border-box/)
    expect(css).not.toMatch(/@import/)
  })
})
