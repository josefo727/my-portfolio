<template>
  <div data-app="my-portfolio">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const i18nHead = useLocaleHead()

useHead(() => ({
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs?.lang,
  },
  link: [...(i18nHead.value.link || [])],
  meta: [...(i18nHead.value.meta || [])],
}))

// Person JSON-LD (007-seo-foundations, criterion 9) only makes sense on the home/about pages —
// every page mounts app.vue, so gate it here rather than duplicating it into two page components.
const route = useRoute()
const HOME_AND_ABOUT_PATHS = ['/', '/about', '/en', '/en/about']
if (HOME_AND_ABOUT_PATHS.includes(route.path)) {
  usePersonSchema()
}
</script>
