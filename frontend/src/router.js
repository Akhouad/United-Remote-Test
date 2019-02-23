import Vue from 'vue'
import Router from 'vue-router'

import Login from './views/auth/Login.vue'
import Register from './views/auth/Register.vue'
import Logout from './views/auth/Logout.vue'

import Shops from './views/shops/Shops.vue'
import Preferred from './views/shops/Preferred.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
      beforeEnter: (to, from, next) => user_authenticated(next)
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      beforeEnter: (to, from, next) => user_authenticated(next)
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout
    },
    {
      path: '/shops',
      name: 'shops',
      component: Shops
    },
    {
      path: '/preferred-shops',
      name: 'preferred-shops',
      component: Preferred
    }
  ]
})

function user_authenticated(next){
  if ( window.localStorage.getItem('token') ) next({ path: '/shops' })
  else next()
}