<template>
  <div id="app" class="home">

    <nav-bar />

    <main id="main">

      <router-view/>

    </main>

    <Footer />

    <a href="#" class="back-to-top"><i class="icofont-simple-up"></i></a>

  </div>
</template>

<script>
import NavBar from '@/components/Common/NavBar';
import Footer from '@/components/Common/Footer';

export default {
  name: 'App',
  components: {
    NavBar,
    Footer,
  },
}
</script>


<style>
  section {
    padding: 20px 0;
  }
</style>
