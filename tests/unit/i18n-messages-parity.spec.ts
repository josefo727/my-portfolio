import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

function flattenKeys(obj: Record<string, unknown>, prefix = ''): string[] {
  return Object.entries(obj).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      return flattenKeys(value as Record<string, unknown>, path)
    }
    return [path]
  })
}

describe('i18n/locales — translation-key parity', () => {
  it('es.json and en.json declare exactly the same set of keys', () => {
    const es = JSON.parse(readFileSync(resolve(process.cwd(), 'i18n/locales/es.json'), 'utf-8'))
    const en = JSON.parse(readFileSync(resolve(process.cwd(), 'i18n/locales/en.json'), 'utf-8'))

    const esKeys = flattenKeys(es).sort()
    const enKeys = flattenKeys(en).sort()

    expect(enKeys).toEqual(esKeys)
  })

  it('declares error page keys in both locales', () => {
    const es = JSON.parse(readFileSync(resolve(process.cwd(), 'i18n/locales/es.json'), 'utf-8'))
    const en = JSON.parse(readFileSync(resolve(process.cwd(), 'i18n/locales/en.json'), 'utf-8'))

    expect(es.error?.notFoundTitle).toBeTypeOf('string')
    expect(es.error?.notFoundBody).toBeTypeOf('string')
    expect(es.error?.homeLink).toBeTypeOf('string')
    expect(en.error?.notFoundTitle).toBeTypeOf('string')
    expect(en.error?.notFoundBody).toBeTypeOf('string')
    expect(en.error?.homeLink).toBeTypeOf('string')
  })

  it('declares a locale-aware resume.experience.heading, distinct per locale', () => {
    const es = JSON.parse(readFileSync(resolve(process.cwd(), 'i18n/locales/es.json'), 'utf-8'))
    const en = JSON.parse(readFileSync(resolve(process.cwd(), 'i18n/locales/en.json'), 'utf-8'))

    expect(es.resume?.experience?.heading).toBe('Experiencia Profesional')
    expect(en.resume?.experience?.heading).toBe('Professional Experience')
  })
})
