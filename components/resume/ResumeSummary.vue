<template>
  <div>
    <h3>{{ t('resume.summary.heading') }}</h3>
    <h4>{{ personal.short_name }}</h4>
    <p>
      <em>{{ bio }}</em>
    </p>
    <ul>
      <li>{{ location.department }}, {{ location.city }}</li>
      <li>{{ contact.mobil }}</li>
      <li>{{ contact.email }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import personalEs from '~/data/personal'
import personalEn from '~/data/personal.en'
import location from '~/data/location'
import contact from '~/data/contact'
import { calculateYearsSince } from '~/utils/dates'

const { t } = useI18n()
const personal = useLocalizedData(personalEs, personalEn)
const bio = computed(() => t('resume.summary.bio', { count: calculateYearsSince(personal.professional_since) }))
</script>

<style scoped>
div {
  margin-bottom: var(--space-xl);
}

h3 {
  font-size: var(--font-size-xl);
}

h4 {
  font-size: var(--font-size-lg);
  margin-bottom: var(--space-sm);
}

ul {
  list-style: none;
  margin: var(--space-sm) 0 0;
  padding: 0;
  color: var(--color-text-muted);
}
</style>
