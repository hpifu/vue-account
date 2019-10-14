import Vue from 'vue';
import VueConfig from 'vue-config';
import VueCookies from 'vue-cookies';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

import App from './App.vue';
import config from './configs';
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueCookies);
Vue.use(VueConfig, config);

// const router = new VueRouter({

// });

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
