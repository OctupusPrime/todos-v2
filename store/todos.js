export const state = () => ({
    todos: []
})

export const mutations = {
    initTodos(state, newState) {
        state.todos = newState;
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
    editTask(state, params) {
        const { column, task, data } = params;
        let newVal = {...state.todos[Number(column)].taskList[Number(task)], ...data};
        state.todos[Number(column)].taskList[Number(task)] = newVal;
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
            console.log(e);
        }
        commit('addTaksToArr', params);
        
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
        let newData = Object.assign({}, state.todos[Number(column)].taskList[Number(task)]);
        if (data.deadline)
            newData.deadline = data.deadline;
        if (data.prioraty)
            newData.prioraty = data.prioraty;
        if (data.description)
            newData.description = data.description;
        if (data.title)
            newData.title = data.title;

        try {
            await this.$axios.$put('tasks/' + title.replace(' ', '%20'), data);
        } catch(e) {
            console.log(e);
        }

        commit('removeTaskFromArr', params);
        commit('addTaksToArr', {column, task, data: newData});
    }
}

export const getters = {
    getTodos(state) {
      return state.todos
    }
}