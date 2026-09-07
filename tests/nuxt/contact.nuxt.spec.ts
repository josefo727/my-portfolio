import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ContactPage from '~/pages/contact.vue'
import contact from '~/data/contact'

describe('pages/contact', () => {
  it('renders contact info and a mailto link, with no submitting form', async () => {
    const wrapper = await mountSuspended(ContactPage)
    const text = wrapper.text()

    expect(text).toContain(contact.email)
    expect(text).toContain(contact.phone)
    expect(wrapper.find(`a[href="mailto:${contact.email}"]`).exists()).toBe(true)
    expect(wrapper.find(`a[href="${contact.linkedin}"]`).exists()).toBe(true)
    expect(wrapper.find('form').exists()).toBe(false)
  })
})
