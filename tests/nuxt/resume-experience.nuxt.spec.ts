import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ResumeExperience from '~/components/resume/ResumeExperience.vue'
import experience from '~/data/experience'

describe('components/resume/ResumeExperience', () => {
  it('lists every entry from data/experience.ts', async () => {
    const wrapper = await mountSuspended(ResumeExperience)
    const text = wrapper.text()

    for (const entry of experience) {
      expect(text).toContain(entry.title)
      expect(text).toContain(entry.company)
    }
    expect(wrapper.findAll('h4')).toHaveLength(experience.length)
  })
})
