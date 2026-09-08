<template>
  <div>
    <h3>{{ t('resume.education.heading') }}</h3>
    <div v-for="entry in education" :key="entry.title">
      <h4>{{ entry.title }}</h4>
      <h5>{{ entry.period }}</h5>
      <p><em>{{ entry.institution }}</em></p>
      <p>{{ entry.abstract }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import educationEs from '~/data/education'
import educationEn from '~/data/education.en'

const { t } = useI18n()
const education = useLocalizedData(educationEs, educationEn)
</script>

<style scoped>
h3 {
  font-size: var(--font-size-xl);
  margin-bottom: var(--space-md);
}

div > div {
  margin-bottom: var(--space-lg);
}

h4 {
  font-size: var(--font-size-base);
  margin-bottom: var(--space-xs);
}

h5 {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  font-weight: normal;
  margin: 0 0 var(--space-xs);
}
</style>
