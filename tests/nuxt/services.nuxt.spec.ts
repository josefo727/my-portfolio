import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ServicesPage from '~/pages/services.vue'

describe('pages/services', () => {
  it('renders an honest minimal shell with no fabricated demo content', async () => {
    const wrapper = await mountSuspended(ServicesPage)
    const text = wrapper.text()

    expect(wrapper.find('h1, h2').exists()).toBe(true)
    expect(text.length).toBeGreaterThan(0)
    expect(text).not.toContain('Lorem Ipsum')
    expect(text).not.toContain('Saul Goodman')
    expect(text).not.toMatch(/testimonial/i)
  })
})
