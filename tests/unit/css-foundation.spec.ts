import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const css = readFileSync(resolve(process.cwd(), 'assets/css/main.css'), 'utf-8')

describe('assets/css/main.css — global foundation', () => {
  it('defines a link default state and a hover state', () => {
    expect(css).toMatch(/\ba\s*{[^}]*color:/)
    expect(css).toMatch(/\ba:hover\s*{/)
  })

  it('defines a :focus-visible outline fallback', () => {
    expect(css).toMatch(/:focus-visible\s*{[^}]*outline:/)
  })

  it('caps image width so oversized images cannot cause horizontal overflow', () => {
    expect(css).toMatch(/\bimg\s*{[^}]*max-width:\s*100%/)
  })
})
