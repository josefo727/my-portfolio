<template>
  <div class="col-6 col-xs-6 col-sm-6 col-md-4 col-lg-3">
    <div class="row col-12 container-fluid technology my-3 d-flex align-items-center">
      <div class="col-3 image-container">
        <img class="image" :src="skill.image" alt="">
      </div>
      <div class="col-9">
        <span class="title">{{ skill.title }}</span>
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
}
</script>

<style scoped>
.image {
  width: 100%;
  height: auto;
}
.image-container {
  padding-right: 0 !important;
}
.technology {
  min-height: 66px;
  border: black solid 1px;
  padding: 8px 0;
  border-radius: 10px;
}
.title {
  font-weight: bold;
}
</style>