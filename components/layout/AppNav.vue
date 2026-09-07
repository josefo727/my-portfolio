<template>
  <nav>
    <ul>
      <li><NuxtLink :to="localePath('/')">{{ t('nav.home') }}</NuxtLink></li>
      <li><NuxtLink :to="localePath('/about')">{{ t('nav.about') }}</NuxtLink></li>
      <li><NuxtLink :to="localePath('/resume')">{{ t('nav.resume') }}</NuxtLink></li>
      <li><NuxtLink :to="localePath('/libraries')">{{ t('nav.libraries') }}</NuxtLink></li>
      <li><NuxtLink :to="localePath('/success-stories')">{{ t('nav.successStories') }}</NuxtLink></li>
      <li><NuxtLink :to="localePath('/certifications')">{{ t('nav.certifications') }}</NuxtLink></li>
      <li><NuxtLink :to="localePath('/contact')">{{ t('nav.contact') }}</NuxtLink></li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

a {
  display: block;
  padding: var(--space-xs) var(--space-sm);
  border-radius: 4px;
  text-decoration: none;
}

a:hover {
  background-color: var(--color-background-alt);
}

a:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: -2px;
}

a.router-link-active {
  font-weight: bold;
  color: var(--color-text);
  background-color: var(--color-background-alt);
}
</style>
