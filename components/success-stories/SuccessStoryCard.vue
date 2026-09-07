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
