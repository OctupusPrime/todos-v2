<template>
    <article class="todo-row">
        <h2 class="todo-row-title">
            {{data.title}} 
            <p class="todo-row-length" v-if="data.context.length > 0">{{data.context.length}}</p> 
        </h2>
            <div class="todo-row-list">
                <p v-if="arrWithGhost.length === 0" class="todo-list-placeholder">Nothing here 😪</p>
                <div class="todo-list-item bg-white" v-for="(task, index) in arrWithGhost" :key="task.title"
                                :style="{height: task.height}"
                                :class="{'ghost': !!task.height}"
                                :data-todo-index="columIndex + '' + index" 
                                
                                @mousedown.left="taskClicked($event, $event.currentTarget, data.context[index], index)"
                                @touchstart="taskClicked($event.touches[0], $event.currentTarget, data.context[index], index)"
                                
                                @click.right.prevent="openQuickMenu($event.currentTarget, data.context[index], index)">
                    <h3 class="todo-title">{{task.title}}</h3>

                    <div class="todo-opts"
                        :class="task.priopaty">
                        <p class="todo-prioraty bold">{{task.priopaty}}</p>
                    </div>
                    <div class="todo-opts blue">
                        <p class="todo-deadline semi-bold">{{task.deadline}}</p>
                    </div>
                </div>
                <div class="todo-add-card btn">
                    <font-awesome-icon icon="plus" />
                    <p class="semi-bold">Card</p>
                </div>
            </div>
    </article>    
</template>

<script>
let height = 0;
export default {
    props: ['data', 'columIndex', 'ghostColum', 'ghostTask'],
    computed: {
        arrWithGhost() {
            let arr = [];

            this.data.context.forEach(task => {
                arr.push(Object.assign({}, task));
            });

            if (this.columIndex === this.ghostColum) {
                let cont = {
                height
                };
                arr.splice(this.ghostTask, 0, cont);
            }

            return arr;
        }
    },
  methods: {
    taskClicked(e, currentTarget, task, taskIndex) {
        let thisBlock = currentTarget.getBoundingClientRect();

        height = thisBlock.height + 'px';

        let offSet = {
            left: e.clientX - thisBlock.left,
            top:  e.clientY - thisBlock.top
        };

        let index = {
            colum: this.columIndex,
            task: taskIndex
        };

        this.$emit('activateGhost', {e, task, index, width: thisBlock.width, left: e.clientX, top: e.clientY, offSet});
    },
    openQuickMenu(currentTarget, task, taskIndex) {
        let thisBlock = currentTarget.getBoundingClientRect();
        
        let index = {
            colum: this.columIndex,
            task: taskIndex
        };

        this.$emit('openQuickMenu', {task, index, width: thisBlock.width, left: thisBlock.left, top: thisBlock.top});
    }
  }
}
</script>

<style>
    .todo-row {
        display: inline-block;
        min-width: 300px;
        height: 100%;
        box-sizing: border-box;
    }
    .todo-row + .todo-row {
        margin-left: 50px;
    }

/* Typography */

    .todo-row-title {
        display: inline-block;
        position: relative;
        font-size: 1.35rem;
        margin-bottom: .5em;
    }
    .todo-row-length {
        font-weight: 500;
        font-size: .95rem;
        padding: 1px .5em;

        background: #EBEBEB;
        color: #636363;
        border-radius: 50%;

        position: absolute;
        right: -12px;
        top: 50%;
        transform: translate(100%, -50%);
    }

    .todo-title {
        font-size: 1.25rem;
        padding-bottom: .15em;
    }

    .todo-title-textArea {
        font-size: 1.25rem;
        padding-bottom: .1em;
    }

    .todo-list-placeholder {
        font-size: 1.125rem;
        color: #767676;
        text-align: center;
    }

    .todo-prioraty,
    .todo-deadline {
        font-size: .875rem;
    }

    .todo-add-card p {
        display: inline-block;
        font-size: 1.125rem;
        margin-left: .25em;
    }

    .todo-add-card svg {
        font-size: .875rem;
        margin-bottom: .1em;
    }

/* Layout */
    .todo-row-list {
        background: #EBEBEB;
        border-radius: 5px;

        padding: .75em;
        padding-bottom: 0;
        overflow-y: auto;

        max-height: calc(100% - 36px);
        height: fit-content;

        position: relative;
    }
    
    .todo-list-item {
        padding: .375em .75em;

        box-shadow: 0px 2px 8px 2px rgba(0, 0, 0, 0.1);
    }
    .todo-list-item + .todo-list-item {
        margin-top: .75em;
    }
    .ghost {
        background: #C6C6C6;
    }
    .ghost .todo-opts {
        display: none;
    }

    .todo-opts{
        display: inline-block;
        margin-right: .625em;
        padding: .3em .6em;
        border-radius: 5px;
    }
    .low {
        background: #deebd9;
        color: #32A000;
        text-shadow: 0px 0px 5px rgba(50, 160, 0, 0.5);
    }
    .medium {
        background: #f8e9d9;
        color: #E6AA68;
        text-shadow: 0px 0px 5px rgba(230, 170, 104, 0.5);
    }
    .high {
        background: #fdcccc;
        color: #FA3333;
        text-shadow: 0px 0px 5px rgba(250, 51, 51, 0.5);
    }
    .blue {
        background: #cee0ff;
        color: #3B86FF;
        text-shadow: 0px 0px 5px rgba(59, 134, 255, 0.5);
    }

    .todo-add-card {
        width: 95%;
        margin-top: .5em;
        padding-bottom: .3755em;
        padding: .25em 0 .375em 0;

        text-align: center;
        color: #767676;
        background: #EBEBEB;

        border-top-left-radius: 5px;
        border-top-right-radius: 5px;

        position: sticky;
        bottom: 0;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, 0)
    }


    @media (max-width: 600px) {
        .todo-row {
            min-width: 100%;
        }
    }

</style>