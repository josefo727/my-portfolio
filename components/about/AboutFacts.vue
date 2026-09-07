<template>
  <section>
    <h2>Hechos</h2>
    <p>
      Durante mi carrera como desarrollador web, he tenido aciertos y éxitos que realmente valen la pena
      destacar.
    </p>
    <ul>
      <li v-for="fact in facts" :key="fact.title">
        <strong>{{ fact.quantity }}</strong>
        <p>{{ fact.title }} {{ fact.sub_title }}</p>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import facts from '~/data/facts'
</script>
