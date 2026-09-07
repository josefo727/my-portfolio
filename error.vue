<template>
  <div>
    <h1>Página no encontrada</h1>
    <p>La página que buscas no existe o fue movida.</p>
    <NuxtLink to="/">Volver al inicio</NuxtLink>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  error: { statusCode: number; statusMessage?: string }
}>()
</script>
