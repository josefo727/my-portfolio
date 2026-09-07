import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import App from '~/app.vue'

describe('app.vue — locale head (lang attribute + hreflang)', () => {
  it('sets <html lang="es"> on a default-locale route', async () => {
    await mountSuspended(App, { route: '/about' })

    expect(document.documentElement.lang).toBe('es')
  })

  it('sets <html lang="en"> on an /en route', async () => {
    await mountSuspended(App, { route: '/en/about' })

    expect(document.documentElement.lang).toBe('en')
  })

  it('emits hreflang alternate link tags', async () => {
    await mountSuspended(App, { route: '/about' })

    const alternates = document.head.querySelectorAll('link[rel="alternate"][hreflang]')
    expect(alternates.length).toBeGreaterThan(0)
  })
})
