<template>
  <section id="about" class="about">
    <div class="container">

      <div class="section-title">
        <h2>Acerca de mí</h2>
        <p>
          Soy Matemático Puro con un profundo sentido de investigación y análisis; como desarrollador Web
        </p>
      </div>

      <div class="row">
        <div class="col-lg-4" data-aos="fade-right">
          <img src="assets/img/profile-img.jpeg" class="img-fluid" alt="">
        </div>
        <div class="col-lg-8 pt-4 pt-lg-0 content" data-aos="fade-left">
          <h3>UI/UX Designer &amp; Web Developer.</h3>
          <p class="font-italic">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
            magna aliqua.
          </p>
          <div class="row">
            <div class="col-lg-6">
              <ul>
                <li><i class="icofont-rounded-right"></i> <strong>Fecha de Nac.:</strong> {{ birthday }}</li>
                <li><i class="icofont-rounded-right"></i> <strong>Sitio Web:</strong> {{ contact.web_site }}</li>
                <li><i class="icofont-rounded-right"></i> <strong>Teléfono:</strong> {{ contact.phone }}</li>
                <li><i class="icofont-rounded-right"></i> <strong>Ciudad:</strong> {{ location.city }}</li>
              </ul>
            </div>
            <div class="col-lg-6">
              <ul>
                <li><i class="icofont-rounded-right"></i> <strong>Edad:</strong> {{ age }}</li>
                <li><i class="icofont-rounded-right"></i> <strong>Grado:</strong> Master</li>
                <li><i class="icofont-rounded-right"></i> <strong>Email:</strong> {{ contact.email }}</li>
                <li><i class="icofont-rounded-right"></i> <strong>Freelance:</strong> Disponible</li>
              </ul>
            </div>
          </div>
          <p>
            Officiis eligendi itaque labore et dolorum mollitia officiis optio vero. Quisquam sunt adipisci omnis et ut. Nulla accusantium dolor incidunt officia tempore. Et eius omnis.
            Cupiditate ut dicta maxime officiis quidem quia. Sed et consectetur qui quia repellendus itaque neque. Aliquid amet quidem ut quaerat cupiditate. Ab et eum qui repellendus omnis culpa magni laudantium dolores.
          </p>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import { calculateAge, formatDate } from '@/Helpers/index';

export default {
  name: 'Index',
  computed: {
    ...mapState('personal', ['my']),
    ...mapState('location', ['location']),
    ...mapState('contact', ['contact']),
    age() {
      return calculateAge(this.my.birthday);
    },
    birthday() {
      return formatDate(this.my.birthday);
    }
  },
}
</script>

<style scoped>

</style>