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
