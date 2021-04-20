export const state = () => ({
    token: null
})

export const mutations = {
    setToken(state, tokenstr) {
        state.token = tokenstr 
    },
    clearToken(state) {
        state.token = null
    }
}

export const actions = {
    login({commit}, tokenStr) {
        commit('setToken', tokenStr)
        window.$nuxt.$cookies.set('token', tokenStr, {
            path: '/'
        })
    },
    logout({commit}) {
        commit('clearToken')
        window.$nuxt.$cookies.remove('token', {
            path: '/'
        })
    }
}
export const getters = {
    getToken(state) {
      return state.token
    }
  }