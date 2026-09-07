<template>
  <footer>
    <p>&copy; {{ new Date().getFullYear() }} José R. Gutierrez</p>
  </footer>
</template>

<style scoped>
footer {
  padding: var(--space-md) var(--space-lg);
  border-top: 1px solid var(--color-border);
}

p {
  margin: 0;
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}
</style>
