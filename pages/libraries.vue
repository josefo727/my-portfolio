<template>
  <div>
    <h1>{{ t('libraries.heading') }}</h1>

    <LibraryDoc :summary="t('libraries.vtexApiPhp.summary')">
      <h2>{{ t('libraries.vtexApiPhp.title') }}</h2>
      <h3>{{ t('libraries.labels.summary') }}</h3>
      <p>{{ t('libraries.vtexApiPhp.body') }}</p>
      <ul>
        <li>{{ t('libraries.vtexApiPhp.compatibility') }}</li>
        <li>
          {{ t('libraries.labels.github') }}
          <a href="https://github.com/josefo727/vtex-api" target="_blank" rel="noopener">https://github.com/josefo727/vtex-api</a>
        </li>
        <li>
          {{ t('libraries.labels.packagist') }}
          <a href="https://packagist.org/packages/brandlive/vtex-api" target="_blank" rel="noopener">https://packagist.org/packages/brandlive/vtex-api</a>
        </li>
        <li>
          {{ t('libraries.labels.vtexDocs') }}
          <a href="https://developers.vtex.com/vtex-rest-api/docs/getting-started-list-of-rest-apis" target="_blank" rel="noopener">https://developers.vtex.com/vtex-rest-api/docs/getting-started-list-of-rest-apis</a>
        </li>
      </ul>
      <h3>{{ t('libraries.labels.whatIsVtex') }}</h3>
      <p>{{ t('libraries.vtexApiPhp.whatIsVtexBody') }}</p>
    </LibraryDoc>

    <LibraryDoc :summary="t('libraries.vtexApiJs.summary')">
      <h2>{{ t('libraries.vtexApiJs.title') }}</h2>
      <h3>{{ t('libraries.labels.summary') }}</h3>
      <p>{{ t('libraries.vtexApiJs.body') }}</p>
      <ul>
        <li>{{ t('libraries.vtexApiJs.compatibility') }}</li>
        <li>
          {{ t('libraries.labels.github') }}
          <a href="https://github.com/josefo727/vtex-api-js" target="_blank" rel="noopener">https://github.com/josefo727/vtex-api-js</a>
        </li>
        <li>
          {{ t('libraries.labels.packagist') }}
          <a href="https://packagist.org/packages/brandlive/vtex-api" target="_blank" rel="noopener">https://packagist.org/packages/brandlive/vtex-api</a>
        </li>
        <li>
          {{ t('libraries.labels.vtexDocs') }}
          <a href="https://developers.vtex.com/vtex-rest-api/docs/getting-started-list-of-rest-apis" target="_blank" rel="noopener">https://developers.vtex.com/vtex-rest-api/docs/getting-started-list-of-rest-apis</a>
        </li>
      </ul>
      <h3>{{ t('libraries.labels.whatIsVtex') }}</h3>
      <p>{{ t('libraries.vtexApiJs.whatIsVtexBody') }}</p>
    </LibraryDoc>

    <LibraryDoc :summary="t('libraries.generalSettings.summary')">
      <h2>{{ t('libraries.generalSettings.title') }}</h2>
      <h3>{{ t('libraries.labels.summary') }}</h3>
      <p>{{ t('libraries.generalSettings.body') }}</p>
      <ul>
        <li>{{ t('libraries.generalSettings.compatibility') }}</li>
        <li>
          {{ t('libraries.labels.github') }}
          <a href="https://github.com/josefo727/general-settings" target="_blank" rel="noopener">https://github.com/josefo727/general-settings</a>
        </li>
        <li>
          {{ t('libraries.labels.packagist') }}
          <a href="https://packagist.org/packages/josefo727/general-settings" target="_blank" rel="noopener">https://packagist.org/packages/josefo727/general-settings</a>
        </li>
      </ul>
    </LibraryDoc>

    <LibraryDoc :summary="t('libraries.filamentGeneralSettings.summary')">
      <h2>{{ t('libraries.filamentGeneralSettings.title') }}</h2>
      <h3>{{ t('libraries.labels.summary') }}</h3>
      <p>{{ t('libraries.filamentGeneralSettings.body') }}</p>
      <ul>
        <li>{{ t('libraries.filamentGeneralSettings.compatibility') }}</li>
        <li>
          {{ t('libraries.labels.github') }}
          <a href="https://github.com/josefo727/filament-general-settings" target="_blank" rel="noopener">https://github.com/josefo727/filament-general-settings</a>
        </li>
      </ul>
    </LibraryDoc>
  </div>
</template>

<script setup lang="ts">
import LibraryDoc from '~/components/libraries/LibraryDoc.vue'

const { t } = useI18n()

usePageSeo('libraries')
</script>
