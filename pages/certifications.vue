<template>
  <div>
    <h1>Certificaciones</h1>
    <CertificationCard
      v-for="certification in certifications"
      :key="certification.image"
      :certification="certification"
    />
  </div>
</template>

<script setup lang="ts">
import CertificationCard from '~/components/certifications/CertificationCard.vue'
import certifications from '~/data/certifications'
</script>

<style scoped>
div {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--space-lg);
}

h1 {
  grid-column: 1 / -1;
  font-size: var(--font-size-2xl);
  margin-bottom: var(--space-md);
}
</style>
