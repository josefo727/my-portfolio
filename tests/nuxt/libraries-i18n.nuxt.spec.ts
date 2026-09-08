import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import LibrariesPage from '~/pages/libraries.vue'

describe('pages/libraries — i18n', () => {
  it('renders English write-ups on an /en route', async () => {
    const wrapper = await mountSuspended(LibrariesPage, { route: '/en/libraries' })
    const text = wrapper.text()

    expect(text).toContain('Libraries')
    expect(text).toContain('Library for consuming Vtex Framework APIs')
    expect(text).toContain('Library for managing general settings in a Laravel application')
    expect(text).toContain('Library for managing general settings in Filament')
    expect(text).toContain('What is Vtex?')
    expect(text).toContain('GitHub Repository:')
    expect(text).not.toMatch(/Librería/)
  })

  it('still renders Spanish write-ups on the default route', async () => {
    const wrapper = await mountSuspended(LibrariesPage, { route: '/libraries' })
    const text = wrapper.text()

    expect(text).toContain('Librerías')
    expect(text).toContain("Librería para consumo de las API's de Vtex Framework")
    expect(text).toContain('¿Qué es Vtex?')
  })
})
