<template>
  <section id="skills" class="skills section-bg">
    <div class="container">
      <div class="section-title">
        <h2>Habilidades y Destrezas</h2>
        <p class="skills-intro">
          A lo largo de mi carrera como desarrollador he adquirido habilidades que me han permitido avanzar, como por ejemplo:
          simplificar los problemas en lugar de complicarlos; tener compromiso e implicación; soy proactivo, me gusta tener
          iniciativa y ganas de aprender para ir mejorando día a día; soy perseverante y tolero la frustración; tengo una base
          sólida en la programacion orientado a objetos y soy capaz de aprender nuevas tecnologías rápidamente.
        </p>
      </div>
      <div class="row skills-content">
        <template v-for="(skill, index) in skills">
          <skill :skill="skill" :index="index" :key="index"></skill>
        </template>
      </div>
    </div>
  </section>
</template>

<script>
import Skill from './Skill';
import { mapState } from 'vuex';

export default {
  name: "Skills",
  components: {
    Skill,
  },
  computed: {
    ...mapState('skills', ['skills']),
  }
}
</script>

<style scoped>
.skills-content {
  margin-bottom: 75px;
  margin-left: 8px;
}
.skills-intro {
  text-align: justify;
}
</style>