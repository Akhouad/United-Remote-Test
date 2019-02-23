import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    api_url: 'http://localhost:1337/api/',
    user: window.localStorage.getItem('user'),
    token: window.localStorage.getItem('user'),
    interceptors: null
  },
  mutations: {

  },
  actions: {
    auth({ state }, payload){
      return new Promise((resolve, reject) => {
        this._vm.$http.post(state.api_url + 'auth/' + payload.action, { user: payload.user })
          .then(data => resolve(data))
          .catch(err => reject(err))
      })
    },

    shops({ state }){
      return new Promise((resolve, reject) => {
        this._vm.$http.get(state.api_url + 'shops')
          .then(data => resolve(data))
          .catch(err => reject(err))
      })
    },

    react({ state }, data){
      return new Promise((resolve, reject) => {
        this._vm.$http.post(state.api_url + 'shops/' + data.id + '/react', data.data)
          .then(data => resolve(data) )
          .catch(err => reject(err))
      })
    },

    get_preferred({ state }){
      return new Promise((resolve, reject) => {
        this._vm.$http.get(state.api_url + 'shops/preferred')
          .then(data => resolve(data))
          .catch(err => reject(err))
      })
    },

    remove_preferred({ state }, data){
      return new Promise((resolve, reject) => {
        this._vm.$http.delete(state.api_url + 'shops/remove_preferred', { data })
          .then(data => resolve(data))
          .catch(err => reject(err))
      })
    }
  }
})
