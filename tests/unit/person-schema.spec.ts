import { describe, expect, it } from 'vitest'
import { buildPersonSchema } from '../../utils/person-schema'
import personal from '../../data/personal'
import contact from '../../data/contact'

describe('utils/person-schema — buildPersonSchema', () => {
  it('builds a valid Person JSON-LD object with the real social profile URLs', () => {
    const schema = buildPersonSchema(personal, contact)

    expect(schema['@context']).toBe('https://schema.org')
    expect(schema['@type']).toBe('Person')
    expect(schema.name).toBe(personal.short_name)
    expect(schema.jobTitle).toBe(personal.activities[0])
    expect(schema.sameAs).toEqual([
      contact.facebook,
      contact.x,
      contact.github,
      contact.linkedin,
      contact.instagram,
    ])
  })

  it('does not include email/website/phone in sameAs — those are not social profile URLs', () => {
    const schema = buildPersonSchema(personal, contact)

    expect(schema.sameAs).not.toContain(contact.email)
    expect(schema.sameAs).not.toContain(contact.web_site)
    expect(schema.sameAs).not.toContain(contact.mobil)
  })

  it('produces valid, parseable JSON when stringified', () => {
    const schema = buildPersonSchema(personal, contact)

    expect(() => JSON.parse(JSON.stringify(schema))).not.toThrow()
  })
})
