<template>
  <nav>
    <ul>
      <li><NuxtLink to="/">Inicio</NuxtLink></li>
      <li><NuxtLink to="/about">Acerca de mí</NuxtLink></li>
      <li><NuxtLink to="/resume">Resumen</NuxtLink></li>
      <li><NuxtLink to="/libraries">Librerías</NuxtLink></li>
      <li><NuxtLink to="/success-stories">Casos de Éxito</NuxtLink></li>
      <li><NuxtLink to="/certifications">Certificaciones</NuxtLink></li>
      <li><NuxtLink to="/contact">Contacto</NuxtLink></li>
    </ul>
  </nav>
</template>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

a {
  display: block;
  padding: var(--space-xs) var(--space-sm);
  border-radius: 4px;
  text-decoration: none;
}

a:hover {
  background-color: var(--color-background-alt);
}

a:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: -2px;
}

a.router-link-active {
  font-weight: bold;
  color: var(--color-text);
  background-color: var(--color-background-alt);
}
</style>
