<template>
  <section>
    <h2>Habilidades y Destrezas</h2>
    <p>
      A lo largo de mi carrera como desarrollador, he ganado habilidades que me han impulsado hacia adelante.
      Por ejemplo, prefiero simplificar problemas en vez de complicarlos. Estoy comprometido y me implico al
      máximo en lo que hago. Soy proactivo, siempre con la iniciativa y el deseo de aprender y mejorar cada
      día. La perseverancia es una de mis fortalezas y sé manejar la frustración. Tengo una base sólida en
      programación orientada a objetos y puedo adaptarme rápidamente a nuevas tecnologías.
    </p>
    <ul>
      <li v-for="skill in skills" :key="skill.title">
        <img :src="skill.image" alt="">
        <span>{{ skill.title }}</span>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import skills from '~/data/skills'
</script>

<style scoped>
section {
  margin-bottom: var(--space-xl);
}

h2 {
  font-size: var(--font-size-xl);
}

ul {
  list-style: none;
  margin: var(--space-md) 0 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: var(--space-sm);
}

li {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

img {
  width: 32px;
  height: 32px;
  object-fit: contain;
}
</style>
