import { describe, expect, it, vi } from 'vitest'
import { defineComponent, h } from 'vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { usePageSeo } from '~/composables/use-page-seo'

const Probe = defineComponent({
  setup() {
    usePageSeo('home')
    return () => h('div')
  },
})

// @unhead's DOM plugin patches document.title/meta tags asynchronously (debounced), so each
// assertion below waits for the expected value rather than asserting immediately after mount.
async function waitForTitle(expected: string) {
  await vi.waitFor(() => expect(document.title).toBe(expected))
}

describe('composables/use-page-seo', () => {
  it('sets title, description, Open Graph, and Twitter Card tags from the seo.home i18n keys', async () => {
    await mountSuspended(Probe, { route: '/', attachTo: document.body })
    await waitForTitle('José R. Gutierrez — Desarrollador Web Full-Stack')

    const description = document.head.querySelector('meta[name="description"]')
    expect(description?.getAttribute('content')).toContain('Portafolio de José R. Gutierrez')

    const ogTitle = document.head.querySelector('meta[property="og:title"]')
    expect(ogTitle?.getAttribute('content')).toBe('José R. Gutierrez — Desarrollador Web Full-Stack')

    const ogImage = document.head.querySelector('meta[property="og:image"]')
    expect(ogImage?.getAttribute('content')).toBe('https://hv.jose-gutierrez.com/assets/img/profile-img.jpeg')

    const twitterCard = document.head.querySelector('meta[name="twitter:card"]')
    expect(twitterCard?.getAttribute('content')).toBe('summary_large_image')
  })

  it('sets English title/description on an /en route', async () => {
    await mountSuspended(Probe, { route: '/en', attachTo: document.body })
    await waitForTitle('José R. Gutierrez — Full-Stack Web Developer')
  })
})
