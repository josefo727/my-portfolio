<template>
  <div class="carousel">
    <vue-flux
        :images="images"
        :transitions="transitions"
        :captions="captions"
        class="sliders"
        :options="options"
    >
      <template v-slot:preloader>
        <flux-preloader />
      </template>

      <template v-slot:caption>
        <flux-caption />
      </template>

      <template v-slot:controls>
        <flux-controls />
      </template>

      <template v-slot:index>
        <flux-index />
      </template>

      <template v-slot:pagination>
        <flux-pagination />
      </template>
    </vue-flux>

  </div>
</template>

<script>
import {
  VueFlux,
  FluxCaption,
  FluxControls,
  FluxPreloader,
  FluxIndex,
  FluxPagination,
} from 'vue-flux';
import {mapState} from "vuex";

export default {
  name: "Index",
  components: {
    VueFlux,
    FluxCaption,
    FluxControls,
    FluxPreloader,
    FluxIndex,
    FluxPagination,
  },
  data() {
    return {
      transitions: [
        'blinds3d',
        'blocks2',
        'book',
        'cube',
        'warp',
        'wave',
      ],
      options: {
        aspectRatio:"16:12",
        autoplay: true,
        bindKeys: true,
      }
    };
  },
  computed: {
    ...mapState('certifications', ['certifications']),
    images() {
      return this.certifications.map(certification => certification.image)
    },
    captions() {
      return this.certifications.map(certification => certification.caption)
    },
  }
}
</script>

<style scoped>
.carousel {
  width: 90%;
  height: 90%;
  margin: 5% 5% 5% 5%;
}
@media screen and (max-width: 1200px) {
  .carousel {
    width: 96%;
    margin: 60px 2% 2% 2%;
    min-height: calc(100vh - 160px);
  }
}
</style>