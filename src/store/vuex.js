import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        username: '',
        avatar: ''
    },
    mutations: {
        changeusername(state, val) {
            state.username = val
        },
        changeavatar(state,val){
            state.avatar = val
        }
    }
})
export default store