<template>
  <div>
    <h3>Professional Experience</h3>
    <div v-for="entry in experience" :key="entry.title + entry.company">
      <h4>{{ entry.title }}</h4>
      <h5>{{ entry.tenure }}</h5>
      <p>
        <em>{{ entry.company }}</em>
        <small v-if="entry.web_site"> - <a :href="entry.web_site" target="_blank" rel="noopener">Sitio Web</a></small>
      </p>
      <ul>
        <!-- eslint-disable-next-line vue/no-v-html -- authored content, ported as-is from the original data file -->
        <li v-for="(item, index) in entry.items" :key="index" v-html="item" />
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import experience from '~/data/experience'
</script>
