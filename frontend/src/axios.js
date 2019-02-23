import Vue from 'vue'
import axios from 'axios'
import store from './stores/store'
import router from './router'

axios.interceptors.request.use(config => {
    let token = window.localStorage.getItem('token')
    if( token )
        config.headers['Authorization'] = 'Bearer ' + window.localStorage.getItem('token')
    return config
})

axios.interceptors.response.use(undefined, err => {
    let res = err.response
    if(res != undefined){
        if( res.status === 401 ){
            store.state.interceptors = { message: res.data.err }
            router.push({ name: 'logout' })
        }
    } 
})

Vue.prototype.$http = axios