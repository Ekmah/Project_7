import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:null
  },
  mutations: {
    INSERT_TOKEN(state, payload) {
      state.token = payload
    }
  },
  actions: {
    insert_token(context, token) {
      context.commit('INSERT_TOKEN', token)
    }
  },
  modules: {
  }
})
