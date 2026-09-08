import { describe, expect, it, vi } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import App from '~/app.vue'

describe('app.vue — Person JSON-LD on home', () => {
  it('renders a Person JSON-LD script tag on the home route', async () => {
    await mountSuspended(App, { route: '/' })

    await vi.waitFor(() => {
      expect(document.head.querySelector('script[type="application/ld+json"]')).toBeTruthy()
    })
  })
})
