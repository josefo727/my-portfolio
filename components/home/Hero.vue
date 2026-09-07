<template>
  <section>
    <h1>{{ personal.short_name }}</h1>
    <ul>
      <li v-for="activity in personal.activities" :key="activity">{{ activity }}</li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import personal from '~/data/personal'
</script>
