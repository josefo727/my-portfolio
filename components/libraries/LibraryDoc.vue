<template>
  <details>
    <summary>{{ summary }}</summary>
    <slot />
  </details>
</template>

<script setup lang="ts">
defineProps<{ summary: string }>()
</script>
