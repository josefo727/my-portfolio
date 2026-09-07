import { describe, expect, it } from 'vitest'
import successStories from '../../data/success-stories'

describe('data/success-stories', () => {
  it('has the same 9 entries as the ported src/data/success-stories.js', () => {
    expect(successStories).toHaveLength(9)
    expect(successStories[0].title).toBe('Artículos para Vultr')
    expect(successStories[0].tags).toEqual(['Clean Code', 'Docker', 'Kubernetes', 'DevOPS', 'Linux'])
    expect(successStories.at(-1)?.title).toBe('Custom Blog The Bar Colombia')
    for (const story of successStories) {
      expect(typeof story.title).toBe('string')
      expect(typeof story.body).toBe('string')
      expect(story.body).toMatch(/^<p>/)
      expect(Array.isArray(story.tags)).toBe(true)
      expect(story.tags.length).toBeGreaterThan(0)
    }
  })
})
