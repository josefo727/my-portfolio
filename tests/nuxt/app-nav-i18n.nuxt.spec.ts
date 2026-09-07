import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import AppNav from '~/components/layout/AppNav.vue'

describe('components/layout/AppNav — i18n', () => {
  it('renders Spanish labels on a default-locale route', async () => {
    const wrapper = await mountSuspended(AppNav, { route: '/about' })

    expect(wrapper.text()).toContain('Inicio')
    expect(wrapper.text()).toContain('Acerca de mí')
    expect(wrapper.text()).toContain('Contacto')
  })

  it('renders English labels on an /en route', async () => {
    const wrapper = await mountSuspended(AppNav, { route: '/en/about' })

    expect(wrapper.text()).toContain('Home')
    expect(wrapper.text()).toContain('About Me')
    expect(wrapper.text()).toContain('Contact')
  })

  it('keeps links locale-aware — /en/about stays under /en', async () => {
    const wrapper = await mountSuspended(AppNav, { route: '/en/about' })

    const hrefs = wrapper.findAll('a').map((a) => a.attributes('href'))
    expect(hrefs).toContain('/en/about')
    expect(hrefs).toContain('/en/contact')
    expect(hrefs).not.toContain('/about')
  })
})
