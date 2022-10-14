<template>
  <section id="libraries" class="libraries">
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item" role="presentation">
        <button
            class="nav-link active"
            id="vtex-api-php-tab"
            data-toggle="tab"
            data-target="#vtex-api-php"
            type="button"
            role="tab"
            aria-controls="vtex-api-php"
            aria-selected="true">
          Vtex API PHP
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
            class="nav-link"
            id="vtex-api-js-tab"
            data-toggle="tab"
            data-target="#vtex-api-js"
            type="button"
            role="tab"
            aria-controls="vtex-api-js"
            aria-selected="false">
          Vtex API JS
        </button>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <div class="tab-pane fade show active" id="vtex-api-php" role="tabpanel" aria-labelledby="vtex-api-php-tab">
        <h4>Libería para consumo de las API's de Vtex Framework</h4>
        <h5>Resumen</h5>
        <p>
          Esta librería fue creada para el consumo de ecommerces creados en Vtex Framework para acelerar las integraciones
          de dichas tiendas con sus respectivos sistemas de ventas e inventarios (SAP, Intelisis, WinPOS, entre otros)
          a través de aplicaciones realizadas en PHP o Laravel
        </p>
        <ul>
          <li>
            Compatibilidad: PHP 8+, Laravel 7+
          </li>
          <li>
            Repositorio GitHub: <a href="https://github.com/josefo727/vtex-api" target="_blank">https://github.com/josefo727/vtex-api</a>
          </li>
          <li>
            Paquete en Packagist: <a href="https://packagist.org/packages/brandlive/vtex-api" target="_blank">https://packagist.org/packages/brandlive/vtex-api</a>
          </li>
          <li>
            Vtex REST APIs Documentación: <a href="https://developers.vtex.com/vtex-rest-api/docs/getting-started-list-of-rest-apis" target="_blank">https://developers.vtex.com/vtex-rest-api/docs/getting-started-list-of-rest-apis</a>
          </li>
        </ul>
        <h5>¿Qué es Vtex?</h5>
        <p>
          VTEX es una plataforma de comercio electrónico que ayuda a las empresas a crear su propio eCommerce y vender sus
          productos en línea. A través de esta herramienta podrás diseñar tu comercio digital, gestionar productos, recibir
          órdenes de compra, realizar cobros y consolidar toda la información de tus usuarios.
        </p>
      </div>
      <div class="tab-pane fade" id="vtex-api-js" role="tabpanel" aria-labelledby="vtex-api-js-tab">
        <h4>Libería para consumo de las API's de Vtex Framework</h4>
        <h5>Resumen</h5>
        <p>
          Esta librería fue creada para el consumo de ecommerces creados en Vtex Framework para acelerar las integraciones
          de dichas tiendas con sus respectivos sistemas de ventas e inventarios (SAP, Intelisis, WinPOS, entre otros)
          a través de aplicaciones realizadas en NodeJS.
        </p>
        <ul>
          <li>
            Compatibilidad: JS, Node
          </li>
          <li>
            Repositorio GitHub: <a href="https://github.com/josefo727/vtex-api-js" target="_blank">https://github.com/josefo727/vtex-api-js</a>
          </li>
          <li>
            Paquete en Packagist: <a href="https://packagist.org/packages/brandlive/vtex-api" target="_blank">https://packagist.org/packages/brandlive/vtex-api</a>
          </li>
          <li>
            Vtex REST APIs Documentación: <a href="https://developers.vtex.com/vtex-rest-api/docs/getting-started-list-of-rest-apis" target="_blank">https://developers.vtex.com/vtex-rest-api/docs/getting-started-list-of-rest-apis</a>
          </li>
        </ul>
        <h5>¿Qué es Vtex?</h5>
        <p>
          VTEX es una plataforma de comercio electrónico que ayuda a las empresas a crear su propio eCommerce y vender sus
          productos en línea. A través de esta herramienta podrás diseñar tu comercio digital, gestionar productos, recibir
          órdenes de compra, realizar cobros y consolidar toda la información de tus usuarios.
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Index"
}
</script>

<style scoped>
.libraries {
  margin: 20px 50px 0;
}
@media screen and (max-width: 1199px) {
  .libraries {
    margin: 40px 20px 0;
  }
}
.nav-item {
  margin-right: 3px;
}
.nav-link {
  font-weight: bold;
}
.nav-link.active {
  border-color: #040B14;
  border-bottom: none;
}
.tab-pane {
  margin: 20px 10px;
}
.tab-pane > p {
  text-align: justify;
}
</style>