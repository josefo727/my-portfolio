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
