import { describe, expect, it } from 'vitest'
import experience from '../../data/experience'

describe('data/experience', () => {
  it('has the same 6 entries as the ported src/data/experience.js', () => {
    expect(experience).toHaveLength(6)
    expect(experience[0]).toEqual({
      title: 'Desarrollador Full Stack',
      tenure: '9 meses',
      company: 'Global Link Studies',
      web_site: 'https://globallinkstudies.com/',
      items: [
        'Diseño y desarrollo de Globo, un CRM integral para Global Link Studies utilizando Laravel, Livewire, VueJS, y MySQL. El sistema gestiona todo el tráfico administrativo y de ventas de la empresa, optimizando procesos y mejorando la eficiencia operativa.',
      ],
    })
    expect(experience.at(-1)?.company).toBe('Alcaldía Municipio Carlos Arvelo. Carabobo - Venezuela')
    for (const entry of experience) {
      expect(typeof entry.title).toBe('string')
      expect(typeof entry.tenure).toBe('string')
      expect(typeof entry.company).toBe('string')
      expect(Array.isArray(entry.items)).toBe(true)
      expect(entry.items.length).toBeGreaterThan(0)
    }
  })
})
