<template>
  <section>
    <h2>{{ t('about.heading') }}</h2>
    <p>{{ t('about.intro') }}</p>

    <img src="/assets/img/profile-img.jpeg" alt="">
    <h3>UI/UX Designer &amp; Web Developer.</h3>
    <p>{{ t('about.personalInfo') }}</p>

    <ul>
      <li><strong>{{ t('about.fields.birthday') }}</strong> {{ birthday }}</li>
      <li>
        <strong>{{ t('about.fields.website') }}</strong>
        <a :href="contact.web_site" target="_blank" rel="noopener">{{ contact.web_site }}</a>
      </li>
      <li><strong>{{ t('about.fields.mobile') }}</strong> {{ contact.mobil }}</li>
      <li><strong>{{ t('about.fields.city') }}</strong> {{ location.city }}</li>
      <li><strong>{{ t('about.fields.age') }}</strong> {{ age }}</li>
      <li><strong>{{ t('about.fields.level') }}</strong> {{ t('about.fields.levelValue') }}</li>
      <li><strong>{{ t('about.fields.email') }}</strong> {{ contact.email }}</li>
      <li><strong>{{ t('about.fields.freelance') }}</strong> {{ t('about.fields.freelanceValue') }}</li>
    </ul>

    <p>{{ t('about.closing') }}</p>
  </section>
</template>

<script setup lang="ts">
import personal from '~/data/personal'
import location from '~/data/location'
import contact from '~/data/contact'
import { calculateAgeYears, formatDate, type DateLocale } from '~/utils/dates'

const { t } = useI18n()
const route = useRoute()
const dateLocale = computed<DateLocale>(() => (route.path.startsWith('/en') ? 'en' : 'es'))

const age = computed(() => t('about.fields.ageValue', { count: calculateAgeYears(personal.birthday) }))
const birthday = computed(() => formatDate(personal.birthday, dateLocale.value))
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
