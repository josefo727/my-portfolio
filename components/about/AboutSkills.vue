<template>
  <section>
    <h2>{{ t('about.skills.heading') }}</h2>
    <p>{{ t('about.skills.intro') }}</p>
    <ul>
      <li v-for="skill in skills" :key="skill.title">
        <img :src="skill.image" alt="">
        <span>{{ skill.title }}</span>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import skillsEs from '~/data/skills'
import skillsEn from '~/data/skills.en'

const { t } = useI18n()
const skills = useLocalizedData(skillsEs, skillsEn)
</script>

<style scoped>
section {
  margin-bottom: var(--space-xl);
}

h2 {
  font-size: var(--font-size-xl);
}

ul {
  list-style: none;
  margin: var(--space-md) 0 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: var(--space-sm);
}

li {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

img {
  width: 32px;
  height: 32px;
  object-fit: contain;
}
</style>
