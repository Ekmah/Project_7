import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

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
  },
  plugins: [createPersistedState()],
})