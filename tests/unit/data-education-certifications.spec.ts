import { describe, expect, it } from 'vitest'
import education from '../../data/education'
import certifications from '../../data/certifications'

describe('data/education', () => {
  it('has the same 3 entries as the ported src/data/education.js', () => {
    expect(education).toHaveLength(3)
    expect(education[0]).toEqual({
      title: 'Lic. en Matemática Pura',
      period: '2000 - 2005',
      institution: 'Universidad de Carabobo - Venezuela',
      abstract:
        'Durante mis estudios en la Facultad de Ciencias y Tecnología fui preparador de Cálculo y Teoría de ' +
        'Números; programé en Pascal, Fortran, Maple, Matlab, Octave y trabajé con edición de documentos en Latex',
    })
    for (const entry of education) {
      expect(entry).toHaveProperty('title')
      expect(entry).toHaveProperty('period')
      expect(entry).toHaveProperty('institution')
      expect(entry).toHaveProperty('abstract')
    }
  })
})

describe('data/certifications', () => {
  it('has the same 37 entries as the ported src/data/certifications.js', () => {
    expect(certifications).toHaveLength(37)
    expect(certifications[0]).toEqual({
      image: '/assets/img/certifications/2019-12-07-json-web-tokens-laravel-6-y-vuejs.jpeg',
      caption: 'Json web tokens, Laravel 6 y VueJS',
    })
    expect(certifications.at(-1)).toEqual({
      image: '/assets/img/certifications/tenancy-for-laravel-basics.jpg',
      caption: 'Tenancy for laravel basics',
    })
    for (const entry of certifications) {
      expect(typeof entry.image).toBe('string')
      expect(typeof entry.caption).toBe('string')
    }
  })
})
