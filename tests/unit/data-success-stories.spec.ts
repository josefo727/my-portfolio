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

const NEW_TITLES_003 = [
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

const NEW_TITLES_006 = [
  'Calzatodo — Tarjetas de Regalo VTEX IO',
  'Pizzamania — Auto Invoicer con SDD+TDD',
  'CrediPink — Crédito en Checkout VTEX',
  'MassiveSpace Pro — Plataforma Interna Multi-cliente',
]

describe('data/success-stories', () => {
  it('has the original 8 entries unchanged, plus 11 from 003 and 4 from 006 (23 total)', () => {
    expect(successStories).toHaveLength(23)

    // Original 8 unchanged
    expect(successStories[0].title).toBe('Artículos para Vultr')
    expect(successStories[0].tags).toEqual(['Clean Code', 'Docker', 'Kubernetes', 'DevOPS', 'Linux'])
    for (const title of ORIGINAL_TITLES) {
      expect(successStories.some((s) => s.title === title)).toBe(true)
    }

    // 11 entries from 003 still present, unchanged shape
    for (const title of NEW_TITLES_003) {
      const story = successStories.find((s) => s.title === title)
      expect(story, `missing 003 story: ${title}`).toBeTruthy()
      expect(story!.body).toMatch(/^<p>/)
      expect(story!.tags.length).toBeGreaterThan(0)
    }

    // 4 new entries from 006 present with the expected shape
    for (const title of NEW_TITLES_006) {
      const story = successStories.find((s) => s.title === title)
      expect(story, `missing 006 story: ${title}`).toBeTruthy()
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

  it('scopes the 006 entries to what the user actually authored, per triage', () => {
    const calzatodo = successStories.find((s) => s.title.startsWith('Calzatodo'))!
    const credipink = successStories.find((s) => s.title.startsWith('CrediPink'))!
    const massiveSpacePro = successStories.find((s) => s.title.startsWith('MassiveSpace Pro'))!

    // Calzatodo: scoped to the backend-services microservice, not the storefront theme
    expect(calzatodo.body).not.toMatch(/theme|tienda|storefront/i)

    // CrediPink: scoped to the credit product, not the LiliPink storefront/theme
    expect(credipink.body).not.toMatch(/theme|storefront/i)

    // MassiveSpace Pro: an internal tool, names no specific client
    for (const client of ['Calzatodo', 'Pizzamania', 'CrediPink', 'LiliPink', 'Qbano']) {
      expect(massiveSpacePro.body).not.toContain(client)
    }
  })
})
