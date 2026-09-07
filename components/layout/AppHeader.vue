<template>
  <header>
    <img src="/assets/img/profile-img.jpeg" alt="" width="80" height="80">
    <h1>
      <NuxtLink to="/">{{ personal.short_name }}</NuxtLink>
    </h1>
    <ul>
      <li><a :href="contact.twitter" target="_blank" rel="noopener">Twitter</a></li>
      <li><a :href="contact.facebook" target="_blank" rel="noopener">Facebook</a></li>
      <li><a :href="contact.instagram" target="_blank" rel="noopener">Instagram</a></li>
      <li><a :href="contact.skype" target="_blank" rel="noopener">Skype</a></li>
      <li><a :href="contact.linkedin" target="_blank" rel="noopener">LinkedIn</a></li>
    </ul>
    <AppNav />
  </header>
</template>

<script setup lang="ts">
import personal from '~/data/personal'
import contact from '~/data/contact'
import AppNav from './AppNav.vue'
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

h1 {
  font-size: var(--font-size-lg);
  margin: 0;
}

h1 a {
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
