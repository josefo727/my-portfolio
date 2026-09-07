import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import AboutSkills from '~/components/about/AboutSkills.vue'
import skills from '~/data/skills'

describe('components/about/AboutSkills', () => {
  it('lists every entry from data/skills.ts', async () => {
    const wrapper = await mountSuspended(AboutSkills)

    for (const skill of skills) {
      expect(wrapper.text()).toContain(skill.title)
    }
    expect(wrapper.findAll('img')).toHaveLength(skills.length)
  })
})
