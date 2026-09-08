<template>
  <div>
    <h1>{{ $t('error.notFoundTitle') }}</h1>
    <p>{{ $t('error.notFoundBody') }}</p>
    <NuxtLink :to="localePath('/')">{{ $t('error.homeLink') }}</NuxtLink>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  error: { statusCode: number; statusMessage?: string }
}>()

const localePath = useLocalePath()
const { t } = useI18n()

useSeoMeta({
  title: () => t('seo.notFound.title'),
  description: () => t('seo.notFound.description'),
  robots: 'noindex',
})
</script>
