import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const source = readFileSync(resolve(process.cwd(), 'nuxt.config.ts'), 'utf-8')

describe('nuxt.config.ts — i18n routing', () => {
  it("registers @nuxtjs/i18n with prefix_except_default strategy and es/en locales", () => {
    expect(source).toMatch(/@nuxtjs\/i18n/)
    expect(source).toMatch(/strategy:\s*['"]prefix_except_default['"]/)
    expect(source).toMatch(/defaultLocale:\s*['"]es['"]/)
    expect(source).toMatch(/code:\s*['"]es['"]/)
    expect(source).toMatch(/code:\s*['"]en['"]/)
  })
})
