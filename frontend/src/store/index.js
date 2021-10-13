import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:null
  },
  mutations: {
    insert_token(state, payload) {
      state.token = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
