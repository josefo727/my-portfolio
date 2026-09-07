import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const files = ['ResumeSummary', 'ResumeExperience', 'ResumeEducation'].map((name) => ({
  name,
  source: readFileSync(resolve(process.cwd(), `components/resume/${name}.vue`), 'utf-8'),
}))

describe('components/resume/* — styling', () => {
  it.each(files)('$name uses the spacing scale', ({ source }) => {
    expect(source).toMatch(/var\(--space-/)
  })

  it('ResumeSummary and ResumeExperience reset their list bullets', () => {
    const summary = files.find((f) => f.name === 'ResumeSummary')!.source
    const experience = files.find((f) => f.name === 'ResumeExperience')!.source

    expect(summary).toMatch(/list-style:\s*none/)
    expect(experience).toMatch(/list-style:\s*none/)
  })
})
