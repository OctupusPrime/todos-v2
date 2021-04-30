export const state = () => ({
    isOpen: false
})

export const mutations = {
    open(state) {
        state.isOpen = true
    },
    close(state) {
        state.isOpen = false
    }
}

export const getters = {
    getRegLog(state) {
      return state.isOpen
    }
}