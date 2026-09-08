<template>
  <section class="hero">
    <div class="hero__intro">
      <h1>{{ personal.short_name }}</h1>
      <ul class="hero__activities">
        <li v-for="activity in personal.activities" :key="activity" class="hero__badge">{{ activity }}</li>
      </ul>
    </div>
    <div class="hero__heatmap-wrapper">
      <HeatmapGrid />
    </div>
  </section>
</template>

<script setup lang="ts">
import personalEs from '~/data/personal'
import personalEn from '~/data/personal.en'
import HeatmapGrid from './HeatmapGrid.vue'

const personal = useLocalizedData(personalEs, personalEn)
</script>

<style scoped>
h1 {
  font-size: var(--font-size-2xl);
  margin-bottom: var(--space-sm);
}

.hero__activities {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
}

.hero__badge {
  font-size: var(--font-size-sm);
  padding: 2px var(--space-sm);
  border-radius: 999px;
  background-color: var(--color-background-alt);
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
}

.hero__heatmap-wrapper {
  display: none;
}

@media (min-width: 768px) {
  .hero__heatmap-wrapper {
    display: block;
    margin-top: var(--space-xl);
  }
}
</style>
