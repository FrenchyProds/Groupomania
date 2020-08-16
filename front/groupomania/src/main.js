import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
import Routes from './Routes'
import Vuelidate from 'vuelidate';
import axios from 'axios'
import VueAxios from 'vue-axios'
import underscore from 'vue-underscore'
import VueSmoothScroll from 'vue2-smooth-scroll'
import VuePaginate from 'vue-paginate'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)

const moment = require('moment')
require('moment/locale/fr')

Vue.use(underscore)

Vue.use(VuePaginate)

Vue.use(VueSmoothScroll)
 
Vue.use(require('vue-moment'), {
    moment
})

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


