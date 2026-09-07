import { describe, expect, it } from 'vitest'
import skills from '../../data/skills'

describe('data/skills', () => {
  it('has the same 16 entries as the ported src/data/skills.js', () => {
    expect(skills).toHaveLength(16)
    expect(skills[0]).toEqual({ title: 'HTML 5', image: '/assets/img/logos/html-5.png' })
    expect(skills.at(-1)).toEqual({ title: 'Docker', image: '/assets/img/logos/docker.png' })
    for (const skill of skills) {
      expect(typeof skill.title).toBe('string')
      expect(typeof skill.image).toBe('string')
    }
  })
})
