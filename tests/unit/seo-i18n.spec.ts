import { describe, expect, it } from 'vitest'
import es from '../../i18n/locales/es.json'
import en from '../../i18n/locales/en.json'

interface SeoEntry {
  title: string
  description: string
}

const seoEs: Record<string, SeoEntry> = es.seo
const seoEn: Record<string, SeoEntry> = en.seo

const PAGES = [
  'home',
  'about',
  'resume',
  'services',
  'successStories',
  'certifications',
  'libraries',
  'contact',
  'notFound',
]

describe('i18n seo.* keys', () => {
  it.each(PAGES)('%s has a non-empty title and a <=160-char description in both locales, and they differ between es/en', (page) => {
    const esEntry = seoEs[page]
    const enEntry = seoEn[page]

    expect(esEntry, `missing es.json seo.${page}`).toBeTruthy()
    expect(enEntry, `missing en.json seo.${page}`).toBeTruthy()

    expect(esEntry.title.length).toBeGreaterThan(0)
    expect(esEntry.description.length).toBeGreaterThan(0)
    expect(esEntry.description.length).toBeLessThanOrEqual(160)

    expect(enEntry.title.length).toBeGreaterThan(0)
    expect(enEntry.description.length).toBeGreaterThan(0)
    expect(enEntry.description.length).toBeLessThanOrEqual(160)

    expect(esEntry.title).not.toBe(enEntry.title)
    expect(esEntry.description).not.toBe(enEntry.description)
  })
})
