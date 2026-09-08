import type { Personal } from '~/data/personal'
import type { Contact } from '~/data/contact'

export interface PersonSchema {
  '@context': 'https://schema.org'
  '@type': 'Person'
  name: string
  jobTitle: string
  sameAs: string[]
}

/**
 * Builds a `Person` JSON-LD object (schema.org) from the site's own data. Pure function, no Nuxt
 * dependency — `composables/use-person-schema.ts` wires the result into `useHead`.
 *
 * `sameAs` only includes real social-profile URLs (facebook/x/github/linkedin/instagram) — email,
 * website, and phone are not "same as" identities per schema.org's own definition of the property.
 */
export function buildPersonSchema(personal: Personal, contact: Contact): PersonSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: personal.short_name,
    jobTitle: personal.activities[0],
    sameAs: [contact.facebook, contact.x, contact.github, contact.linkedin, contact.instagram],
  }
}
