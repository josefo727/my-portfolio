<template>
  <section id="hero" class="d-flex flex-column justify-content-center align-items-center">
    <div class="hero-container" data-aos="fade-in">
      <h1>{{ my.short_name }}</h1>
      <p>
        <vue-typed-js
            class="in-line"
            :strings="my.activities"
            :loop="true"
            :startDelay="1000"
            :backDelay="1000"
            :typeSpeed="120"
            :backSpeed="80"
        >
          <span class="typing"></span>
        </vue-typed-js>
      </p>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: "Hero",
  computed: {
    ...mapState('personal', ['my']),
  },
}
</script>

<style scoped>
  .in-line {
    display: inline-block;
    margin-left: 15px;
  }
  .i-am {
    border-bottom: none !important;
  }
</style>
