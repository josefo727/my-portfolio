import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ResumeEducation from '~/components/resume/ResumeEducation.vue'
import education from '~/data/education'

describe('components/resume/ResumeEducation', () => {
  it('lists every entry from data/education.ts', async () => {
    const wrapper = await mountSuspended(ResumeEducation)
    const text = wrapper.text()

    for (const entry of education) {
      expect(text).toContain(entry.title)
      expect(text).toContain(entry.institution)
    }
    expect(wrapper.findAll('h4')).toHaveLength(education.length)
  })
})
