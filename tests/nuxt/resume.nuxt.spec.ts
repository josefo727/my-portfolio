import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ResumePage from '~/pages/resume.vue'
import personal from '~/data/personal'
import location from '~/data/location'
import contact from '~/data/contact'

describe('pages/resume', () => {
  it('renders the summary section with name, location, and contact details', async () => {
    const wrapper = await mountSuspended(ResumePage)
    const text = wrapper.text()

    expect(text).toContain(personal.short_name)
    expect(text).toContain(location.department)
    expect(text).toContain(location.city)
    expect(text).toContain(contact.mobil)
    expect(text).toContain(contact.email)
  })
})
