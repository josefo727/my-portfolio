<template>
  <figure>
    <img :src="certification.image" :alt="certification.caption">
    <figcaption>{{ certification.caption }}</figcaption>
  </figure>
</template>

<script setup lang="ts">
import type { Certification } from '~/data/certifications'

defineProps<{ certification: Certification }>()
</script>

<style scoped>
figure {
  margin: 0;
}

img {
  border-radius: 8px;
  aspect-ratio: 4 / 3;
  object-fit: cover;
}

figcaption {
  margin-top: var(--space-xs);
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}
</style>
