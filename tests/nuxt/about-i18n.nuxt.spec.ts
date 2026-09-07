import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import AboutProfile from '~/components/about/AboutProfile.vue'
import pagesServices from '~/pages/services.vue'
import ContactInfo from '~/components/contact/ContactInfo.vue'

describe('AboutProfile — i18n', () => {
  it('renders English static copy and an English-formatted age/birthday on an /en route', async () => {
    const wrapper = await mountSuspended(AboutProfile, { route: '/en/about' })
    const text = wrapper.text()

    expect(text).toContain('About Me')
    expect(text).toContain('Date of Birth:')
    expect(text).toContain('Level:')
    expect(text).toMatch(/\d+ years/)
    expect(text).toMatch(/- October -/)
    expect(text).not.toMatch(/años/)
    expect(text).not.toMatch(/octubre/)
  })

  it('still renders Spanish static copy and a Spanish-formatted age/birthday on the default route', async () => {
    const wrapper = await mountSuspended(AboutProfile, { route: '/about' })
    const text = wrapper.text()

    expect(text).toContain('Acerca de mí')
    expect(text).toContain('Fecha de Nac.:')
    expect(text).toMatch(/\d+ años/)
    expect(text).toMatch(/- octubre -/)
    expect(text).not.toMatch(/\bOctober\b/)
  })
})

describe('pages/services — i18n', () => {
  it('renders English copy on an /en route', async () => {
    const wrapper = await mountSuspended(pagesServices, { route: '/en/services' })
    expect(wrapper.text()).toContain('Services')
  })
})

describe('ContactInfo — i18n', () => {
  it('renders an English heading (not "Contacto") on an /en route', async () => {
    const wrapper = await mountSuspended(ContactInfo, { route: '/en/contact' })
    expect(wrapper.find('h1').text()).toBe('Contact')
  })
})
