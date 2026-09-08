<template>
  <div>
    <h3>{{ t('resume.experience.heading') }}</h3>
    <div v-for="entry in experience" :key="entry.title + entry.company">
      <h4>{{ entry.title }}</h4>
      <h5>{{ entry.tenure }}</h5>
      <p>
        <em>{{ entry.company }}</em>
        <small v-if="entry.web_site"> - <a :href="entry.web_site" target="_blank" rel="noopener">{{ t('resume.experience.website') }}</a></small>
      </p>
      <ul>
        <!-- eslint-disable-next-line vue/no-v-html -- authored content, ported as-is from the original data file -->
        <li v-for="(item, index) in entry.items" :key="index" v-html="item" />
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import experienceEs from '~/data/experience'
import experienceEn from '~/data/experience.en'

const { t } = useI18n()
const experience = useLocalizedData(experienceEs, experienceEn)
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

ul {
  list-style: none;
  margin: var(--space-sm) 0 0;
  padding: 0;
  display: grid;
  gap: var(--space-xs);
}
</style>
