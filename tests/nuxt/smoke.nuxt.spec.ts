import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import App from '~/app.vue'

describe('app.vue', () => {
  it('renders the app root with the expected marker attribute', async () => {
    const wrapper = await mountSuspended(App)

    expect(wrapper.find('[data-app="my-portfolio"]').exists()).toBe(true)
  })
})
