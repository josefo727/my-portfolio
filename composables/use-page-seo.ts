import { absoluteUrl } from '~/utils/site'

/** Absolute URL of the default Open Graph / Twitter Card image — the existing profile photo,
 * reused across every page per this feature's spec (007-seo-foundations, criterion 6): no new
 * image asset is created for this feature. */
const DEFAULT_OG_IMAGE = absoluteUrl('/assets/img/profile-img.jpeg')

/**
 * Sets title, meta description, Open Graph, and Twitter Card tags for a page, sourced from the
 * `seo.<pageKey>` i18n keys (both locales). Call once per page in <script setup>.
 */
export function usePageSeo(pageKey: string) {
  const { t } = useI18n()

  const title = computed(() => t(`seo.${pageKey}.title`))
  const description = computed(() => t(`seo.${pageKey}.description`))

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogType: 'website',
    ogSiteName: 'José R. Gutierrez',
    ogImage: DEFAULT_OG_IMAGE,
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: DEFAULT_OG_IMAGE,
  })
}
