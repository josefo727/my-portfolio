import { describe, expect, it, vi } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import IndexPage from '~/pages/index.vue'
import AboutPage from '~/pages/about.vue'
import ResumePage from '~/pages/resume.vue'
import ServicesPage from '~/pages/services.vue'
import SuccessStoriesPage from '~/pages/success-stories.vue'
import ContactPage from '~/pages/contact.vue'
import ErrorPage from '~/error.vue'

// @unhead's DOM plugin flushes title/meta tag updates asynchronously (debounced) — see
// tests/nuxt/use-page-seo.nuxt.spec.ts for the same gotcha, documented there first.
async function waitForTitle(expected: string) {
  await vi.waitFor(() => expect(document.title).toBe(expected))
}

function assertPageHasSeoTags(expectedTitle: string) {
  expect(document.title).toBe(expectedTitle)

  const description = document.head.querySelector('meta[name="description"]')
  expect(description?.getAttribute('content')?.length).toBeGreaterThan(0)

  const ogTitle = document.head.querySelector('meta[property="og:title"]')
  expect(ogTitle?.getAttribute('content')).toBe(expectedTitle)

  const ogImage = document.head.querySelector('meta[property="og:image"]')
  expect(ogImage?.getAttribute('content')).toBe('https://hv.jose-gutierrez.com/assets/img/profile-img.jpeg')

  const twitterCard = document.head.querySelector('meta[name="twitter:card"]')
  expect(twitterCard?.getAttribute('content')).toBe('summary_large_image')
}

describe('per-page SEO tags', () => {
  it('renders home page SEO tags', async () => {
    await mountSuspended(IndexPage, { route: '/', attachTo: document.body })
    await waitForTitle('José R. Gutierrez — Desarrollador Web Full-Stack')
    assertPageHasSeoTags('José R. Gutierrez — Desarrollador Web Full-Stack')
  })

  it('renders about page SEO tags', async () => {
    await mountSuspended(AboutPage, { route: '/about', attachTo: document.body })
    await waitForTitle('Acerca de mí — José R. Gutierrez')
    assertPageHasSeoTags('Acerca de mí — José R. Gutierrez')
  })

  it('renders resume page SEO tags', async () => {
    await mountSuspended(ResumePage, { route: '/resume', attachTo: document.body })
    await waitForTitle('Resumen Profesional — José R. Gutierrez')
    assertPageHasSeoTags('Resumen Profesional — José R. Gutierrez')
  })

  it('renders services page SEO tags on the English route', async () => {
    await mountSuspended(ServicesPage, { route: '/en/services', attachTo: document.body })
    await waitForTitle('Services — José R. Gutierrez')
    assertPageHasSeoTags('Services — José R. Gutierrez')
  })

  it('renders success-stories page SEO tags', async () => {
    await mountSuspended(SuccessStoriesPage, { route: '/success-stories', attachTo: document.body })
    await waitForTitle('Casos de Éxito — José R. Gutierrez')
    assertPageHasSeoTags('Casos de Éxito — José R. Gutierrez')
  })

  it('renders contact page SEO tags on the English route', async () => {
    await mountSuspended(ContactPage, { route: '/en/contact', attachTo: document.body })
    await waitForTitle('Contact — José R. Gutierrez')
    assertPageHasSeoTags('Contact — José R. Gutierrez')
  })

  it('renders a noindex meta tag on the 404 page, not og:image', async () => {
    await mountSuspended(ErrorPage, {
      route: '/does-not-exist',
      attachTo: document.body,
      props: { error: { statusCode: 404 } },
    })
    await waitForTitle('Página no encontrada — José R. Gutierrez')

    const robots = document.head.querySelector('meta[name="robots"]')
    expect(robots?.getAttribute('content')).toBe('noindex')
  })
})
