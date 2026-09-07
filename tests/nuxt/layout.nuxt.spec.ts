import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import DefaultLayout from '~/layouts/default.vue'
import AppNav from '~/components/layout/AppNav.vue'
import AppHeader from '~/components/layout/AppHeader.vue'
import AppFooter from '~/components/layout/AppFooter.vue'

const EXPECTED_ROUTES = [
  '/',
  '/about',
  '/resume',
  '/libraries',
  '/success-stories',
  '/certifications',
  '/contact',
]

describe('layouts/default', () => {
  it('renders the header, the page content, and the footer', async () => {
    const wrapper = await mountSuspended(DefaultLayout, {
      slots: { default: () => 'PAGE CONTENT MARKER' },
    })

    expect(wrapper.findComponent(AppHeader).exists()).toBe(true)
    expect(wrapper.text()).toContain('PAGE CONTENT MARKER')
    expect(wrapper.findComponent(AppFooter).exists()).toBe(true)
  })
})

describe('components/layout/AppNav', () => {
  it('links every route this feature ships, excluding /portfolio and /services', async () => {
    const wrapper = await mountSuspended(AppNav)
    const hrefs = wrapper.findAll('a').map((a) => a.attributes('href'))

    for (const route of EXPECTED_ROUTES) {
      expect(hrefs).toContain(route)
    }
    expect(hrefs).not.toContain('/portfolio')
    expect(hrefs).not.toContain('/services')
  })
})

describe('components/layout/AppHeader — i18n', () => {
  it('links the site name to the locale home, not always /', async () => {
    const wrapper = await mountSuspended(AppHeader, { route: '/en/about' })
    const homeLink = wrapper.find('h1 a')

    expect(homeLink.attributes('href')).toBe('/en')
  })
})

describe('components/layout/AppFooter', () => {
  it('shows a copyright line', async () => {
    const wrapper = await mountSuspended(AppFooter)
    expect(wrapper.text().toLowerCase()).toContain('josé r. gutierrez')
  })
})
