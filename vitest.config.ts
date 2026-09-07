import { defineVitestProject } from '@nuxt/test-utils/config'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    projects: [
      // Component/page tests that need a real Nuxt context (auto-imports, router).
      await defineVitestProject({
        name: 'nuxt',
        test: {
          include: ['tests/nuxt/**/*.nuxt.spec.ts'],
          environment: 'nuxt',
          setupTimeout: 120000,
        },
      }),
      // Pure logic: composables, data-shaping helpers. No Nuxt bootstrap, fast.
      {
        test: {
          name: 'unit',
          environment: 'happy-dom',
          include: ['tests/unit/**/*.spec.ts'],
        },
      },
    ],
  },
})
