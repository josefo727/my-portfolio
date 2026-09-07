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
