<template>
    <div class="todo-opened-task bg-white" v-if="isShow">
        <div class="main-todo-info">
            <BaseResizeTextArea name="opened-task-title" 
                                :maxHeight="100"
                                :enterSubmit="true"
                                placeholder="Init task title"
                                v-model="data.title"/>
            <p class="todo-subtittle">In colum {{selectData[colum]}}</p>

            <div class="todo-opts"
                :class="data.prioraty">
                <p class="todo-prioraty bold">{{data.prioraty}}</p>
            </div>
            <TodoDeadline :finishDate="data.deadline"/> 

            <span class="reduct-icon btn">
                <font-awesome-icon icon="pen" />
            </span>

            <h4 class="semi-bold">Description</h4> 
            <div class="todo-description">
                <BaseResizeTextArea name="opened-task-description" 
                                    :maxHeight="250"
                                    placeholder="Init task description"
                                    v-model="data.description"/>
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
</template>

<script>
//Переделать textarea desc
export default {
    props: ['data', 'colum'],
    data: () => {
        return {
            isClicked: false,
            isMoveOpened: false,

            selectData: ['New', 'Processed', 'Done'],
            moveSelectValue: 0,
            bodyValue: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente hic debitis ullam, voluptatum nostrum aspernatur.'
        }
    },
    computed: {
        isShow() {
            if (this.isClicked) {
                if (!this.$store.getters['overlay/getOverlayVal']) {
                    this.close();
                    return false;
                }
                return true;
            }
            return false;
        }
    },
    methods: {
        open() {
            this.isClicked = true;
        },
        close() {
            this.isClicked = false;
            this.closeForm();
        },
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
        }
    }
}
</script>

<style scoped>
    .todo-opened-task {
        width: 95%;
        max-width: 500px;

        padding: .4em .8em;

        position: absolute;
        left: 50%;
        top: 20%;
        transform: translate(-50%, 0);
        z-index: 10;

        display: flex;
        justify-content: flex-start;
    }

/* Typography */
    .main-todo-info {
        flex-grow: 2;
    }

    .todo-title {
        padding-bottom: 0;
    }
    .todo-subtittle {
        font-size: .875rem;
        color: #737373;
        padding-bottom: .75em;
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
        border-left: 1px solid #767676;;
        padding-left: .5em;
        margin-left: .5em;
    }
</style>