import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import AboutFacts from '~/components/about/AboutFacts.vue'
import facts from '~/data/facts'

describe('components/about/AboutFacts', () => {
  it('lists every entry from data/facts.ts as static text (no counter animation)', async () => {
    const wrapper = await mountSuspended(AboutFacts)
    const text = wrapper.text()

    for (const fact of facts) {
      expect(text).toContain(String(fact.quantity))
      expect(text).toContain(fact.title)
    }
  })
})
