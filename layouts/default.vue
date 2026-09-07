<template>
  <div class="layout">
    <AppHeader class="layout__sidebar" />
    <main class="layout__content">
      <slot />
    </main>
    <AppFooter class="layout__footer" />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '~/components/layout/AppHeader.vue'
import AppFooter from '~/components/layout/AppFooter.vue'
</script>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas:
    'sidebar'
    'content'
    'footer';
  max-width: 1200px;
  margin: 0 auto;
}

.layout__sidebar {
  grid-area: sidebar;
}

.layout__content {
  grid-area: content;
  padding: var(--space-lg);
}

.layout__content :deep(p) {
  max-width: 75ch;
}

.layout__footer {
  grid-area: footer;
}

@media (min-width: 768px) {
  .layout {
    grid-template-columns: 280px 1fr;
    grid-template-areas:
      'sidebar content'
      'sidebar footer';
    align-items: start;
  }
}
</style>
