import { buildPersonSchema } from '~/utils/person-schema'
import personal from '~/data/personal'
import contact from '~/data/contact'

/**
 * Renders a `Person` JSON-LD `<script>` tag (schema.org) built from the site's own data. Called
 * unconditionally from `app.vue`, gated to the home/about routes there (007-seo-foundations,
 * criterion 9) — every page mounts app.vue, but only those two need the structured data.
 */
export function usePersonSchema() {
  const schema = buildPersonSchema(personal, contact)

  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(schema),
      },
    ],
  })
}
