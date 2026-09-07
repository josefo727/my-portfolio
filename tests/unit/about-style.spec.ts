import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const files = ['AboutProfile', 'AboutSkills', 'AboutFacts'].map((name) => ({
  name,
  source: readFileSync(resolve(process.cwd(), `components/about/${name}.vue`), 'utf-8'),
}))

describe('components/about/* — styling', () => {
  it.each(files)('$name uses the spacing scale between sub-sections', ({ source }) => {
    expect(source).toMatch(/var\(--space-/)
  })

  it('AboutSkills and AboutFacts reset their list bullets', () => {
    const skills = files.find((f) => f.name === 'AboutSkills')!.source
    const facts = files.find((f) => f.name === 'AboutFacts')!.source

    expect(skills).toMatch(/list-style:\s*none/)
    expect(facts).toMatch(/list-style:\s*none/)
  })
})
