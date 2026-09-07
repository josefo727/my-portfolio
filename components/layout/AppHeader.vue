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
