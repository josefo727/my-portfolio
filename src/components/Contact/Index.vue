<template>
  <section id="contact" class="contact">
    <div class="container">

      <div class="section-title">
        <h2>Contacto</h2>
        <p>
          Si necesitas contactarte conmigo para desarrollos, por favor hazlo a través de los medios que te dejo:
          mi número móvil, email o llenando el formulario describiendo a grandes rasgos tu necesidad de desarrollo.
          En breve te contactaré para agendar una reunión.
        </p>
      </div>

      <div class="row" data-aos="fade-in">

        <div class="col-lg-5 d-flex align-items-stretch">
          <div class="info">
            <div class="address">
              <i class="icofont-google-map"></i>
              <h4>Ubicación:</h4>
              <p>{{ location.city }}, {{ location.department }}</p>
            </div>

            <div class="email">
              <i class="icofont-envelope"></i>
              <h4>Email:</h4>
              <p>{{ contact.email }}</p>
            </div>

            <div class="phone">
              <i class="icofont-phone"></i>
              <h4>Teléfono:</h4>
              <p>{{ contact.mobil }}</p>
            </div>

            <iframe
                :src="src"
                frameborder="0"
                style="border:0; width: 100%; height: 290px;"
                allowfullscreen>
            </iframe>
          </div>

        </div>

        <div class="col-lg-7 mt-5 mt-lg-0 d-flex align-items-stretch">
          <form action="forms/contact.php" method="post" role="form" class="php-email-form">
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="name">Tu nombre</label>
                <input type="text" name="name" class="form-control" id="name" data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
                <div class="validate"></div>
              </div>
              <div class="form-group col-md-6">
                <label for="name">Tu email</label>
                <input type="email" class="form-control" name="email" id="email" data-rule="email" data-msg="Please enter a valid email" />
                <div class="validate"></div>
              </div>
            </div>
            <div class="form-group">
              <label for="name">Asunto</label>
              <input type="text" class="form-control" name="subject" id="subject" data-rule="minlen:4" data-msg="Please enter at least 8 chars of subject" />
              <div class="validate"></div>
            </div>
            <div class="form-group">
              <label for="name">Mensaje</label>
              <textarea class="form-control" name="message" rows="10" data-rule="required" data-msg="Please write something for us"></textarea>
              <div class="validate"></div>
            </div>
            <div class="mb-3">
              <div class="loading">Enviando</div>
              <div class="error-message"></div>
              <div class="sent-message">¡Su mensaje ha sido enviado, muchas gracias!</div>
            </div>
            <div class="text-center"><button type="submit">Enviar Mensaje</button></div>
          </form>
        </div>

      </div>

    </div>
  </section>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "Index",
  computed: {
    ...mapState('contact', ['contact']),
    ...mapState('location', ['location']),
    src() {
      return 'https://maps.google.com/maps?q=andalucia%20kennedy' +
          '&t=&z=13&ie=UTF8&iwloc=&output=embed';
    }
  }
}
</script>

<style scoped>

</style>