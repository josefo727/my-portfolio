import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import AboutPage from '~/pages/about.vue'
import personal from '~/data/personal'
import location from '~/data/location'
import contact from '~/data/contact'
import { calculateAge, formatDate } from '~/utils/dates'

describe('pages/about', () => {
  it('renders the profile fields computed from personal/location/contact data', async () => {
    const wrapper = await mountSuspended(AboutPage)
    const text = wrapper.text()

    expect(text).toContain(formatDate(personal.birthday))
    expect(text).toContain(calculateAge(personal.birthday))
    expect(text).toContain(contact.web_site)
    expect(text).toContain(contact.mobil)
    expect(text).toContain(contact.email)
    expect(text).toContain(location.city)
  })
})
