<template>
  <div class="count-box">
    <i :class="fact.icon" v-view="viewHandler"></i>
    <span v-if="render"><ICountUp
        :delay="delay"
        :endVal="fact.quantity"
        :options="options"
        @ready="onReady"
    /></span>
    <p><strong>{{ fact.title }}</strong> {{ fact.sub_title }}</p>
  </div>
</template>

<script>
import ICountUp from 'vue-countup-v2';

export default {
  name: "Fact",
  props: {
    fact: {
      type: Object,
      required: true,
    }
  },
  components: {
    ICountUp
  },
  data() {
    return {
      render: false,
      delay: 100,
      options: {
        useEasing: true,
        useGrouping: true,
        separator: ',',
        decimal: '.',
        prefix: '',
        suffix: ''
      }
    };
  },
  methods: {
    viewHandler(e) {
      if (e.percentInView > 0.7) setTimeout(() => (this.render = true), 500);
    },
    onReady (instance) {
      instance.update(this.fact.quantity);
    }
  }
};
</script>

<style scoped>

</style>