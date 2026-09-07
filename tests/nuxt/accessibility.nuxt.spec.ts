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

describe('accessibility (WCAG 2.1 AA)', () => {
  it.each(PAGES)('$name has zero WCAG 2.1 AA violations', async ({ component }) => {
    const wrapper = await mountSuspended(component, { attachTo: document.body })

    const results = await axe.run(wrapper.element, { runOnly: { type: 'tag', values: WCAG_TAGS } })

    expect(results.violations).toEqual([])
  })

  it('error.vue has zero WCAG 2.1 AA violations', async () => {
    const wrapper = await mountSuspended(ErrorPage, {
      props: { error: { statusCode: 404, statusMessage: 'Not Found' } },
      attachTo: document.body,
    })

    const results = await axe.run(wrapper.element, { runOnly: { type: 'tag', values: WCAG_TAGS } })

    expect(results.violations).toEqual([])
  })
})
