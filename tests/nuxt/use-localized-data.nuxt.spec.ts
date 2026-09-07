import { describe, expect, it } from 'vitest'
import { defineComponent, h } from 'vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { useLocalizedData } from '~/composables/use-localized-data'

const Probe = defineComponent({
  setup() {
    const value = useLocalizedData('spanish-value', 'english-value')
    return () => h('span', value)
  },
})

describe('composables/use-localized-data', () => {
  it('returns the Spanish value on a default-locale route', async () => {
    const wrapper = await mountSuspended(Probe, { route: '/about' })
    expect(wrapper.text()).toBe('spanish-value')
  })

  it('returns the English value on an /en route', async () => {
    const wrapper = await mountSuspended(Probe, { route: '/en/about' })
    expect(wrapper.text()).toBe('english-value')
  })
})
