/** Canonical production origin — single source of truth, referenced from nuxt.config.ts (site.url,
 * i18n.baseUrl) and from any composable that needs to build an absolute URL (og:image, JSON-LD). */
export const SITE_URL = 'https://hv.jose-gutierrez.com'

/** Resolves a root-relative asset path (e.g. "/assets/img/profile-img.jpeg") to an absolute URL
 * under the canonical production origin. Open Graph/Twitter Card images must be absolute — a
 * relative path is not reliably resolved by link-preview crawlers (LinkedIn, WhatsApp, X). */
export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}
