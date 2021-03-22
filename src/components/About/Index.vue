<template>
  <div>
    <about />
    <facts />
    <skills />
  </div>
</template>

<script>
import About from './About';
import Facts from './Facts';
import Skills from './Skills';

export default {
  name: "Index",
  components: {
    About,
    Facts,
    Skills,
  }
}
</script>

<style scoped>

</style>