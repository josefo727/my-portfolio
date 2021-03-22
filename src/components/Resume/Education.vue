<template>
  <div>
    <h3 class="resume-title">Educación</h3>
    <div class="resume-item" v-for="(edu, index) in education" :key="index">
      <h4>{{ edu.title }}</h4>
      <h5>{{ edu.period }}</h5>
      <p><em>{{ edu.institution }}</em></p>
      <p>{{ edu.abstract }}</p>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "Education",
  computed: {
    ...mapState('education', ['education']),
  }
}
</script>

<style scoped>

</style>