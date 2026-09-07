<template>
  <article>
    <h2>{{ story.title }}</h2>
    <!-- eslint-disable-next-line vue/no-v-html -- authored content, ported as-is from the original data file -->
    <div v-html="story.body" />
    <ul>
      <li v-for="tag in story.tags" :key="tag">{{ tag }}</li>
    </ul>
  </article>
</template>

<script setup lang="ts">
import type { SuccessStory } from '~/data/success-stories'

defineProps<{ story: SuccessStory }>()
</script>

<style scoped>
article {
  margin-bottom: var(--space-xl);
  padding-bottom: var(--space-lg);
  border-bottom: 1px solid var(--color-border);
}

h2 {
  font-size: var(--font-size-lg);
}

ul {
  list-style: none;
  margin: var(--space-sm) 0 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
}

li {
  font-size: var(--font-size-sm);
  padding: 2px var(--space-sm);
  border-radius: 999px;
  background-color: var(--color-background-alt);
  color: var(--color-text-muted);
}
</style>
