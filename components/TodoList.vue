<template>
    <article class="todo-row">
        <h2 class="todo-row-title">
            {{data.columTitle}} 
            <p class="todo-row-length" v-if="data.taskList.length > 0">{{data.taskList.length}}</p> 
        </h2>
            <div class="todo-row-list">
                <p v-if="arrWithGhost.length === 0" class="todo-list-placeholder">Nothing here 😪</p>
                <div class="todo-list-item bg-white" v-for="(task, index) in arrWithGhost" :key="task.title" 
                                :style="{height: task.height}"
                                :class="{'ghost': !!task.height}"
                                :data-todo-index="columIndex + '' + index" 
                                
                                @mousedown.left="taskClicked($event, $event.currentTarget, Object.assign({}, data.taskList[index]), index, $event.path)"
                                @touchstart="taskClicked($event.touches[0], $event.currentTarget, Object.assign({}, data.taskList[index]), index, $event.path)"
                                
                                @click.right.prevent="openQuickMenu(Object.assign({}, data.taskList[index]), index)">

                    <BaseResizeTextArea name="todo-title" 
                                        :maxHeight="100"
                                        v-model="task.title"
                                        class="todo-title"
                                        readonly/>

                    <div class="todo-opts"
                        :class="task.prioraty">
                        <p class="todo-prioraty bold">{{task.prioraty}}</p>
                    </div>
                    <TodoDeadline :finishDate="task.deadline" :dateNow="dateNow" :isFinished="data.columTitle === 'Done'"/> 

                    <span class="reduct-icon btn">
                        <font-awesome-icon icon="pen" />
                    </span>
                </div>


                <form class="todo-list-add-task bg-white" v-if="isAdd"
                    @submit.prevent="commitAddTask">
                    <BaseResizeTextArea name="add-task-title" 
                                        :maxHeight="100"
                                        :enterSubmit="true"
                                        placeholder="Init task title"
                                        v-model="addTaskTitle"/>

                    <BaseRadioBtn :switchValue="radioPrioratyValue" v-model="radioPrioratyValue.model"/>

                    <BaseNumberInput :inputVal="numberInputVal"/>

                    <div class="todo-list-buttons-row">
                        <button class="btn-item btn" @click="hideAddTask">Cancel</button>
                        <button type="submit" class="btn-item btn bg-blue">Add</button>    
                    </div> 
                </form>

                <div class="todo-add-card btn" v-else @click="showAddTask">
                    <font-awesome-icon icon="plus" />
                    <p class="semi-bold">Card</p>
                </div>
            </div>
    </article>    
</template>

<script>
let height = 0;
export default {
    props: {
        data: {
            type: Object,
            required: true
        },
        columIndex: {
            type: Number,
            required: true          
        },
        ghostColum: {
            type: Number,
            required: true          
        },    
        ghostTask: {
            type: Number,
            required: true          
        },     
        dateNow: {
            type: Number,
            required: true          
        }
    },
    data: () => {
        return {
            addTaskTitle: '',
            isAdd: false,
            radioPrioratyValue: {
                model: 'low',
                value: [
                    {txt: 'low' , value: 'low', color: '50,160,0'},
                    {txt: 'medium' , value: 'medium', color: '230,170,104'},
                    {txt: 'high' , value: 'high', color: '250,51,51'},
                ],
                name: 'prioraty'
            },
            numberInputVal: [{
                name: 'deadline-days',
                model: '',
                max: 999
            },{
                name: 'deadline-hours',
                model: '',
                max: 24               
            },{
                name: 'deadline-minutes',
                model: '',
                max: 60
            }]
        }
    },
    computed: {
        arrWithGhost() {
            let arr = [];

            this.data.taskList.forEach(task => {
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
        //Ghost config
        taskClicked(e, currentTarget, task, taskIndex, path) {
            let ReductBtnObj = currentTarget.querySelector('.reduct-icon');
            if (path.includes(ReductBtnObj)) 
                return this.openTask(task, taskIndex);

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

            task.isFinished = false;
            if (this.data.columTitle === 'Done')
                task.isFinished = true;

            this.$emit('activateGhost', {e, task, index, width: thisBlock.width, left: e.clientX, top: e.clientY, offSet});
        },
        //Quick menu config
        openQuickMenu(task, taskIndex) {
            let thisBlock = document.querySelector("[data-todo-index=" + JSON.stringify(this.columIndex + '' + taskIndex) + "]").getBoundingClientRect();

            let index = {
                colum: this.columIndex,
                task: taskIndex
            };

            task.isFinished = false;
            if (this.data.columTitle === 'Done')
                task.isFinished = true;

            this.$emit('openQuickMenu', {task, index, height: thisBlock.height , width: thisBlock.width, left: thisBlock.left, top: thisBlock.top});
        },
        openTask(task, taskIndex) {
            let index = {
                colum: this.columIndex,
                task: taskIndex
            };    
            
            task.isFinished = false;
            if (this.data.columTitle === 'Done')
                task.isFinished = true;

            this.$emit('openTask', {task, index});
        },
        //Add Task config
        showAddTask() {
            this.isAdd = true;
        },
        hideAddTask() {
            this.isAdd = false;

            this.addTaskTitle = this.numberInputVal[0].model = this.numberInputVal[1].model = this.numberInputVal[2].model = '';
            this.radioPrioratyValue.model = 'low';
        },
        commitAddTask() {
            let deadline = new Date();
            if (Number(this.numberInputVal[0].model) + Number(this.numberInputVal[1].model) + Number(this.numberInputVal[2].model) == 0)
                deadline.setDate(deadline.getDate() + 1); 
            else {
                deadline.setDate(deadline.getDate() + Number(this.numberInputVal[0].model));
                deadline.setHours(deadline.getHours() + Number(this.numberInputVal[1].model));
                deadline.setMinutes(deadline.getMinutes() + Number(this.numberInputVal[2].model));
            }

            let task = {
                title: this.addTaskTitle.trim(),
                prioraty: this.radioPrioratyValue.model,
                deadline: deadline.getTime(),
                description: ''
            };

            this.$emit('addTask', {index: this.columIndex, task});

            this.hideAddTask();
        }
    }
}
</script>

<style>
    .todo-row {
        display: inline-block;
        width: 300px;
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

    .resible-text-area {
        font-size: 1.25rem;
        margin-bottom: .3em;
    }

    .todo-title {
        cursor: default;
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

    .btn-item {
        border-radius: 5px;
        background: #000;
        color: #fff;
        padding: .3em .6em;
    }

    .bg-blue {
        background: #3B86FF;
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

    .todo-list-add-task {
        margin-bottom: .75em;
    }
    
    .todo-list-item,
    .todo-list-add-task {
        padding: .375em .75em;

        box-shadow: 0px 2px 8px 2px rgba(0, 0, 0, 0.1);
    }
    .todo-list-item + .todo-list-item,
    .todo-list-add-task{
        margin-top: .75em;
    }
    .ghost {
        background: #C6C6C6;
    }
    .ghost .todo-opts,
    .ghost .todo-title,
    .ghost .reduct-icon {
        display: none;
    }

    .reduct-icon {
        float: right;
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
        transform: translate(-50%, 0);
    }

    .radio-btn {
        margin-bottom: 6px;
    }

    .todo-list-buttons-row {
        display: flex;
        justify-content: space-between;

        padding-top: .375em;
    }


    @media (max-width: 600px) {
        .todo-row {
            min-width: 100%;
        }
    }

</style>