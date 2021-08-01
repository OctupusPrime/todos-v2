export const state = () => ({
    todos: [],
    errors: '',
    isLoaded: false
})

export const mutations = {
    //Todos
    initTodos(state, newState, commit) {
        state.todos = newState;
        state.isLoaded = true;
    },
    clearTodos(state) {
        state.todos = [];
    },
    addTaksToArr(state, params) {
        const { column, task, data } = params;
        state.todos[Number(column)].taskList.splice(Number(task),  0, Object.assign({}, data));
    },
    removeTaskFromArr(state, params) {
        const { column, task } = params;
        state.todos[Number(column)].taskList.splice(Number(task), 1);
    },
    //Errors
    initError(state, err) {
        state.errors = err;
    },
    clearError(state) {
        state.errors = ''
    },
    //isLoaded 
    notLoaded(state) {
        state.isLoaded = false;
    } 
}

export const actions = {
    async getTodos({commit}) {
        try {
            const todos = await this.$axios.$get('tasks');
            commit('initTodos', todos);
        } catch(e) {
            console.log(e);
        }
    },
    async relocateTodo({commit}, params) {
        const { title, status, index } = params;
        
        try {
            await this.$axios.$put('tasks/relocate/' + title.replace(' ', '%20'), {
                status: status,
                index: index
            });
        } catch(e) {
            console.log(e);
        }
    },
    async addTodo({commit}, params) {
        const { data } = params;
        try {
            await this.$axios.$post('tasks', data);
        } catch(e) {
            return commit('initError', e.response.data.message);
        }
        commit('clearError');
        commit('addTaksToArr', params);
    },
    async deleteTodo({commit}, params) {
        const { title } = params;
        commit('removeTaskFromArr', params);
        try {
            await this.$axios.$delete('tasks/' + title.replace(' ', '%20'));
        } catch(e) {
            console.log(e);
        }
    },
    async editTodo({commit, state}, params) {
        const { column, task, title, data } = params;
        let newData = Object.assign({}, state.todos[Number(column)].taskList[Number(task)]);
        let reqTitle = title
        if (data.deadline)
            newData.deadline = data.deadline;
        if (data.prioraty)
            newData.prioraty = data.prioraty;
        if (data.description)
            newData.description = data.description;
        if (data.title) 
            newData.title = data.title;
        else 
            reqTitle = newData.title

        try {
            await this.$axios.$put('tasks/' + reqTitle.replace(' ', '%20'), data);
        } catch(e) {
            return commit('initError', e.response.data.message);
        }
        commit('clearError');

        commit('removeTaskFromArr', params);
        commit('addTaksToArr', {column, task, data: newData});
    }
}

export const getters = {
    getTodos(state) {
      return state.todos;
    },
    
    getErrors(state) {
        return state.errors;
    }
}