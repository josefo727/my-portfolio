<template>
  <section>
    <h2>{{ t('about.facts.heading') }}</h2>
    <p>{{ t('about.facts.intro') }}</p>
    <ul>
      <li v-for="fact in facts" :key="fact.title">
        <strong>{{ fact.quantity }}</strong>
        <p>{{ fact.title }} {{ fact.sub_title }}</p>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import factsEs from '~/data/facts'
import factsEn from '~/data/facts.en'

const { t } = useI18n()
const facts = useLocalizedData(factsEs, factsEn)
</script>

<style scoped>
section {
  margin-bottom: var(--space-xl);
}

h2 {
  font-size: var(--font-size-xl);
}

ul {
  list-style: none;
  margin: var(--space-md) 0 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: var(--space-md);
}

li strong {
  font-size: var(--font-size-2xl);
  color: var(--color-accent);
  display: block;
}

li p {
  margin: 0;
  color: var(--color-text-muted);
}
</style>
