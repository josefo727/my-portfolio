import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import plugins from './plugins/index';
Vue.use(plugins);
// import VueTypedJs from 'vue-typed-js';
// Vue.use(VueTypedJs);
// import checkView from 'vue-check-view';
// Vue.use(checkView);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
