<template>
  <details>
    <summary>{{ summary }}</summary>
    <slot />
  </details>
</template>

<script setup lang="ts">
defineProps<{ summary: string }>()
</script>

<style scoped>
details {
  margin-bottom: var(--space-md);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: var(--space-sm) var(--space-md);
}

summary {
  cursor: pointer;
  font-weight: bold;
  padding: var(--space-xs) 0;
}

summary:hover {
  color: var(--color-accent);
}

summary:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

details[open] summary {
  margin-bottom: var(--space-sm);
}
</style>
