import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import HomePage from '~/pages/index.vue'
import personal from '~/data/personal'

describe('pages/index', () => {
  it("renders the visitor's name and at least one activity, as static text", async () => {
    const wrapper = await mountSuspended(HomePage)

    expect(wrapper.text()).toContain(personal.short_name)
    expect(wrapper.text()).toContain(personal.activities[0])
  })
})
