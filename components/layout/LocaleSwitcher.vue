<template>
  <ul>
    <li v-for="loc in availableLocales" :key="loc.code">
      <NuxtLink :to="switchLocalePath(loc.code)">{{ loc.name }}</NuxtLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() => locales.value.filter((l) => l.code !== locale.value))
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: var(--space-xs);
}

a {
  color: var(--color-text-muted);
  text-decoration: none;
  font-size: var(--font-size-sm);
}

a:hover {
  color: var(--color-accent);
}

a:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
</style>
