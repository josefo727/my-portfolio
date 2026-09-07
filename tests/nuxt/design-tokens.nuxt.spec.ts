import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import App from '~/app.vue'

describe('design tokens', () => {
  it('defines the color/spacing/type-scale custom properties on :root', async () => {
    await mountSuspended(App)

    const root = getComputedStyle(document.documentElement)

    expect(root.getPropertyValue('--color-text').trim()).not.toBe('')
    expect(root.getPropertyValue('--color-background').trim()).not.toBe('')
    expect(root.getPropertyValue('--space-md').trim()).not.toBe('')
    expect(root.getPropertyValue('--font-size-base').trim()).not.toBe('')
  })
})
