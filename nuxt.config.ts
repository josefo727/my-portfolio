import { SITE_URL } from './utils/site'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-09-06',
  devtools: { enabled: false },
  ssr: true,
  modules: ['@nuxt/eslint', '@nuxtjs/i18n', '@nuxtjs/sitemap'],
  css: ['~/assets/css/main.css'],
  site: {
    url: SITE_URL,
  },
  sitemap: {
    zeroRuntime: true,
  },
  i18n: {
    baseUrl: SITE_URL,
    strategy: 'prefix_except_default',
    defaultLocale: 'es',
    locales: [
      { code: 'es', language: 'es-ES', name: 'Español', file: 'es.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
    ],
  },
})
