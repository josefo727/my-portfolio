<template>
  <header>
    <img src="/assets/img/profile-img.jpeg" :alt="t('common.profilePhotoAlt', { name: personal.short_name })" width="80" height="80">
    <p class="site-name">
      <NuxtLink :to="localePath('/')">{{ personal.short_name }}</NuxtLink>
    </p>
    <ul>
      <li><a :href="contact.x" target="_blank" rel="noopener">X</a></li>
      <li><a :href="contact.facebook" target="_blank" rel="noopener">Facebook</a></li>
      <li><a :href="contact.instagram" target="_blank" rel="noopener">Instagram</a></li>
      <li><a :href="contact.linkedin" target="_blank" rel="noopener">LinkedIn</a></li>
      <li><a :href="contact.github" target="_blank" rel="noopener">GitHub</a></li>
    </ul>
    <AppNav />
    <LocaleSwitcher />
  </header>
</template>

<script setup lang="ts">
import personal from '~/data/personal'
import contact from '~/data/contact'
import AppNav from './AppNav.vue'
import LocaleSwitcher from './LocaleSwitcher.vue'

const localePath = useLocalePath()
const { t } = useI18n()
</script>

<style scoped>
header {
  padding: var(--space-lg) var(--space-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
  text-align: center;
}

img {
  border-radius: 50%;
  object-fit: cover;
}

.site-name {
  font-size: var(--font-size-lg);
  font-weight: bold;
  margin: 0;
}

.site-name a {
  color: var(--color-text);
  text-decoration: none;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: var(--space-sm);
  flex-wrap: wrap;
  justify-content: center;
}

ul a {
  color: var(--color-text-muted);
  text-decoration: none;
}

ul a:hover {
  color: var(--color-accent);
}

a:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
</style>
