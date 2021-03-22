<template>
  <section id="facts" class="facts">
    <div class="container">

      <div class="section-title">
        <h2>Hechos</h2>
        <p>A lo largo de mi carrera como desarrollador web he tenido gratificantes aciertos y casos de éxitos que merecen ser totalizados.</p>
      </div>

      <div class="row no-gutters">

        <template v-for="(fact, index) in facts">
          <div class="col-lg-3 col-md-6 d-md-flex align-items-md-stretch" data-aos="fade-up" :data-aos-delay="100 * index" :key="index">
            <fact :fact="fact"></fact>
          </div>
        </template>
      </div>

    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import Fact from "./Fact";

export default {
  name: "Facts",
  components: {
    Fact,
  },
  computed: {
    ...mapState('facts', ['facts']),
  },
}
</script>

<style scoped>

</style>