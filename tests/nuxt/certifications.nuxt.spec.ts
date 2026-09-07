import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import CertificationsPage from '~/pages/certifications.vue'
import certifications from '~/data/certifications'

describe('pages/certifications', () => {
  it('renders every entry from data/certifications.ts as a static list, with no vue-flux carousel', async () => {
    const wrapper = await mountSuspended(CertificationsPage)

    expect(wrapper.findAll('img')).toHaveLength(certifications.length)
    const text = wrapper.text()
    for (const cert of certifications) {
      expect(text).toContain(cert.caption)
    }
    expect(wrapper.html()).not.toContain('vue-flux')
  })
})
