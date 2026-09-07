import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import SuccessStoriesPage from '~/pages/success-stories.vue'
import successStories from '~/data/success-stories'

describe('pages/success-stories', () => {
  it('renders every entry from data/success-stories.ts', async () => {
    const wrapper = await mountSuspended(SuccessStoriesPage)
    const text = wrapper.text()

    for (const story of successStories) {
      expect(text).toContain(story.title)
      for (const tag of story.tags) {
        expect(text).toContain(tag)
      }
    }
    expect(wrapper.findAll('h2, h3').length).toBeGreaterThanOrEqual(successStories.length)
  })
})
