<template>
  <section id="resume" class="resume">
    <div class="container">

      <div class="section-title">
        <h2>Currículum</h2>
        <p>
          Matemático, desarrollador web UI/UX, freelancer; soy programador con más de nueve años de experiencia generando código
          para empresas e instituciones del sector público y privado. Especialista en solución de problemas y trabajo en equipo.
        </p>
      </div>

      <div class="row">
        <div class="col-lg-6" data-aos="fade-up">
          <Summary />
          <Education />
        </div>
        <div class="col-lg-6" data-aos="fade-up" data-aos-delay="100">
          <Experience />
        </div>
      </div>

    </div>
  </section>
</template>

<script>
import Summary from "./Summary";
import Education from "./Education";
import Experience from "./Experience";

export default {
  name: "Index",
  components: {
    Summary,
    Education,
    Experience
  }
}
</script>

<style scoped>

</style>