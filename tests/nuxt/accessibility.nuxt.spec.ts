import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import axe from 'axe-core'
import HomePage from '~/pages/index.vue'
import AboutPage from '~/pages/about.vue'
import ResumePage from '~/pages/resume.vue'
import ServicesPage from '~/pages/services.vue'
import SuccessStoriesPage from '~/pages/success-stories.vue'
import CertificationsPage from '~/pages/certifications.vue'
import LibrariesPage from '~/pages/libraries.vue'
import ContactPage from '~/pages/contact.vue'
import ErrorPage from '~/error.vue'

const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']

const PAGES = [
  { name: '/', component: HomePage },
  { name: '/about', component: AboutPage },
  { name: '/resume', component: ResumePage },
  { name: '/services', component: ServicesPage },
  { name: '/success-stories', component: SuccessStoriesPage },
  { name: '/certifications', component: CertificationsPage },
  { name: '/libraries', component: LibrariesPage },
  { name: '/contact', component: ContactPage },
]

const LOCALES = [
  { code: 'es', prefix: '' },
  { code: 'en', prefix: '/en' },
]

const CASES = LOCALES.flatMap(({ code, prefix }) =>
  PAGES.map(({ name, component }) => {
    const route = name === '/' ? `${prefix}/` : `${prefix}${name}`
    return { label: `${route} (${code})`, route, component }
  }),
)

describe('accessibility (WCAG 2.1 AA)', () => {
  it.each(CASES)('$label has zero WCAG 2.1 AA violations', async ({ route, component }) => {
    const wrapper = await mountSuspended(component, { route, attachTo: document.body })

    const results = await axe.run(wrapper.element, { runOnly: { type: 'tag', values: WCAG_TAGS } })

    expect(results.violations).toEqual([])
  })

  it.each(LOCALES)('error.vue has zero WCAG 2.1 AA violations ($code)', async ({ prefix }) => {
    const wrapper = await mountSuspended(ErrorPage, {
      route: `${prefix}/`,
      props: { error: { statusCode: 404, statusMessage: 'Not Found' } },
      attachTo: document.body,
    })

    const results = await axe.run(wrapper.element, { runOnly: { type: 'tag', values: WCAG_TAGS } })

    expect(results.violations).toEqual([])
  })
})
