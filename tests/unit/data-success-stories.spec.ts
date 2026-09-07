import { describe, expect, it } from 'vitest'
import successStories from '../../data/success-stories'

const ORIGINAL_TITLES = [
  'Artículos para Vultr',
  'Decorcerámica - SAP',
  'FacesCR - Intélisis',
  'SDK Vtex Api',
  'Crédito KBK',
  'OT&V de PMI',
  'Kaiowa',
  'Custom Blog The Bar Colombia',
]

const NEW_TITLES = [
  'Sirocco — Sistema de Votación Segura y Auditable',
  'Cauce — Plataforma B2B de Trueque Multilateral',
  'Maná del Cielo — Lector Bíblico Offline y Privado',
  'Bajo la Lupa — Plataforma Editorial y de Reseñas',
  'Biogenesis — Sistema de Gestión para Laboratorios Clínicos',
  'Somos URV — Sitio Institucional',
  'Qbano — Checkout Rápido e Integración de Cupones VTEX',
  'Integración Nequi/Gravity — Orquestación de Pagos',
  'CatalogFlip — Plataforma de Catálogos Digitales Interactivos',
  'Almacenes Brissa — Ecosistema de Apps Custom VTEX',
  'Servicio de Notificaciones WhatsApp por Estado de Pedido',
]

describe('data/success-stories', () => {
  it('has the original 8 entries unchanged, plus 11 new ones (19 total)', () => {
    expect(successStories).toHaveLength(19)

    // Original 8 unchanged
    expect(successStories[0].title).toBe('Artículos para Vultr')
    expect(successStories[0].tags).toEqual(['Clean Code', 'Docker', 'Kubernetes', 'DevOPS', 'Linux'])
    for (const title of ORIGINAL_TITLES) {
      expect(successStories.some((s) => s.title === title)).toBe(true)
    }

    // 11 new entries present with the expected shape
    for (const title of NEW_TITLES) {
      const story = successStories.find((s) => s.title === title)
      expect(story, `missing new story: ${title}`).toBeTruthy()
      expect(story!.body).toMatch(/^<p>/)
      expect(story!.tags.length).toBeGreaterThan(0)
    }

    for (const story of successStories) {
      expect(typeof story.title).toBe('string')
      expect(typeof story.body).toBe('string')
      expect(Array.isArray(story.tags)).toBe(true)
    }
  })

  it('states each in-progress personal project\'s real status', () => {
    const sirocco = successStories.find((s) => s.title.startsWith('Sirocco'))!
    const cauce = successStories.find((s) => s.title.startsWith('Cauce'))!
    const mana = successStories.find((s) => s.title.startsWith('Maná del Cielo'))!

    expect(sirocco.body).toMatch(/producci[oó]n/i)
    expect(cauce.body).toMatch(/desarrollo activo/i)
    expect(mana.body).toMatch(/desarrollo activo/i)
  })
})
