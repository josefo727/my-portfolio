import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import LibrariesPage from '~/pages/libraries.vue'

describe('pages/libraries', () => {
  it("renders all four library write-ups, unchanged wording, no Bootstrap nav-tabs markup", async () => {
    const wrapper = await mountSuspended(LibrariesPage)
    const text = wrapper.text()

    expect(text).toContain('Vtex API PHP')
    expect(text).toContain('Vtex API JS')
    expect(text).toContain('GeneralSettings')
    expect(text).toContain('FilamentGeneralSettings')
    expect(text).toContain("Librería para consumo de las API's de Vtex Framework")
    expect(text).toContain('Librería para gestionar configuraciones generales en una aplicación Laravel')
    expect(text).toContain('Librería para gestionar configuraciones generales en Filament')
    expect(text).toContain('https://github.com/josefo727/vtex-api')
    expect(text).toContain('https://github.com/josefo727/general-settings')
    expect(text).toContain('https://github.com/josefo727/filament-general-settings')
    expect(wrapper.find('.nav-tabs').exists()).toBe(false)
  })
})
