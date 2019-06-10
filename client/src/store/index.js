import Vue from 'vue'
import Vuex from 'vuex'

import state from './client-module/state'
import * as getters from './client-module/getters'
import * as mutations from './client-module/mutations'
import * as actions from './client-module/actions'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

const Store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,

  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: process.env.DEV
})

export default Store
