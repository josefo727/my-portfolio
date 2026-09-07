import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import LocaleSwitcher from '~/components/layout/LocaleSwitcher.vue'

describe('components/layout/LocaleSwitcher', () => {
  it('links to the same page in the other locale, not the home page', async () => {
    const wrapper = await mountSuspended(LocaleSwitcher, { route: '/about' })

    const link = wrapper.find('a')
    expect(link.exists()).toBe(true)
    expect(link.attributes('href')).toBe('/en/about')
  })

  it('links back to the Spanish page when already on an /en route', async () => {
    const wrapper = await mountSuspended(LocaleSwitcher, { route: '/en/about' })

    const link = wrapper.find('a')
    expect(link.attributes('href')).toBe('/about')
  })
})
