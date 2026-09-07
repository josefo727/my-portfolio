<template>
  <section>
    <h1>{{ personal.short_name }}</h1>
    <ul>
      <li v-for="activity in personal.activities" :key="activity">{{ activity }}</li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import personal from '~/data/personal'
</script>

<style scoped>
h1 {
  font-size: var(--font-size-2xl);
  margin-bottom: var(--space-sm);
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
}

li {
  font-size: var(--font-size-lg);
  color: var(--color-text-muted);
}

li:not(:last-child)::after {
  content: '·';
  margin-left: var(--space-sm);
  color: var(--color-border);
}
</style>
