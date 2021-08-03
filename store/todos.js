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
        const { column, task, data } = params;
        let addedTodo = {};
        try {
            addedTodo = await this.$axios.$post('tasks', data);
            delete addedTodo.index
        } catch(e) {
            return commit('initError', e.response.data.message);
        }
        commit('clearError');
        commit('addTaksToArr', { column, task, data: addedTodo });
    },
    async deleteTodo({commit}, params) {
        const { title } = params;
        try {
            await this.$axios.$delete('tasks/' + title.replace(' ', '%20'));
        } catch(e) {
            console.log(e);
        }
        commit('removeTaskFromArr', params);
    },
    async editTodo({commit, state}, params) {
        const { column, task, title, data } = params;
        let currentTodo = Object.assign({}, state.todos[Number(column)].taskList[Number(task)]);
        let reqTitle;
        
        if (data.title) 
            reqTitle = title
        else 
            reqTitle = currentTodo.title

        try {
            await this.$axios.$put('tasks/' + reqTitle.replace(' ', '%20'), data);
        } catch(e) {
            return commit('initError', e.response.data.message);
        }
        commit('clearError');

        commit('removeTaskFromArr', params);
        commit('addTaksToArr', {column, task, data: {...currentTodo, ...data}});
    }
}