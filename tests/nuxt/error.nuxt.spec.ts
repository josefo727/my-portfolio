import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ErrorPage from '~/error.vue'

describe('error.vue', () => {
  it('shows a not-found message and a link back home', async () => {
    const wrapper = await mountSuspended(ErrorPage, {
      props: { error: { statusCode: 404, statusMessage: 'Not Found' } },
    })

    expect(wrapper.text().toLowerCase()).toContain('no encontr')
    const homeLink = wrapper.find('a[href="/"]')
    expect(homeLink.exists()).toBe(true)
  })
})
