import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import App from '~/app.vue'

// Deliberately its own file, isolated from person-schema-present.nuxt.spec.ts: @unhead dedupes
// script tags by content, so running this in the same file/document as a test that already
// inserted the same JSON-LD could make this "absence" assertion pass for the wrong reason.
describe('app.vue — Person JSON-LD off the home/about routes', () => {
  it('does not render it on the contact route', async () => {
    await mountSuspended(App, { route: '/contact' })

    // No waitFor: asserting a stable absence must not pass just because we didn't wait long enough.
    await new Promise((resolve) => setTimeout(resolve, 50))
    expect(document.head.querySelector('script[type="application/ld+json"]')).toBeFalsy()
  })
})
