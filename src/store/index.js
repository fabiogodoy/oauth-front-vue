import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        token: ''
    },
    mutations:{
        STORE_TOKEN (state, token){
            state.token = token
        },
        ERASE_TOKEN (state){
            state.token = ''
        }
    },
    getters: {

        token:state => {
            return state.token
        },
        isAuthenticated: state => {
            return !!state.token
        },

    },
    actions:{
        logout(context){
            context.commit('ERASE_TOKEN')
        }
    }
})