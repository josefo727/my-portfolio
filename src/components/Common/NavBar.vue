<template>
  <div>
    <!-- ======= Mobile nav toggle button ======= -->
    <button type="button" class="mobile-nav-toggle d-xl-none"><i class="icofont-navigation-menu"></i></button>
    <!-- ======= Header ======= -->
    <header id="header">
      <div class="d-flex flex-column">

        <div class="profile">
          <img src="assets/img/profile-img.jpeg" alt="" class="img-fluid rounded-circle">
          <h1 class="text-light"><router-link tag="a" :to="{ name: 'Home' }">{{ my.short_name }}</router-link></h1>
          <div class="social-links mt-3 text-center">
            <a :href="contact.twitter" class="twitter" target="_blank"><i class="bx bxl-twitter"></i></a>
            <a :href="contact.facebook" class="facebook" target="_blank"><i class="bx bxl-facebook"></i></a>
            <a :href="contact.instagram" class="instagram" target="_blank"><i class="bx bxl-instagram"></i></a>
            <a :href="contact.skype" class="google-plus" target="_blank"><i class="bx bxl-skype"></i></a>
            <a :href="contact.linkedin" class="linkedin" target="_blank"><i class="bx bxl-linkedin"></i></a>
          </div>
        </div>

        <!-- ======= NavBar ======= -->
        <nav class="nav-menu">
          <ul>
            <router-link tag="li" active-class="active" exact :to="{ name: 'Home' }">
              <a href="#"><i class="bx bx-home"></i> Inicio </a>
            </router-link>
            <router-link tag="li" active-class="active" exact :to="{ name: 'About' }">
              <a href="#"><i class="bx bx-user"></i> Acerca de mí </a>
            </router-link>
            <router-link tag="li" active-class="active" exact :to="{ name: 'Resume' }">
              <a href="#"><i class="bx bx-file-blank"></i> Resumen </a>
            </router-link>
<!--            <router-link tag="li" active-class="active" exact :to="{ name: 'Portfolio' }">-->
<!--              <a href="#"><i class="bx bx-book-content"></i> Portafolio </a>-->
<!--            </router-link>-->
<!--            <router-link tag="li" active-class="active" exact :to="{ name: 'Services' }">-->
<!--              <a href="#"><i class="bx bx-server"></i> Servicios </a>-->
<!--            </router-link>-->
            <router-link tag="li" active-class="active" exact :to="{ name: 'Certifications' }">
              <a href="#"><i class="bx bx-check-shield"></i> Certificaciones </a>
            </router-link>
            <router-link tag="li" active-class="active" exact :to="{ name: 'Contact' }">
              <a href="#"><i class="bx bx-envelope"></i> Contacto </a>
            </router-link>
          </ul>
        </nav>
        <!-- End NavBar -->
        <button type="button" class="mobile-nav-toggle d-xl-none"><i class="icofont-navigation-menu"></i></button>

      </div>
    </header>
    <!-- End Header -->
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
name: "NavBar",
  computed: {
    ...mapState('personal', ['my']),
    ...mapState('contact', ['contact']),
  },
}
</script>

<style scoped>

</style>
