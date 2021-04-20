export const state = () => ({
    token: ''
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
    },
    logout({commit}) {
        commit('clearToken')
    }
}
export const getters = {
    getToken(state) {
      return state.token
    }
  }