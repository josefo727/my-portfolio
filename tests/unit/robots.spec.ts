import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const ROBOTS_PATH = resolve(process.cwd(), 'public/robots.txt')

describe('public/robots.txt', () => {
  it('exists, allows all crawlers, and points to the real sitemap index', () => {
    expect(existsSync(ROBOTS_PATH)).toBe(true)

    const content = readFileSync(ROBOTS_PATH, 'utf-8')

    expect(content).toMatch(/User-agent:\s*\*/)
    expect(content).toMatch(/Allow:\s*\//)
    // sitemap.xml is a static HTML redirect page in this multi-locale setup (see spec.md
    // Amendments, 2026-09-08) — robots.txt must reference the real XML entry point instead.
    expect(content).toContain('Sitemap: https://hv.jose-gutierrez.com/sitemap_index.xml')
  })
})
