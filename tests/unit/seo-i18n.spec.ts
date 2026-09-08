import { describe, expect, it } from 'vitest'
import es from '../../i18n/locales/es.json'
import en from '../../i18n/locales/en.json'

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
    const esEntry = (es as any).seo?.[page]
    const enEntry = (en as any).seo?.[page]

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
