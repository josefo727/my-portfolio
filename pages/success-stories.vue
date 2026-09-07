<template>
  <div>
    <h1>Casos de Éxito</h1>
    <SuccessStoryCard v-for="story in successStories" :key="story.title" :story="story" />
  </div>
</template>

<script setup lang="ts">
import SuccessStoryCard from '~/components/success-stories/SuccessStoryCard.vue'
import successStories from '~/data/success-stories'
</script>
