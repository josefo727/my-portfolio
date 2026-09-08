<template>
  <section>
    <h1>{{ t('contact.heading') }}</h1>
    <ul>
      <li><a :href="`mailto:${contact.email}`">{{ contact.email }}</a></li>
      <li>{{ contact.mobil }}</li>
      <li><a :href="contact.web_site" target="_blank" rel="noopener">{{ contact.web_site }}</a></li>
    </ul>
    <ul>
      <li><a :href="contact.x" target="_blank" rel="noopener">X</a></li>
      <li><a :href="contact.facebook" target="_blank" rel="noopener">Facebook</a></li>
      <li><a :href="contact.instagram" target="_blank" rel="noopener">Instagram</a></li>
      <li><a :href="contact.linkedin" target="_blank" rel="noopener">LinkedIn</a></li>
      <li><a :href="contact.github" target="_blank" rel="noopener">GitHub</a></li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import contact from '~/data/contact'

const { t } = useI18n()
</script>

<style scoped>
h1 {
  font-size: var(--font-size-2xl);
  margin-bottom: var(--space-lg);
}

ul {
  list-style: none;
  margin: 0 0 var(--space-lg);
  padding: 0;
  display: grid;
  gap: var(--space-sm);
}

a {
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

a:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
</style>
