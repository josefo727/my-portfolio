<template>
  <div>
    <h3>Resúmen</h3>
    <h4>{{ personal.short_name }}</h4>
    <p>
      <em>
        Desarrollador web innovador con más de 13 años de experiencia en el diseño, desarrollo e implementación
        de sistemas informáticos como soluciones al sector público y privado.
      </em>
    </p>
    <ul>
      <li>{{ location.department }}, {{ location.city }}</li>
      <li>{{ contact.mobil }}</li>
      <li>{{ contact.email }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import personal from '~/data/personal'
import location from '~/data/location'
import contact from '~/data/contact'
</script>
