import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
import store from '../store'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })
  Router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.needsAuthorization)) {
      store.dispatch('isAuthorized').then(() => {
        next()
      }).catch(error => {
        next('/login')
        console.log(error)
      })
    } else next()
  })
  return Router
}
