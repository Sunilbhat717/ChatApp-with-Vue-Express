import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const store = new Vuex.Store({
    strict: true,
    plugins: [createPersistedState()],
    state:{
        user: null,
        chats:null,
        token: null,
        isUserLoggedIn: null
    },
    mutations:{
        setToken (state, token){
            state.token = token
            state.isUserLoggedIn = !!(token)
        },
        setUser(state, user){
            state.user = user
        },
        setChats(state, chats){
            state.chats = chats
        }
    },
    actions:{
        setToken({commit}, token){
            commit('setToken', token)
        },
        setUser({commit}, user){
            commit('setUser', user)
        },
        setChats({commit}, chats){
            commit('setChats', chats)
        }
    }
});

export default store