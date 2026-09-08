<template>
  <section>
    <h1>{{ t('services.heading') }}</h1>
    <p>{{ t('services.comingSoon') }}</p>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()

usePageSeo('services')
</script>

<style scoped>
h1 {
  font-size: var(--font-size-2xl);
  margin-bottom: var(--space-md);
}

p {
  font-size: var(--font-size-lg);
  color: var(--color-text-muted);
}
</style>
