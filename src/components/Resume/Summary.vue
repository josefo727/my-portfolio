<template>
  <div>
    <h3 class="resume-title">Resúmen</h3>
    <div class="resume-item pb-0">
      <h4>{{ my.short_name }}</h4>
      <p>
        <em>
          Desarrollador web innovador con más de 9 años de experiencia en el diseño, desarrollo e implementación de sistemas
          informáticos como soluciones al sector público y privado.
        </em>
      </p>
      <ul>
        <li>{{ location.address }}, {{ location.city }}</li>
        <li>{{ contact.mobil }}</li>
        <li>{{ contact.email }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Summary",
  computed: {
    ...mapState('personal', ['my']),
    ...mapState('location', ['location']),
    ...mapState('contact', ['contact']),
  }
}
</script>

<style scoped>

</style>