import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
import Routes from './Routes'
import Vuelidate from 'vuelidate';

Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(Vuelidate);

 const router = new VueRouter({
  routes: Routes,
  mode: 'history'
});

new Vue({
  vuetify,
  render: h => h(App),
  router: router
}).$mount('#app')
