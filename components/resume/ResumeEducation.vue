<template>
  <div>
    <h3>Educación</h3>
    <div v-for="entry in education" :key="entry.title">
      <h4>{{ entry.title }}</h4>
      <h5>{{ entry.period }}</h5>
      <p><em>{{ entry.institution }}</em></p>
      <p>{{ entry.abstract }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import education from '~/data/education'
</script>
