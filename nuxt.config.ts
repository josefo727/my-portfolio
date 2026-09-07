// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-09-06',
  devtools: { enabled: false },
  ssr: true,
  modules: ['@nuxt/eslint', '@nuxtjs/i18n'],
  css: ['~/assets/css/main.css'],
  i18n: {
    baseUrl: 'https://hv.jose-gutierrez.com',
    strategy: 'prefix_except_default',
    defaultLocale: 'es',
    locales: [
      { code: 'es', language: 'es-ES', name: 'Español' },
      { code: 'en', language: 'en-US', name: 'English' },
    ],
  },
})
