<template>
  <div class="col-lg-6" data-aos="fade-up" v-view="viewHandler">
    <div class="progress">
      <span class="skill">{{ skill.title }} <i class="val">{{ skill.percentage }}%</i></span>
      <div class="progress-bar-wrap">
        <div class="progress-bar" role="progressbar" :aria-valuenow="skill.percentage" aria-valuemin="0" aria-valuemax="100"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Skill",
  props: {
    skill: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    }
  },
  methods: {
    viewHandler(e) {
      if (e.percentInView > 0.5) setTimeout(() => this.fillPercentage(), 500);
    },
    fillPercentage() {
      document.getElementsByClassName('progress-bar')[this.index].style.width = `${this.skill.percentage}%`;
    },
  },
}
</script>

<style scoped>

</style>