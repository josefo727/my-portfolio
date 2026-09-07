<template>
  <section>
    <h2>Acerca de mí</h2>
    <p>
      Hola, soy José Rafael Gutierrez, un padre de familia con una hermosa esposa y dos retoños en proceso de
      crecimiento.
    </p>

    <img src="/assets/img/profile-img.jpeg" alt="">
    <h3>UI/UX Designer &amp; Web Developer.</h3>
    <p>Algunos datos personales sobre mí.</p>

    <ul>
      <li><strong>Fecha de Nac.:</strong> {{ birthday }}</li>
      <li>
        <strong>Sitio Web:</strong>
        <a :href="contact.web_site" target="_blank" rel="noopener">{{ contact.web_site }}</a>
      </li>
      <li><strong>Móvil:</strong> {{ contact.mobil }}</li>
      <li><strong>Ciudad:</strong> {{ location.city }}</li>
      <li><strong>Edad:</strong> {{ age }}</li>
      <li><strong>Perfil:</strong> Senior</li>
      <li><strong>Email:</strong> {{ contact.email }}</li>
      <li><strong>Freelance:</strong> Disponible</li>
    </ul>

    <p>
      Desde hace tiempo me desempeño como desarrollador de sistemas web a medida. Soy aficionado a la
      electrónica, la tecnología, la ciencia y la lectura. Valoro el crecimiento y desarrollo personal que
      surge de la convivencia familiar. Disfruto del ajedrez, la buena música y el cine, pero, más que
      nada, valoro tener tiempo para mis seres queridos.
    </p>
  </section>
</template>

<script setup lang="ts">
import personal from '~/data/personal'
import location from '~/data/location'
import contact from '~/data/contact'
import { calculateAge, formatDate } from '~/utils/dates'

const age = calculateAge(personal.birthday)
const birthday = formatDate(personal.birthday)
</script>

<style scoped>
section {
  margin-bottom: var(--space-xl);
}

img {
  border-radius: 8px;
  margin: var(--space-md) 0;
}

h2 {
  font-size: var(--font-size-xl);
}

h3 {
  font-size: var(--font-size-lg);
  color: var(--color-text-muted);
  font-weight: normal;
}

ul {
  list-style: none;
  margin: var(--space-md) 0;
  padding: 0;
  display: grid;
  gap: var(--space-xs);
}
</style>
