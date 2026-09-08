import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import HeatmapGrid from '~/components/home/HeatmapGrid.vue'

describe('components/home/HeatmapGrid', () => {
  it('renders a 7x36 grid of cells, marked non-informative to assistive technology', async () => {
    const wrapper = await mountSuspended(HeatmapGrid, { attachTo: document.body })

    expect(wrapper.attributes('aria-hidden')).toBe('true')
    expect(wrapper.findAll('.heatmap__cell')).toHaveLength(252)
  })
})
