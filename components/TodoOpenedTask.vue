<template>
    <div class="todo-opened-task bg-white" v-if="isShow">
        <div class="todo-opened-task-flex-wrapper">
            <div class="main-todo-info">
                <p class="errors" >{{errors}}</p>
                <BaseResizeTextArea v-if="!data.isFinished"
                                    name="opened-task-title" 
                                    :maxHeight="100"
                                    :enterSubmit="true"
                                    placeholder="Init task title"
                                    @submitTextArea="initReqTitle"
                                    v-model="data.title"
                                    ref="taskTitle"/>
                <BaseResizeTextArea v-else
                                    name="opened-task-title" 
                                    :maxHeight="100"
                                    v-model="data.title"
                                    readonly/>
                <p class="todo-subtittle">In colum {{selectData[colum]}}</p>

                <div class="todo-opts-row" v-if="!isReduct">
                    <div class="todo-opts"
                        :class="data.prioraty">
                        <p class="todo-prioraty bold">{{data.prioraty}}</p>
                    </div>
                    <TodoDeadline :finishDate="data.deadline" :dateNow="dateNow" :isFinished="data.isFinished"/> 

                    <button class="reduct-icon btn" @click="openReductTask" v-if="!data.isFinished" />
                </div>

                <div class="todo-reduct" v-else>
                    <BaseRadioBtn :switchValue="radioPrioratyValue" v-model="radioPrioratyValue.model"/>

                    <BaseNumberInput :inputVal="numberInputVal"/>

                    <div class="todo-list-buttons-row">
                        <p class="btn-item btn" @click="hideReductTask">Cancel</p>
                        <p class="btn-item btn bg-blue" @click="commitReductTask">Reduct</p>    
                    </div> 
                </div>
            </div>


            <ul class="aside-todo-menu">
                <li class="quick-menu-item btn">
                    <h3 class="quick-menu-item-title normal" @click="openForm">Move</h3>

                    <div class="quick-menu-item-form-container bg-white" v-if="isMoveOpened">
                        <div class="quick-menu-item-form-title">
                            <h3 class="normal">Move task</h3>
                            <span class="icon" @click="closeForm">
                                <font-awesome-icon icon="times" />
                            </span>

                        </div>
                        <BaseSelectOptn :data="selectData" 
                                        :current="colum"
                                        @changedChoise="changedChoise"/>
                        <p class="item-form-submit btn" @click="initEmit('moveTask', moveSelectValue)">Move</p>
                    </div>

                </li>
                <li class="quick-menu-item btn" @click="initEmit('deleteTask')">
                    <h3 class="quick-menu-item-title red normal">Delete</h3>
                </li>
            </ul>
        </div>

        <div class="todo-description-container">
            <h4 class="semi-bold">Description</h4> 
            <div class="todo-description">
                <BaseResizeTextArea v-if="!data.isFinished"
                                    name="opened-task-description" 
                                    :maxHeight="250"
                                    placeholder="Init task description"
                                    v-model="data.description"
                                    @submitTextArea="initReqDesc"/>
                <BaseResizeTextArea v-else
                                    name="opened-task-description" 
                                    :maxHeight="250"
                                    v-model="data.description"
                                    placeholder="None desc"
                                    readonly/>
            </div>
        </div>
    </div>    
</template>

<script>
import { mapState } from "vuex";
let title  = '';
let desc   = '';
const   cd = 24 * 60 * 60 * 1000,// hr, min, sec, ms
        ch = 60 * 60 * 1000;//min, sec, ms
export default {
    props: {
        data: {
            type: Object,
            required: true
        },
        colum: {
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
            isClicked: false,
            isMoveOpened: false,
            isReduct: false,

            selectData: ['New', 'Processed', 'Done'],
            moveSelectValue: 0,

            radioPrioratyValue: {
                model: '',
                value: [
                    {txt: 'low' , value: 'low', color: '50,160,0'},
                    {txt: 'medium' , value: 'medium', color: '230,170,104'},
                    {txt: 'high' , value: 'high', color: '250,51,51'},
                ],
                name: 'reduct-prioraty'
            },
            numberInputVal: [{
                name: 'reduct-deadline-days',
                model: '',
                max: 999
            },{
                name: 'reduct-deadline-hours',
                model: '',
                max: 24               
            },{
                name: 'reduct-deadline-minutes',
                model: '',
                max: 60
            }],
            isExpired: false
        }
    },
    watch: {
        'isClicked'() {
            title = this.data.title;
            desc = this.data.description;
        },
        'data.title'() {
            if (this.errors)
                this.$store.commit('todos/clearError');
        }
    },
    computed: {
        isShow() {
            if (this.isClicked) {
                this.currentTaskReductData();
                if (!this.$store.getters['overlay/getOverlayVal']) {
                    this.close();
                    return false;
                }
                return true;
            }
            return false;
        },
        ...mapState('todos', ['errors'])
    },
    methods: {
        open() {
            this.isClicked = true;
        },
        close() {
            this.isClicked = false;
            this.closeForm();
            this.hideReductTask();
        },
        currentTaskReductData() {
            let difference_ms = this.data.deadline - new Date().getTime();
            let days = Math.floor(Math.abs(difference_ms) / cd);
            let hours = Math.floor( (Math.abs(difference_ms) - days * cd) / ch);
            let minutes = Math.round( (Math.abs(difference_ms) - days * cd - hours * ch) / 60000);

            if( minutes === 60 ){
                hours++;
                minutes = 0;
            }
            if( hours === 24 ){
                days++;
                hours = 0;
            }

            this.isExpired = false; 
            if (difference_ms <  -60000)
                this.isExpired = true; 

            if (!this.isExpired) {
                this.numberInputVal[0].model = days;
                this.numberInputVal[1].model = hours;
                this.numberInputVal[2].model = minutes;
            }

            this.radioPrioratyValue.model = this.data.prioraty;
        },
        //Menu config
        initEmit(emit, val) {
            this.$emit(emit, val);
        },
        openForm() {
            this.isMoveOpened = true;
        },
        closeForm() {
            this.isMoveOpened = false; 
        },
        changedChoise(val) {
            this.moveSelectValue = val
        },
        //Reduct config
        openReductTask() {
            this.isReduct = true;
        },
        hideReductTask() {
            this.isReduct = false
        },
        commitReductTask() {
            let deadline = new Date();
                deadline.setDate(deadline.getDate() + Number(this.numberInputVal[0].model));
                deadline.setHours(deadline.getHours() + Number(this.numberInputVal[1].model));
                deadline.setMinutes(deadline.getMinutes() + Number(this.numberInputVal[2].model));
            
            this.data.prioraty = this.radioPrioratyValue.model;
            this.data.deadline = deadline.getTime();

            this.$emit('editTask', {title, data: {
                prioraty: this.data.prioraty,
                deadline: this.data.deadline
            }});

            this.hideReductTask();
        },
        initReqTitle() {
            if (title != this.data.title) {
                this.$emit('editTask', {title, data: {
                    title: this.data.title.trim()
                }});
            }
        },
        initReqDesc() {
            if (desc != this.data.description) {
                this.$emit('editTask', {title, data: {
                    description: this.data.description.trim()
                }});
            }
        }
    }
}
</script>

<style scoped>
    @import '~assets/css/todo.css' all;

    .todo-opened-task {
        width: 95%;
        max-width: 500px;

        padding: .4em .8em;

        position: absolute;
        left: 50%;
        top: 10%;
        transform: translate(-50%, 0);
        z-index: 10;
    }

    .todo-opened-task-flex-wrapper {
        display: flex;
        justify-content: space-between;
     }

/* Typography */
    .main-todo-info {
        flex-grow: 2;
    }

    .todo-subtittle {
        font-size: .875rem;
        color: #737373;
        padding-top: .3em;
    }

    h4 {
        font-size: 1.125rem;
        margin: .625em 0;
    }

    .todo-body-textArea {
        font-size: 1rem;
        line-height: 1.5em;
        padding: .5em 1em;

        background: #F5F5F5;
    }

    .quick-menu-item-form-container {
        left: auto;
        right: 0;
    }

    .todo-description {
        padding: .5em .75em;
        background: #F5F5F5;
    }

    .todo-description textarea {
        font-size: 1rem;
        font-weight: 500 !important; 
        background: #F5F5F5;
        padding: 0;
    }
/* Layout */
    .aside-todo-menu {
        padding-left: .5em;
        margin-left: .5em;
    }
</style>