<template>
  <div>
    <h1>{{ t('successStories.heading') }}</h1>
    <SuccessStoryCard v-for="story in successStories" :key="story.title" :story="story" />
  </div>
</template>

<script setup lang="ts">
import SuccessStoryCard from '~/components/success-stories/SuccessStoryCard.vue'
import successStoriesEs from '~/data/success-stories'
import successStoriesEn from '~/data/success-stories.en'

const { t } = useI18n()
const successStories = useLocalizedData(successStoriesEs, successStoriesEn)

usePageSeo('successStories')
</script>
