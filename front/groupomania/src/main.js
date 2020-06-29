import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
import Routes from './Routes'
import Vuelidate from 'vuelidate';
import axios from 'axios'
import VueAxios from 'vue-axios'
import underscore from 'vue-underscore'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)

const moment = require('moment')
require('moment/locale/fr')

Vue.use(underscore)
 
Vue.use(require('vue-moment'), {
    moment
})

Vue.use(VueRouter);
Vue.use(Vuelidate);

 const router = new VueRouter({
  routes: Routes,
  mode: 'history'
});

// router.beforeEach((to, from, next) => {
//     if(to.matched.some(record => record.meta.requiresAuth)) {
//         if (localStorage.getItem('jwt') == null) {
//             next({
//                 path: '/',
//             })
//         } else {
//             let user = JSON.parse(localStorage.getItem('user'))
//             if(to.matched.some(record => record.meta.is_admin)) {
//                 if(user.is_admin == 1){
//                     next()
//                 }
//                 else{
//                     next({ name: 'home'})
//                 }
//             }else {
//                 next()
//             }
//         }
//     } else if(to.matched.some(record => record.meta.guest)) {
//         if(localStorage.getItem('jwt') == null){
//             next({ name: 'register' })
//         }
//         else{
//             next({ name: ''})
//         }
//     }else {
//         next({ name: ''})
//     }
// })

new Vue({
  vuetify,
  render: h => h(App),
  router: router
}).$mount('#app')


